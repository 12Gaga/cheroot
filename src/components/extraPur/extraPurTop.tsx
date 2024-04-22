import { Box, Typography, FormControl, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ExtraPurTop = () => {
  const [selecteddate, setSelectedDate] = useState<any>(new Date());
  const [selectedName, setSelectedName] = useState<number>(1);
  const [selectedGarage, setSelectedGarage] = useState<number>(1);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 400,
            mt: 2,
            ml: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "bold", mr: 2 }}>
            ကိုယ်စားလှယ်အမည်
          </Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={selectedName}
              onChange={(evt) => {
                setSelectedName(Number(evt.target.value));
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              <MenuItem value={1}>Su Su</MenuItem>
              <MenuItem value={2}>Nyi Nyi</MenuItem>
              <MenuItem value={3}>Ma Ma</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", width: 120 }}>
            ဂိုထောင်အမည်
          </Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={selectedGarage}
              onChange={(evt) => {
                setSelectedGarage(Number(evt.target.value));
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              <MenuItem value={1}>ဂိုထောင် ၁</MenuItem>
              <MenuItem value={2}>ဂိုထောင် ၂</MenuItem>
              <MenuItem value={3}>ဂိုထောင် ၃</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 5, mt: 2 }}>
          <Typography sx={{ mr: 2 }}>ရက်စွဲ</Typography>
          <DatePicker
            selected={selecteddate}
            onChange={(date) => setSelectedDate(date)}
          />
        </Box>
      </Box>
    </>
  );
};
export default ExtraPurTop;
