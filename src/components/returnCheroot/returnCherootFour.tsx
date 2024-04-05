import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState } from "react";

const ReturnCherootFour = () => {
  const [selectedLeaf, setSelectedLeaf] = useState<number>(1);
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
          <Typography sx={{ fontWeight: "bold" }}>ဖက်အမျိုးအစား</Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={selectedLeaf}
              onChange={(evt) => {
                setSelectedLeaf(Number(evt.target.value));
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
          <Typography sx={{ fontWeight: "bold" }}>ခုနှိမ်ပိဿာ</Typography>
          <TextField
            placeholder="ခုနှိမ်ပိဿာ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>နှုန်း</Typography>
          <TextField
            placeholder="နှုန်း"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ခုနှိမ်ငွေ</Typography>
          <TextField
            placeholder="ခုနှိမ်ငွေ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            ဖက်ဖိုးခုနှိမ်ငွေပေါင်း
          </Typography>
          <TextField
            placeholder="ဖက်ဖိုးခုနှိမ်ငွေပေါင်း"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
      </Box>
    </>
  );
};
export default ReturnCherootFour;
