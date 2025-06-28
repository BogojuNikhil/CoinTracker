import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CoinList } from "../Api/api";
import { CryptoState } from "../createContext";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#fff" },
    },
  });

  const fetchCoins = useCallback(async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  }, [currency]);

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  const handleSearch = () =>
    coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <ThemeProvider theme={darkTheme}>
      <Container
        sx={{
          textAlign: "center",
          px: { xs: 2, md: 4 },
          py: 4,
          backgroundColor: "#121212",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            m: 2,
            fontFamily: "Montserrat",
            fontWeight: 600,
            color: "#f5f5f5",
            letterSpacing: 1,
          }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          label="Search For a Crypto Currency..."
          variant="outlined"
          fullWidth
          sx={{
            mb: 3,
            input: { color: "#eee" },
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "& fieldset": { borderColor: "#444" },
              "&:hover fieldset": { borderColor: "#aaa" },
              "&.Mui-focused fieldset": { borderColor: "gold" },
            },
            "& label": { color: "#bbb" },
            "& label.Mui-focused": { color: "gold" },
          }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          {loading ? (
            <LinearProgress sx={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead sx={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      key={head}
                      align={head === "Coin" ? "left" : "right"}
                      sx={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, page * 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;

                    return (
                      <TableRow
                        key={row.name}
                        hover
                        onClick={() => navigate(`/coins/${row.id}`)}
                        sx={{
                          backgroundColor: "#16171a",
                          cursor: "pointer",
                          transition: "transform 0.2s ease, box-shadow 0.2s ease",
                          "&:hover": {
                            backgroundColor: "#1e1e1e",
                            transform: "scale(1.02)",
                            boxShadow: "0 0 10px rgba(255,215,0,0.15)",
                          },
                          fontFamily: "Montserrat",
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ display: "flex", gap: 2 }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{
                              marginBottom: 10,
                              transition: "transform 0.3s ease",
                            }}
                          />
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 18,
                                fontWeight: 600,
                                color: "#fff",
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>{row.name}</span>
                          </div>
                        </TableCell>

                        <TableCell
                          align="right"
                          sx={{
                            color: "#ccc",
                            fontFamily: "Montserrat",
                            fontSize: 15,
                          }}
                        >
                          {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        <TableCell
                          align="right"
                          sx={{
                            color: profit ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                            fontSize: 15,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        <TableCell
                          align="right"
                          sx={{
                            color: "#ccc",
                            fontFamily: "Montserrat",
                            fontSize: 15,
                          }}
                        >
                          {symbol}{" "}
                          {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          count={Math.ceil(handleSearch().length / 10)}
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "center",
            "& .MuiPaginationItem-root": {
              color: "gold",
              borderRadius: "50%",
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.2)",
              },
            },
          }}
          onChange={(_, value) => {
            setPage(value);
            window.scrollTo({ top: 450, behavior: "smooth" });
          }}
        />
      </Container>
    </ThemeProvider>
  );
}