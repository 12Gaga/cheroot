import { Box, Button } from "@mui/material";
const AgentButton = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: "#D83E3E",
            width: 220,
            height: 50,
            fontSize: 18,
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 30,
            "&:hover": {
              bgcolor: "#F7A71B",
              color: "white",
              fontWeight: "bold",
            },
          }}
        >
          သိမ်းမည်
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#D83E3E",
            width: 220,
            height: 50,
            fontSize: 18,
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 30,
            "&:hover": {
              bgcolor: "#F7A71B",
              color: "white",
              fontWeight: "bold",
            },
          }}
        >
          ရှာမည်
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#D83E3E",
            width: 220,
            height: 50,
            fontSize: 18,
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 30,
            "&:hover": {
              bgcolor: "#F7A71B",
              color: "white",
              fontWeight: "bold",
            },
          }}
        >
          ပြင်မည်
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#D83E3E",
            width: 220,
            height: 50,
            fontSize: 18,
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 30,
            "&:hover": {
              bgcolor: "#F7A71B",
              color: "white",
              fontWeight: "bold",
            },
          }}
        >
          ဖျက်မည်
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#D83E3E",
            width: 220,
            height: 50,
            fontSize: 18,
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 30,
            "&:hover": {
              bgcolor: "#F7A71B",
              color: "white",
              fontWeight: "bold",
            },
          }}
        >
          ထွက်မည်
        </Button>
      </Box>
    </>
  );
};
export default AgentButton;
