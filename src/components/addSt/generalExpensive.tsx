import { Box, Typography, TextField } from "@mui/material";

const GeneralExpensive = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          mt: 2,
          gap: 2,
        }}
      >
        <Box sx={{ mt: 2, width: 150 }}>
          <Typography sx={{ fontWeight: "bold" }}>ဘောက်ချာနံပါတ်</Typography>
          <TextField
            placeholder="ဘောက်ချာနံပါတ်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ mt: 2, width: 150 }}>
          <Typography sx={{ fontWeight: "bold" }}>ကားနံပါတ်</Typography>
          <TextField
            placeholder="ကားနံပါတ်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ mt: 2, width: 150 }}>
          <Typography sx={{ fontWeight: "bold" }}>ဝယ်ယူခဲ့သည့်ဆိုင်</Typography>
          <TextField
            placeholder="ဝယ်ယူခဲ့သည့်ဆိုင်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
      </Box>
    </>
  );
};
export default GeneralExpensive;
