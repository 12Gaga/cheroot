import ReturnCherootButton from "@/components/returnCheroot/returnCherootButton";
import ReturnCherootFive from "@/components/returnCheroot/returnCherootFive";
import ReturnCherootFour from "@/components/returnCheroot/returnCherootFour";
import ReturnCherootOne from "@/components/returnCheroot/returnCherootOne";
import ReturnCherootSix from "@/components/returnCheroot/returnCherootSix";
import ReturnCherootThree from "@/components/returnCheroot/returnCherootThree";
import ReturnCherootTwo from "@/components/returnCheroot/returnCherootTwo";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReturnCheroot = () => {
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
          နေ့စဉ်ကိုယ်စားလှယ်ဆေးလိပ်အဝင်စာရင်း
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
          <ReturnCherootOne />
          <ReturnCherootTwo />
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
          <ReturnCherootThree />
        </Box>
      </Box>

      <Typography
        variant="h5"
        sx={{
          bgcolor: "#FCB500",
          color: "white",
          fontWeight: "bold",
          width: 200,
          p: 1,
          borderRadius: 3,
        }}
      >
        ဖက်ဖိုးခုနှိမ်ခြင်း
      </Typography>

      <ReturnCherootFour />

      <ReturnCherootFive />

      <ReturnCherootSix />

      <ReturnCherootButton />
    </>
  );
};
export default ReturnCheroot;
