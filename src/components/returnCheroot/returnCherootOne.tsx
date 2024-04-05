import {
  Typography,
  TextField,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
const ReturnCherootOne = () => {
  const [selectedCheroot, setSelectedCheroot] = useState<number>(1);
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
          <Typography sx={{ fontWeight: "bold" }}>စဉ်</Typography>
          <TextField
            placeholder="စဉ်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

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
              <MenuItem value={1}>၅ ၁/၄ (ငါးတမတ်)</MenuItem>
              <MenuItem value={2}>၅ (၄ဝါ)</MenuItem>
              <MenuItem value={3}>၄ ၁/၂ (၂လိပ်ဝါ)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>အချောဆေးလိပ်</Typography>
          <TextField
            placeholder="အချောဆေးလိပ်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>အကျဆေးလိပ်</Typography>
          <TextField
            placeholder="အကျဆေးလိပ်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
      </Box>
    </>
  );
};
export default ReturnCherootOne;
