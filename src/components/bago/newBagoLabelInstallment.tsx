import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  AddBagoLabelInstallment,
  setIsLoading,
} from "@/store/slices/bagoLabelInstallment";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { addBagoLabelInstallment } from "@/types/bagoLabelInstallment ";
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

const defaultValue: addBagoLabelInstallment = {
  date: null,
  shopId: null,
  cashBalance: 0,
  payBalance: 0,
};

const NewBagoLabelInstallment = ({ open, setOpen }: Props) => {
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const dispatch = useAppDispatch();
  const workshop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const label = useAppSelector((store) => store.bagoLabel.item);
  const shop = useAppSelector((store) => store.typeOfShop.item);
  const concernShop = shop.filter((item) => item.workShopId === workshop?.id);
  const { item: bagoLabelInstallments, isLoading } = useAppSelector(
    (store) => store.bagoLabelInstallment
  );
  const shopTiltes = useAppSelector((store) => store.shopTitle.item).filter(
    (s) => s.workShopId === workshop?.id
  );
  const [showShop, setShowShop] = useState<TypeOfShop[]>([]);
  const [titleId, setTitleId] = useState<number | null>(null);

  const [bagoLabelInstallment, setBagoLabelInstallment] =
    useState<addBagoLabelInstallment>(defaultValue);

  const handleChange = (shopId: number) => {
    const labelPrice = label
      .filter((item) => item.shopId === shopId)
      .reduce((total, label) => {
        return (total += label.totalPrice);
      }, 0);
    const alreadyPay = bagoLabelInstallments
      .filter((item) => item.shopId === shopId)
      .reduce((total, bago) => {
        return (total += bago.payBalance);
      }, 0);
    const cashBalance = labelPrice - alreadyPay;
    setBagoLabelInstallment({
      ...bagoLabelInstallment,
      shopId: shopId,
      cashBalance: cashBalance,
    });
  };

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      AddBagoLabelInstallment({
        ...bagoLabelInstallment,
        onSuccess: () => {
          setOpen(false);
          setBagoLabelInstallment(defaultValue);
          dispatch(setOpenSnackbar({ message: "Add installment success" }));
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
    setBagoLabelInstallment({ ...bagoLabelInstallment, date: selecteddate });
  }, [selecteddate, open]);
  console.log("dkfh", bagoLabelInstallment);
  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false), setBagoLabelInstallment(defaultValue);
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
                  value={bagoLabelInstallment.shopId}
                  onChange={(evt) => {
                    handleChange(Number(evt.target.value));
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
                ပေးရန်ကျန်ငွေ
              </Typography>
              <TextField
                value={bagoLabelInstallment.cashBalance}
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
                  setBagoLabelInstallment({
                    ...bagoLabelInstallment,
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
              setBagoLabelInstallment(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !bagoLabelInstallment.date ||
              !bagoLabelInstallment.shopId ||
              !bagoLabelInstallment.cashBalance ||
              !bagoLabelInstallment.payBalance
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
export default NewBagoLabelInstallment;
