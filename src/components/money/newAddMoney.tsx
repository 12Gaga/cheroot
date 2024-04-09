import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewAddMoney = ({ open, setOpen }: Props) => {
  const [selecteddate, setSelectedDate] = useState<any>(new Date());

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle> ဖြည့်တင်းငွေစာရင်း</DialogTitle>
      <DialogContent sx={{ height: 210 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
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

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဖြည့်တင်းငွေ</Typography>
            <TextField
              placeholder="ဖြည့်တင်းငွေ"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={() => {}}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          မလုပ်တော့ပါ
        </Button>
        <Button variant="contained">အိုကေ</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewAddMoney;
