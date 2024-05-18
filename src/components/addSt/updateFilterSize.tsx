import {
  createNewFilterSizeAddStock,
  updateFilterSizeAddStock,
} from "@/types/filterSizeStockType";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import {
  CreateFilterSizeAddStock,
  UpdatedFilterSizeAddStock,
  setIsLoading,
} from "@/store/slices/filterSizeStock";
import { LoadingButton } from "@mui/lab";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedStockSeq: string;
}

const defaultValue: updateFilterSizeAddStock = {
  stockSeq: "",
  date: "",
  invNo: 0,
  carNo: "",
  typeOfFilterSizeId: undefined,
  quantity: 0,
  bag: 0,
  shopId: 0,
  garageId: undefined,
};

const UpdateAddFilterSize = ({
  updateOpen,
  setUpdateOpen,
  selectedStockSeq,
}: Props) => {
  const filterSizeStocks = useAppSelector(
    (store) => store.filterSizeStock.item
  );
  const selectedFilterSizeStock = filterSizeStocks.find(
    (item) => item.stockSeq === selectedStockSeq
  );
  const filterSizeAddStock = useAppSelector((store) => store.addStock.item);
  const selectedFilterSizeAddStock = filterSizeAddStock.find(
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
  const filterSizes = useAppSelector((store) => store.typeOfFilterSize.item);
  const concernFilterSize = filterSizes.filter(
    (item) => item.workShopId === workShop?.id
  );
  const [updateFilterSizeAddStock, setUpdateFilterSizeAddStock] =
    useState<updateFilterSizeAddStock>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.filterSizeStock);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedFilterSizeAddStock({
        ...updateFilterSizeAddStock,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateFilterSizeAddStock(defaultValue);
          dispatch(
            setOpenSnackbar({
              message: "Update filter size add Stock success",
            })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    if (selectedFilterSizeAddStock && selectedFilterSizeStock) {
      setSelectedDate(selectedFilterSizeStock.date);
      setUpdateFilterSizeAddStock({
        ...updateFilterSizeAddStock,
        stockSeq: selectedStockSeq,
        date: selecteddate,
        invNo: selectedFilterSizeAddStock.invNo,
        carNo: selectedFilterSizeAddStock.carNo,
        typeOfFilterSizeId: selectedFilterSizeStock.typeOfFilterSizeId,
        quantity: selectedFilterSizeStock.quantity,
        bag: selectedFilterSizeStock.bag,
        shopId: selectedFilterSizeStock.shopId,
        garageId: selectedFilterSizeStock.garageId,
      });
    }
  }, [selectedFilterSizeStock, selectedFilterSizeAddStock, updateOpen]);
  useEffect(() => {
    setUpdateFilterSizeAddStock({
      ...updateFilterSizeAddStock,
      date: selecteddate,
    });
  }, [selecteddate]);

  if (!(selectedFilterSizeAddStock && selectedFilterSizeStock)) return null;
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
                defaultValue={selectedFilterSizeAddStock.invNo}
                placeholder="ဘောက်ချာနံပါတ်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateFilterSizeAddStock({
                    ...updateFilterSizeAddStock,
                    invNo: Number(evt.target.value),
                  });
                }}
              />
            </Box>

            <Box sx={{ mt: 2, width: 150 }}>
              <Typography sx={{ fontWeight: "bold" }}>ကားနံပါတ်</Typography>
              <TextField
                defaultValue={selectedFilterSizeAddStock.carNo}
                placeholder="ကားနံပါတ်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateFilterSizeAddStock({
                    ...updateFilterSizeAddStock,
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
                  defaultValue={selectedFilterSizeStock.shopId}
                  value={updateFilterSizeAddStock.shopId}
                  onChange={(evt) => {
                    setUpdateFilterSizeAddStock({
                      ...updateFilterSizeAddStock,
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
                  defaultValue={selectedFilterSizeStock.garageId}
                  value={updateFilterSizeAddStock.garageId}
                  onChange={(evt) => {
                    setUpdateFilterSizeAddStock({
                      ...updateFilterSizeAddStock,
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
                အဆီခံအမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectedFilterSizeStock.typeOfFilterSizeId}
                  value={updateFilterSizeAddStock.typeOfFilterSizeId}
                  onChange={(evt) => {
                    setUpdateFilterSizeAddStock({
                      ...updateFilterSizeAddStock,
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

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                အရေအတွက်
              </Typography>
              <TextField
                defaultValue={selectedFilterSizeStock.quantity}
                placeholder="အရေအတွက်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateFilterSizeAddStock({
                    ...updateFilterSizeAddStock,
                    quantity: Number(evt.target.value),
                  });
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                အိတ်
              </Typography>
              <TextField
                defaultValue={selectedFilterSizeStock.bag}
                placeholder="အိတ်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateFilterSizeAddStock({
                    ...updateFilterSizeAddStock,
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
              setUpdateFilterSizeAddStock(defaultValue);
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
export default UpdateAddFilterSize;
