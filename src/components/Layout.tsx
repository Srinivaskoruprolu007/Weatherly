import { PropsWithChildren } from "react";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="dark:bg-gray-800">
      <Header />
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t  py-12 ">
        <div className="container mx-auto text-center px-4 text-gray-400">
          <p>Made with ❤️ by Srinivas</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;