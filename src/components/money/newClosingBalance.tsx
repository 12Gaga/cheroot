import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addDailyClosing } from "@/types/dailyClosingType";
import { AddDailyClosing, setIsLoading } from "@/store/slices/dailyClosing";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { LoadingButton } from "@mui/lab";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: addDailyClosing = {
  date: null,
  amount: 0,
};

const NewClosingBalance = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.dailyClosing);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [addDailyClosing, setAddDailyClosing] =
    useState<addDailyClosing>(defaultValue);
  useEffect(() => {
    setAddDailyClosing({ ...addDailyClosing, date: selecteddate });
  }, [open, selecteddate]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      AddDailyClosing({
        ...addDailyClosing,
        onSuccess: () => {
          setOpen(false);
          setAddDailyClosing(defaultValue);
          dispatch(setOpenSnackbar({ message: "Add Daily Closing success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  console.log("dailyClosing", addDailyClosing);
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle> နေ့စဉ်လက်ကျန်ငွေစာရင်း</DialogTitle>
      <DialogContent sx={{ height: 210 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mr: 2,
            }}
          >
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
            <DatePicker
              selected={selecteddate}
              onChange={(date) => setSelectedDate(date as Date)}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>လက်ကျန်ငွေ</Typography>
            <TextField
              placeholder="လက်ကျန်ငွေ"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) => {
                setAddDailyClosing({
                  ...addDailyClosing,
                  amount: Number(evt.target.value),
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
            setAddDailyClosing(defaultValue);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          disabled={!addDailyClosing.date || !addDailyClosing.amount}
          onClick={handleClick}
          loading={isLoading}
        >
          အိုကေ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewClosingBalance;
