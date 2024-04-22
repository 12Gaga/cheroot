import PayLeafOne from "@/components/payleaf/payLeafOne";
import PayLeafThree from "@/components/payleaf/payLeafThree";
import PayLeafTwo from "@/components/payleaf/payLeafTwo";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PayLeafButton from "@/components/payleaf/payLeafButton";
import { useSession } from "next-auth/react";
import { setSelectedGarage } from "@/store/slices/garage";

const PayLeaf = () => {
  const [selecteddate, setSelectedDate] = useState<any>(new Date());
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

      <Box sx={{ display: "flex", alignItems: "center", ml: 3 }}>
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

      <PayLeafButton />
    </>
  );
};
export default PayLeaf;
