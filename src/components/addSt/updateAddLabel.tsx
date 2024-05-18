import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  CreateLabelAddStock,
  UpdatedLabelAddStock,
  setIsLoading,
} from "@/store/slices/labelStock";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import {
  createNewLabelAddStock,
  updateLabelAddStock,
} from "@/types/labelStockType";

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
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedStockSeq: string;
}

const defaultValue: updateLabelAddStock = {
  stockSeq: "",
  date: "",
  invNo: 0,
  carNo: "",
  typeOfLabelId: undefined,
  bandle: 0,
  shopId: 0,
  garageId: undefined,
};

const UpdateAddLabel = ({
  updateOpen,
  setUpdateOpen,
  selectedStockSeq,
}: Props) => {
  const labelStocks = useAppSelector((store) => store.labelStock.item);
  const selectedLabelStock = labelStocks.find(
    (item) => item.stockSeq === selectedStockSeq
  );
  const labelAddStock = useAppSelector((store) => store.addStock.item);
  const selectedLabelAddStock = labelAddStock.find(
    (item) => item.stockSeq === selectedStockSeq
  );
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
  const shops = useAppSelector((store) => store.typeOfShop.item);
  const concernShop = shops.filter((item) => item.workShopId === workShop?.id);
  const label = useAppSelector((store) => store.typeOfLabel.item);
  const concernlabel = label.filter((item) => item.workShopId === workShop?.id);
  const [updateLabelAddStock, setUpdateLabelAddStock] =
    useState<updateLabelAddStock>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.labelStock);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedLabelAddStock({
        ...updateLabelAddStock,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateLabelAddStock(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Update label add Stock success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    if (selectedLabelAddStock && selectedLabelStock) {
      setSelectedDate(selectedLabelStock.date);
      setUpdateLabelAddStock({
        ...updateLabelAddStock,
        stockSeq: selectedStockSeq,
        date: selecteddate,
        invNo: selectedLabelAddStock.invNo,
        carNo: selectedLabelAddStock.carNo,
        typeOfLabelId: selectedLabelStock.typeOfLabelId,
        bandle: selectedLabelStock.bandle,
        shopId: selectedLabelStock.shopId,
        garageId: selectedLabelStock.garageId,
      });
    }
  }, [selectedLabelAddStock, selectedLabelStock, updateOpen]);
  useEffect(() => {
    setUpdateLabelAddStock({
      ...updateLabelAddStock,
      date: selecteddate,
    });
  }, [selecteddate]);

  if (!(selectedLabelAddStock && selectedLabelStock)) return null;

  return (
    <>
      <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
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
                defaultValue={selectedLabelAddStock.invNo}
                placeholder="ဘောက်ချာနံပါတ်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateLabelAddStock({
                    ...updateLabelAddStock,
                    invNo: Number(evt.target.value),
                  });
                }}
              />
            </Box>

            <Box sx={{ mt: 2, width: 150 }}>
              <Typography sx={{ fontWeight: "bold" }}>ကားနံပါတ်</Typography>
              <TextField
                defaultValue={selectedLabelAddStock.carNo}
                placeholder="ကားနံပါတ်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateLabelAddStock({
                    ...updateLabelAddStock,
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
                  defaultValue={selectedLabelStock.shopId}
                  value={updateLabelAddStock.shopId}
                  onChange={(evt) => {
                    setUpdateLabelAddStock({
                      ...updateLabelAddStock,
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
                  defaultValue={selectedLabelStock.garageId}
                  value={updateLabelAddStock.garageId}
                  onChange={(evt) => {
                    setUpdateLabelAddStock({
                      ...updateLabelAddStock,
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
                  defaultValue={selectedLabelStock.typeOfLabelId}
                  value={updateLabelAddStock.typeOfLabelId}
                  onChange={(evt) => {
                    setUpdateLabelAddStock({
                      ...updateLabelAddStock,
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
                defaultValue={selectedLabelStock.bandle}
                placeholder="လိပ်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateLabelAddStock({
                    ...updateLabelAddStock,
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
              setUpdateLabelAddStock(defaultValue);
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
export default UpdateAddLabel;