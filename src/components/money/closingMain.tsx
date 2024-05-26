import { useAppSelector } from "@/store/hooks";
import { addClosing } from "@/types/closingType";
import { Box, TextField, Typography } from "@mui/material";
import { useEffect } from "react";

interface Props {
  closing: addClosing;
  setClosing: (value: addClosing) => void;
}

const MainClosingData = ({ closing, setClosing }: Props) => {
  console.log("data2", closing);
  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontWeight: "bold" }}>ပင်မငွေ</Typography>
        <TextField
          value={closing.mainBalance}
          placeholder="ဖြည့်တင်းငွေ"
          sx={{ bgcolor: "#EEE8CF", width: 300 }}
          onChange={() => {}}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontWeight: "bold" }}>
          ပင်မငွေစာရင်းမှတိုက်ရိုက်ပေးချေငွေ
        </Typography>
        <TextField
          value={closing.directPayment}
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
        <Typography sx={{ fontWeight: "bold" }}>ယနေ့ပင်မလက်ကျန်ငွေ</Typography>
        <TextField
          value={closing.mainClosing}
          placeholder="ဖြည့်တင်းငွေ"
          sx={{ bgcolor: "#EEE8CF", width: 300 }}
          onChange={() => {}}
        />
      </Box>
    </>
  );
};
export default MainClosingData;
