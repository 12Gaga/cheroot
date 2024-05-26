import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CreateBagoPlastic, setIsLoading } from "@/store/slices/bagoPLastic";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { createNewBagoPlastic } from "@/types/bagoPlasticType";
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
} from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createNewBagoPlastic = {
  date: null,
  shopId: null,
  plasticId: null,
  quantity: 0,
  bag: 0,
  totalPrice: 0,
};

const NewBagoPlastic = ({ open, setOpen }: Props) => {
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [newBagoPlastic, setNewBagoPlastic] =
    useState<createNewBagoPlastic>(defaultValue);
  const dispatch = useAppDispatch();
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const plastics = useAppSelector((store) => store.typeOfPlastic.item);
  const concernPlastic = plastics.filter(
    (item) => item.workShopId === workShop?.id
  );
  const shops = useAppSelector((store) => store.typeOfShop.item);
  const concernShop = shops.filter((item) => item.workShopId === workShop?.id);
  const { isLoading } = useAppSelector((store) => store.bagoPlastic);
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateBagoPlastic({
        ...newBagoPlastic,
        onSuccess: () => {
          setOpen(false);
          setNewBagoPlastic(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Add Plastic Purchase success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  useEffect(() => {
    setNewBagoPlastic({ ...newBagoPlastic, date: selecteddate });
  }, [selecteddate, open]);
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
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
                  value={newBagoPlastic.shopId}
                  onChange={(evt) => {
                    setNewBagoPlastic({
                      ...newBagoPlastic,
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
                  value={newBagoPlastic.plasticId}
                  onChange={(evt) => {
                    setNewBagoPlastic({
                      ...newBagoPlastic,
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
                placeholder="အရေအတွက်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setNewBagoPlastic({
                    ...newBagoPlastic,
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
                placeholder="အိတ်ပေါင်း"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setNewBagoPlastic({
                    ...newBagoPlastic,
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
                placeholder="စုစုပေါင်းငွေ"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setNewBagoPlastic({
                    ...newBagoPlastic,
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
              setOpen(false);
              setNewBagoPlastic(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newBagoPlastic.date ||
              !newBagoPlastic.shopId ||
              !newBagoPlastic.plasticId ||
              !newBagoPlastic.quantity ||
              !newBagoPlastic.bag ||
              !newBagoPlastic.totalPrice
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
export default NewBagoPlastic;
