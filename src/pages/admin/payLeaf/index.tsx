import PayLeafFive from "@/components/payleaf/payLeafFive";
import PayLeafFour from "@/components/payleaf/payLeafFour";
import PayLeafOne from "@/components/payleaf/payLeafOne";
import PayLeafThree from "@/components/payleaf/payLeafThree";
import PayLeafTwo from "@/components/payleaf/payLeafTwo";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import PayLeafButton from "@/components/payleaf/payLeafButton";

const PayLeaf = () => {
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
          ဆေးလိပ်ကိုယ်စားလှယ်ဖက်ထုတ်ပေးစာရင်း
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 5, mt: 2 }}>
        <Typography sx={{ mr: 2 }}>ရက်စွဲ</Typography>
        <DatePicker
          selected={selecteddate}
          onChange={(date) => setSelectedDate(date)}
        />
      </Box>

      <Box sx={{ display: "flex", mt: 2 }}>
        <Box
          sx={{
            width: "75%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <PayLeafOne />
          <PayLeafTwo />
        </Box>

        <Box
          sx={{
            width: "25%",
            bgcolor: "#FFD0C7",
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            py: 2,
          }}
        >
          <PayLeafThree />
        </Box>
      </Box>

      <Box sx={{ display: "flex" }}>
        <PayLeafFour />
      </Box>
      <Box sx={{ display: "flex" }}>
        <PayLeafFive />
      </Box>

      <PayLeafButton />
    </>
  );
};
export default PayLeaf;
