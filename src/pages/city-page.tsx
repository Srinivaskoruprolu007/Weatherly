import { useParams, useSearchParams } from "react-router-dom";
import { useWeatherQuery, useForecastQuery } from "../hooks/use-weather";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import WeatherSkeleton from "@/components/loading-skeleton";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemperature from "@/components/HourlyTemperature";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import FavouriteButton from "@/components/FavouriteButton";

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="text-lg font-semibold">Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4 mt-2">
          Falided to load weather data
        </AlertDescription>
      </Alert>
    );
  }
  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />;
  }
  return (
    <div className="space-y-6 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto bg-background/50 rounded-lg backdrop-blur-sm shadow-sm dark:shadow-none">
      <div className="flex items-center justify-between border-b pb-4 dark:border-gray-800">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {params.cityName}, {weatherQuery.data.sys.country}
        </h1>
        <div>
          {/* Favourite button */}
          <FavouriteButton  data={{...weatherQuery.data, name: params.cityName}}/>
        </div>
      </div>


      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <CurrentWeather data={weatherQuery.data} />
          </div>
          <div className="flex-1">
            <HourlyTemperature data={forecastQuery.data} />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          <div className="h-full">
            <WeatherDetails data={weatherQuery.data} />
          </div>
          <div className="h-full">
            <WeatherForecast data={forecastQuery.data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityPage;
