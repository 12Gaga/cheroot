import {
  addDirectPayment,
  updateDirectPayment,
} from "@/types/directPaymentType";
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
import {
  AddDirectPayment,
  UpdatedDirectPayment,
  setIsLoading,
} from "@/store/slices/directPayment";
import { LoadingButton } from "@mui/lab";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateDirectPayment = {
  id: null,
  date: null,
  tilte: "",
  amount: 0,
};

const UpdateDirectPayment = ({
  updateOpen,
  setUpdateOpen,
  selectedId,
}: Props) => {
  const directPayment = useAppSelector((store) => store.directPayment.item);
  const selectDirectPayment = directPayment.find(
    (item) => item.id === selectedId
  );
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.directPayment);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [updateDirectPayment, setUpdateDirectPayment] =
    useState<updateDirectPayment>(defaultValue);
  useEffect(() => {
    if (selectDirectPayment) {
      setSelectedDate(selectDirectPayment.date);
      setUpdateDirectPayment({
        ...updateDirectPayment,
        id: selectedId,
        date: selecteddate,
        tilte: selectDirectPayment.tilte,
        amount: selectDirectPayment.amount,
      });
    }
  }, [selectDirectPayment, updateOpen]);

  useEffect(() => {
    setUpdateDirectPayment({ ...updateDirectPayment, date: selecteddate });
  }, [selecteddate]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedDirectPayment({
        ...updateDirectPayment,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateDirectPayment(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Update Direct Payment success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  console.log("directPayment", updateDirectPayment);
  if (!selectDirectPayment) return null;
  return (
    <>
      <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
        <DialogTitle> ပြင်ဆင်မည်</DialogTitle>
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
                defaultValue={selectDirectPayment?.tilte}
                placeholder="ခေါင်းစဉ်"
                sx={{ bgcolor: "#EEE8CF", width: 300 }}
                onChange={(evt) => {
                  setUpdateDirectPayment({
                    ...updateDirectPayment,
                    tilte: evt.target.value,
                  });
                }}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: "bold" }}>ငွေပမာဏ</Typography>
              <TextField
                defaultValue={selectDirectPayment.amount}
                placeholder="ငွေပမာဏ"
                sx={{ bgcolor: "#EEE8CF", width: 300 }}
                onChange={(evt) => {
                  setUpdateDirectPayment({
                    ...updateDirectPayment,
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
              setUpdateOpen(false);
              setUpdateDirectPayment(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            onClick={handleClick}
            loading={isLoading}
          >
            ပြင်မည်
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default UpdateDirectPayment;
