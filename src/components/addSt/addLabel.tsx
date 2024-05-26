import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { CreateLabelAddStock, setIsLoading } from "@/store/slices/labelStock";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { createNewLabelAddStock } from "@/types/labelStockType";

import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createNewLabelAddStock = {
  date: null,
  invNo: 0,
  carNo: "",
  typeOfLabelId: undefined,
  bandle: 0,
  shopId: 0,
  garageId: undefined,
};

const AddLabel = ({ open, setOpen }: Props) => {
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const { item: garages, selectedGarage } = useAppSelector(
    (store) => store.garage
  );
  const concernGarage = garages.filter(
    (item) => item.workShopId === workShop?.id
  );
  const shops = useAppSelector((store) => store.typeOfShop.item);
  const concernShop = shops.filter((item) => item.workShopId === workShop?.id);
  const label = useAppSelector((store) => store.typeOfLabel.item);
  const concernlabel = label.filter((item) => item.workShopId === workShop?.id);
  const [newLabelAddStock, setNewLabelAddStock] =
    useState<createNewLabelAddStock>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.labelStock);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setNewLabelAddStock({ ...newLabelAddStock, date: selecteddate });
  }, [selecteddate, open]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateLabelAddStock({
        ...newLabelAddStock,
        onSuccess: () => {
          setOpen(false);
          setNewLabelAddStock(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Create new label add Stock success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}>
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
            <DatePicker
              selected={selecteddate}
              onChange={(date) => setSelectedDate(date as Date)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              mt: 2,
              gap: 2,
            }}
          >
            <Box sx={{ mt: 2, width: 150 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                ဘောက်ချာနံပါတ်
              </Typography>
              <TextField
                placeholder="ဘောက်ချာနံပါတ်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setNewLabelAddStock({
                    ...newLabelAddStock,
                    invNo: Number(evt.target.value),
                  });
                }}
              />
            </Box>

            <Box sx={{ mt: 2, width: 150 }}>
              <Typography sx={{ fontWeight: "bold" }}>ကားနံပါတ်</Typography>
              <TextField
                placeholder="ကားနံပါတ်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setNewLabelAddStock({
                    ...newLabelAddStock,
                    carNo: evt.target.value,
                  });
                }}
              />
            </Box>

            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ဝယ်ယူခဲ့သည့်ဆိုင်
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={newLabelAddStock.shopId}
                  onChange={(evt) => {
                    setNewLabelAddStock({
                      ...newLabelAddStock,
                      shopId: Number(evt.target.value),
                    });
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernShop.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
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
            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ဂိုထောင်
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={newLabelAddStock.garageId}
                  onChange={(evt) => {
                    setNewLabelAddStock({
                      ...newLabelAddStock,
                      garageId: Number(evt.target.value),
                    });
                  }}
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

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                တံဆိပ်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={newLabelAddStock.typeOfLabelId}
                  onChange={(evt) => {
                    setNewLabelAddStock({
                      ...newLabelAddStock,
                      typeOfLabelId: Number(evt.target.value),
                    });
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernlabel.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                လိပ်
              </Typography>
              <TextField
                placeholder="လိပ်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setNewLabelAddStock({
                    ...newLabelAddStock,
                    bandle: Number(evt.target.value),
                  });
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
              setNewLabelAddStock(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newLabelAddStock.invNo ||
              !newLabelAddStock.carNo ||
              !newLabelAddStock.typeOfLabelId ||
              !newLabelAddStock.bandle ||
              !newLabelAddStock.garageId ||
              !newLabelAddStock.shopId
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
export default AddLabel;
