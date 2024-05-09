import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
  DialogActions,
  Button,
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const NewTaungyiQuitStock = ({ open, setOpen }: Props) => {
  const [selecteddate, setSelectedDate] = useState<any>(
    new Date().toLocaleDateString()
  );

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}>
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
            <DatePicker
              selected={selecteddate}
              onChange={(date) => setSelectedDate(date?.toLocaleDateString())}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              mt: 5,
            }}
          >
            {/* <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ဖက်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={1}
                  onChange={(evt) => {
                    setNewFilterSizeAddStock({
                      ...newFilterSizeAddStock,
                      typeOfFilterSizeId: Number(evt.target.value),
                    });
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernFilterSize.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box> */}

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ပိုအရေအတွက်
              </Typography>
              <TextField
                placeholder="ပိုအရေအတွက်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  //   setNewFilterSizeAddStock({
                  //     ...newFilterSizeAddStock,
                  //     quantity: Number(evt.target.value),
                  //   });
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ပိဿာချိန်ပေါင်း
              </Typography>
              <TextField
                placeholder="ပိဿာချိန်ပေါင်း"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  //   setNewFilterSizeAddStock({
                  //     ...newFilterSizeAddStock,
                  //     bag: Number(evt.target.value),
                  //   });
                }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
              //   setNewFilterSizeAddStock(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            // disabled={
            //   !newFilterSizeAddStock.invNo ||
            //   !newFilterSizeAddStock.carNo ||
            //   !newFilterSizeAddStock.typeOfFilterSizeId ||
            //   !newFilterSizeAddStock.quantity ||
            //   !newFilterSizeAddStock.bag ||
            //   !newFilterSizeAddStock.garageId ||
            //   !newFilterSizeAddStock.shop
            // }
            // onClick={handleClick}
            // loading={isLoading}
          >
            သိမ်းမည်
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default NewTaungyiQuitStock;
