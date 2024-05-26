import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { addDailyExpensive } from "@/types/dailyExpensiveType";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LoadingButton } from "@mui/lab";
import { AddDailyExpensive, setIsLoading } from "@/store/slices/dailyExpensive";
import { setOpenSnackbar } from "@/store/slices/snackBar";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: addDailyExpensive = {
  date: null,
  expensiveLabelId: null,
  content: "",
  amount: 0,
};

const NewDailyExpenses = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const { isLoading } = useAppSelector((store) => store.dailyExpensive);
  const titles = useAppSelector((store) => store.expensiveLabel.item);
  const concernTitle = titles.filter(
    (item) => item.workShopId === workShop?.id
  );
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [addDailyExpense, setAddDailyExpense] =
    useState<addDailyExpensive>(defaultValue);
  useEffect(() => {
    setAddDailyExpense({ ...addDailyExpense, date: selecteddate });
  }, [open, selecteddate]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      AddDailyExpensive({
        ...addDailyExpense,
        onSuccess: () => {
          setOpen(false);
          setAddDailyExpense(defaultValue);
          dispatch(setOpenSnackbar({ message: "Add Daily Expensive success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle> နေ့စဉ်အသုံးစာရိတ်ထည့်ခြင်း</DialogTitle>
      <DialogContent sx={{}}>
        <Box>
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

          <Box sx={{ width: 250, mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>စာရင်းခေါင်းစဉ်</Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={addDailyExpense.expensiveLabelId}
                onChange={(evt) => {
                  setAddDailyExpense({
                    ...addDailyExpense,
                    expensiveLabelId: Number(evt.target.value),
                  });
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {concernTitle.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အကြောင်းအရာ</Typography>
            <TextField
              placeholder="အကြောင်းအရာ"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) => {
                setAddDailyExpense({
                  ...addDailyExpense,
                  content: evt.target.value,
                });
              }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ငွေပမာဏ</Typography>
            <TextField
              placeholder="ငွေပမာဏ"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) => {
                setAddDailyExpense({
                  ...addDailyExpense,
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
            setAddDailyExpense(defaultValue);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          disabled={
            !addDailyExpense.date ||
            !addDailyExpense.expensiveLabelId ||
            !addDailyExpense.content ||
            !addDailyExpense.amount
          }
          onClick={handleClick}
          loading={isLoading}
        >
          အိုကေ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewDailyExpenses;
