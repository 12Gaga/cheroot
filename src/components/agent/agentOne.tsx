import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const AgentOne = () => {
  return (
    <>
      <Box>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: "bold",
            bgcolor: "#FCB500",
            width: 270,
            p: 1,
            borderTopRightRadius: 40,
            borderBottomRightRadius: 40,
          }}
        >
          ကိုယ်စားလှယ်အကြောင်းအရာ
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
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={() => {}}
            />
          </Box>
          <Box sx={{ width: 300, mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>နေရပ်လိပ်စာ</Typography>
            <TextField
              placeholder="နေရပ်လိပ်စာ"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={() => {}}
            />
          </Box>

          <Box sx={{ width: 300, mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဖုန်းနံပါတ်</Typography>
            <TextField
              placeholder="ဖုန်းနံပါတ်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={() => {}}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default AgentOne;
