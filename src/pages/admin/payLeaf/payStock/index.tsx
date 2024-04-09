import PayLeafFive from "@/components/payleaf/payLeafFive";
import PayLeafFour from "@/components/payleaf/payLeafFour";
import { Box, Typography } from "@mui/material";
import PayStockButton from "@/components/payleaf/payStockButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
const PayStock = () => {
  const [selecteddate, setSelectedDate] = useState<any>(new Date());
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
