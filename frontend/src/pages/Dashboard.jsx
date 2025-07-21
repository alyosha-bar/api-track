import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { API_BASE } from "../api/config";
import { useAuth } from "@clerk/clerk-react";

const COLORS = ["#6366f1", "#34d399", "#facc15", "#fb923c", "#f43f5e", "#0ea5e9"];

function groupBy(arr, keyFn) {
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    acc[key] = acc[key] ? acc[key] + 1 : 1;
    return acc;
  }, {});
}

const Dashboard = () => {
  const { id } = useParams();
  const [rawData, setRawData] = useState([]);
  const [timeScale, setTimeScale] = useState("daily");

  const { getToken } = useAuth();

  useEffect(() => {

    const fetchAnalytics = async () => {
      const token = await getToken({ template: 'IDToken' });
      try {
        const response = await fetch(`${API_BASE}/api/core/analytics/${25}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })

        const data = await response.json()
        setRawData(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchAnalytics()
    
  }, [id]);

  // Prepare chart data
  const { lineData, methodData, statusData } = useMemo(() => {
    if (!Array.isArray(rawData)) return { lineData: [], methodData: [], statusData: [] };

    const formatter = timeScale === "monthly"
      ? d => new Date(d).toISOString().slice(0, 7)   // YYYY-MM
      : d => new Date(d).toISOString().slice(0, 10); // YYYY-MM-DD

    const byDate = groupBy(rawData, row => formatter(row.timestamp));
    const lineData = Object.entries(byDate).map(([key, count]) => ({ timestamp: key, count }));

    const byMethod = groupBy(rawData, row => row.method);
    const methodData = Object.entries(byMethod).map(([method, count]) => ({ method, count }));

    const byStatusRange = groupBy(rawData, row => {
        const status = parseInt(row.status);
            if (status >= 200 && status < 300) return '2xx';
            if (status >= 300 && status < 400) return '3xx';
            if (status >= 400 && status < 500) return '4xx';
        return 'Other';
    });
    
    const statusData = Object.entries(byStatusRange).map(([range, count]) => ({
    status: range,
    count
    }));

    return { lineData, methodData, statusData };
  }, [rawData, timeScale]);

  return (
    <div className="p-6 space-y-6">
        {/* Metrics Summary Section */}
            <div className="w-full border rounded-md border-gray-300 p-4 flex justify-around divide-x divide-gray-300 bg-white">
                {/* Total Requests */}
                <div className="flex-1 px-4 flex flex-col justify-center">
                    {/* {totalreq && ( */}
                    <>
                        <h5 className="text-green-600 text-sm">Total Requests:</h5>
                        <h3 className="text-green-600 text-3xl p-2 self-center">
                        1000
                        <div className="text-green-600 text-xs">requests in ... </div>
                        </h3>
                    </>
                    {/* )} */}
                </div>

                {/* Error Rate */}
                <div className="flex-1 px-4 flex flex-col justify-center">
                    {/* {errorRate !== null && errorRate !== undefined && !isNaN(errorRate) && ( */}
                    <>
                        <h5 className="text-red-600 text-sm">Error Rate:</h5>
                        <h3 className="text-red-600 text-3xl p-2 self-center">
                        10%
                        <div className="text-red-600 text-xs">in ... </div>
                        </h3>
                    </>
                    {/* )} */}
                </div>

                {/* Avg Latency */}
                <div className="flex-1 px-4 flex flex-col justify-center">
                    <h5 className="text-black text-sm">Avg Latency:</h5>
                    <h3 className="text-black text-3xl p-2 self-center">
                    120 ms
                    <div className="text-xs">per request in ... </div>
                    </h3>
                </div>
                
                {/* Avg Latency */}
                <div className="flex-1 px-4 flex flex-col justify-center">
                    <h5 className="text-black text-sm">Avg Latency:</h5>
                    <h3 className="text-black text-3xl p-2 self-center">
                    100 ms
                    <div className="text-xs">per request in ... </div>
                    </h3>
                </div>
            </div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">API Dashboard (ID: {id})</h2>
        <div className="space-x-2">
          <button
            className={`px-3 py-1 rounded ${timeScale === "daily" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setTimeScale("daily")}
          >
            Daily
          </button>
          <button
            className={`px-3 py-1 rounded ${timeScale === "monthly" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setTimeScale("monthly")}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Line Chart */}
      <div className="w-100 h-120 bg-white shadow rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-2">Requests Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Method + Status Row */}
      <div className="flex flex-wrap gap-6">
        {/* Bar Chart */}
        <div className="flex-1 min-w-[300px] h-80 bg-white shadow rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-2">Method Breakdown</h3>
          <ResponsiveContainer>
            <BarChart data={methodData}>
              <XAxis dataKey="method" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#34d399" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="flex-1 min-w-[300px] h-80 bg-white shadow rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-2">Status Codes</h3>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="count"
                nameKey="status"
                outerRadius={80}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
