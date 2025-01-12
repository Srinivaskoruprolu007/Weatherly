import { WeatherData } from "@/api/types";
import { useFavourite } from "@/hooks/use-favourites";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface FavouriteButtonProps {
  data: WeatherData;
}

const FavouriteButton = ({ data }: FavouriteButtonProps) => {
  const { addToFavourite, isFavourite, removeFromFavourite } = useFavourite();
  const isCurrentlyFavourite = isFavourite(data.coord.lat, data.coord.lon);
  const handleToggleFavourite = () => {
    if (isCurrentlyFavourite) {
      removeFromFavourite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from favourites`);
    } else {
      addToFavourite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to favourites`);
    }
  };
  return (
    <Button
      variant={isCurrentlyFavourite ? "ghost" : "ghost"}
      size={"icon"}
      className={
        isCurrentlyFavourite
          ? "dark:text-zinc-50 bg-yellow-400 hover:bg-yellow-600 "
          : "dark:text-zinc-50"
      }
      onClick={handleToggleFavourite}
    >
      <Star
        className={`w-5 h-5 ${isCurrentlyFavourite ? "fill-current" : ""}`}
      />
    </Button>
  );
};

export default FavouriteButton;
