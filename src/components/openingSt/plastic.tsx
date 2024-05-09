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
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { LoadingButton } from "@mui/lab";
import { createNewPlasticStock } from "@/types/plasticStockType";
import { CreatePlasticStock, setIsLoading } from "@/store/slices/plasticStock";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createNewPlasticStock = {
  date: "",
  typeOfPlasticId: undefined,
  quantity: 0,
  bag: 0,
  shopId: 0,
  garageId: undefined,
};

const PlasticOpen = ({ open, setOpen }: Props) => {
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
  const plastic = useAppSelector((store) => store.typeOfPlastic.item);
  const concernPlastic = plastic.filter(
    (item) => item.workShopId === workShop?.id
  );
  const [newPlasticStock, setNewPlasticStock] =
    useState<createNewPlasticStock>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.plasticStock);
  const dispatch = useAppDispatch();
  const shops = useAppSelector((store) => store.typeOfShop.item);
  const concernShop = shops.filter((item) => item.workShopId === workShop?.id);
  useEffect(() => {
    setNewPlasticStock({ ...newPlasticStock, date: selecteddate });
  }, [selecteddate]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreatePlasticStock({
        ...newPlasticStock,
        onSuccess: () => {
          setOpen(false);
          setNewPlasticStock(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Create new plastic Stock success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  console.log("date", newPlasticStock);
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}>
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
            <DatePicker
              selected={selecteddate}
              onChange={(date) => setSelectedDate(date?.toLocaleDateString())}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဂိုထောင်</Typography>
            <FormControl variant="filled" sx={{ width: 350 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={newPlasticStock.garageId}
                onChange={(evt) => {
                  setNewPlasticStock({
                    ...newPlasticStock,
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
                  value={newPlasticStock.shopId}
                  onChange={(evt) => {
                    setNewPlasticStock({
                      ...newPlasticStock,
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
                ပလပ်စတစ်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 350 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={newPlasticStock.typeOfPlasticId}
                  onChange={(evt) => {
                    setNewPlasticStock({
                      ...newPlasticStock,
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

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>အရေအတွက်</Typography>
              <TextField
                placeholder="အရေအတွက်"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={(evt) => {
                  setNewPlasticStock({
                    ...newPlasticStock,
                    quantity: Number(evt.target.value),
                  });
                }}
              />
            </Box>

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>အိတ်</Typography>
              <TextField
                placeholder="အိတ်"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={(evt) => {
                  setNewPlasticStock({
                    ...newPlasticStock,
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
              setOpen(false);
              setNewPlasticStock(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newPlasticStock.typeOfPlasticId ||
              !newPlasticStock.quantity ||
              !newPlasticStock.bag ||
              !newPlasticStock.garageId ||
              !newPlasticStock.shopId
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
export default PlasticOpen;
