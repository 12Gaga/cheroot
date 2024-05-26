import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { createNewFilterSizeTransfer } from "@/types/filterSizeTransferGarageType";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LoadingButton } from "@mui/lab";
import {
  CreateFilterSizeTransfer,
  setIsLoading,
} from "@/store/slices/filterSizeGarageTransfer";
import { setOpenSnackbar } from "@/store/slices/snackBar";
interface Props {
  open: boolean;
  setOpen: (Value: boolean) => void;
}

const defaultValue: createNewFilterSizeTransfer = {
  date: null,
  exitGarageId: null,
  enterenceGarageId: null,
  typeOfFilterSizeId: null,
  quantity: 0,
  bag: 0,
};

const NewTransferFilterSize = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [newFilterSizeTransfer, setNewFilterSizeTransfer] =
    useState<createNewFilterSizeTransfer>(defaultValue);
  const garages = useAppSelector((store) => store.garage.item);
  const concernGarages = garages.filter(
    (item) => item.workShopId === workShop?.id
  );
  const filterSizes = useAppSelector((store) => store.typeOfFilterSize.item);
  const concernFilterSize = filterSizes.filter(
    (item) => item.workShopId === workShop?.id
  );
  const { isLoading } = useAppSelector((store) => store.filterSizeTransfer);
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateFilterSizeTransfer({
        ...newFilterSizeTransfer,
        onSuccess: () => {
          setOpen(false);
          setNewFilterSizeTransfer(defaultValue);
          dispatch(setOpenSnackbar({ message: "Transferring success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  useEffect(() => {
    setNewFilterSizeTransfer({ ...newFilterSizeTransfer, date: selecteddate });
  }, [selecteddate, open]);

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
              onChange={(date) => setSelectedDate(date as Date)}
            />
          </Box>

          <Box sx={{ display: "flex" }}>
            <Box sx={{ mt: 2, mr: 3 }}>
              <Typography sx={{ fontWeight: "bold" }}>အထွက်ဂိုထောင်</Typography>
              <FormControl variant="filled" sx={{ width: 150 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={newFilterSizeTransfer.exitGarageId}
                  onChange={(evt) => {
                    setNewFilterSizeTransfer({
                      ...newFilterSizeTransfer,
                      exitGarageId: Number(evt.target.value),
                    });
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernGarages.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontWeight: "bold" }}>အဝင်ဂိုထောင်</Typography>
              <FormControl variant="filled" sx={{ width: 150 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={newFilterSizeTransfer.enterenceGarageId}
                  onChange={(evt) => {
                    setNewFilterSizeTransfer({
                      ...newFilterSizeTransfer,
                      enterenceGarageId: Number(evt.target.value),
                    });
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernGarages.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box sx={{ mt: 2, mr: 3 }}>
            <Typography sx={{ fontWeight: "bold" }}>အဆီခံအမျိုးအစား</Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={newFilterSizeTransfer.typeOfFilterSizeId}
                onChange={(evt) => {
                  setNewFilterSizeTransfer({
                    ...newFilterSizeTransfer,
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
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အရေအတွက်</Typography>
            <TextField
              placeholder="အရေအတွက်"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) => {
                setNewFilterSizeTransfer({
                  ...newFilterSizeTransfer,
                  quantity: Number(evt.target.value),
                });
              }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အိတ်</Typography>
            <TextField
              placeholder="အိတ်"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) => {
                setNewFilterSizeTransfer({
                  ...newFilterSizeTransfer,
                  bag: Number(evt.target.value),
                });
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
              setNewFilterSizeTransfer(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newFilterSizeTransfer.exitGarageId ||
              !newFilterSizeTransfer.enterenceGarageId ||
              !newFilterSizeTransfer.typeOfFilterSizeId ||
              !newFilterSizeTransfer.quantity ||
              !newFilterSizeTransfer.bag ||
              !newFilterSizeTransfer.date
            }
            onClick={handleClick}
            loading={isLoading}
          >
            ကူးပြောင်းမည်
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default NewTransferFilterSize;
