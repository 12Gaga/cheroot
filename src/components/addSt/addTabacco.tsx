import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import {
  CreateTabaccoAddStock,
  setIsLoading,
} from "@/store/slices/tabaccoStock";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createNewTabaccoAddStock } from "@/types/tabaccoStockType";

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
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createNewTabaccoAddStock = {
  date: "",
  invNo: 0,
  carNo: "",
  typeOfTabaccoId: undefined,
  tin: 0,
  pyi: 0,
  bag: 0,
  shopId: 0,
  garageId: undefined,
};

const AddTabacco = ({ open, setOpen }: Props) => {
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
  const tabacco = useAppSelector((store) => store.typeOfTabacco.item);
  const concernTabacco = tabacco.filter(
    (item) => item.workShopId === workShop?.id
  );
  const [newTabaccoAddStock, setNewTabaccoAddStock] =
    useState<createNewTabaccoAddStock>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.tabaccoStock);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setNewTabaccoAddStock({ ...newTabaccoAddStock, date: selecteddate });
  }, [selecteddate, open]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateTabaccoAddStock({
        ...newTabaccoAddStock,
        onSuccess: () => {
          setOpen(false);
          setNewTabaccoAddStock(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Create new tabacco add Stock success" })
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
                placeholder="ဘောက်ချာနံပါတ်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setNewTabaccoAddStock({
                    ...newTabaccoAddStock,
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
                  setNewTabaccoAddStock({
                    ...newTabaccoAddStock,
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
                  value={newTabaccoAddStock.shopId}
                  onChange={(evt) => {
                    setNewTabaccoAddStock({
                      ...newTabaccoAddStock,
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
                  value={newTabaccoAddStock.garageId}
                  onChange={(evt) => {
                    setNewTabaccoAddStock({
                      ...newTabaccoAddStock,
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
                  value={newTabaccoAddStock.typeOfTabaccoId}
                  onChange={(evt) => {
                    setNewTabaccoAddStock({
                      ...newTabaccoAddStock,
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
                placeholder="တင်း"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setNewTabaccoAddStock({
                    ...newTabaccoAddStock,
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
                placeholder="ပြည်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setNewTabaccoAddStock({
                    ...newTabaccoAddStock,
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
                placeholder="အိတ်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setNewTabaccoAddStock({
                    ...newTabaccoAddStock,
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
              setNewTabaccoAddStock(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newTabaccoAddStock.invNo ||
              !newTabaccoAddStock.carNo ||
              !newTabaccoAddStock.typeOfTabaccoId ||
              !newTabaccoAddStock.tin ||
              !newTabaccoAddStock.pyi ||
              !newTabaccoAddStock.bag ||
              !newTabaccoAddStock.garageId ||
              !newTabaccoAddStock.shopId
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
export default AddTabacco;
