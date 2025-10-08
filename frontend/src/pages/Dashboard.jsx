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
import MetricsCard from "../components/dashboard/Metrics";

// const COLORS = ["#6366f1", "#34d399", "#facc15", "#fb923c", "#f43f5e", "#0ea5e9"];

// ToDo:
// Adjust Chart discriptions and titles based on data
// Fix data time frames (daily/weekly/monthly) | consisent over all charts

// Loading states using react-query
// Metrics: Total Requests, Error Rate, Avg Latency


// Helpers
// Format to "YYYY-MM-DD" (UTC)
function toUTCDateString(date) {
  return new Date(date).toISOString().split("T")[0];
}

// Format to "YYYY-MM" for monthly grouping
function toUTCMonthString(date) {
  const d = new Date(date);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

// Format to "YYYY-Wxx" for weekly grouping
function toUTCWeekString(date) {
  const d = new Date(date);
  const yearStart = Date.UTC(d.getUTCFullYear(), 0, 1);
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + d.getUTCDay() + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

function fillMissingDays(entries, periodStart, periodEnd) {
  const start = new Date(periodStart);
  const end = new Date(periodEnd);
  const result = [];
  const map = Object.fromEntries(entries.map(e => [e.date, e]));

  for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    result.push(map[dateStr] || { date: dateStr, count: 0 });
  }

  return result;
}

function getPeriodRange(group, timeScale) {
  if (!group) return [null, null];

  if (timeScale === "monthly") {
    if (!group.month || typeof group.month !== "string") return [null, null];
    const [year, month] = group.month.split("-").map(Number);

    if (!year || !month) return [null, null]; // invalid format

    const start = new Date(Date.UTC(year, month - 1, 1));
    const end = new Date(Date.UTC(year, month, 0)); // last day of month
    return [start, end];
  }

  if (timeScale === "weekly") {
    if (!group.week || typeof group.week !== "string") return [null, null];
    const [yearStr, weekStr] = group.week.split("-W");

    if (!yearStr || !weekStr) return [null, null]; // invalid format

    const year = Number(yearStr);
    const week = Number(weekStr);

    // ISO week to date
    const simple = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7));
    const dayOfWeek = simple.getUTCDay();
    const start = new Date(simple.getTime() - ((dayOfWeek + 6) % 7) * 86400000); // Monday
    const end = new Date(start.getTime() + 6 * 86400000); // Sunday
    return [start, end];
  }

  return [null, null];
}


// month mapping
const monthMapping = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
]







const Dashboard = () => {
  const { id } = useParams();
  const [rawData, setRawData] = useState([]);
  const [timeScale, settimeScale] = useState("monthly"); // "weekly" | "monthly"
  const [index, setIndex] = useState(0);

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


  // --- Core Transformations ---

  // 1. Group raw data by day
  function buildDailyData(rawData) {
    const grouped = rawData.reduce((acc, entry) => {
      const day = toUTCDateString(entry.timestamp);
      if (!acc[day]) acc[day] = 0;
      acc[day] += 1; // count events per day
      return acc;
    }, {});

    return Object.entries(grouped).map(([date, count]) => ({ date, count }));
  }

  // 2. Partition dailyData into months
  function groupByMonth(dailyData) {
    const months = dailyData.reduce((acc, entry) => {
      const month = toUTCMonthString(entry.date);
      if (!acc[month]) acc[month] = { month, entries: [] };
      acc[month].entries.push(entry);
      return acc;
    }, {});
    return Object.values(months);
  }

  // 3. Partition dailyData into weeks
  function groupByWeek(dailyData) {
    const weeks = dailyData.reduce((acc, entry) => {
      const week = toUTCWeekString(entry.date);
      if (!acc[week]) acc[week] = { week, entries: [] };
      acc[week].entries.push(entry);
      return acc;
    }, {});
    return Object.values(weeks);
  }

  const dailyData = buildDailyData(rawData);
  const monthlyGroups = groupByMonth(dailyData);
  // const weeklyGroups = groupByWeek(dailyData);

  const groups = timeScale === "monthly" ? monthlyGroups : weeklyGroups;
  const sortedGroups = groups.sort((a, b) => new Date(b.month || b.week) - new Date(a.month || a.week));

  // Log current period whenever timeScale or index changes
  useEffect(() => {
    if (sortedGroups.length === 0) return;

    const period = sortedGroups[index];
    console.log("Period:", period)
    console.log(`timeScale: ${timeScale}, Period: ${timeScale === "monthly" ? period.month : period.week}`);
    console.log("Entries:", period.entries);
  }, [timeScale, index, groups]);

  const next = () => {
    setIndex(index - 1)
  };
  const prev = () => setIndex(index + 1);

  // Make sure we have a valid group
  const selectedGroup = sortedGroups[index] || { entries: [] };

  console.log("Selected Group:", selectedGroup);
  
  // Extract daily entries to pass to the chart
  const selectedEntries = selectedGroup.entries;

  // Fill in missing days
  const [periodStart, periodEnd] = getPeriodRange(selectedGroup, timeScale);
  const filledEntries = fillMissingDays(selectedEntries, periodStart, periodEnd);

  // based on prev and next filter data for also BarGraph and PieChart
  console.log(filledEntries)


  // Calculate metrics
  // Total Requests in current month (comparison to last month)
  const totalRequests = selectedEntries.reduce((sum, entry) => sum + entry.count, 0);
  // Error Rate in current month (comparison to last month)
  // Avg Latency in current month (comparison to last month) 

  return (
    <div className="p-10 space-y-10">
      <h2 className="text-2xl font-bold">API Dashboard (ID: {id})</h2>
      <div className="flex items-center justify-between">
        <MetricsCard 
          totalReq={totalRequests}
          errorRate={7.5}
          avgLatency={127}
          currentPeriod={groups[index] ? groups[index].month : "N/A"}
        />  
        {/* <button onClick={() => console.log(rawData)}> See Data </button> */}
        <div className="flex items-center justify-between space-x-4 p-4">
          <div className="flex flex-col space-y-3">
            {/* Time scale buttons - uncomment if needed */}
            {/* <div className="flex space-x-2">
              <button 
                onClick={() => settimeScale("monthly")} 
                className={`px-3 py-1 rounded ${timeScale === "monthly" ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => settimeScale("weekly")} 
                className={`px-3 py-1 rounded ${timeScale === "weekly" ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Weekly
              </button>
            </div> */}

            {/* Navigation buttons */}
            <div className="flex space-x-2">
              <button onClick={() => console.log(index)}> Index </button>
              <button 
                disabled={index === groups.length - 1}
                onClick={prev} 
                className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              <button 
                disabled={index === 0}
                onClick={next} 
                className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>

            {/* Current label */}
            <p className="text-gray-700 font-medium">
              Current: {groups[index] ? (timeScale === "monthly" ? groups[index].month : groups[index].week) : "N/A"}
            </p>

          {/* Settings link */}
          <Link 
            to={`/settings/${id}`} 
            className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faCog} className="text-gray-700" />
          </Link>
          </div>
        </div>
      </div>

      <SimpleLineChart
        title="Daily API Requests"
        data={filledEntries} // comes from your parent aggregation (monthlyLineData[index].entries or weeklyGroups[index].entries)
      />


        <div className="flex gap-6">
          <ChartBarDefault rawData={rawData} />
          <ChartPieDonut rawData={rawData}/>
        </div>
      </div>
  );
};

export default Dashboard;
