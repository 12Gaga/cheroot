import { Typography, TextField, Box } from "@mui/material";

const ReturnCherootTwo = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>စုစုပေါင်းဆေးလိပ်</Typography>
          <TextField
            placeholder="စုစုပေါင်းဆေးလိပ်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>အချောနှုန်း</Typography>
          <TextField
            placeholder="အချောနှုန်း"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>သင့်ငွေ</Typography>
          <TextField
            placeholder="သင့်ငွေ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            ဆေးလိပ်စုစုပေါင်းသင့်ငွေ
          </Typography>
          <TextField
            placeholder="ဆေးလိပ်စုစုပေါင်းသင့်ငွေ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
      </Box>
    </>
  );
};
export default ReturnCherootTwo;
