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
import { addReplenishment } from "@/types/replenishmentType";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AddReplenishment, setIsLoading } from "@/store/slices/replenishment";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { LoadingButton } from "@mui/lab";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: addReplenishment = {
  date: null,
  amount: 0,
};

const NewAddMoney = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.replenishment);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [addReplenishment, setAddReplenishment] =
    useState<addReplenishment>(defaultValue);

  useEffect(() => {
    setAddReplenishment({ ...addReplenishment, date: selecteddate });
  }, [open, selecteddate]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      AddReplenishment({
        ...addReplenishment,
        onSuccess: () => {
          setOpen(false);
          setAddReplenishment(defaultValue);
          dispatch(setOpenSnackbar({ message: "Add Replenishment success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  console.log("replenishment", addReplenishment);
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle> ဖြည့်တင်းငွေစာရင်း</DialogTitle>
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
            <Typography sx={{ fontWeight: "bold" }}>ဖြည့်တင်းငွေ</Typography>
            <TextField
              placeholder="ဖြည့်တင်းငွေ"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) => {
                setAddReplenishment({
                  ...addReplenishment,
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
            setOpen(false), setAddReplenishment(defaultValue);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          disabled={!addReplenishment.date || !addReplenishment.amount}
          onClick={handleClick}
          loading={isLoading}
        >
          အိုကေ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewAddMoney;
