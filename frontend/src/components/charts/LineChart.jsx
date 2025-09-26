import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  YAxis,
} from "recharts"
import { TrendingUp } from "lucide-react"
import { useState } from "react"

// simple chart config
const chartConfig = {
  visitors: {
    label: "API Requests",
    color: "purple",
  },
}

const MS_PER_DAY = 24 * 60 * 60 * 1000

// return a Date representing midnight UTC of the given date
function utcMidnight(date) {
  const d = new Date(date)
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
}

// Helper: generate all UTC-midnight Dates between start and end (inclusive)
function getDateRangeUTC(start, end) {
  const arr = []
  let cur = utcMidnight(start)
  const last = utcMidnight(end)
  while (cur.getTime() <= last.getTime()) {
    arr.push(new Date(cur))
    cur = new Date(cur.getTime() + MS_PER_DAY)
  }
  return arr
}

// YYYY-MM-DD in UTC
function toUTCDateString(date) {
  return new Date(date).toISOString().split("T")[0]
}

export function SimpleLineChart({ rawData }) {
  if (!rawData || rawData.length === 0) return null

  // 1️⃣ Group by UTC day (safe whether Object.groupBy exists or not)
  const grouped = (typeof Object.groupBy === "function")
    ? Object.groupBy(rawData, (entry) => toUTCDateString(entry.timestamp))
    : rawData.reduce((acc, entry) => {
        const k = toUTCDateString(entry.timestamp)
        if (!acc[k]) acc[k] = []
        acc[k].push(entry)
        return acc
      }, {})

  // 2️⃣ Find min/max timestamps (as numbers to avoid Date weirdness)
  const timestamps = rawData.map(d => new Date(d.timestamp).getTime())
  const minDate = new Date(Math.min(...timestamps))
  const maxDate = new Date() // "today" (now)

  // 3️⃣ Generate all UTC days (midnight UTC -> midnight UTC)
  const allDates = getDateRangeUTC(minDate, maxDate).map(toUTCDateString)

  // 4️⃣ Build final data array (daily)
  const lineData = allDates.map(date => ({
    date,
    count: (grouped[date] || []).length || 0,
  }))

  // 5️⃣ Partition daily data into months
  function toUTCMonthString(date) {
    const d = new Date(date + "T00:00:00Z") // "YYYY-MM-DD" → Date in UTC
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`
  }

  // Use reduce → object, then convert to array with Object.values
  const monthlyLineData = Object.values(
    lineData.reduce((acc, entry) => {
      const month = toUTCMonthString(entry.date)
      if (!acc[month]) acc[month] = { month, entries: [] }
      acc[month].entries.push(entry)
      return acc
    }, {})
  )


  const [selectedMonth, setSelectedMonth] = useState(
    monthlyLineData.length > 0 ? monthlyLineData[0].month : null
  )

  const selectedEntries = monthlyLineData.find(m => m.month === selectedMonth)?.entries || []


  console.log(lineData)
  console.log(monthlyLineData)

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Requests / time</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="m-4">
        {/* Month switcher */}
        <div className="flex gap-2 mb-4">
          {monthlyLineData.map(m => (
            <button
              key={m.month}
              onClick={() => setSelectedMonth(m.month)}
              className={`px-3 py-1 rounded ${
                selectedMonth === m.month ? "bg-purple-600 text-white" : "bg-gray-200"
              }`}
            >
              {m.month}
            </button>
          ))}
        </div>

        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={selectedEntries} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(5)} // show MM-DD
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="count"
                type="monotone"
                stroke="purple"
                strokeWidth={2}
                dot={false}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors per day
        </div>
      </CardFooter>
    </Card>
  )
}
