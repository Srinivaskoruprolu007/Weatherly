import { ForecastData } from "@/api/types";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface WeatherForecastProps {
  data: ForecastData;
}

interface dailyForecast {
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  date: number;
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const dailyForecasts = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");
    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }
    return acc;
  }, {} as Record<string, dailyForecast>);

  const nextDays = Object.values(dailyForecasts).slice(0, 6);

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">
          Next 5 Days Forecast
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nextDays.map((forecast) => (
            <div
              key={forecast.date}
              className="flex flex-col rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-800/50"
            >
              <div className="mb-2 text-center">
                <p className="text-sm font-medium text-muted-foreground">
                  {format(new Date(forecast.date * 1000), "EEE, MMM d")}
                </p>
              </div>

              <div className="flex items-center justify-center">
                <img
                  src={`https://openweathermap.org/img/wn/${forecast.weather.icon}@2x.png`}
                  alt={forecast.weather.description}
                  className="h-16 w-16"
                />
              </div>

              <p className="mb-3 text-center text-sm capitalize text-muted-foreground">
                {forecast.weather.description}
              </p>

              <div className="mt-auto space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <ArrowDown className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">
                      {Math.round(forecast.temp_min)}°C
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ArrowUp className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">
                      {Math.round(forecast.temp_max)}°C
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-2 dark:border-gray-700">
                  <div className="flex items-center gap-1">
                    <Wind className="h-4 w-4 text-blue-500" />
                    <span className="text-xs text-muted-foreground">
                      {forecast.wind} m/s
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-xs text-muted-foreground">
                      {forecast.humidity}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
