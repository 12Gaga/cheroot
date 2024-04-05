import { Box, Typography, TextField } from "@mui/material";

const ReturnCherootSix = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "60%",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            ကိုယ်စားလှယ်ရှင်းငွေ{" "}
          </Typography>
          <TextField
            placeholder="ကိုယ်စားလှယ်ရှင်းငွေ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>ကြိုယူငွေ(အကြီး)</Typography>
          <TextField
            placeholder="ကြိုယူငွေ(အကြီး)"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>ကြိုယူငွေ(အသေး)</Typography>
          <TextField
            placeholder="ကြိုယူငွေ(အသေး)"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
      </Box>
    </>
  );
};
export default ReturnCherootSix;
