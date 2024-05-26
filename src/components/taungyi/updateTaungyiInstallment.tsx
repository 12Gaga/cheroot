import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import {
  AddTaungyiInstallment,
  UpdatedTaungyiInstallment,
  setIsLoading,
} from "@/store/slices/taungyiInstallment";
import {
  addTaungyiInstallment,
  updateTaungyiInstallment,
} from "@/types/taungyiInstallment";
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
import "react-datepicker/dist/react-datepicker.css";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateTaungyiInstallment = {
  id: null,
  date: null,
  banquetId: null,
  cashBalance: 0,
  payBalance: 0,
  cigratteIndustryId: null,
};

const UpdateTaungyiInstallment = ({
  updateOpen,
  setUpdateOpen,
  selectedId,
}: Props) => {
  const installment = useAppSelector((store) => store.taungyiInstallment.item);
  const selectInstallment = installment.find((item) => item.id === selectedId);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const industryId = useAppSelector((store) => store.industry.item)?.id;
  const banquet = useAppSelector((store) => store.typeOfBanquet.item);
  const concernBanquet = banquet.filter(
    (item) => item.cigratteIndustryId === industryId
  );
  const { item: taungyiInstallments, isLoading } = useAppSelector(
    (store) => store.taungyiInstallment
  );
  const taungyiStock = useAppSelector((store) => store.taungyiEnterStock.item);
  const [updatetaungyiInstallment, setUpdateTaungyiInstallment] =
    useState<updateTaungyiInstallment>(defaultValue);
  const dispatch = useAppDispatch();

  const handleChange = (banquetId: number) => {
    const price = taungyiStock
      .filter((item) => item.banquetId === banquetId)
      .reduce((total, banquet) => {
        return (total += banquet.totalPrice);
      }, 0);
    const alreadyPay = taungyiInstallments
      .filter((item) => item.banquetId === banquetId)
      .reduce((total, banquet) => {
        return (total += banquet.payBalance);
      }, 0);
    const cashBalance = price - alreadyPay;
    setUpdateTaungyiInstallment({
      ...updatetaungyiInstallment,
      banquetId: banquetId,
      cashBalance: cashBalance,
    });
  };

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedTaungyiInstallment({
        ...updatetaungyiInstallment,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateTaungyiInstallment(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update Installment success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  useEffect(() => {
    if (selectInstallment) {
      setSelectedDate(selectInstallment.date);
      setUpdateTaungyiInstallment({
        ...updatetaungyiInstallment,
        id: selectedId,
        date: selecteddate,
        cigratteIndustryId: selectInstallment.cigratteIndustryId,
        banquetId: selectInstallment.banquetId,
        cashBalance: selectInstallment.cashBalance,
        payBalance: selectInstallment.payBalance,
      });
    }
  }, [selectInstallment, updateOpen]);
  useEffect(() => {
    setUpdateTaungyiInstallment({
      ...updatetaungyiInstallment,
      date: selecteddate,
    });
  }, [selecteddate]);
  if (!selectInstallment) return null;
  return (
    <>
      <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
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
                ပွဲရုံနာမည်
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectInstallment.banquetId}
                  value={updatetaungyiInstallment.banquetId}
                  onChange={(evt) => {
                    handleChange(Number(evt.target.value));
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernBanquet.map((item) => (
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
                value={updatetaungyiInstallment.cashBalance}
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
                defaultValue={selectInstallment.payBalance}
                placeholder="သွင်းငွေ"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateTaungyiInstallment({
                    ...updatetaungyiInstallment,
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
              setUpdateTaungyiInstallment(defaultValue);
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
export default UpdateTaungyiInstallment;
