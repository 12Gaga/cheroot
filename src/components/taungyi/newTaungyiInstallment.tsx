import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import {
  AddTaungyiInstallment,
  setIsLoading,
} from "@/store/slices/taungyiInstallment";
import { addTaungyiInstallment } from "@/types/taungyiInstallment";
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
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: addTaungyiInstallment = {
  date: "",
  banquetId: null,
  cashBalance: 0,
  payBalance: 0,
  cigratteIndustryId: null,
};

const NewTaungyiInstallment = ({ open, setOpen }: Props) => {
  const [selecteddate, setSelectedDate] = useState<any>(
    new Date().toLocaleDateString()
  );
  const industryId = useAppSelector((store) => store.industry.item)?.id;
  const banquet = useAppSelector((store) => store.typeOfBanquet.item);
  const concernBanquet = banquet.filter(
    (item) => item.cigratteIndustryId === industryId
  );
  const { item: taungyiInstallments, isLoading } = useAppSelector(
    (store) => store.taungyiInstallment
  );
  const taungyiStock = useAppSelector((store) => store.taungyiEnterStock.item);
  const [taungyiInstallment, setTaungyiInstallment] =
    useState<addTaungyiInstallment>(defaultValue);
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
    setTaungyiInstallment({
      ...taungyiInstallment,
      banquetId: banquetId,
      cashBalance: cashBalance,
    });
  };

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      AddTaungyiInstallment({
        ...taungyiInstallment,
        onSuccess: () => {
          setOpen(false);
          setTaungyiInstallment(defaultValue);
          dispatch(setOpenSnackbar({ message: "Add Installment success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  useEffect(() => {
    if (industryId) {
      setTaungyiInstallment({
        ...taungyiInstallment,
        date: selecteddate,
        cigratteIndustryId: industryId,
      });
    }
  }, [selecteddate, open, industryId]);
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
                ပွဲရုံနာမည်
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={taungyiInstallment.banquetId}
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
                value={taungyiInstallment.cashBalance}
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
                  setTaungyiInstallment({
                    ...taungyiInstallment,
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
              setTaungyiInstallment(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !taungyiInstallment.date ||
              !taungyiInstallment.banquetId ||
              !taungyiInstallment.cashBalance ||
              !taungyiInstallment.payBalance ||
              !taungyiInstallment.cigratteIndustryId
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
export default NewTaungyiInstallment;
