import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../createContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#fff" },
  },
});

function Header() {
  const { currency, setCurrency } = CryptoState();
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar
        position="static"
        sx={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          boxShadow: "0 4px 20px rgba(255, 215, 0, 0.1)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Container>
          <Toolbar>
            <Typography
              variant="h5"
              onClick={() => navigate("/")}
              sx={{
                flex: 1,
                fontFamily: "Montserrat",
                fontWeight: 700,
                cursor: "pointer",
                color: "gold",
                letterSpacing: 1,
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "#f7e06e",
                  textShadow: "0 0 5px rgba(255, 215, 0, 0.4)",
                },
              }}
            >
              TracknCoin
            </Typography>

            <Select
              variant="outlined"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              disableUnderline
              sx={{
                width: 100,
                height: 40,
                color: "white",
                fontWeight: 500,
                fontFamily: "Montserrat",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: 2,
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                transition: "all 0.3s ease",
                "& .MuiSelect-select": {
                  padding: "10px",
                },
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 0 6px rgba(255, 215, 0, 0.3)",
                },
              }}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;