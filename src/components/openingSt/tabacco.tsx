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
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const TabaccoOpen = ({ open, setOpen }: Props) => {
  const [selecteddate, setSelectedDate] = useState<any>(new Date());
  const [selectedTabacco, setSelectedTabacco] = useState<number>(1);
  const [selectedGarage, setSelectedGarage] = useState<number>(1);
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}>
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
            <DatePicker
              selected={selecteddate}
              onChange={(date) => setSelectedDate(date)}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဂိုထောင်</Typography>
            <FormControl variant="filled" sx={{ width: 350 }}>
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
              </Select>
            </FormControl>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 4,
            }}
          >
            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>
                ဝယ်ယူခဲ့သည့်ဆိုင်အမည်
              </Typography>
              <TextField
                placeholder="ဝယ်ယူခဲ့သည့်ဆိုင်အမည်"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={() => {}}
              />
            </Box>

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>
                ဆေးစပ်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 350 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={selectedTabacco}
                  onChange={(evt) => {
                    setSelectedTabacco(Number(evt.target.value));
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  <MenuItem value={1}>အပြင်း</MenuItem>
                  <MenuItem value={2}>အပျော့</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>တင်း</Typography>
              <TextField
                placeholder="တင်း"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={() => {}}
              />
            </Box>

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>ပြည်</Typography>
              <TextField
                placeholder="ပြည်"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={() => {}}
              />
            </Box>

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>အိတ်</Typography>
              <TextField
                placeholder="အိတ်"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={() => {}}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpen(false)}>
            မလုပ်တော့ပါ
          </Button>
          <Button variant="contained">သိမ်းမည်</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default TabaccoOpen;