import { useFavourite } from "@/hooks/use-favourites";
import { ScrollArea } from "./ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useWeatherQuery } from "@/hooks/use-weather";
import { Button } from "./ui/button";
import { XIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface FavouriteCityTabletProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
}

const FavouriteCities = () => {
  const { favourite, removeFromFavourite } = useFavourite();

  if (!favourite || favourite.length === 0) {
    return (
      <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
        No favourite cities added yet.
      </p>
    );
  }

  const handleRemove = (id: string) => {
    if (removeFromFavourite?.mutate) {
      removeFromFavourite.mutate(id, {
        onSuccess: () => {
          toast.success("City removed from favourites!");
        },
        onError: () => {
          toast.error("Failed to remove the city. Please try again.");
        },
      });
    } else {
      toast.error("Remove function is not available.");
    }
  };

  return (
    <div className="my-6">
      <h1 className="text-2xl font-semibold tracking-tight mb-4">
        Favourite Cities
      </h1>
      <ScrollArea className="w-full pb-4">
        <div className="flex flex-wrap gap-4">
          {favourite.map((city) => (
            <FavouriteCityTablet
              key={city.id}
              id={city.id}
              name={city.name}
              lat={city.lat}
              lon={city.lon}
              onRemove={handleRemove}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

function FavouriteCityTablet({
  id,
  name,
  lat,
  lon,
  onRemove,
}: FavouriteCityTabletProps) {
  const navigate = useNavigate();
  const { data: weather, isLoading, error } = useWeatherQuery({ lat, lon });

  return (
    <div
      onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
      role="button"
      tabIndex={0}
      className="relative flex flex-col items-start justify-between p-4 w-64 h-36 rounded-md border border-zinc-200 bg-white shadow-sm hover:shadow-md hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 cursor-pointer transition-transform transform hover:-translate-y-1"
    >
      <Button
        onClick={(e) => {
          e.stopPropagation(); // Prevent click propagation to parent
          onRemove(id);
        }}
        className="absolute top-2 right-2 h-6 w-6 rounded bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700"
      >
        <XIcon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
      </Button>
      <h2 className="text-lg font-medium text-zinc-800 dark:text-zinc-50">
        {name}
      </h2>
      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        {lat.toFixed(2)}, {lon.toFixed(2)}
      </div>
      {isLoading ? (
        <div className="mt-2 flex items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="ml-2">Loading weather...</span>
        </div>
      ) : error ? (
        <div className="mt-2 text-sm text-red-500 dark:text-red-400">
          Failed to fetch weather
        </div>
      ) : weather ? (
        <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          {weather.main.temp}°C, feels like {weather.main.feels_like}°C
        </div>
      ) : (
        <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Weather unavailable
        </div>
      )}
    </div>
  );
}

export default FavouriteCities;
