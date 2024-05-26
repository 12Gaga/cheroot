import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
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
import { updateFilterSizeStock } from "@/types/filterSizeStockType";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import {
  UpdatedFilterSizeStock,
  setIsLoading,
} from "@/store/slices/filterSizeStock";
import { LoadingButton } from "@mui/lab";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateFilterSizeStock = {
  id: null,
  date: null,
  typeOfFilterSizeId: undefined,
  quantity: 0,
  bag: 0,
  shopId: 0,
  garageId: undefined,
};

const UpdateFilterSizeOpen = ({
  updateOpen,
  setUpdateOpen,
  selectedId,
}: Props) => {
  const filterSizeStock = useAppSelector((item) => item.filterSizeStock.item);
  const selectFilterSizeStock = filterSizeStock.find(
    (item) => item.id === selectedId
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
  const filterSizes = useAppSelector((store) => store.typeOfFilterSize.item);
  const concernFilterSizes = filterSizes.filter(
    (item) => item.workShopId === workShop?.id
  );
  const [updateFilterSizeStock, setUpdateFilterSizeStock] =
    useState<updateFilterSizeStock>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.filterSizeStock);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectFilterSizeStock) {
      setSelectedDate(selectFilterSizeStock.date);
      setUpdateFilterSizeStock({
        ...updateFilterSizeStock,
        id: selectedId,
        date: selecteddate,
        typeOfFilterSizeId: selectFilterSizeStock.typeOfFilterSizeId,
        quantity: selectFilterSizeStock.quantity,
        bag: selectFilterSizeStock.bag,
        shopId: selectFilterSizeStock.shopId,
        garageId: selectFilterSizeStock.garageId,
      });
    }
  }, [selectFilterSizeStock, updateOpen]);

  useEffect(() => {
    setUpdateFilterSizeStock({
      ...updateFilterSizeStock,
      date: selecteddate,
    });
  }, [selecteddate]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedFilterSizeStock({
        ...updateFilterSizeStock,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateFilterSizeStock(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Update filter size Stock success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  if (!selectFilterSizeStock) return null;
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
                defaultValue={selectFilterSizeStock.garageId}
                value={updateFilterSizeStock.garageId}
                onChange={(evt) => {
                  setUpdateFilterSizeStock({
                    ...updateFilterSizeStock,
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
                  defaultValue={selectFilterSizeStock.shopId}
                  value={updateFilterSizeStock.shopId}
                  onChange={(evt) => {
                    setUpdateFilterSizeStock({
                      ...updateFilterSizeStock,
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
                အဆီခံအမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 350 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectFilterSizeStock.typeOfFilterSizeId}
                  value={updateFilterSizeStock.typeOfFilterSizeId}
                  onChange={(evt) => {
                    setUpdateFilterSizeStock({
                      ...updateFilterSizeStock,
                      typeOfFilterSizeId: Number(evt.target.value),
                    });
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernFilterSizes.map((item) => (
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
                defaultValue={selectFilterSizeStock.quantity}
                placeholder="အရေအတွက်"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={(evt) => {
                  setUpdateFilterSizeStock({
                    ...updateFilterSizeStock,
                    quantity: Number(evt.target.value),
                  });
                }}
              />
            </Box>

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>အိတ်</Typography>
              <TextField
                defaultValue={selectFilterSizeStock.bag}
                placeholder="အိတ်"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={(evt) => {
                  setUpdateFilterSizeStock({
                    ...updateFilterSizeStock,
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
              setUpdateFilterSizeStock(defaultValue);
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
export default UpdateFilterSizeOpen;
