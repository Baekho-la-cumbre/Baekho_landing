import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./core/router/AppRouter";
import ScrollToTop from "./shared/components/ScrollToTop";
import LoadingScreen from "./shared/components/LoadingScreen";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LoadingScreen />
      <ScrollToTop />
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
