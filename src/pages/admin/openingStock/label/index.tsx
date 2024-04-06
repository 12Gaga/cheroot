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
import LabelButtonOpen from "@/components/openingSt/labelButton";

const FilterSize = () => {
  const [selecteddate, setSelectedDate] = useState<any>(new Date());
  const [selectedLabel, setSelectedLabel] = useState<number>(1);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          တံဆိပ် (လိပ်)
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
              တံဆိပ်အမျိုးအစား
            </Typography>
            <FormControl variant="filled" sx={{ width: 350 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={selectedLabel}
                onChange={(evt) => {
                  setSelectedLabel(Number(evt.target.value));
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                <MenuItem value={1}>တောင်ကြီး</MenuItem>
                <MenuItem value={2}>ခဲမဲ</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{}}>
            <Typography sx={{ fontWeight: "bold" }}>လိပ်</Typography>
            <TextField
              placeholder="လိပ်"
              sx={{ bgcolor: "#EEE8CF", width: 350 }}
              onChange={() => {}}
            />
          </Box>
        </Box>
        <LabelButtonOpen />
      </AdminLayout>
    </>
  );
};
export default FilterSize;