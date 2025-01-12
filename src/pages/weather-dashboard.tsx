import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/use-geolocation";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import { AlertCircle, MapPin, RefreshCw } from "lucide-react";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemperature from "@/components/HourlyTemperature";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation,
  } = useGeolocation();
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      // reload weather data
    }
  };

  if (locationLoading) {
    return <WeatherSkeleton />;
  }

  if (locationError) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="text-lg font-semibold">
          Location Error
        </AlertTitle>
        <AlertDescription className="flex flex-col gap-4 mt-2">
          <p className="text-sm opacity-90">{locationError}</p>
          <Button
            onClick={getLocation}
            variant="outline"
            className="w-fit hover:bg-background/90"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
        <AlertTitle className="text-lg font-semibold">
          Location Required
        </AlertTitle>
        <AlertDescription className="flex flex-col gap-4 mt-2">
          <p className="text-sm opacity-90">
            Please enable location access to see your local weather.
          </p>
          <Button
            onClick={getLocation}
            variant="outline"
            className="w-fit hover:bg-background/90"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="text-lg font-semibold">Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4 mt-2">
          <p className="text-sm opacity-90">
            Failed to fetch weather data. Please try again
          </p>
          <Button
            onClick={handleRefresh}
            variant="outline"
            className="w-fit hover:bg-background/90"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto bg-background/50 rounded-lg backdrop-blur-sm shadow-sm dark:shadow-none">
      <div className="flex items-center justify-between border-b pb-4 dark:border-gray-800">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          My Location
        </h1>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          className="hover:bg-muted transition-colors duration-200"
        >
          <RefreshCw
            className={`h-4 w-4 text-foreground/80 dark:text-zinc-50 ${
              weatherQuery.isFetching ? "animate-spin duration-1000" : ""
            }`}
          />
        </Button>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <CurrentWeather
              data={weatherQuery.data}
              locationName={locationName}
            />
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

export default WeatherDashboard;
