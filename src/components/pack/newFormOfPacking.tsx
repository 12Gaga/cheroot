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

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewFormOfPacking = ({ open, setOpen }: Props) => {
  const [selectedCheroot, setSelectedCheroot] = useState<number>(1);
  const [selectedTypeOfPacking, setSelectedTypeOfPacking] = useState<number>(1);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle> ထုပ်ပိုးမှုအမျိုးအစားအသစ်ထည့်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ထုပ်ပိုးမှုအမည်</Typography>
            <TextField
              placeholder="ထုပ်ပိုးမှုအမည်"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={() => {}}
            />
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
            <Typography sx={{ fontWeight: "bold" }}>ဆေးလိပ်အရေအတွက်</Typography>
            <TextField
              placeholder="ဆေးလိပ်အရေအတွက်"
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

export default NewFormOfPacking;
