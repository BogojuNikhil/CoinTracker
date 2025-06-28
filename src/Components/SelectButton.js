import { Box } from "@mui/material";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        border: "1px solid gold",
        borderRadius: 1,
        px: 2.5,
        py: 1,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "transparent",
        color: selected ? "black" : "white",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
          backgroundColor: "gold",
          color: "black",
        },
        width: "22%",
        textAlign: "center",
        transition: "0.3s ease",
        userSelect: "none",
      }}
    >
      {children}
    </Box>
  );
};

export default SelectButton;