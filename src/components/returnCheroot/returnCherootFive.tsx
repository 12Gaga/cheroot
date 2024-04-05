import { Box, Typography, TextField } from "@mui/material";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReturnCherootFive = () => {
  const [selecteddate, setSelectedDate] = useState<any>(new Date());
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            ခုနှိမ်ကြိုယူငွေ(အကြီး)
          </Typography>
          <TextField
            placeholder="ခုနှိမ်ကြိုယူငွေ(အကြီး)"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            ခုနှိမ်ကြိုယူငွေ(အသေး)
          </Typography>
          <TextField
            placeholder="ခုနှိမ်ကြိုယူငွေ(အသေး)"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>ယူသောပိဿာ</Typography>
          <TextField
            placeholder="ယူသောပိဿာ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>ကျန်ပိဿာ</Typography>
          <TextField
            placeholder="ကျန်ပိဿာ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box
          sx={{
            width: 250,
            mt: 4,
            bgcolor: "#F7A71B",
            py: 2,
            borderRadius: 3,
          }}
        >
          <Box sx={{ display: "flex", ml: 2 }}>
            <Typography sx={{ mr: 2 }}>ရက်စွဲ</Typography>
            <DatePicker
              selected={selecteddate}
              onChange={(date) => setSelectedDate(date)}
            />
          </Box>
          <Box sx={{ width: 250, mt: 1, ml: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              အခြားခုနှိမ်ခြင်း
            </Typography>
            <TextField
              placeholder="အခြားခုနှိမ်ခြင်း"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={() => {}}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ReturnCherootFive;
