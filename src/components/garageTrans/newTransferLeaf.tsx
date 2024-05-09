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
  Typography,
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
interface Props {
  open: boolean;
  setOpen: (Value: boolean) => void;
}
const NewTransferLeaf = ({ open, setOpen }: Props) => {
  const [selecteddate, setSelectedDate] = useState<any>(
    new Date().toLocaleDateString()
  );
  const [selectedExitGarage, setSelectedExitGarage] = useState<number>(1);
  const [selectedEnterenceGarage, setSelectedEnterenceGarage] =
    useState<number>(1);
  const [selectedLeaf, setSelectedLeaf] = useState<number>(1);
  const [selectedBatchNo, setSelectedBatchNo] = useState<number[]>([]);

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
              onChange={(date) => setSelectedDate(date?.toLocaleDateString())}
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
            <Typography sx={{ fontWeight: "bold" }}>ဖက်အမျိုးအစား</Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={selectedLeaf}
                onChange={(evt) => {
                  setSelectedLeaf(Number(evt.target.value));
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                <MenuItem value={1}>၅တမတ်</MenuItem>
                <MenuItem value={2}>၄ဝါ</MenuItem>
                <MenuItem value={3}>၂လိပ်ဝါ</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ပိုနံပါတ်</Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                multiple
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={selectedBatchNo}
                onChange={(evt) => {
                  setSelectedBatchNo([
                    ...selectedBatchNo,
                    Number(evt.target.value),
                  ]);
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                <MenuItem value={1}> ၁ </MenuItem>
                <MenuItem value={2}> ၂</MenuItem>
                <MenuItem value={3}> ၃</MenuItem>
              </Select>
            </FormControl>
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
export default NewTransferLeaf;
