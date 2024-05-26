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
import { createNewLabelTransfer } from "@/types/labelTransferGarageType";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import {
  CreateLabelTransfer,
  setIsLoading,
} from "@/store/slices/labelGarageTransfer";
import { LoadingButton } from "@mui/lab";
interface Props {
  open: boolean;
  setOpen: (Value: boolean) => void;
}

const defaultValue: createNewLabelTransfer = {
  date: null,
  exitGarageId: null,
  enterenceGarageId: null,
  typeOfLabelId: null,
  bandle: 0,
};

const NewTransferLabel = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [newLabelTransfer, setNewLabelTransfer] =
    useState<createNewLabelTransfer>(defaultValue);
  const garages = useAppSelector((store) => store.garage.item);
  const concernGarages = garages.filter(
    (item) => item.workShopId === workShop?.id
  );
  const labels = useAppSelector((store) => store.typeOfLabel.item);
  const concernLabels = labels.filter(
    (item) => item.workShopId === workShop?.id
  );
  const { isLoading } = useAppSelector((store) => store.labelTransfer);
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateLabelTransfer({
        ...newLabelTransfer,
        onSuccess: () => {
          setOpen(false);
          setNewLabelTransfer(defaultValue);
          dispatch(setOpenSnackbar({ message: "Transferring success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  useEffect(() => {
    setNewLabelTransfer({ ...newLabelTransfer, date: selecteddate });
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
                  value={newLabelTransfer.exitGarageId}
                  onChange={(evt) => {
                    setNewLabelTransfer({
                      ...newLabelTransfer,
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
                  value={newLabelTransfer.enterenceGarageId}
                  onChange={(evt) => {
                    setNewLabelTransfer({
                      ...newLabelTransfer,
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
            <Typography sx={{ fontWeight: "bold" }}>
              တံဆိပ်အမျိုးအစား
            </Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={newLabelTransfer.typeOfLabelId}
                onChange={(evt) => {
                  setNewLabelTransfer({
                    ...newLabelTransfer,
                    typeOfLabelId: Number(evt.target.value),
                  });
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {concernLabels.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>လိပ်</Typography>
            <TextField
              placeholder="လိပ်"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) => {
                setNewLabelTransfer({
                  ...newLabelTransfer,
                  bandle: Number(evt.target.value),
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
              setNewLabelTransfer(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newLabelTransfer.exitGarageId ||
              !newLabelTransfer.enterenceGarageId ||
              !newLabelTransfer.typeOfLabelId ||
              !newLabelTransfer.bandle ||
              !newLabelTransfer.date
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
export default NewTransferLabel;
