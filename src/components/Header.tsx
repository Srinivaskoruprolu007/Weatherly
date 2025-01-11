import logo from "../assets/Weatherly.png";
import { Link } from "react-router-dom";

import { ModeToggle } from "./mode-toggle";
const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full dark:bg-gray-800">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"}>
          <img src={logo} alt="Climate logo" className="h-14" />
        </Link>
        <div>
          {/* search */}
          {/* theme toggle */}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
