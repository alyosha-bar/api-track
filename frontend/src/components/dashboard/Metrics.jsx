import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export default function MetricsCard({
  totalReq = 12430,
  totalReqChange = 12.5, // +12.5% vs last month
  errorRate = 2.1,
  errorRateChange = -0.4, // -0.4% vs last month
  avgLatency = 230,
  latencyChange = 5.2, // +5.2% vs last month
  currentPeriod = "October",
}) {
  const Metric = ({ title, value, unit, change, color }) => {
    const isPositive = change > 0;
    const isNeutral = change === 0;
    const ArrowIcon = isNeutral ? Minus : isPositive ? ArrowUpRight : ArrowDownRight;

    const changeColor = isNeutral
      ? "text-gray-400"
      : isPositive
      ? color.includes("green")
        ? "text-green-600"
        : "text-red-600"
      : color.includes("green")
      ? "text-red-600"
      : "text-green-600";

    return (
      <div className="flex-1 px-4 py-2 flex flex-col justify-center text-center">
        <h5 className="text-gray-500 text-sm font-medium">{title}</h5>
        <h3 className={`text-3xl font-semibold ${color}`}>{value}{unit && <span className="text-base font-normal ml-1">{unit}</span>}</h3>
        <div className="flex items-center justify-center space-x-1 mt-1 text-xs">
          <ArrowIcon className={`w-3 h-3 ${changeColor}`} />
          <span className={changeColor}>
            {Math.abs(change)}% vs last month
          </span>
        </div>
        <div className="text-gray-400 text-xs mt-1">in {currentPeriod}</div>
      </div>
    );
  };

  return (
    <Card className="w-full border border-gray-200 rounded-2xl bg-white shadow-sm">
      <CardContent className="flex divide-x divide-gray-200 p-4 sm:p-6">
        <Metric
          title="Total Requests"
          value={totalReq.toLocaleString()}
          change={totalReqChange}
          color="text-green-600"
        />
        <Metric
          title="Error Rate"
          value={errorRate}
          unit="%"
          change={errorRateChange}
          color="text-red-600"
        />
        <Metric
          title="Avg Latency"
          value={avgLatency}
          unit="ms"
          change={latencyChange}
          color="text-gray-800"
        />
      </CardContent>
    </Card>
  );
}
