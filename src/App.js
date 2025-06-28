import Homepage from "./Pages/HomePage";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoinPage from "./Pages/CoinPage";
import Header from "./Components/Header";
import { Box } from "@mui/material";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const cursor = document.getElementById("gold-cursor");

    const moveCursor = (e) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    const handleClick = () => {
      cursor.classList.add("clicking");
      setTimeout(() => cursor.classList.remove("clicking"), 150);
    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="gold-cursor-wrapper">
        <div id="gold-cursor" />
        <Box
          sx={{
            backgroundColor: "#14161a",
            color: "white",
            minHeight: "100vh",
            cursor: "none",
          }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/coins/:id" element={<CoinPage />} />
          </Routes>
        </Box>
      </div>
    </BrowserRouter>
  );
}

export default App;