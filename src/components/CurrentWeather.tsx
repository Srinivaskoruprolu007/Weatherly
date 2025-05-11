import { GeoCodeData, WeatherData } from "@/api/types";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeoCodeData;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const {
    weather: [currentWeather],
    main: { temp, temp_max, temp_min, feels_like, humidity },
    wind: { speed },
  } = data;
  const formatTemp = (temp: number) => `${Math.round(temp)}℃`;
  return (
    <Card className="overflow-hidden bg-gradient-sky-blue bg-[length:200%_200%] animate-gradient-x transition-gradient duration-700 shadow-lg border-sky-blue/40">
      <CardContent className="p-6">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-end gap-1">
                <h2 className="text-2xl font-bold tracking-tighter text-text-primary">
                  {locationName?.name}
                </h2>
                {locationName?.state && (
                  <span className="text-text-secondary">
                    , {locationName.state}
                  </span>
                )}
              </div>
              <p className="text-text-secondary">{locationName?.country}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-7xl tracking-tighter font-bold text-sky-blue">
                {formatTemp(temp)}
              </p>
              <div className="space-y-1">
                <p className="text-sm font-medium text-earth-green">
                  Feels like {feels_like}
                </p>
                <div className="flex items-center gap-1 ">
                  <span className="flex items-center gap-1 text-sky-blue">
                    <ArrowDown className="h-3 w-3" /> {formatTemp(temp_min)}
                  </span>
                  <span className="flex items-center gap-1 text-sunset-orange">
                    <ArrowUp className="h-3 w-3" /> {formatTemp(temp_max)}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-sky-blue" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Humidity</p>
                  <p className="text-sm font-medium text-text-secondary">
                    {humidity}%
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-earth-green" />
                <div className="spa-y-0.5">
                  <p className="text-sm font-medium ">Wind Speed</p>
                  <p className="text-sm font-medium text-text-secondary">
                    {speed} m/s
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt="weathe_img"
                className="h-full w-full object-contain"
              />
              <div className="absolute bottom-0 text-center">
                <p className="text-sm font-medium capitalize">
                  {currentWeather.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
