import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
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

const NewMainMoney = ({ open, setOpen }: Props) => {
  const [selecteddate, setSelectedDate] = useState<any>(
    new Date().toLocaleDateString()
  );
  const [selectedTown, setSelectedTown] = useState<number>(1);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle> ပင်မငွေစာရင်း</DialogTitle>
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
              onChange={(date) => setSelectedDate(date?.toLocaleDateString())}
            />
          </Box>

          <Box sx={{ width: 250 }}>
            <Typography sx={{ fontWeight: "bold" }}>မြို့နာမည်</Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={selectedTown}
                onChange={(evt) => {
                  setSelectedTown(Number(evt.target.value));
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                <MenuItem value={1}>Yangon</MenuItem>
                <MenuItem value={2}>Mandalay</MenuItem>
                <MenuItem value={3}>Shwe Bo</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{}}>
            <Typography sx={{ fontWeight: "bold" }}>ငွေပမာဏ</Typography>
            <TextField
              placeholder="ငွေပမာဏ"
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

export default NewMainMoney;
