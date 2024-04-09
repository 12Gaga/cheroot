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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const PayLeafOne = () => {
  const [selecteddate, setSelectedDate] = useState<any>(new Date());
  const [selectedLeaf, setSelectedLeaf] = useState<number>(1);
  const [selectedBatchno, setSelectedBatchno] = useState<number[]>([]);
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
          <Typography sx={{ fontWeight: "bold" }}>ဝယ်ယူခဲ့သည့်ဆိုင်</Typography>
          <TextField
            placeholder="ဝယ်ယူခဲ့သည့်ဆိုင်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

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
              <MenuItem value={1}>၅ ၁/၄ (ငါးတမတ်)</MenuItem>
              <MenuItem value={2}>၅ (၄ဝါ)</MenuItem>
              <MenuItem value={3}>၄ ၁/၂ (၂လိပ်ဝါ)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ပိုနံပါတ်</Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              multiple
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={selectedBatchno}
              onChange={(evt) => {
                setSelectedBatchno([
                  ...selectedBatchno,
                  Number(evt.target.value),
                ]);
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              <MenuItem value={1}>၁</MenuItem>
              <MenuItem value={2}>၂</MenuItem>
              <MenuItem value={3}>၃</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ပိဿာ</Typography>
          <TextField
            placeholder="ပိဿာ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
      </Box>
    </>
  );
};
export default PayLeafOne;
