import { Box, Button } from "@mui/material";

const LeafButtonOpen = () => {
  return (
    <>
      <Box
        sx={{
          width: "80%",
          display: "flex",
          justifyContent: "space-around",
          mt: 6,
        }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: "#D83E3E",
            width: 220,
            height: 50,
            fontSize: 18,
            borderRadius: 10,
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
            borderRadius: 10,
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
            borderRadius: 10,
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
            borderRadius: 10,
            "&:hover": {
              bgcolor: "#F7A71B",
              color: "white",
              fontWeight: "bold",
            },
          }}
        >
          ဖျက်မည်
        </Button>
      </Box>
    </>
  );
};
export default LeafButtonOpen;
