import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-location-storage";
import { useMutation } from "@tanstack/react-query";

interface FavouriteItem {
  id: string;
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
  addedAt: number;
}
export function useFavourite() {
  const [favourite, setFavourite] = useLocalStorage<FavouriteItem[]>(
    "favourites",
    []
  );

  const queryClient = useQueryClient();
  const favouriteQuery = useQuery({
    queryKey: ["favourites"],
    queryFn: () => favourite,
    initialData: favourite,
    staleTime: Infinity,
  });

  const addToFavourite = useMutation({
    mutationFn: async (city: Omit<FavouriteItem, "id" | "addedAt">) => {
      const newFavourite: FavouriteItem = {
        ...city,
        id: `${city.lat}-${city.lon}`,
        addedAt: Date.now(),
      };

      const exists = favourite.some((fav) => fav.id === newFavourite.id);
      if (exists) {
        return favourite;
      }

      const newFavourites = [...favourite, newFavourite].slice(0, 10);
      setFavourite(newFavourites);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favourites"],
      });
    },
  });

  const removeFromFavourite = useMutation({
    mutationFn: async (cityId: string) => {
      const newFavourite = favourite.filter((city) => city.id !== cityId);
      setFavourite(newFavourite);
      return newFavourite;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favourites"],
      });
    },
  });

  return {
    favourite: favouriteQuery.data || [],
    addToFavourite,
    removeFromFavourite,
    isFavourite: (lat: number, lon: number) => {
      return favourite.some((city) => city.lat === lat && city.lon === lon);
    },
  } as const;
}
