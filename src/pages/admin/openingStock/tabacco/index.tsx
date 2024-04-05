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
import TabaccoButtonOpen from "@/components/openingSt/tabaccoButton";
const Tabacco = () => {
  const [selecteddate, setSelectedDate] = useState<any>(new Date());
  const [selectedTabacco, setSelectedTabacco] = useState<number>(1);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ဆေးစပ် (တင်း/ပြည်)
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
            <Typography sx={{ fontWeight: "bold" }}>
              ဆေးစပ်အမျိုးအစား
            </Typography>
            <FormControl variant="filled" sx={{ width: 350 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={selectedTabacco}
                onChange={(evt) => {
                  setSelectedTabacco(Number(evt.target.value));
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                <MenuItem value={1}>အပြင်း</MenuItem>
                <MenuItem value={2}>အပျော့</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{}}>
            <Typography sx={{ fontWeight: "bold" }}>တင်း</Typography>
            <TextField
              placeholder="တင်း"
              sx={{ bgcolor: "#EEE8CF", width: 350 }}
              onChange={() => {}}
            />
          </Box>

          <Box sx={{}}>
            <Typography sx={{ fontWeight: "bold" }}>ပြည်</Typography>
            <TextField
              placeholder="ပြည်"
              sx={{ bgcolor: "#EEE8CF", width: 350 }}
              onChange={() => {}}
            />
          </Box>

          <Box sx={{}}>
            <Typography sx={{ fontWeight: "bold" }}>အိတ်</Typography>
            <TextField
              placeholder="အိတ်"
              sx={{ bgcolor: "#EEE8CF", width: 350 }}
              onChange={() => {}}
            />
          </Box>
        </Box>
        <TabaccoButtonOpen />
      </AdminLayout>
    </>
  );
};
export default Tabacco;
