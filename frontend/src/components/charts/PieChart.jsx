import { TrendingUp } from "lucide-react"
import { Cell, Pie, PieChart } from "recharts"
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

export const description = "A donut chart"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "gray",
  },
  safari: {
    label: "Safari",
    color: "yellow",
  },
  firefox: {
    label: "Firefox",
    color: "red",
  },
  edge: {
    label: "Edge",
    color: "blue",
  },
  other: {
    label: "Other",
    color: "lightblue",
  },
}


export function ChartPieDonut({rawData}) {

    const groups = {
        "2xx": 0,
        "3xx": 0,
        "4xx": 0,
        "5xx": 0
    };

    // Count events into the right group
    const statusCounts = rawData.reduce((acc, { status }) => {
    if (status >= 200 && status < 300) acc["2xx"] += 1;
        else if (status >= 300 && status < 400) acc["3xx"] += 1;
        else if (status >= 400 && status < 500) acc["4xx"] += 1;
        else if (status >= 500 && status < 600) acc["5xx"] += 1;
        return acc;
    }, { ...groups });

    // Transform into chart data
    const pieData = Object.entries(statusCounts).map(([name, value]) => ({
        name,
        value
    }));

    console.log(pieData);




  return (
    <Card className="w-2/5">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart width={400} height={400}>
            <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
            />
            <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={3}
            >
                {pieData.map((entry, index) => (
                <Cell
                    key={`cell-${index}`}
                    fill={["#4CAF50", "#2196F3", "#FF5722", "#9C27B0"][index % 4]}
                />
                ))}
            </Pie>
            </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
