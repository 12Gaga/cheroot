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
import { updateDailyExpensive } from "@/types/dailyExpensiveType";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LoadingButton } from "@mui/lab";
import {
  UpdatedDailyExpensive,
  setIsLoading,
} from "@/store/slices/dailyExpensive";
import { setOpenSnackbar } from "@/store/slices/snackBar";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateDailyExpensive = {
  id: null,
  date: "",
  expensiveLabelId: null,
  content: "",
  amount: 0,
};

const UpdateDailyExpenses = ({
  updateOpen,
  setUpdateOpen,
  selectedId,
}: Props) => {
  const dailyExpensive = useAppSelector((store) => store.dailyExpensive.item);
  const selectDailyExpensive = dailyExpensive.find(
    (item) => item.id === selectedId
  );
  const dispatch = useAppDispatch();
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const { isLoading } = useAppSelector((store) => store.dailyExpensive);
  const titles = useAppSelector((store) => store.expensiveLabel.item);
  const concernTitle = titles.filter(
    (item) => item.workShopId === workShop?.id
  );
  const [selecteddate, setSelectedDate] = useState<any>(
    new Date().toLocaleDateString()
  );
  const [updateDailyExpense, setUpdateDailyExpense] =
    useState<updateDailyExpensive>(defaultValue);
  useEffect(() => {
    if (selectDailyExpensive) {
      setSelectedDate(selectDailyExpensive.date);
      setUpdateDailyExpense({
        ...updateDailyExpense,
        id: selectedId,
        date: selecteddate,
        expensiveLabelId: selectDailyExpensive.expensiveLabelId,
        content: selectDailyExpensive.content,
        amount: selectDailyExpensive.amount,
      });
    }
  }, [selectDailyExpensive, updateOpen]);

  useEffect(() => {
    setUpdateDailyExpense({
      ...updateDailyExpense,
      date: selecteddate,
    });
  }, [selecteddate]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedDailyExpensive({
        ...updateDailyExpense,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateDailyExpense(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Update Daily Expensive success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  console.log("dailyExpensive22", updateDailyExpense);
  console.log("selectedId", selectedId);
  console.log("selectedDate", selecteddate);
  if (!selectDailyExpensive) return null;
  return (
    <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
      <DialogTitle> ပြင်ဆင်မည်</DialogTitle>
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
              onChange={(date) => setSelectedDate(date?.toLocaleDateString())}
            />
          </Box>

          <Box sx={{ width: 250, mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>စာရင်းခေါင်းစဉ်</Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                defaultValue={selectDailyExpensive.expensiveLabelId}
                value={updateDailyExpense.expensiveLabelId}
                onChange={(evt) => {
                  setUpdateDailyExpense({
                    ...updateDailyExpense,
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
              defaultValue={selectDailyExpensive.content}
              placeholder="အကြောင်းအရာ"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) => {
                setUpdateDailyExpense({
                  ...updateDailyExpense,
                  content: evt.target.value,
                });
              }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ငွေပမာဏ</Typography>
            <TextField
              defaultValue={selectDailyExpensive.amount}
              placeholder="ငွေပမာဏ"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) => {
                setUpdateDailyExpense({
                  ...updateDailyExpense,
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
            setUpdateDailyExpense(defaultValue);
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

export default UpdateDailyExpenses;
