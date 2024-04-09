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

const NewGarage = ({ open, setOpen }: Props) => {
  const [selectedWorkShop, setSelectedWorkShop] = useState<number>(1);
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>ဂိုထောင်အသစ်ထည့်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={() => {}}
            />
          </Box>

          {/* <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အလုပ်ရုံ</Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={selectedWorkShop}
                onChange={(evt) => {
                  setSelectedWorkShop(Number(evt.target.value));
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                <MenuItem value={1}>အလုပ်ရုံ ၁</MenuItem>
                <MenuItem value={2}>အလုပ်ရုံ ၂</MenuItem>
              </Select>
            </FormControl>
          </Box> */}
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

export default NewGarage;
