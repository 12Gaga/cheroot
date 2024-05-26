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
import {
  createNewTabaccoStock,
  updateTabaccoStock,
} from "@/types/tabaccoStockType";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import {
  CreateTabaccoStock,
  UpdatedTabaccoStock,
  setIsLoading,
} from "@/store/slices/tabaccoStock";
import { LoadingButton } from "@mui/lab";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateTabaccoStock = {
  id: null,
  date: null,
  typeOfTabaccoId: undefined,
  tin: 0,
  pyi: 0,
  bag: 0,
  shopId: 0,
  garageId: undefined,
};

const UpdateTabaccoOpen = ({
  updateOpen,
  setUpdateOpen,
  selectedId,
}: Props) => {
  const tabaccoStock = useAppSelector((item) => item.tabaccoStock.item);
  const selectTabaccoStock = tabaccoStock.find(
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
  const tabacco = useAppSelector((store) => store.typeOfTabacco.item);
  const concernTabacco = tabacco.filter(
    (item) => item.workShopId === workShop?.id
  );
  const [updateTabaccoStock, setUpdateTabaccoStock] =
    useState<updateTabaccoStock>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.tabaccoStock);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectTabaccoStock) {
      setSelectedDate(selectTabaccoStock.date);
      setUpdateTabaccoStock({
        ...updateTabaccoStock,
        id: selectedId,
        date: selecteddate,
        typeOfTabaccoId: selectTabaccoStock.typeOfTabaccoId,
        tin: selectTabaccoStock.tin,
        pyi: selectTabaccoStock.pyi,
        bag: selectTabaccoStock.bag,
        shopId: selectTabaccoStock.shopId,
        garageId: selectTabaccoStock.garageId,
      });
    }
  }, [selectTabaccoStock, updateOpen]);

  useEffect(() => {
    setUpdateTabaccoStock({
      ...updateTabaccoStock,
      date: selecteddate,
    });
  }, [selecteddate]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedTabaccoStock({
        ...updateTabaccoStock,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateTabaccoStock(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Update tabacco Stock success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  if (!selectTabaccoStock) return null;
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
                defaultValue={selectTabaccoStock.garageId}
                value={updateTabaccoStock.garageId}
                onChange={(evt) => {
                  setUpdateTabaccoStock({
                    ...updateTabaccoStock,
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
                  defaultValue={selectTabaccoStock.shopId}
                  value={updateTabaccoStock.shopId}
                  onChange={(evt) => {
                    setUpdateTabaccoStock({
                      ...updateTabaccoStock,
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
                ဆေးစပ်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 350 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectTabaccoStock.typeOfTabaccoId}
                  value={updateTabaccoStock.typeOfTabaccoId}
                  onChange={(evt) => {
                    setUpdateTabaccoStock({
                      ...updateTabaccoStock,
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

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>တင်း</Typography>
              <TextField
                defaultValue={selectTabaccoStock.tin}
                placeholder="တင်း"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={(evt) => {
                  setUpdateTabaccoStock({
                    ...updateTabaccoStock,
                    tin: Number(evt.target.value),
                  });
                }}
              />
            </Box>

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>ပြည်</Typography>
              <TextField
                defaultValue={selectTabaccoStock.pyi}
                placeholder="ပြည်"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={(evt) => {
                  setUpdateTabaccoStock({
                    ...updateTabaccoStock,
                    pyi: Number(evt.target.value),
                  });
                }}
              />
            </Box>

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>အိတ်</Typography>
              <TextField
                defaultValue={selectTabaccoStock.bag}
                placeholder="အိတ်"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={(evt) => {
                  setUpdateTabaccoStock({
                    ...updateTabaccoStock,
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
              setUpdateTabaccoStock(defaultValue);
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
export default UpdateTabaccoOpen;
