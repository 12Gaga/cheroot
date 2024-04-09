import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import AdminLayout from "@/components/adminLayout";
import { Typography, Box, TextField } from "@mui/material";
import { useState } from "react";
import ClosingData from "@/components/money/closing";
const Closing = () => {
  const [selecteddate, setSelectedDate] = useState<any>(new Date());
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          စာရင်းပိတ်ခြင်း
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mr: 2,
          }}
        >
          <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
          <DatePicker
            selected={selecteddate}
            onChange={(date) => setSelectedDate(date)}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>လက်ကျန်ငွေ</Typography>
            <TextField
              placeholder="လက်ကျန်ငွေ"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={() => {}}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဖြည့်တင်းငွေ</Typography>
            <TextField
              placeholder="ဖြည့်တင်းငွေ"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={() => {}}
            />
          </Box>
        </Box>
        <ClosingData />
      </AdminLayout>
    </>
  );
};
export default Closing;
