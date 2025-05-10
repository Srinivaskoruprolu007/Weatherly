import { WeatherData } from "@/api/types";
import { format } from "date-fns";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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
      color: "text-sunset-orange",
      bgColor: "bg-sunset-orange/10 dark:bg-sunset-orange/20",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-sunset-orange",
      bgColor: "bg-sunset-orange/10 dark:bg-sunset-orange/20",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-earth-green",
      bgColor: "bg-earth-green/10 dark:bg-earth-green/20",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-sky-blue",
      bgColor: "bg-sky-blue/10 dark:bg-sky-blue/20",
    },
  ];

  return (
    <Card className="h-full bg-gradient-purple-orange bg-[length:200%_200%] animate-gradient-x transition-gradient duration-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-text-primary">
          Weather Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-4">
          {details.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-lg border p-4 transition-all hover:bg-muted/50 dark:border-gray-800"
            >
              <div className={`rounded-full p-2 ${item.bgColor}`}>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-text-secondary">
                  {item.title}
                </p>
                <p className="text-base font-semibold text-text-primary">
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
