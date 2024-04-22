import PayLeafFive from "@/components/payleaf/payLeafFive";
import PayLeafFour from "@/components/payleaf/payLeafFour";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import PayStockButton from "@/components/payleaf/payStockButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useSession } from "next-auth/react";
const PayStock = () => {
  const [selecteddate, setSelectedDate] = useState<any>(new Date());
  const [selectedAgent, setSelectedAgent] = useState<number>(1);
  const [selectedGarage, setSelectedGarage] = useState<number>(1);
  const { data: session } = useSession();
  if (!session) return;
  return (
    <>
      <Box
        sx={{
          bgcolor: "#FCB500",
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
          ပစ္စည်းထုပ်ပေးစာရင်း
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 5, mt: 2 }}>
        <Typography sx={{ mr: 2 }}>ရက်စွဲ</Typography>
        <DatePicker
          selected={selecteddate}
          onChange={(date) => setSelectedDate(date)}
        />
      </Box>

      <Box sx={{ display: "flex", width: "100%", my: 3, ml: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
          <Typography sx={{ fontWeight: "bold", width: 150 }}>
            ကိုယ်စားလှယ်အမည်
          </Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={selectedAgent}
              onChange={(evt) => {
                setSelectedAgent(Number(evt.target.value));
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              <MenuItem value={1}>မောင်မောင်</MenuItem>
              <MenuItem value={2}>လှလှ</MenuItem>
              <MenuItem value={3}>စုစု</MenuItem>
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
      </Box>

      <Box sx={{ display: "flex" }}>
        <PayLeafFour />
      </Box>
      <Box sx={{ display: "flex" }}>
        <PayLeafFive />
      </Box>
      <PayStockButton />
    </>
  );
};
export default PayStock;
