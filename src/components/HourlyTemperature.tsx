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
    <Card className="flex-1 bg-gradient-sky-blue bg-[length:200%_200%] animate-gradient-x transition-gradient duration-700 shadow-lg border-sky-blue/40" style={{backdropFilter:'blur(10px)',background:'rgba(255,255,255,0.15)',border:'1px solid rgba(255,255,255,0.18)',boxShadow:'0 8px 32px 0 rgba(31,38,135,0.37)'}}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-text-primary">
          <span className="text-lg font-semibold">Today's Temperature</span>
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-sky-500" />
              <span>Temperature</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500/70" />
              <span>Feels Like</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full overflow-x-auto scrollbar-thin scrollbar-thumb-sky-blue/40 scrollbar-track-transparent">
          <ResponsiveContainer width={chartData.length * 80} height={220}>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#38bdf8"
                opacity={0.08}
                vertical={false}
              />
              <XAxis
                dataKey="time"
                stroke="#38bdf8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="#38bdf8"
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
                      <div className="rounded-lg border bg-background/80 backdrop-blur-md p-3 shadow-md dark:border-gray-800">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <span className="text-[0.7rem] uppercase text-sky-500">Temperature</span>
                            <span className="text-base font-bold text-sky-500">{payload[0].value}°</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-[0.7rem] uppercase text-green-500">Feels like</span>
                            <span className="text-base font-bold text-green-500">{payload[1].value}°</span>
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
                stroke="#38bdf8"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 5,
                  stroke: "#0ea5e9",
                  strokeWidth: 2,
                  fill: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#22c55e"
                strokeWidth={2.5}
                strokeOpacity={0.7}
                dot={false}
                activeDot={{
                  r: 5,
                  stroke: "#16a34a",
                  strokeWidth: 2,
                  strokeOpacity: 0.7,
                  fill: "#fff",
                }}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyTemperature;

