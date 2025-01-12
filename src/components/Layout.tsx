import { PropsWithChildren } from "react";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-8 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto text-center px-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Made with ❤️ by <span className="font-semibold">Srinivas</span>
          </p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} Weatherly. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
