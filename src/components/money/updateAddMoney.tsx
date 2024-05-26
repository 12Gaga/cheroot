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
import { updateReplenishment } from "@/types/replenishmentType";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  UpdatedReplenishment,
  setIsLoading,
} from "@/store/slices/replenishment";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { LoadingButton } from "@mui/lab";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateReplenishment = {
  id: null,
  date: null,
  amount: 0,
};

const UpdateAddMoney = ({ updateOpen, setUpdateOpen, selectedId }: Props) => {
  const replenishment = useAppSelector((store) => store.replenishment.item);
  const selectReplenishment = replenishment.find(
    (item) => item.id === selectedId
  );
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.replenishment);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [updateReplenishment, setUpdateReplenishment] =
    useState<updateReplenishment>(defaultValue);
  useEffect(() => {
    if (selectReplenishment) {
      setSelectedDate(selectReplenishment.date);
      setUpdateReplenishment({
        ...updateReplenishment,
        id: selectedId,
        date: selecteddate,
        amount: selectReplenishment.amount,
      });
    }
  }, [selectReplenishment, updateOpen]);

  useEffect(() => {
    setUpdateReplenishment({ ...updateReplenishment, date: selecteddate });
  }, [selecteddate]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedReplenishment({
        ...updateReplenishment,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateReplenishment(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Update Replenishment success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  console.log("replenishment", updateReplenishment);
  if (!selectReplenishment) return null;
  return (
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
            <Typography sx={{ fontWeight: "bold" }}>ဖြည့်တင်းငွေ</Typography>
            <TextField
              defaultValue={selectReplenishment.amount}
              placeholder="ဖြည့်တင်းငွေ"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) => {
                setUpdateReplenishment({
                  ...updateReplenishment,
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
            setUpdateOpen(false), setUpdateReplenishment(defaultValue);
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
  );
};

export default UpdateAddMoney;
