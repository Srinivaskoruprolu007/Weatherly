import logo from "../assets/Weatherly.png";
import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link 
          to="/"
          className="flex items-center transition-opacity hover:opacity-90"
        >
          <img 
            src={logo} 
            alt="Weatherly logo" 
            className="h-12 w-auto object-contain" 
          />
        </Link>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link 
              to="/forecast" 
              className="transition-colors hover:text-foreground"
            >
              Forecast
            </Link>
            <Link 
              to="/maps" 
              className="transition-colors hover:text-foreground"
            >
              Weather Maps
            </Link>
            <Link 
              to="/alerts" 
              className="transition-colors hover:text-foreground"
            >
              Alerts
            </Link>
          </nav>
          
          <div className="flex items-center gap-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;