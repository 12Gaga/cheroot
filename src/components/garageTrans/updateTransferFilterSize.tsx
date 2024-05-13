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
import { updateFilterSizeTransfer } from "@/types/filterSizeTransferGarageType";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LoadingButton } from "@mui/lab";
import {
  UpdatedFilterSizeTransfer,
  setIsLoading,
} from "@/store/slices/filterSizeGarageTransfer";
import { setOpenSnackbar } from "@/store/slices/snackBar";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateFilterSizeTransfer = {
  id: null,
  date: "",
  exitGarageId: null,
  enterenceGarageId: null,
  typeOfFilterSizeId: null,
  quantity: 0,
  bag: 0,
};

const UpdateTransferFilterSize = ({
  updateOpen,
  setUpdateOpen,
  selectedId,
}: Props) => {
  const filterSizeTransfer = useAppSelector(
    (store) => store.filterSizeTransfer.item
  );
  const selectFilterSizeTransfer = filterSizeTransfer.find(
    (item) => item.id === selectedId
  );
  const dispatch = useAppDispatch();
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const [selecteddate, setSelectedDate] = useState<any>(
    new Date().toLocaleDateString()
  );
  const [updateFilterSizeTransfer, setUpdateNewFilterSizeTransfer] =
    useState<updateFilterSizeTransfer>(defaultValue);
  const garages = useAppSelector((store) => store.garage.item);
  const concernGarages = garages.filter(
    (item) => item.workShopId === workShop?.id
  );
  const filterSizes = useAppSelector((store) => store.typeOfFilterSize.item);
  const concernFilterSize = filterSizes.filter(
    (item) => item.workShopId === workShop?.id
  );
  const { isLoading } = useAppSelector((store) => store.filterSizeTransfer);
  useEffect(() => {
    if (selectFilterSizeTransfer) {
      setSelectedDate(selectFilterSizeTransfer.date);
      setUpdateNewFilterSizeTransfer({
        ...updateFilterSizeTransfer,
        id: selectedId,
        date: selecteddate,
        exitGarageId: selectFilterSizeTransfer.exitGarageId,
        enterenceGarageId: selectFilterSizeTransfer.enterenceGarageId,
        typeOfFilterSizeId: selectFilterSizeTransfer.typeOfFilterSizeId,
        quantity: selectFilterSizeTransfer.quantity,
        bag: selectFilterSizeTransfer.bag,
      });
    }
  }, [selectFilterSizeTransfer, updateOpen]);

  useEffect(() => {
    setUpdateNewFilterSizeTransfer({
      ...updateFilterSizeTransfer,
      date: selecteddate,
    });
  }, [selecteddate]);
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedFilterSizeTransfer({
        ...updateFilterSizeTransfer,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateNewFilterSizeTransfer(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update transferring success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  console.log("data", updateFilterSizeTransfer);
  if (!selectFilterSizeTransfer) return null;
  return (
    <>
      <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
        <DialogTitle>ပြင်ဆင်ခြင်း</DialogTitle>
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
                  defaultValue={selectFilterSizeTransfer.exitGarageId}
                  value={updateFilterSizeTransfer.exitGarageId}
                  onChange={(evt) => {
                    setUpdateNewFilterSizeTransfer({
                      ...updateFilterSizeTransfer,
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
                  defaultValue={selectFilterSizeTransfer.enterenceGarageId}
                  value={updateFilterSizeTransfer.enterenceGarageId}
                  onChange={(evt) => {
                    setUpdateNewFilterSizeTransfer({
                      ...updateFilterSizeTransfer,
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
                defaultValue={selectFilterSizeTransfer.typeOfFilterSizeId}
                value={updateFilterSizeTransfer.typeOfFilterSizeId}
                onChange={(evt) => {
                  setUpdateNewFilterSizeTransfer({
                    ...updateFilterSizeTransfer,
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
              defaultValue={selectFilterSizeTransfer.quantity}
              placeholder="အရေအတွက်"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) => {
                setUpdateNewFilterSizeTransfer({
                  ...updateFilterSizeTransfer,
                  quantity: Number(evt.target.value),
                });
              }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အိတ်</Typography>
            <TextField
              defaultValue={selectFilterSizeTransfer.bag}
              placeholder="အိတ်"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) => {
                setUpdateNewFilterSizeTransfer({
                  ...updateFilterSizeTransfer,
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
              setUpdateOpen(false);
              setUpdateNewFilterSizeTransfer(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            onClick={handleClick}
            loading={isLoading}
          >
            ပြင်ဆင်မည်
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default UpdateTransferFilterSize;
