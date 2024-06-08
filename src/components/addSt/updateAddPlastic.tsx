import { useAppSelector, useAppDispatch } from "@/store/hooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setOpenSnackbar } from "@/store/slices/snackBar";

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
import { updatePlasticAddStock } from "@/types/plasticStockType";
import {
  UpdatedPlasticAddStock,
  setIsLoading,
} from "@/store/slices/plasticStock";
import { TypeOfShop } from "@prisma/client";

interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedStockSeq: string;
}

const defaultValue: updatePlasticAddStock = {
  stockSeq: "",
  date: null,
  invNo: 0,
  carNo: "",
  typeOfPlasticId: undefined,
  quantity: 0,
  bag: 0,
  shopId: 0,
  garageId: undefined,
};

const UpdateAddPlastic = ({
  updateOpen,
  setUpdateOpen,
  selectedStockSeq,
}: Props) => {
  const plasticStocks = useAppSelector((store) => store.plasticStock.item);
  const selectedPlasticStock = plasticStocks.find(
    (item) => item.stockSeq === selectedStockSeq
  );
  const plasticAddStock = useAppSelector((store) => store.addStock.item);
  const selectedPlasticAddStock = plasticAddStock.find(
    (item) => item.stockSeq === selectedStockSeq
  );
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const { item: garages, selectedGarage } = useAppSelector(
    (store) => store.garage
  );
  const concernGarage = garages.filter(
    (item) => item.workShopId === workShop?.id
  );
  const plastic = useAppSelector((store) => store.typeOfPlastic.item);
  const concernPlastic = plastic.filter(
    (item) => item.workShopId === workShop?.id
  );
  const [updatePlasticAddStock, setUpdatePlasticAddStock] =
    useState<updatePlasticAddStock>(defaultValue);
  const shopTiltes = useAppSelector((store) => store.shopTitle.item).filter(
    (s) => s.workShopId === workShop?.id
  );
  const [showShop, setShowShop] = useState<TypeOfShop[]>([]);
  const [titleId, setTitleId] = useState<number | null>(null);

  const { isLoading } = useAppSelector((store) => store.plasticStock);
  const dispatch = useAppDispatch();
  const shops = useAppSelector((store) => store.typeOfShop.item);
  const concernShop = shops.filter((item) => item.workShopId === workShop?.id);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedPlasticAddStock({
        ...updatePlasticAddStock,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdatePlasticAddStock(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Update plastic add Stock success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  const handleShopTitle = (shopTitleId: number) => {
    const data = concernShop.filter((s) => s.shopTitleId === shopTitleId);
    setShowShop(data);
    setTitleId(shopTitleId);
  };

  useEffect(() => {
    if (selectedPlasticAddStock && selectedPlasticStock) {
      setSelectedDate(selectedPlasticStock.date);
      setUpdatePlasticAddStock({
        ...updatePlasticAddStock,
        stockSeq: selectedStockSeq,
        date: selecteddate,
        invNo: selectedPlasticAddStock.invNo,
        carNo: selectedPlasticAddStock.carNo,
        typeOfPlasticId: selectedPlasticStock.plasticId,
        quantity: selectedPlasticStock.quantity,
        bag: selectedPlasticStock.bag,
        shopId: selectedPlasticStock.shopId,
        garageId: selectedPlasticStock.garageId,
      });
    }
    setShowShop(concernShop);
  }, [selectedPlasticAddStock, selectedPlasticStock, updateOpen]);
  useEffect(() => {
    setUpdatePlasticAddStock({
      ...updatePlasticAddStock,
      date: selecteddate,
    });
  }, [selecteddate]);

  if (!(selectedPlasticAddStock && selectedPlasticStock)) return null;

  return (
    <>
      <Dialog
        open={updateOpen}
        onClose={() => {
          setUpdateOpen(false);
          setUpdatePlasticAddStock(defaultValue);
        }}
      >
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Box sx={{ mt: 2, mr: 3 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                ဆိုင်ခေါင်းစဉ်
              </Typography>
              <FormControl variant="filled" sx={{ width: 300 }}>
                <Select
                  value={titleId}
                  onChange={(evt) => handleShopTitle(Number(evt.target.value))}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {shopTiltes.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
              <DatePicker
                selected={selecteddate}
                onChange={(date) => setSelectedDate(date as Date)}
              />
            </Box>
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
                defaultValue={selectedPlasticAddStock.invNo}
                placeholder="ဘောက်ချာနံပါတ်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdatePlasticAddStock({
                    ...updatePlasticAddStock,
                    invNo: Number(evt.target.value),
                  });
                }}
              />
            </Box>

            <Box sx={{ mt: 2, width: 150 }}>
              <Typography sx={{ fontWeight: "bold" }}>ကားနံပါတ်</Typography>
              <TextField
                defaultValue={selectedPlasticAddStock.carNo}
                placeholder="ကားနံပါတ်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdatePlasticAddStock({
                    ...updatePlasticAddStock,
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
                  defaultValue={selectedPlasticStock.shopId}
                  value={updatePlasticAddStock.shopId}
                  onChange={(evt) => {
                    setUpdatePlasticAddStock({
                      ...updatePlasticAddStock,
                      shopId: Number(evt.target.value),
                    });
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {showShop.map((item) => (
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
                  defaultValue={selectedPlasticStock.garageId}
                  value={updatePlasticAddStock.garageId}
                  onChange={(evt) => {
                    setUpdatePlasticAddStock({
                      ...updatePlasticAddStock,
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
                ပလပ်စတစ်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectedPlasticStock.plasticId}
                  value={updatePlasticAddStock.typeOfPlasticId}
                  onChange={(evt) => {
                    setUpdatePlasticAddStock({
                      ...updatePlasticAddStock,
                      typeOfPlasticId: Number(evt.target.value),
                    });
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernPlastic.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                အိတ်
              </Typography>
              <TextField
                defaultValue={selectedPlasticStock.bag}
                placeholder="အိတ်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdatePlasticAddStock({
                    ...updatePlasticAddStock,
                    bag: Number(evt.target.value),
                  });
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                အရေအတွက်
              </Typography>
              <TextField
                defaultValue={selectedPlasticStock.quantity}
                placeholder="အရေအတွက်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdatePlasticAddStock({
                    ...updatePlasticAddStock,
                    quantity: Number(evt.target.value),
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
              setUpdatePlasticAddStock(defaultValue);
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
export default UpdateAddPlastic;
