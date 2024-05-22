import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  AddBagoFilterSizeInstallment,
  setIsLoading,
} from "@/store/slices/bagoFilterSizeInstallment";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { addBagoFilterSizeInstallment } from "@/types/bagoFilterSizeInstallment";
import { addBagoLabelInstallment } from "@/types/bagoLabelInstallment ";
import { addBagoLeafInstallment } from "@/types/bagoLeafInstallment";
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

const defaultValue: addBagoFilterSizeInstallment = {
  date: "",
  shopId: null,
  cashBalance: 0,
  payBalance: 0,
};

const NewBagoFilerSizeInstallment = ({ open, setOpen }: Props) => {
  const [selecteddate, setSelectedDate] = useState<any>(
    new Date().toLocaleDateString()
  );
  const dispatch = useAppDispatch();
  const workshop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const filterSize = useAppSelector((store) => store.bagoFilterSize.item);
  const shop = useAppSelector((store) => store.typeOfShop.item);
  const concernShop = shop.filter((item) => item.workShopId === workshop?.id);
  const { item: bagoFilterSizeInstallments, isLoading } = useAppSelector(
    (store) => store.bagoFilterSizeInstallment
  );
  const [bagoFilterSizeInstallment, setBagoFilterSizeInstallment] =
    useState<addBagoFilterSizeInstallment>(defaultValue);

  const handleChange = (shopId: number) => {
    const filterSizePrice = filterSize
      .filter((item) => item.shopId === shopId)
      .reduce((total, filterSize) => {
        return (total += filterSize.totalPrice);
      }, 0);
    const alreadyPay = bagoFilterSizeInstallments
      .filter((item) => item.shopId === shopId)
      .reduce((total, bago) => {
        return (total += bago.payBalance);
      }, 0);
    const cashBalance = filterSizePrice - alreadyPay;
    setBagoFilterSizeInstallment({
      ...bagoFilterSizeInstallment,
      shopId: shopId,
      cashBalance: cashBalance,
    });
  };

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      AddBagoFilterSizeInstallment({
        ...bagoFilterSizeInstallment,
        onSuccess: () => {
          setOpen(false);
          setBagoFilterSizeInstallment(defaultValue);
          dispatch(setOpenSnackbar({ message: "Add installment success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  useEffect(() => {
    setBagoFilterSizeInstallment({
      ...bagoFilterSizeInstallment,
      date: selecteddate,
    });
  }, [selecteddate, open]);
  console.log("dkfh", bagoFilterSizeInstallment);
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
                  value={bagoFilterSizeInstallment.shopId}
                  onChange={(evt) => {
                    handleChange(Number(evt.target.value));
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
                ပေးရန်ကျန်ငွေ
              </Typography>
              <TextField
                value={bagoFilterSizeInstallment.cashBalance}
                placeholder="ပေးရန်ကျန်ငွေ"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {}}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                သွင်းငွေ
              </Typography>
              <TextField
                placeholder="သွင်းငွေ"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setBagoFilterSizeInstallment({
                    ...bagoFilterSizeInstallment,
                    payBalance: Number(evt.target.value),
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
              setBagoFilterSizeInstallment(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !bagoFilterSizeInstallment.date ||
              !bagoFilterSizeInstallment.shopId ||
              !bagoFilterSizeInstallment.cashBalance ||
              !bagoFilterSizeInstallment.payBalance
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
export default NewBagoFilerSizeInstallment;
