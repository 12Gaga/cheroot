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
  setOpen: (Value: boolean) => void;
}
const NewTransferLabel = ({ open, setOpen }: Props) => {
  const [selecteddate, setSelectedDate] = useState<any>(new Date());
  const [selectedExitGarage, setSelectedExitGarage] = useState<number>(1);
  const [selectedEnterenceGarage, setSelectedEnterenceGarage] =
    useState<number>(1);
  const [selectedLabel, setSelectedLabel] = useState<number>(1);

  useState<number>(1);

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle></DialogTitle>
        <DialogContent>
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

          <Box sx={{ display: "flex" }}>
            <Box sx={{ mt: 2, mr: 3 }}>
              <Typography sx={{ fontWeight: "bold" }}>အထွက်ဂိုထောင်</Typography>
              <FormControl variant="filled" sx={{ width: 150 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={selectedExitGarage}
                  onChange={(evt) => {
                    setSelectedExitGarage(Number(evt.target.value));
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  <MenuItem value={1}>ဂိုထောင် ၁</MenuItem>
                  <MenuItem value={2}>ဂိုထောင် ၂</MenuItem>
                  <MenuItem value={3}>ဂိုထောင် ၃</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontWeight: "bold" }}>အဝင်ဂိုထောင်</Typography>
              <FormControl variant="filled" sx={{ width: 150 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={selectedEnterenceGarage}
                  onChange={(evt) => {
                    setSelectedEnterenceGarage(Number(evt.target.value));
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  <MenuItem value={1}>ဂိုထောင် ၁</MenuItem>
                  <MenuItem value={2}>ဂိုထောင် ၂</MenuItem>
                  <MenuItem value={3}>ဂိုထောင် ၃</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box sx={{ mt: 2, mr: 3 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              တံဆိပ်အမျိုးအစား
            </Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={selectedLabel}
                onChange={(evt) => {
                  setSelectedLabel(Number(evt.target.value));
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                <MenuItem value={1}>တောင်ကြီး</MenuItem>
                <MenuItem value={2}>ခဲမဲ</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>လိပ်</Typography>
            <TextField
              placeholder="လိပ်"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={() => {}}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpen(false)}>
            မလုပ်တော့ပါ
          </Button>
          <Button variant="contained">ကူးပြောင်းမည်</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default NewTransferLabel;