import { useState } from "react";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
  CommandSeparator,
} from "./ui/command";
import { Clock, Loader2, Search, XCircle } from "lucide-react";
import { useLocationQuery } from "@/hooks/use-weather";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "@/hooks/use-search-history";

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data: location, isLoading } = useLocationQuery(query);
  const { history, addToHistory, removeFromHistory } = useSearchHistory();

  const handleSelect = (city: string) => {
    const [lat, lon, name, country] = city.split("|");
    setOpen(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="ghost"
        className="w-full justify-start text-left font-normal rounded-md border-none dark:text-zinc-50 dark:hover:bg-zinc-800"
      >
        <Search className="mr-2 h-4 w-4" />
        Search Cities...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search city..."
          value={query}
          onValueChange={setQuery}
          aria-label="Search for a city"
        />
        <CommandList>
          {/* No results */}
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No results found</CommandEmpty>
          )}

          {/* Favourites Section */}
          <CommandGroup heading="Favourites">
            <CommandItem>Bengaluru</CommandItem>
          </CommandGroup>

          {/* Search History */}
          {history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between">
                  <p>Recent Searches</p>
                  <Button
                    variant="ghost"
                    onClick={() => removeFromHistory.mutate()}
                    aria-label="Clear search history"
                  >
                    <XCircle className="h-4 w-4" />
                    Clear
                  </Button>
                </div>
                {history.map((city) => (
                  <CommandItem
                    key={city.lat + city.lon}
                    onSelect={handleSelect}
                    value={`${city.lat}| ${city.lon} | ${city.name}| ${city.country}`}
                    aria-label={`Select ${city.name}, ${city.country}`}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {city.name}
                    {city.state && (
                      <span className="text-sm text-muted-foreground">
                        , {city.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      , {city.country}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          {/* Search Results */}
          {location && location.length > 0 && (
            <CommandGroup heading="Locations">
              {isLoading ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              ) : (
                location.map((location) => (
                  <CommandItem
                    key={location.lat + location.lon}
                    onSelect={handleSelect}
                    value={`${location.lat}| ${location.lon} | ${location.name}| ${location.country}`}
                    aria-label={`Select ${location.name}, ${location.country}`}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    {location.name}
                    {location.state && (
                      <span className="text-sm text-muted-foreground">
                        , {location.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      , {location.country}
                    </span>
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
