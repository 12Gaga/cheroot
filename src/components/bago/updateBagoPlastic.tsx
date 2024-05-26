import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UpdatedBagoPlastic, setIsLoading } from "@/store/slices/bagoPLastic";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { updateBagoPlastic } from "@/types/bagoPlasticType";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  DialogActions,
  Button,
  ListItemText,
  MenuItem,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateBagoPlastic = {
  id: null,
  date: null,
  shopId: null,
  plasticId: null,
  quantity: 0,
  bag: 0,
  totalPrice: 0,
};

const UpdateBagoPlastic = ({
  updateOpen,
  setUpdateOpen,
  selectedId,
}: Props) => {
  const bagoPlastic = useAppSelector((store) => store.bagoPlastic.item);
  const selectBagoPlastic = bagoPlastic.find((item) => item.id === selectedId);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [updateBagoPlastic, setUpdateBagoPlastic] =
    useState<updateBagoPlastic>(defaultValue);
  const dispatch = useAppDispatch();
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const plastics = useAppSelector((store) => store.typeOfPlastic.item);
  const concernPlastic = plastics.filter(
    (item) => item.workShopId === workShop?.id
  );
  const shops = useAppSelector((store) => store.typeOfShop.item);
  const concernShop = shops.filter((item) => item.workShopId === workShop?.id);
  const { isLoading } = useAppSelector((store) => store.bagoPlastic);
  useEffect(() => {
    if (selectBagoPlastic) {
      setSelectedDate(selectBagoPlastic.date);
      setUpdateBagoPlastic({
        ...updateBagoPlastic,
        id: selectedId,
        date: selecteddate,
        shopId: selectBagoPlastic.shopId,
        plasticId: selectBagoPlastic.plasticId,
        quantity: selectBagoPlastic.quantity,
        bag: selectBagoPlastic.bag,
        totalPrice: selectBagoPlastic.totalPrice,
      });
    }
  }, [selectBagoPlastic, updateOpen]);

  useEffect(() => {
    setUpdateBagoPlastic({
      ...updateBagoPlastic,
      date: selecteddate,
    });
  }, [selecteddate]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedBagoPlastic({
        ...updateBagoPlastic,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateBagoPlastic(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Update Plastic Purchase success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  if (!selectBagoPlastic) return null;
  return (
    <>
      <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
        <DialogTitle>ပြင်ဆင်ခြင်း</DialogTitle>
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
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              mt: 5,
            }}
          >
            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ဆိုင်နာမည်
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectBagoPlastic.shopId}
                  value={updateBagoPlastic.shopId}
                  onChange={(evt) => {
                    setUpdateBagoPlastic({
                      ...updateBagoPlastic,
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

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ပလပ်စတစ်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectBagoPlastic.plasticId}
                  value={updateBagoPlastic.plasticId}
                  onChange={(evt) => {
                    setUpdateBagoPlastic({
                      ...updateBagoPlastic,
                      plasticId: Number(evt.target.value),
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
                အရေအတွက်
              </Typography>
              <TextField
                defaultValue={selectBagoPlastic.quantity}
                placeholder="အရေအတွက်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateBagoPlastic({
                    ...updateBagoPlastic,
                    quantity: Number(evt.target.value),
                  });
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                အိတ်ပေါင်း
              </Typography>
              <TextField
                defaultValue={selectBagoPlastic.bag}
                placeholder="အိတ်ပေါင်း"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateBagoPlastic({
                    ...updateBagoPlastic,
                    bag: Number(evt.target.value),
                  });
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                စုစုပေါင်းငွေ
              </Typography>
              <TextField
                defaultValue={selectBagoPlastic.totalPrice}
                placeholder="စုစုပေါင်းငွေ"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateBagoPlastic({
                    ...updateBagoPlastic,
                    totalPrice: Number(evt.target.value),
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
              setUpdateBagoPlastic(defaultValue);
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
export default UpdateBagoPlastic;
