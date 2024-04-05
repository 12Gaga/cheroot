import {
  Typography,
  TextField,
  Box,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";

const PayLeafFive = () => {
  const [selectedLabel, setSelectedLabel] = useState<number>(1);
  return (
    <>
      <Box
        sx={{
          width: "37.25%",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>တံဆိပ်အမျိုးအစား</Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={selectedLabel}
              onChange={(evt) => {
                setSelectedLabel(Number(evt.target.value));
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              <MenuItem value={1}>ခဲမဲ</MenuItem>
              <MenuItem value={2}>တောင်ကြီး</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>လိပ်</Typography>
          <TextField
            placeholder="လိပ်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: "37.25%",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>အဆီခံအမျိုးအစား</Typography>
          <TextField
            placeholder="အဆီခံအမျိုးအစား"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>အရေအတွက်</Typography>
          <TextField
            placeholder="အရေအတွက်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: "25%",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: 170, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>အိတ်</Typography>
          <TextField
            placeholder="အိတ်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
        <Box sx={{ width: 170, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>စုစုပေါင်းငွေ</Typography>
          <TextField
            placeholder="စုစုပေါင်းငွေ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
      </Box>
    </>
  );
};
export default PayLeafFive;
