import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import {
  CreateTabaccoAddStock,
  UpdatedTabaccoAddStock,
  setIsLoading,
} from "@/store/slices/tabaccoStock";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  createNewTabaccoAddStock,
  updateTabaccoAddStock,
} from "@/types/tabaccoStockType";

import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
  Dialog,
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

const defaultValue: updateTabaccoAddStock = {
  stockSeq: "",
  date: null,
  invNo: 0,
  carNo: "",
  typeOfTabaccoId: undefined,
  tin: 0,
  pyi: 0,
  bag: 0,
  shopId: 0,
  garageId: undefined,
};

const UpdateAddTabacco = ({
  updateOpen,
  setUpdateOpen,
  selectedStockSeq,
}: Props) => {
  const tabaccoStocks = useAppSelector((store) => store.tabaccoStock.item);
  const selectedTabaccoStock = tabaccoStocks.find(
    (item) => item.stockSeq === selectedStockSeq
  );
  const tabaccoAddStock = useAppSelector((store) => store.addStock.item);
  const selectedTabaccoAddStock = tabaccoAddStock.find(
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
  const shops = useAppSelector((store) => store.typeOfShop.item);
  const concernShop = shops.filter((item) => item.workShopId === workShop?.id);
  const tabacco = useAppSelector((store) => store.typeOfTabacco.item);
  const concernTabacco = tabacco.filter(
    (item) => item.workShopId === workShop?.id
  );
  const [updateTabaccoAddStock, setUpdateTabaccoAddStock] =
    useState<updateTabaccoAddStock>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.tabaccoStock);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedTabaccoAddStock({
        ...updateTabaccoAddStock,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateTabaccoAddStock(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Update tabacco add Stock success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    if (selectedTabaccoAddStock && selectedTabaccoStock) {
      setSelectedDate(selectedTabaccoStock.date);
      setUpdateTabaccoAddStock({
        ...updateTabaccoAddStock,
        stockSeq: selectedStockSeq,
        date: selecteddate,
        invNo: selectedTabaccoAddStock.invNo,
        carNo: selectedTabaccoAddStock.carNo,
        typeOfTabaccoId: selectedTabaccoStock.typeOfTabaccoId,
        tin: selectedTabaccoStock.tin,
        pyi: selectedTabaccoStock.pyi,
        bag: selectedTabaccoStock.bag,
        shopId: selectedTabaccoStock.shopId,
        garageId: selectedTabaccoStock.garageId,
      });
    }
  }, [selectedTabaccoStock, selectedTabaccoAddStock, updateOpen]);
  useEffect(() => {
    setUpdateTabaccoAddStock({
      ...updateTabaccoAddStock,
      date: selecteddate,
    });
  }, [selecteddate]);

  if (!(selectedTabaccoAddStock && selectedTabaccoStock)) return null;

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
                defaultValue={selectedTabaccoAddStock.invNo}
                placeholder="ဘောက်ချာနံပါတ်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateTabaccoAddStock({
                    ...updateTabaccoAddStock,
                    invNo: Number(evt.target.value),
                  });
                }}
              />
            </Box>

            <Box sx={{ mt: 2, width: 150 }}>
              <Typography sx={{ fontWeight: "bold" }}>ကားနံပါတ်</Typography>
              <TextField
                defaultValue={selectedTabaccoAddStock.carNo}
                placeholder="ကားနံပါတ်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateTabaccoAddStock({
                    ...updateTabaccoAddStock,
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
                  defaultValue={selectedTabaccoStock.shopId}
                  value={updateTabaccoAddStock.shopId}
                  onChange={(evt) => {
                    setUpdateTabaccoAddStock({
                      ...updateTabaccoAddStock,
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
                  defaultValue={selectedTabaccoStock.garageId}
                  value={updateTabaccoAddStock.garageId}
                  onChange={(evt) => {
                    setUpdateTabaccoAddStock({
                      ...updateTabaccoAddStock,
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
                ဆေးစပ်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectedTabaccoStock.typeOfTabaccoId}
                  value={updateTabaccoAddStock.typeOfTabaccoId}
                  onChange={(evt) => {
                    setUpdateTabaccoAddStock({
                      ...updateTabaccoAddStock,
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

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                တင်း
              </Typography>
              <TextField
                defaultValue={selectedTabaccoStock.tin}
                placeholder="တင်း"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateTabaccoAddStock({
                    ...updateTabaccoAddStock,
                    tin: Number(evt.target.value),
                  });
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ပြည်
              </Typography>
              <TextField
                defaultValue={selectedTabaccoStock.pyi}
                placeholder="ပြည်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateTabaccoAddStock({
                    ...updateTabaccoAddStock,
                    pyi: Number(evt.target.value),
                  });
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                အိတ်
              </Typography>
              <TextField
                defaultValue={selectedTabaccoStock.bag}
                placeholder="အိတ်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateTabaccoAddStock({
                    ...updateTabaccoAddStock,
                    bag: Number(evt.target.value),
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
              setUpdateTabaccoAddStock(defaultValue);
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
export default UpdateAddTabacco;
