import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  UpdatedBagoFilterSize,
  setIsLoading,
} from "@/store/slices/bagoFilterSize";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { updateBagoFilterSize } from "@/types/bagoFilterSizeType";
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

const defaultValue: updateBagoFilterSize = {
  id: null,
  date: null,
  shopId: null,
  typeOfFilterSizeId: null,
  quantity: 0,
  bag: 0,
  totalPrice: 0,
};

const UpdateBagoFilterSize = ({
  updateOpen,
  setUpdateOpen,
  selectedId,
}: Props) => {
  const bagoFilterSize = useAppSelector((store) => store.bagoFilterSize.item);
  const selectBagoFilterSize = bagoFilterSize.find(
    (item) => item.id === selectedId
  );
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [updateBagoFilterSize, setUpdateBagoFilterSize] =
    useState<updateBagoFilterSize>(defaultValue);
  const dispatch = useAppDispatch();
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const filterSizes = useAppSelector((store) => store.typeOfFilterSize.item);
  const concernFilterSizes = filterSizes.filter(
    (item) => item.workShopId === workShop?.id
  );
  const shops = useAppSelector((store) => store.typeOfShop.item);
  const concernShop = shops.filter((item) => item.workShopId === workShop?.id);
  const { isLoading } = useAppSelector((store) => store.bagoFilterSize);
  useEffect(() => {
    if (selectBagoFilterSize) {
      setSelectedDate(selectBagoFilterSize.date);
      setUpdateBagoFilterSize({
        ...updateBagoFilterSize,
        id: selectedId,
        date: selecteddate,
        shopId: selectBagoFilterSize.shopId,
        typeOfFilterSizeId: selectBagoFilterSize.typeOfFilterSizeId,
        quantity: selectBagoFilterSize.quantity,
        bag: selectBagoFilterSize.bag,
        totalPrice: selectBagoFilterSize.totalPrice,
      });
    }
  }, [selectBagoFilterSize, updateOpen]);

  useEffect(() => {
    setUpdateBagoFilterSize({
      ...updateBagoFilterSize,
      date: selecteddate,
    });
  }, [selecteddate]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedBagoFilterSize({
        ...updateBagoFilterSize,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateBagoFilterSize(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Update Filter Size Purchase success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  if (!selectBagoFilterSize) return null;
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
                  defaultValue={selectBagoFilterSize.shopId}
                  value={updateBagoFilterSize.shopId}
                  onChange={(evt) => {
                    setUpdateBagoFilterSize({
                      ...updateBagoFilterSize,
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
                အစီခံအမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectBagoFilterSize.typeOfFilterSizeId}
                  value={updateBagoFilterSize.typeOfFilterSizeId}
                  onChange={(evt) => {
                    setUpdateBagoFilterSize({
                      ...updateBagoFilterSize,
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

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                အရေအတွက်
              </Typography>
              <TextField
                defaultValue={selectBagoFilterSize.quantity}
                placeholder="အရေအတွက်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateBagoFilterSize({
                    ...updateBagoFilterSize,
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
                defaultValue={selectBagoFilterSize.bag}
                placeholder="အိတ်ပေါင်း"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateBagoFilterSize({
                    ...updateBagoFilterSize,
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
                defaultValue={selectBagoFilterSize.totalPrice}
                placeholder="စုစုပေါင်းငွေ"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateBagoFilterSize({
                    ...updateBagoFilterSize,
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
              setUpdateBagoFilterSize(defaultValue);
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
export default UpdateBagoFilterSize;
