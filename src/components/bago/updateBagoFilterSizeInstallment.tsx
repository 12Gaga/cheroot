import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  UpdatedBagoFilterSizeInstallment,
  setIsLoading,
} from "@/store/slices/bagoFilterSizeInstallment";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { updateBagoFilterSizeInstallment } from "@/types/bagoFilterSizeInstallment";
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
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateBagoFilterSizeInstallment = {
  id: null,
  date: null,
  shopId: null,
  cashBalance: 0,
  payBalance: 0,
};

const UpdateBagoFilerSizeInstallment = ({
  updateOpen,
  setUpdateOpen,
  selectedId,
}: Props) => {
  const installment = useAppSelector(
    (store) => store.bagoFilterSizeInstallment.item
  );
  const selectInstallment = installment.find((item) => item.id === selectedId);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const dispatch = useAppDispatch();
  const workshop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const filterSize = useAppSelector((store) => store.bagoFilterSize.item);
  const shop = useAppSelector((store) => store.typeOfShop.item);
  const concernShop = shop.filter((item) => item.workShopId === workshop?.id);
  const { item: bagoFilterSizeInstallments, isLoading } = useAppSelector(
    (store) => store.bagoFilterSizeInstallment
  );
  const shopTiltes = useAppSelector((store) => store.shopTitle.item).filter(
    (s) => s.workShopId === workshop?.id
  );
  const [showShop, setShowShop] = useState<TypeOfShop[]>([]);
  const [titleId, setTitleId] = useState<number | null>(null);

  const [updateBagoFilterSizeInstallment, setUpdateBagoFilterSizeInstallment] =
    useState<updateBagoFilterSizeInstallment>(defaultValue);

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
    setUpdateBagoFilterSizeInstallment({
      ...updateBagoFilterSizeInstallment,
      shopId: shopId,
      cashBalance: cashBalance,
    });
  };

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedBagoFilterSizeInstallment({
        ...updateBagoFilterSizeInstallment,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateBagoFilterSizeInstallment(defaultValue);
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
    if (selectInstallment) {
      setSelectedDate(selectInstallment.date);
      setUpdateBagoFilterSizeInstallment({
        ...updateBagoFilterSizeInstallment,
        id: selectedId,
        date: selecteddate,
        shopId: selectInstallment.shopId,
        cashBalance: selectInstallment.cashBalance,
        payBalance: selectInstallment.payBalance,
      });
    }
    setShowShop(concernShop);
  }, [selectInstallment, updateOpen]);
  useEffect(() => {
    setUpdateBagoFilterSizeInstallment({
      ...updateBagoFilterSizeInstallment,
      date: selecteddate,
    });
  }, [selecteddate]);
  if (!selectInstallment) return null;
  return (
    <>
      <Dialog
        open={updateOpen}
        onClose={() => {
          setUpdateOpen(false),
            setUpdateBagoFilterSizeInstallment(defaultValue);
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
                  value={updateBagoFilterSizeInstallment.shopId}
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
                value={updateBagoFilterSizeInstallment.cashBalance}
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
                defaultValue={selectInstallment.payBalance}
                onChange={(evt) => {
                  setUpdateBagoFilterSizeInstallment({
                    ...updateBagoFilterSizeInstallment,
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
              setUpdateOpen(false);
              setUpdateBagoFilterSizeInstallment(defaultValue);
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
export default UpdateBagoFilerSizeInstallment;
