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
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewPackingData = ({ open, setOpen }: Props) => {
  const [selectedCheroot, setSelectedCheroot] = useState<number>(1);
  const [selectedTypeOfPacking, setSelectedTypeOfPacking] = useState<number>(1);
  const [selectedFormOfPacking, setSelectedFormOfPacking] = useState<number>(1);
  const [selecteddate, setSelectedDate] = useState<any>(new Date());

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle> ထုပ်ပိုးမှုအမျိုးအစားအသစ်ထည့်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
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

          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>
                ဆေးလိပ်အရေအတွက်
              </Typography>
              <TextField
                sx={{ bgcolor: "#EEE8CF", width: 150 }}
                onChange={() => {}}
              />
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              ဆေးလိပ်အမျိုးအစား
            </Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={selectedCheroot}
                onChange={(evt) => {
                  setSelectedCheroot(Number(evt.target.value));
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                <MenuItem value={1}>ငါးတုတ်</MenuItem>
                <MenuItem value={2}>၄ ၁/၂ ရှယ်</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ပါကင်အမျိုးအစား</Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={selectedTypeOfPacking}
                onChange={(evt) => {
                  setSelectedTypeOfPacking(Number(evt.target.value));
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                <MenuItem value={1}>၅၀ စီး</MenuItem>
                <MenuItem value={2}>၄ လိပ်</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              ထုပ်ပိုးမှုအမျိုးအစား
            </Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={selectedFormOfPacking}
                onChange={(evt) => {
                  setSelectedFormOfPacking(Number(evt.target.value));
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                <MenuItem value={1}>ဖာကြီး</MenuItem>
                <MenuItem value={2}>ဖာသေး</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အရေအတွက်</Typography>
            <TextField
              placeholder="အရေအတွက်"
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

export default NewPackingData;