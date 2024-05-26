import { useAppSelector } from "@/store/hooks";
import { addClosing } from "@/types/closingType";
import { Box, TextField, Typography } from "@mui/material";
import { useEffect } from "react";

interface Props {
  closing: addClosing;
  setClosing: (value: addClosing) => void;
}

const DailyClosingData = ({ closing, setClosing }: Props) => {
  console.log("data", closing);
  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontWeight: "bold" }}>လက်ကျန်ငွေ</Typography>
        <TextField
          value={closing.cashBalance}
          placeholder="လက်ကျန်ငွေ"
          sx={{ bgcolor: "#EEE8CF", width: 300 }}
          onChange={() => {}}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontWeight: "bold" }}>ဖြည့်တင်းငွေ</Typography>
        <TextField
          value={closing.replenishment}
          placeholder="ဖြည့်တင်းငွေ"
          sx={{ bgcolor: "#EEE8CF", width: 300 }}
          onChange={() => {}}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontWeight: "bold" }}>နေ့စဉ်အသုံးစာရိတ်</Typography>
        <TextField
          value={closing.dailyBalance}
          placeholder="ဖြည့်တင်းငွေ"
          sx={{ bgcolor: "#EEE8CF", width: 300 }}
          onChange={() => {}}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontWeight: "bold" }}>ယနေ့လက်ကျန်ငွေ</Typography>
        <TextField
          value={closing.dailyClosing}
          placeholder="ဖြည့်တင်းငွေ"
          sx={{ bgcolor: "#EEE8CF", width: 300 }}
          onChange={() => {}}
        />
      </Box>
    </>
  );
};
export default DailyClosingData;
