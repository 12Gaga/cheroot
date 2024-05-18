import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  AddBagoInstallment,
  setIsLoading,
} from "@/store/slices/bagoInstallment";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { addBagoInstallment } from "@/types/bagoInstallment";
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

const defaultValue: addBagoInstallment = {
  date: "",
  shopId: null,
  cashBalance: 0,
  payBalance: 0,
};

const NewBagoInstallment = ({ open, setOpen }: Props) => {
  const [selecteddate, setSelectedDate] = useState<any>(
    new Date().toLocaleDateString()
  );
  const dispatch = useAppDispatch();
  const workshop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const leaf = useAppSelector((store) => store.bagoLeaf.item);
  const filterSize = useAppSelector((store) => store.bagoFilterSize.item);
  const label = useAppSelector((store) => store.bagoLabel.item);
  const plastic = useAppSelector((store) => store.bagoPlastic.item);
  const shop = useAppSelector((store) => store.typeOfShop.item);
  const concernShop = shop.filter((item) => item.workShopId === workshop?.id);
  const { item: bagoInstallments, isLoading } = useAppSelector(
    (store) => store.bagoInstallment
  );
  const [bagoInstallment, setBagoInstallment] =
    useState<addBagoInstallment>(defaultValue);

  const handleChange = (shopId: number) => {
    const leafPrice = leaf
      .filter((item) => item.shopId === shopId)
      .reduce((total, leaf) => {
        return (total += leaf.totalPrice);
      }, 0);
    const filterSizePrice = filterSize
      .filter((item) => item.shopId === shopId)
      .reduce((total, filterSize) => {
        return (total += filterSize.totalPrice);
      }, 0);
    const labelPrice = label
      .filter((item) => item.shopId === shopId)
      .reduce((total, label) => {
        return (total += label.totalPrice);
      }, 0);
    const plasticPrice = plastic
      .filter((item) => item.shopId === shopId)
      .reduce((total, plastic) => {
        return (total += plastic.totalPrice);
      }, 0);
    const alreadyPay = bagoInstallments
      .filter((item) => item.shopId === shopId)
      .reduce((total, bago) => {
        return (total += bago.payBalance);
      }, 0);
    const cashBalance =
      leafPrice + filterSizePrice + labelPrice + plasticPrice - alreadyPay;
    setBagoInstallment({
      ...bagoInstallment,
      shopId: shopId,
      cashBalance: cashBalance,
    });
  };

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      AddBagoInstallment({
        ...bagoInstallment,
        onSuccess: () => {
          setOpen(false);
          setBagoInstallment(defaultValue);
          dispatch(setOpenSnackbar({ message: "Add installment success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  useEffect(() => {
    setBagoInstallment({ ...bagoInstallment, date: selecteddate });
  }, [selecteddate, open]);
  console.log("dkfh", bagoInstallment);
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
                  value={bagoInstallment.shopId}
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
                value={bagoInstallment.cashBalance}
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
                  setBagoInstallment({
                    ...bagoInstallment,
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
              setBagoInstallment(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !bagoInstallment.date ||
              !bagoInstallment.shopId ||
              !bagoInstallment.cashBalance ||
              !bagoInstallment.payBalance
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
export default NewBagoInstallment;
