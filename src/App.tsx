import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
          Hello
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
