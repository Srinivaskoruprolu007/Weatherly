import logo from "../assets/Weatherly.png";
import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import CitySearch from "./CitySearch";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center transition-opacity hover:opacity-80"
        >
          <img
            src={logo}
            alt="Weatherly logo"
            className="h-10 w-auto object-contain"
          />
          <span className="ml-2 text-xl font-bold text-foreground">
            Weatherly
          </span>
        </Link>

        {/* Navigation & Search */}
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <CitySearch />
          </nav>

          {/* Theme Toggle */}
          <div className="flex items-center gap-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
