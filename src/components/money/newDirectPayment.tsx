import { addDirectPayment } from "@/types/directPaymentType";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { useEffect, useState } from "react";
import { AddDirectPayment, setIsLoading } from "@/store/slices/directPayment";
import { LoadingButton } from "@mui/lab";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: addDirectPayment = {
  date: null,
  tilte: "",
  amount: 0,
};

const NewDirectPayment = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.directPayment);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [addDirectPayment, setAddDirectPayment] =
    useState<addDirectPayment>(defaultValue);

  useEffect(() => {
    setAddDirectPayment({ ...addDirectPayment, date: selecteddate });
  }, [open, selecteddate]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      AddDirectPayment({
        ...addDirectPayment,
        onSuccess: () => {
          setOpen(false);
          setAddDirectPayment(defaultValue);
          dispatch(setOpenSnackbar({ message: "Add Direct Payment success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  console.log("directPayment", addDirectPayment);
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle> ပင်မငွေစာရင်းမှတိုက်ရိုက်ထုတ်ယူခြင်း</DialogTitle>
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
              <Typography sx={{ fontWeight: "bold" }}>ခေါင်းစဉ်</Typography>
              <TextField
                placeholder="ခေါင်းစဉ်"
                sx={{ bgcolor: "#EEE8CF", width: 300 }}
                onChange={(evt) => {
                  setAddDirectPayment({
                    ...addDirectPayment,
                    tilte: evt.target.value,
                  });
                }}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: "bold" }}>ငွေပမာဏ</Typography>
              <TextField
                placeholder="ငွေပမာဏ"
                sx={{ bgcolor: "#EEE8CF", width: 300 }}
                onChange={(evt) => {
                  setAddDirectPayment({
                    ...addDirectPayment,
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
              setAddDirectPayment(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !addDirectPayment.date ||
              !addDirectPayment.tilte ||
              !addDirectPayment.amount
            }
            onClick={handleClick}
            loading={isLoading}
          >
            အိုကေ
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default NewDirectPayment;
