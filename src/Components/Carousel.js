import { Box } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../Api/api";
import { CryptoState } from "../createContext";
import { numberWithCommas } from "./CoinsTable";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = useCallback(async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  }, [currency]);

  useEffect(() => {
    fetchTrendingCoins();
  }, [fetchTrendingCoins]);

  const items = trending.map((coin) => {
    const profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link
        to={`/coins/${coin.id}`}
        key={coin.id}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textDecoration: "none",
          color: "white",
          textTransform: "uppercase",
          minWidth: 120,
          padding: "8px",
          borderRadius: "10px",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 0 15px rgba(255,215,0,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{
            marginBottom: 10,
            transition: "transform 0.3s ease",
          }}
        />
        <span>
          {coin?.symbol}&nbsp;
          <span
            style={{
              color: profit ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 2,
      }}
    >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlay
        autoPlayInterval={1500}
        animationDuration={1200}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
      />
    </Box>
  );
};

export default Carousel;