import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState } from "react";

const LabelExtra = () => {
  const [selectedLabel, setSelectedLabel] = useState<number>(1);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: 250, mt: 2 }}>
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
              <MenuItem value={1}>၅ ၁/၄ (ငါးတမတ်)</MenuItem>
              <MenuItem value={2}>၅ (၄ဝါ)</MenuItem>
              <MenuItem value={3}>၄ ၁/၂ (၂လိပ်ဝါ)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>လိပ်</Typography>
          <TextField
            placeholder="လိပ်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ဈေးနှုန်း</Typography>
          <TextField
            placeholder="ဈေးနှုန်း"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ကျသင့်ငွေ</Typography>
          <TextField
            placeholder="ကျသင့်ငွေ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box
          sx={{
            width: 230,
            mt: 2,
            p: 2,
            bgcolor: "#F7A71B",
            borderRadius: 5,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            စုစုပေါင်းကျသင့်ငွေ
          </Typography>
          <TextField sx={{ bgcolor: "#EEE8CF" }} onChange={() => {}} />
        </Box>
      </Box>
    </>
  );
};
export default LabelExtra;
