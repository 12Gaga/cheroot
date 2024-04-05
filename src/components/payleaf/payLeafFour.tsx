import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Box,
} from "@mui/material";
import { useState } from "react";

const PayLeafFour = () => {
  const [selectedCheroot, setSelectedCheroot] = useState<number>(1);
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
        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ဆေးလိပ်အမျိုးအစား</Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={selectedCheroot}
              onChange={(evt) => {
                setSelectedCheroot(Number(evt.target.value));
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              <MenuItem value={1}>၅ ၁/၂ (ရှယ်)</MenuItem>
              <MenuItem value={2}>၄ ၁/၂ (တုတ်)</MenuItem>
              <MenuItem value={3}>၅</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
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
          width: "37.25%",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ဆေးစပ်အမျိုးအစား</Typography>
          <TextField
            placeholder="ဆေးစပ်အမျိုးအစား"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
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
        <Box sx={{ width: 170, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>တင်း</Typography>
          <TextField
            placeholder="တင်း"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
        <Box sx={{ width: 170, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ပြည်</Typography>
          <TextField
            placeholder="ပြည်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
      </Box>
    </>
  );
};
export default PayLeafFour;
