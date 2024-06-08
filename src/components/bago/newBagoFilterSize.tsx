import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  CreateBagoFilterSize,
  setIsLoading,
} from "@/store/slices/bagoFilterSize";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { createNewBagoFilterSize } from "@/types/bagoFilterSizeType";
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
import { TypeOfShop } from "@prisma/client";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createNewBagoFilterSize = {
  date: null,
  shopId: null,
  typeOfFilterSizeId: null,
  quantity: 0,
  bag: 0,
  totalPrice: 0,
};

const NewBagoFilterSize = ({ open, setOpen }: Props) => {
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [newBagoFilterSize, setNewBagoFilterSize] =
    useState<createNewBagoFilterSize>(defaultValue);
  const dispatch = useAppDispatch();
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const filterSizes = useAppSelector((store) => store.typeOfFilterSize.item);
  const concernFilterSizes = filterSizes.filter(
    (item) => item.workShopId === workShop?.id
  );
  const shops = useAppSelector((store) => store.typeOfShop.item);
  const concernShop = shops.filter((item) => item.workShopId === workShop?.id);
  const shopTiltes = useAppSelector((store) => store.shopTitle.item).filter(
    (s) => s.workShopId === workShop?.id
  );
  const [showShop, setShowShop] = useState<TypeOfShop[]>([]);
  const [titleId, setTitleId] = useState<number | null>(null);

  const { isLoading } = useAppSelector((store) => store.bagoFilterSize);
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateBagoFilterSize({
        ...newBagoFilterSize,
        onSuccess: () => {
          setOpen(false);
          setNewBagoFilterSize(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Add Filter Size Purchase success" })
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
    setNewBagoFilterSize({ ...newBagoFilterSize, date: selecteddate });
  }, [selecteddate, open]);

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false), setNewBagoFilterSize(defaultValue);
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
                  value={newBagoFilterSize.shopId}
                  onChange={(evt) => {
                    setNewBagoFilterSize({
                      ...newBagoFilterSize,
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

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                အစီခံအမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={newBagoFilterSize.typeOfFilterSizeId}
                  onChange={(evt) => {
                    setNewBagoFilterSize({
                      ...newBagoFilterSize,
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
                placeholder="အရေအတွက်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setNewBagoFilterSize({
                    ...newBagoFilterSize,
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
                  setNewBagoFilterSize({
                    ...newBagoFilterSize,
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
                  setNewBagoFilterSize({
                    ...newBagoFilterSize,
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
              setNewBagoFilterSize(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newBagoFilterSize.date ||
              !newBagoFilterSize.shopId ||
              !newBagoFilterSize.typeOfFilterSizeId ||
              !newBagoFilterSize.quantity ||
              !newBagoFilterSize.bag ||
              !newBagoFilterSize.totalPrice
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
export default NewBagoFilterSize;
