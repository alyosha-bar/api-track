import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { API_BASE } from "../api/config";
import { useAuth } from "@clerk/clerk-react";
import Metrics from "../components/dashboard/Metrics";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

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
        const response = await fetch(`${API_BASE}/api/core/analytics/${id}`, {
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

  const { lineData, methodData, statusData, totalReq, errorRate, avgLatency } = useMemo(() => {
  if (!Array.isArray(rawData)) {
    return {
      lineData: [],
      methodData: [],
      statusData: [],
      totalReq: 0,
      errorRate: 0,
      avgLatency: 0
    };
  }

  const formatter = timeScale === "monthly"
    ? d => new Date(d).toISOString().slice(0, 7)   // YYYY-MM
    : d => new Date(d).toISOString().slice(0, 10); // YYYY-MM-DD

  // 🧠 1. Line data over all time
  const byDate = rawData.reduce((acc, row) => {
    const key = formatter(row.timestamp);
    acc[key] = acc[key] ? acc[key] + 1 : 1;
    return acc;
  }, {});
  const lineData = Object.entries(byDate).map(([key, count]) => ({ timestamp: key, count }));

  // 🧠 2. Get the latest time bucket (e.g. most recent day or month)
  const latestBucket = (() => {
    if (!rawData.length) return null;
    const timestamps = rawData.map(row => formatter(row.timestamp));
    return timestamps.sort().at(-1); // last in sorted list
  })();

  // 🧠 3. Filter data to that bucket
  const filtered = rawData.filter(row => formatter(row.timestamp) === latestBucket);

  // 🧠 4. Method breakdown in latest bucket
  const byMethod = filtered.reduce((acc, row) => {
    acc[row.method] = acc[row.method] ? acc[row.method] + 1 : 1;
    return acc;
  }, {});
  const methodData = Object.entries(byMethod).map(([method, count]) => ({ method, count }));

  // 🧠 5. Status breakdown in latest bucket
  const byStatusRange = filtered.reduce((acc, row) => {
    const status = parseInt(row.status);
    let range = 'Other';
    if (status >= 200 && status < 300) range = '2xx';
    else if (status >= 300 && status < 400) range = '3xx';
    else if (status >= 400 && status < 500) range = '4xx';
    acc[range] = acc[range] ? acc[range] + 1 : 1;
    return acc;
  }, {});
  const statusData = Object.entries(byStatusRange).map(([status, count]) => ({ status, count }));

  // 🧠 6. Total requests
  const totalReq = filtered.length;

  // 🧠 7. Error rate (4xx or 5xx)
  const errorCount = filtered.filter(r => {
    const status = parseInt(r.status);
    return status >= 400;
  }).length;
  const errorRate = totalReq > 0 ? Math.round((errorCount / totalReq) * 100) : 0;

  // 🧠 8. Average latency
  const sumLatency = filtered.reduce((acc, r) => acc + Number(r.response_time_ms), 0);
  const avgLatency = totalReq > 0 ? Math.round(sumLatency / totalReq) : 0;

  return { lineData, methodData, statusData, totalReq, errorRate, avgLatency };
}, [rawData, timeScale]);


  // link [daily, monthly] filter into the other data points
  // calculate totalReq, errorRate, avgLatency

  return (
    <div className="p-10 space-y-10">
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
            <Link to={`/settings/${id}`} className="px-3 py-1 rounded bg-gray-200"> 
              <FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
            </Link>
        </div>
      </div>

      <Metrics 
        totalReq={totalReq}
        errorRate={errorRate}
        avgLatency={avgLatency}
      />

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
        <div className="flex-1 min-w-[300px] h-80 bg-white shadow rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-2">Method Breakdown</h3>
          <ResponsiveContainer className="p-10">
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
          <ResponsiveContainer className="p-10">
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
