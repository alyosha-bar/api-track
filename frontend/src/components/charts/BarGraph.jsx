import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "A bar chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
}

export function ChartBarDefault( { rawData } ) {

    // group rawData by method
    if (!rawData || rawData.length === 0) return null

    // Count events by day+method
    const counts = rawData.reduce((acc, event) => {
      const day = new Date(event.timestamp).toISOString().split("T")[0];
      acc[day] ??= {};
      acc[day][event.method] ??= 0;
      acc[day][event.method] += 1;
      return acc;
    }, {});

    // Pivot into chart-friendly format
    const grouped = Object.entries(counts).map(([day, methods]) => ({
      day,
      ...methods,
    })).sort((a, b) => new Date(a.day) - new Date(b.day));

    // const grouped = [
    //   { day: "2025-09-18", GET: 5, POST: 2, PUT: 1 },
    //   { day: "2025-09-19", GET: 3, POST: 4, PUT: 2 },
    //   { day: "2025-09-20", GET: 6, POST: 1, PUT: 3 },
    //   { day: "2025-09-21", GET: 2, POST: 3, PUT: 5 },
    //   { day: "2025-09-22", GET: 4, POST: 2, PUT: 2 }
    // ];




    return (
        <Card className="w-3/5">
            <CardHeader>
                <CardTitle>Bar Chart</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <BarChart accessibilityLayer data={grouped}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(5)} // show MM-DD only
                      angle={0}
                      textAnchor="end"
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    {/* One <Bar> per method */}
                    <Bar dataKey="GET" fill="#8EC6E3" radius={8} />
                    <Bar dataKey="POST" fill="#6CBC72" radius={8} />
                    <Bar dataKey="PUT" fill="#CD1F1F" radius={8} />
                  </BarChart>

                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}
