import { WeatherData } from "@/api/types";
import { format } from "date-fns";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";

import { Card, CardContent, CardHeader } from "./ui/card";

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { wind, main, sys } = data;
  const getWindDirection = (deg: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(((deg %= 360) < 0 ? (deg += 360) : deg) / 45) % 8;
    return directions[index];
  };
  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm a");
  };
  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-orange-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ];
  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-semibold">Weather Details</h2>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-6">
          {details.map((item) => (
            <div
              key={item.title}
              className="flex items-center space-x-2 rounded-lg border p-4"
            >
              <item.icon className={item.color} />
              <div>
                <p className="text-sm font-medium leading-none">{item.title}</p>
                <p className="text-sm text-gray-500 font-medium leading-none">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
