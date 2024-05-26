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
import { createNewLabelStock, updateLabelStock } from "@/types/labelStockType";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import {
  CreateLabelStock,
  UpdatedLabelStock,
  setIsLoading,
} from "@/store/slices/labelStock";
import { LoadingButton } from "@mui/lab";

interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateLabelStock = {
  id: null,
  date: null,
  typeOfLabelId: undefined,
  bandle: 0,
  shopId: 0,
  garageId: undefined,
};

const UpdateLabelOpen = ({ updateOpen, setUpdateOpen, selectedId }: Props) => {
  const labelStock = useAppSelector((item) => item.labelStock.item);
  const selectLabelStock = labelStock.find((item) => item.id === selectedId);
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
  const labels = useAppSelector((store) => store.typeOfLabel.item);
  const concernLabel = labels.filter(
    (item) => item.workShopId === workShop?.id
  );
  const [updateLabelStock, setUpdateLabelStock] =
    useState<updateLabelStock>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.labelStock);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectLabelStock) {
      setSelectedDate(selectLabelStock.date);
      setUpdateLabelStock({
        ...updateLabelStock,
        id: selectedId,
        date: selecteddate,
        typeOfLabelId: selectLabelStock.typeOfLabelId,
        bandle: selectLabelStock.bandle,
        shopId: selectLabelStock.shopId,
        garageId: selectLabelStock.garageId,
      });
    }
  }, [selectLabelStock, updateOpen]);

  useEffect(() => {
    setUpdateLabelStock({
      ...updateLabelStock,
      date: selecteddate,
    });
  }, [selecteddate]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedLabelStock({
        ...updateLabelStock,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateLabelStock(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update label Stock success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  if (!selectLabelStock) return null;
  return (
    <>
      <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}>
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
            <DatePicker
              selected={selecteddate}
              onChange={(date) => setSelectedDate(date as Date)}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဂိုထောင်</Typography>
            <FormControl variant="filled" sx={{ width: 350 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                defaultValue={selectLabelStock.garageId}
                value={updateLabelStock.garageId}
                onChange={(evt) => {
                  setUpdateLabelStock({
                    ...updateLabelStock,
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

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 4,
            }}
          >
            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ဝယ်ယူခဲ့သည့်ဆိုင်
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectLabelStock.shopId}
                  value={updateLabelStock.shopId}
                  onChange={(evt) => {
                    setUpdateLabelStock({
                      ...updateLabelStock,
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

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>
                တံဆိပ်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 350 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectLabelStock.typeOfLabelId}
                  value={updateLabelStock.typeOfLabelId}
                  onChange={(evt) => {
                    setUpdateLabelStock({
                      ...updateLabelStock,
                      typeOfLabelId: Number(evt.target.value),
                    });
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernLabel.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>လိပ်</Typography>
              <TextField
                defaultValue={selectLabelStock.bandle}
                placeholder="လိပ်"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={(evt) => {
                  setUpdateLabelStock({
                    ...updateLabelStock,
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
              setUpdateOpen(false);
              setUpdateLabelStock(defaultValue);
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
export default UpdateLabelOpen;
