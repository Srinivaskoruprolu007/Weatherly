import { ForecastData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format } from "date-fns";

interface HourlyTemperatureProps {
  data: ForecastData;
}

interface ChartData {
  time: string;
  temp: number;
  feels_like: number;
}

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
  const chartData: ChartData[] = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  return (
    <Card className="flex-1">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-semibold">Today's Temperature</span>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>Temperature</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500/50" />
              <span>Feels Like</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f0f0"
                opacity={0.5}
                vertical={false}
              />
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `${val}°`}
                dx={-10}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-blue-700 p-3 shadow-md text-white">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <span className="text-[0.7rem] uppercase text-gray-400">
                              Temperature
                            </span>
                            <span className="text-base font-bold">{payload[0].value}°</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-[0.7rem] uppercase text-gray-400">
                              Feels Like
                            </span>
                            <span className="text-base font-bold">{payload[1].value}°</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="url(#tempGradient)"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 4,
                  stroke: "#2563eb",
                  strokeWidth: 2,
                  fill: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="url(#feelsLikeGradient)"
                strokeWidth={3}
                strokeOpacity={0.7}
                dot={false}
                activeDot={{
                  r: 4,
                  stroke: "#2563eb",
                  strokeWidth: 2,
                  strokeOpacity: 0.7,
                  fill: "#fff",
                }}
                strokeDasharray="5 5"
              />
              <defs>
                <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
                <linearGradient id="feelsLikeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyTemperature;
