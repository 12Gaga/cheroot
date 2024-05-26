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
  ListItemText,
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { createNewTabaccoTransfer } from "@/types/tabaccoTransferGarageType";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import {
  CreateTabaccoTransfer,
  setIsLoading,
} from "@/store/slices/tabaccoGarageTransfer";
import { LoadingButton } from "@mui/lab";
interface Props {
  open: boolean;
  setOpen: (Value: boolean) => void;
}

const defaultValue: createNewTabaccoTransfer = {
  date: null,
  exitGarageId: null,
  enterenceGarageId: null,
  typeOfTabaccoId: null,
  tin: 0,
  pyi: 0,
  bag: 0,
};

const NewTransferTabacco = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [newTabaccoTransfer, setNewTabaccoTransfer] =
    useState<createNewTabaccoTransfer>(defaultValue);
  const garages = useAppSelector((store) => store.garage.item);
  const concernGarages = garages.filter(
    (item) => item.workShopId === workShop?.id
  );
  const tabacco = useAppSelector((store) => store.typeOfTabacco.item);
  const concernTabacco = tabacco.filter(
    (item) => item.workShopId === workShop?.id
  );
  const { isLoading } = useAppSelector((store) => store.tabaccoTransfer);
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateTabaccoTransfer({
        ...newTabaccoTransfer,
        onSuccess: () => {
          setOpen(false);
          setNewTabaccoTransfer(defaultValue);
          dispatch(setOpenSnackbar({ message: "Transferring success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  useEffect(() => {
    setNewTabaccoTransfer({ ...newTabaccoTransfer, date: selecteddate });
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
                  value={newTabaccoTransfer.exitGarageId}
                  onChange={(evt) => {
                    setNewTabaccoTransfer({
                      ...newTabaccoTransfer,
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
                  value={newTabaccoTransfer.enterenceGarageId}
                  onChange={(evt) => {
                    setNewTabaccoTransfer({
                      ...newTabaccoTransfer,
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
              ဆေးစပ်အမျိုးအစား
            </Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={newTabaccoTransfer.typeOfTabaccoId}
                onChange={(evt) => {
                  setNewTabaccoTransfer({
                    ...newTabaccoTransfer,
                    typeOfTabaccoId: Number(evt.target.value),
                  });
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {concernTabacco.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>တင်း</Typography>
            <TextField
              placeholder="တင်း"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) => {
                setNewTabaccoTransfer({
                  ...newTabaccoTransfer,
                  tin: Number(evt.target.value),
                });
              }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ပြည်</Typography>
            <TextField
              placeholder="ပြည်"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) => {
                setNewTabaccoTransfer({
                  ...newTabaccoTransfer,
                  pyi: Number(evt.target.value),
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
                setNewTabaccoTransfer({
                  ...newTabaccoTransfer,
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
              setNewTabaccoTransfer(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newTabaccoTransfer.exitGarageId ||
              !newTabaccoTransfer.enterenceGarageId ||
              !newTabaccoTransfer.typeOfTabaccoId ||
              !newTabaccoTransfer.tin ||
              !newTabaccoTransfer.pyi ||
              !newTabaccoTransfer.bag ||
              !newTabaccoTransfer.date
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
export default NewTransferTabacco;
