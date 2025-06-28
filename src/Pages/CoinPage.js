import {
  Box,
  Container,
  Typography,
  LinearProgress,
  createTheme,
  ThemeProvider,
  keyframes,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import CoinInfo from "../Components/CoinInfo";
import { SingleCoin } from "../Api/api";
import { numberWithCommas } from "../Components/CoinsTable";
import { CryptoState } from "../createContext";

// ✨ Pulse keyframe for coin image
const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.85; }
  100% { transform: scale(1); opacity: 1; }
`;

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const { currency, symbol } = CryptoState();

  useEffect(() => {
    const fetchCoin = async () => {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    };
    fetchCoin();
  }, [id]);

  const theme = createTheme({
    palette: { mode: "dark" },
  });

  if (!coin) return <LinearProgress sx={{ backgroundColor: "gold" }} />;

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
          mt: 4,
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            width: { xs: "100%", md: "30%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRight: { md: "2px solid grey" },
            pb: 4,
          }}
        >
          <Box
            component="img"
            src={coin?.image.large}
            alt={coin?.name}
            sx={{
              height: 200,
              mb: 2,
              animation: `${pulse} 2s infinite`,
            }}
          />

          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", mb: 2, fontFamily: "Montserrat" }}
          >
            {coin?.name}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: "Montserrat",
              textAlign: "justify",
              px: 3,
              mb: 2,
            }}
          >
            {parse(coin?.description?.en.split(". ")[0])}.
          </Typography>

          <Box
            sx={{
              alignSelf: "start",
              px: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
              mt: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mr: 2 }}>
                Rank:
              </Typography>
              <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
                {numberWithCommas(coin?.market_cap_rank)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mr: 2 }}>
                Current Price:
              </Typography>
              <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mr: 2 }}>
                Market Cap:
              </Typography>
              <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}{" "}
                M
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Chart section */}
        <Box sx={{ width: { xs: "100%", md: "70%" }, px: 2 }}>
          <CoinInfo coin={coin} />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CoinPage;