import {
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState } from "react";

const AgentThree = () => {
  const [selectedLeaf, setSelectedLeaf] = useState<number>(1);

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
          လက်ကျန်ဖက်ပိဿာ
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
                <MenuItem value={1}>၅ ၁/၄ (ငါးတမတ်)</MenuItem>
                <MenuItem value={2}>၅ (၄ဝါ)</MenuItem>
                <MenuItem value={3}>၄ ၁/၂ (၂လိပ်ဝါ)</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ width: 300, mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဖက်ပိဿာ</Typography>
            <TextField
              placeholder="ဖက်ပိဿာ"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={() => {}}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default AgentThree;
