import { Box, Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

function Banner() {
  return (
    <Box
      sx={{
        backgroundImage: "url(./banner2.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        sx={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          pt: 2,
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 1,
              fontFamily: "Montserrat",
            }}
          >
           CoinTracker
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgrey-600",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </Box>

        <Box
          sx={{
            height: "50%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Carousel />
        </Box>
      </Container>
    </Box>
  );
}

export default Banner;