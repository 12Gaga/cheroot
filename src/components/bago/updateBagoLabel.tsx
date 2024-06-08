import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UpdatedBagoLabel, setIsLoading } from "@/store/slices/bagoLabel";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { updateBagoLabel } from "@/types/bagoLabelType";
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
import { TypeOfShop } from "@prisma/client";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateBagoLabel = {
  id: null,
  date: null,
  shopId: null,
  typeOfLabelId: null,
  bandle: 0,
  totalPrice: 0,
};

const UpdateBagoLabel = ({ updateOpen, setUpdateOpen, selectedId }: Props) => {
  const bagoLabel = useAppSelector((store) => store.bagoLabel.item);
  const selectBagoLabel = bagoLabel.find((item) => item.id === selectedId);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [updateBagoLabel, setUpdateBagoLabel] =
    useState<updateBagoLabel>(defaultValue);
  const dispatch = useAppDispatch();
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const labels = useAppSelector((store) => store.typeOfLabel.item);
  const concernLabels = labels.filter(
    (item) => item.workShopId === workShop?.id
  );
  const shops = useAppSelector((store) => store.typeOfShop.item);
  const concernShop = shops.filter((item) => item.workShopId === workShop?.id);
  const shopTiltes = useAppSelector((store) => store.shopTitle.item).filter(
    (s) => s.workShopId === workShop?.id
  );
  const [showShop, setShowShop] = useState<TypeOfShop[]>([]);
  const [titleId, setTitleId] = useState<number | null>(null);

  const { isLoading } = useAppSelector((store) => store.bagoLabel);
  useEffect(() => {
    if (selectBagoLabel) {
      setSelectedDate(selectBagoLabel.date);
      setUpdateBagoLabel({
        ...updateBagoLabel,
        id: selectedId,
        date: selecteddate,
        shopId: selectBagoLabel.shopId,
        typeOfLabelId: selectBagoLabel.typeOfLabelId,
        bandle: selectBagoLabel.bandle,
        totalPrice: selectBagoLabel.totalPrice,
      });
    }
    setShowShop(concernShop);
  }, [selectBagoLabel, updateOpen]);

  useEffect(() => {
    setUpdateBagoLabel({
      ...updateBagoLabel,
      date: selecteddate,
    });
  }, [selecteddate]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedBagoLabel({
        ...updateBagoLabel,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateBagoLabel(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Update Label Purchase success" })
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
  if (!selectBagoLabel) return null;
  return (
    <>
      <Dialog
        open={updateOpen}
        onClose={() => {
          setUpdateOpen(false), setUpdateBagoLabel(defaultValue);
        }}
      >
        <DialogTitle>ပြင်ဆင်ခြင်း</DialogTitle>
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
                  defaultValue={selectBagoLabel.shopId}
                  value={updateBagoLabel.shopId}
                  onChange={(evt) => {
                    setUpdateBagoLabel({
                      ...updateBagoLabel,
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
                တံဆိပ်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectBagoLabel.typeOfLabelId}
                  value={updateBagoLabel.typeOfLabelId}
                  onChange={(evt) => {
                    setUpdateBagoLabel({
                      ...updateBagoLabel,
                      typeOfLabelId: Number(evt.target.value),
                    });
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernLabels.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                လိပ်ပေါင်း
              </Typography>
              <TextField
                defaultValue={selectBagoLabel.bandle}
                placeholder="လိပ်ပေါင်း"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateBagoLabel({
                    ...updateBagoLabel,
                    bandle: Number(evt.target.value),
                  });
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                စုစုပေါင်းငွေ
              </Typography>
              <TextField
                defaultValue={selectBagoLabel.totalPrice}
                placeholder="စုစုပေါင်းငွေ"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateBagoLabel({
                    ...updateBagoLabel,
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
              setUpdateBagoLabel(defaultValue);
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
export default UpdateBagoLabel;
