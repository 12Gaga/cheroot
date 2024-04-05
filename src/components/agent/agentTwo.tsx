import { Typography, Box, TextField } from "@mui/material";

const AgentTwo = () => {
  return (
    <>
      <Box>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: "bold",
            bgcolor: "#FCB500",
            width: 200,
            p: 1,
            borderTopRightRadius: 40,
            borderBottomRightRadius: 40,
          }}
        >
          လက်ကျန်ငွေ
        </Typography>
        <Box
          sx={{
            display: "flex",
            ml: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ width: 300, mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              လက်ကျန်ငွေ(အကြီး)
            </Typography>
            <TextField
              placeholder="လက်ကျန်ငွေ(အကြီး)"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={() => {}}
            />
          </Box>
          <Box sx={{ width: 300, mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              လက်ကျန်ငွေ(အသေး)
            </Typography>
            <TextField
              placeholder="လက်ကျန်ငွေ(အသေး)"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={() => {}}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default AgentTwo;
