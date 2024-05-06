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
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LoadingButton } from "@mui/lab";
import { createNewLeafStock } from "@/types/leafStockType";
import { CreateLeafStock, setIsLoading } from "@/store/slices/leafStock";
import { setOpenSnackbar } from "@/store/slices/snackBar";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createNewLeafStock = {
  date: "",
  typeOfLeafId: undefined,
  batchNo: 0,
  viss: 0,
  shop: "",
  garageId: undefined,
};

const LeafOpen = ({ open, setOpen }: Props) => {
  const [selecteddate, setSelectedDate] = useState<any>(
    new Date().toLocaleDateString()
  );
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const { item: garages, selectedGarage } = useAppSelector(
    (store) => store.garage
  );
  const concernGarage = garages.filter(
    (item) => item.workShopId === workShop?.id
  );
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const concernleaves = leaves.filter(
    (item) => item.workShopId === workShop?.id
  );
  const [newLeafStock, setNewLeafStock] =
    useState<createNewLeafStock>(defaultValue);

  const { isLoading } = useAppSelector((store) => store.leafStock);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateLeafStock({
        ...newLeafStock,
        onSuccess: () => {
          setOpen(false);
          setNewLeafStock(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Create new leaf Stock success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  useEffect(() => {
    setNewLeafStock({ ...newLeafStock, date: selecteddate });
  }, [selecteddate, open]);

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}>
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
            <DatePicker
              selected={selecteddate}
              onChange={(date) => {
                setSelectedDate(date);
                setNewLeafStock({
                  ...newLeafStock,
                  date: selecteddate,
                });
                console.log("date", date);
              }}
            />
            {/* mui datePicker */}
            {/* <DatePicker
              label="Controlled picker"
              value={setSelectedDate}
              onChange={(date: any) => {
                setSelectedDate(date);
                console.log("date", date);
              }}
            /> */}
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဂိုထောင်</Typography>
            <FormControl variant="filled" sx={{ width: 350 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={newLeafStock.garageId}
                onChange={(evt) =>
                  setNewLeafStock({
                    ...newLeafStock,
                    garageId: Number(evt.target.value),
                  })
                }
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {concernGarage.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 4,
            }}
          >
            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>
                ဝယ်ယူခဲ့သည့်ဆိုင်အမည်
              </Typography>
              <TextField
                placeholder="ဝယ်ယူခဲ့သည့်ဆိုင်အမည်"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={(evt) =>
                  setNewLeafStock({
                    ...newLeafStock,
                    shop: evt.target.value,
                  })
                }
              />
            </Box>

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>ဖက်အမျိုးအစား</Typography>
              <FormControl variant="filled" sx={{ width: 350 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={newLeafStock.typeOfLeafId}
                  onChange={(evt) =>
                    setNewLeafStock({
                      ...newLeafStock,
                      typeOfLeafId: Number(evt.target.value),
                    })
                  }
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernleaves.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>ပိုနံပါတ်</Typography>
              <TextField
                placeholder="ပိုနံပါတ်"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={(evt) =>
                  setNewLeafStock({
                    ...newLeafStock,
                    batchNo: Number(evt.target.value),
                  })
                }
              />
            </Box>

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>ပိဿာ</Typography>
              <TextField
                placeholder="ပိဿာ"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={(evt) =>
                  setNewLeafStock({
                    ...newLeafStock,
                    viss: Number(evt.target.value),
                  })
                }
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
              setNewLeafStock(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newLeafStock.typeOfLeafId ||
              !newLeafStock.batchNo ||
              !newLeafStock.viss ||
              !newLeafStock.garageId ||
              !newLeafStock.shop
            }
            onClick={handleClick}
            loading={isLoading}
          >
            သိမ်းမည်
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default LeafOpen;
