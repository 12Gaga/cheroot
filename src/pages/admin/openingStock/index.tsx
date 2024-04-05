import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
import AdminLayout from "@/components/adminLayout";
import LeafButtonOpen from "@/components/openingSt/leafButton";
const OpeningStock = () => {
  const [selecteddate, setSelectedDate] = useState<any>(new Date());
  const [selectedLeaf, setSelectedLeaf] = useState<number>(1);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ပိုနံပါတ်
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
          <DatePicker
            selected={selecteddate}
            onChange={(date) => setSelectedDate(date)}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 4,
          }}
        >
          <Box sx={{}}>
            <Typography sx={{ fontWeight: "bold" }}>
              ဝယ်ယူခဲ့သည့်ဆိုင်အမည်
            </Typography>
            <TextField
              placeholder="ဝယ်ယူခဲ့သည့်ဆိုင်အမည်"
              sx={{ bgcolor: "#EEE8CF", width: 350 }}
              onChange={() => {}}
            />
          </Box>

          <Box sx={{}}>
            <Typography sx={{ fontWeight: "bold" }}>ဖက်အမျိုးအစား</Typography>
            <FormControl variant="filled" sx={{ width: 350 }}>
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

          <Box sx={{}}>
            <Typography sx={{ fontWeight: "bold" }}>ပိုနံပါတ်</Typography>
            <TextField
              placeholder="ပိုနံပါတ်"
              sx={{ bgcolor: "#EEE8CF", width: 350 }}
              onChange={() => {}}
            />
          </Box>

          <Box sx={{}}>
            <Typography sx={{ fontWeight: "bold" }}>ပိဿာ</Typography>
            <TextField
              placeholder="ပိဿာ"
              sx={{ bgcolor: "#EEE8CF", width: 350 }}
              onChange={() => {}}
            />
          </Box>
        </Box>
        <LeafButtonOpen />
      </AdminLayout>
    </>
  );
};
export default OpeningStock;
