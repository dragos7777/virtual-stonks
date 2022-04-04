import { Route, Routes, useNavigate } from "react-router-dom";
import MyStonks from "./pages/MyStonks";
import SearchPage from "./pages/SearchPage";
import StockPage from "./pages/StockPage";
import WelcomePage from "./pages/WelcomePage";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Ticker from "./components/Ticker";

function App() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.stonks.token);
  useEffect(() => {
    if (!token) {
      navigate("/virtual-stonks");
    }
  }, [token, navigate]);

  return (
    <>
      <main>
        <Routes>
          <Route path="/virtual-stonks" element={<WelcomePage />} />
          <Route path="/virtual-stonks/my-stonks" element={<MyStonks />} />
          <Route path="/virtual-stonks/search" element={<SearchPage />} />
          <Route
            path="/virtual-stonks/search/:stockSymbol"
            element={<StockPage />}
          ></Route>
        </Routes>
        <Ticker />
      </main>
    </>
  );
}

export default App;
