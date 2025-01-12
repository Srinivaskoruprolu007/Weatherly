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
import FavouriteCities from "@/components/FavouriteCities";

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
  };

  if (locationLoading) {
    return <WeatherSkeleton />;
  }

  if (locationError) {
    return (
      <Alert
        variant="destructive"
        className="max-w-xl mx-auto mt-12 shadow-lg rounded-lg p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      >
        <AlertCircle className="h-6 w-6 text-red-500" />
        <div>
          <AlertTitle className="text-xl font-semibold">Location Error</AlertTitle>
          <AlertDescription className="mt-3 text-sm">
            <p>{locationError}</p>
            <Button
              onClick={getLocation}
              variant="outline"
              className="mt-4 hover:bg-red-50 dark:hover:bg-red-900/50"
            >
              <MapPin className="mr-2 h-5 w-5" />
              Enable Location
            </Button>
          </AlertDescription>
        </div>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert
        variant="destructive"
        className="max-w-xl mx-auto mt-12 shadow-lg rounded-lg p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      >
        <AlertTitle className="text-xl font-semibold">Location Required</AlertTitle>
        <AlertDescription className="mt-3 text-sm">
          <p>Please enable location access to see your local weather.</p>
          <Button
            onClick={getLocation}
            variant="outline"
            className="mt-4 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <MapPin className="mr-2 h-5 w-5" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert
        variant="destructive"
        className="max-w-xl mx-auto mt-12 shadow-lg rounded-lg p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      >
        <AlertCircle className="h-6 w-6 text-red-500" />
        <div>
          <AlertTitle className="text-xl font-semibold">Error</AlertTitle>
          <AlertDescription className="mt-3 text-sm">
            <p>Failed to fetch weather data. Please try again.</p>
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="mt-4 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Retry
            </Button>
          </AlertDescription>
        </div>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-8 px-4 py-6 sm:px-6 md:px-8 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900 shadow-md rounded-xl">
      {/* Favourite Cities Section */}
      <FavouriteCities />

      <div className="flex items-center justify-between border-b pb-5 border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          My Location
        </h1>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          className="hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <RefreshCw
            className={`h-5 w-5 text-gray-700 dark:text-gray-300 ${
              weatherQuery.isFetching ? "animate-spin duration-1000" : ""
            }`}
          />
        </Button>
      </div>

      <div className="space-y-8">
        {/* Current Weather & Hourly Forecast */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <CurrentWeather
              data={weatherQuery.data}
              locationName={locationName}
            />
          </div>
          <div className="flex-1 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <HourlyTemperature data={forecastQuery.data} />
          </div>
        </div>

        {/* Weather Details & 7-Day Forecast */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <WeatherDetails data={weatherQuery.data} />
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <WeatherForecast data={forecastQuery.data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
