import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { API_BASE } from "../api/config";
import { useAuth } from "@clerk/clerk-react";
import Metrics from "../components/dashboard/Metrics";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { SimpleLineChart } from "../components/charts/LineChart";
import { ChartBarDefault } from "@/components/charts/BarGraph";
import { ChartPieDonut } from "@/components/charts/PieChart";

// const COLORS = ["#6366f1", "#34d399", "#facc15", "#fb923c", "#f43f5e", "#0ea5e9"];

// ToDo:
// Adjust Chart discriptions and titles based on data
// Fix data time frames (daily/weekly/monthly) | consisent over all charts
// Scrolling between time frames

// Loading states using react-query
// Metrics: Total Requests, Error Rate, Avg Latency

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

  return (
    <div className="p-10 space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">API Dashboard (ID: {id})</h2>
        <button onClick={() => console.log(rawData)}> See Data </button>
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
        totalReq={1200}
        errorRate={7.5}
        avgLatency={127}
      />

      <SimpleLineChart rawData={rawData}/>

        <div className="flex gap-6">
          <ChartBarDefault rawData={rawData} />
          <ChartPieDonut rawData={rawData}/>
        </div>
      </div>
  );
};

export default Dashboard;
