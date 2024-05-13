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
import { updateTabaccoTransfer } from "@/types/tabaccoTransferGarageType";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import {
  UpdatedTabaccoTransfer,
  setIsLoading,
} from "@/store/slices/tabaccoGarageTransfer";
import { LoadingButton } from "@mui/lab";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateTabaccoTransfer = {
  id: null,
  date: "",
  exitGarageId: null,
  enterenceGarageId: null,
  typeOfTabaccoId: null,
  tin: 0,
  pyi: 0,
  bag: 0,
};

const UpdateTransferTabacco = ({
  updateOpen,
  setUpdateOpen,
  selectedId,
}: Props) => {
  const tabaccoTransfer = useAppSelector((store) => store.tabaccoTransfer.item);
  const selectTabaccoTransfer = tabaccoTransfer.find(
    (item) => item.id === selectedId
  );
  const dispatch = useAppDispatch();
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const [selecteddate, setSelectedDate] = useState<any>(
    new Date().toLocaleDateString()
  );
  const [updateTabaccoTransfer, setUpdateTabaccoTransfer] =
    useState<updateTabaccoTransfer>(defaultValue);
  const garages = useAppSelector((store) => store.garage.item);
  const concernGarages = garages.filter(
    (item) => item.workShopId === workShop?.id
  );
  const tabacco = useAppSelector((store) => store.typeOfTabacco.item);
  const concernTabacco = tabacco.filter(
    (item) => item.workShopId === workShop?.id
  );
  const { isLoading } = useAppSelector((store) => store.tabaccoTransfer);
  useEffect(() => {
    if (selectTabaccoTransfer) {
      setSelectedDate(selectTabaccoTransfer.date);
      setUpdateTabaccoTransfer({
        ...updateTabaccoTransfer,
        id: selectedId,
        date: selecteddate,
        exitGarageId: selectTabaccoTransfer.exitGarageId,
        enterenceGarageId: selectTabaccoTransfer.enterenceGarageId,
        typeOfTabaccoId: selectTabaccoTransfer.typeOfTabaccoId,
        tin: selectTabaccoTransfer.tin,
        pyi: selectTabaccoTransfer.pyi,
        bag: selectTabaccoTransfer.bag,
      });
    }
  }, [selectTabaccoTransfer, updateOpen]);

  useEffect(() => {
    setUpdateTabaccoTransfer({
      ...updateTabaccoTransfer,
      date: selecteddate,
    });
  }, [selecteddate]);
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedTabaccoTransfer({
        ...updateTabaccoTransfer,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateTabaccoTransfer(defaultValue);
          dispatch(
            setOpenSnackbar({ message: " Update transferring success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  console.log("data", updateTabaccoTransfer);
  if (!selectTabaccoTransfer) return null;
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
                  defaultValue={selectTabaccoTransfer.exitGarageId}
                  value={updateTabaccoTransfer.exitGarageId}
                  onChange={(evt) => {
                    setUpdateTabaccoTransfer({
                      ...updateTabaccoTransfer,
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
                  defaultValue={selectTabaccoTransfer.enterenceGarageId}
                  value={updateTabaccoTransfer.enterenceGarageId}
                  onChange={(evt) => {
                    setUpdateTabaccoTransfer({
                      ...updateTabaccoTransfer,
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
                defaultValue={selectTabaccoTransfer.typeOfTabaccoId}
                value={updateTabaccoTransfer.typeOfTabaccoId}
                onChange={(evt) => {
                  setUpdateTabaccoTransfer({
                    ...updateTabaccoTransfer,
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
              defaultValue={selectTabaccoTransfer.tin}
              placeholder="တင်း"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) => {
                setUpdateTabaccoTransfer({
                  ...updateTabaccoTransfer,
                  tin: Number(evt.target.value),
                });
              }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ပြည်</Typography>
            <TextField
              defaultValue={selectTabaccoTransfer.pyi}
              placeholder="ပြည်"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) => {
                setUpdateTabaccoTransfer({
                  ...updateTabaccoTransfer,
                  pyi: Number(evt.target.value),
                });
              }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အိတ်</Typography>
            <TextField
              defaultValue={selectTabaccoTransfer.bag}
              placeholder="အိတ်"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) => {
                setUpdateTabaccoTransfer({
                  ...updateTabaccoTransfer,
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
              setUpdateTabaccoTransfer(defaultValue);
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
export default UpdateTransferTabacco;
