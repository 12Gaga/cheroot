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
import { addMainClosing } from "@/types/mainClosingType";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AddMainClosing, setIsLoading } from "@/store/slices/mainClosing";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { LoadingButton } from "@mui/lab";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: addMainClosing = {
  date: "",
  amount: 0,
};

const NewMainClosingBalance = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.mainClosing);
  const [selecteddate, setSelectedDate] = useState<any>(
    new Date().toLocaleDateString()
  );
  const [addMainClosing, setAddMainClosing] =
    useState<addMainClosing>(defaultValue);
  useEffect(() => {
    setAddMainClosing({ ...addMainClosing, date: selecteddate });
  }, [open, selecteddate]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      AddMainClosing({
        ...addMainClosing,
        onSuccess: () => {
          setOpen(false);
          setAddMainClosing(defaultValue);
          dispatch(setOpenSnackbar({ message: "Add Main Closing success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  console.log("mainClosing", addMainClosing);
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle> လက်ကျန်ငွေစာရင်း</DialogTitle>
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
              onChange={(date) => setSelectedDate(date?.toLocaleDateString())}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>လက်ကျန်ငွေ</Typography>
            <TextField
              placeholder="လက်ကျန်ငွေ"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) => {
                setAddMainClosing({
                  ...addMainClosing,
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
            setOpen(false), setAddMainClosing(defaultValue);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          disabled={!addMainClosing.date || !addMainClosing.amount}
          onClick={handleClick}
          loading={isLoading}
        >
          အိုကေ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewMainClosingBalance;
