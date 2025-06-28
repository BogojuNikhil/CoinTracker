import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../Api/api";
import { Line } from "react-chartjs-2";
import {
  CircularProgress,
  createTheme,
  ThemeProvider,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { chartDays } from "../Api/data";
import SelectButton from "./SelectButton";
import { CryptoState } from "../createContext";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(true);
  const { currency } = CryptoState();

  useEffect(() => {
    const fetchHistoricData = async () => {
      setLoading(true);
      const { data } = await axios.get(
        HistoricalChart(coin.id, days, currency)
      );
      setHistoricData(data.prices);
      setLoading(false);
    };

    fetchHistoricData();
  }, [days, coin.id, currency]);

  const darkTheme = createTheme({ palette: { mode: "dark" } });

  const chartData = {
    labels: historicData.map((entry) => entry[0]),
    datasets: [
      {
        data: historicData.map((entry) => entry[1]),
        label: `Price (Past ${days} Days) in ${currency}`,
        borderColor: "#EEBC1D",
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    elements: {
      point: { radius: 1 },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: days === 1 ? "hour" : "day",
          tooltipFormat: "PPp",
        },
        ticks: {
          color: "#ccc",
        },
      },
      y: {
        ticks: {
          color: "#ccc",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#eee",
        },
      },
    },
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "flex-end" },
          pr: { xs: 0, md: 4 },
          pl: { xs: 0, md: 2 },
          pt: 4,
          pb: 6,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: 1200,
            backgroundColor: "#1e1e1e",
            p: { xs: 2, md: 4 },
            borderRadius: 4,
            boxShadow: "0 0 15px rgba(255, 215, 0, 0.2)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#f5f5f5",
              fontFamily: "Montserrat",
              mb: 3,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {coin.name} Price Chart
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress sx={{ color: "gold" }} size={180} thickness={1.2} />
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  width: "100%",
                  minWidth: 600,
                  height: 300,
                  alignSelf: "stretch",
                }}
              >
                <Line data={chartData} options={chartOptions} />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  mt: 4,
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                {chartDays.map((day) => (
                  <SelectButton
                    key={day.value}
                    onClick={() => setDays(day.value)}
                    selected={day.value === days}
                  >
                    {day.label}
                  </SelectButton>
                ))}
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default CoinInfo;