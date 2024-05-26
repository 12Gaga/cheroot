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
import { addMainMoney } from "@/types/mainMoneyType";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AddMainMoney, setIsLoading } from "@/store/slices/mainMoney";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { LoadingButton } from "@mui/lab";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: addMainMoney = {
  date: null,
  locationId: null,
  amount: 0,
};

const NewMainMoney = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const { isLoading } = useAppSelector((store) => store.mainMoney);
  const locations = useAppSelector((store) => store.conveyLocation.item);
  const concernLocation = locations.filter(
    (item) => item.workShopId === workShop?.id
  );
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [addMainMoney, setAddMainMoney] = useState<addMainMoney>(defaultValue);

  useEffect(() => {
    setAddMainMoney({ ...addMainMoney, date: selecteddate });
  }, [open, selecteddate]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      AddMainMoney({
        ...addMainMoney,
        onSuccess: () => {
          setOpen(false);
          setAddMainMoney(defaultValue);
          dispatch(setOpenSnackbar({ message: "Add Main Money success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  console.log("mainMoney", addMainMoney);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle> ပင်မငွေစာရင်း</DialogTitle>
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

          <Box sx={{ width: 250 }}>
            <Typography sx={{ fontWeight: "bold" }}>မြို့နာမည်</Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={addMainMoney.locationId}
                onChange={(evt) => {
                  setAddMainMoney({
                    ...addMainMoney,
                    locationId: Number(evt.target.value),
                  });
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {concernLocation.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{}}>
            <Typography sx={{ fontWeight: "bold" }}>ငွေပမာဏ</Typography>
            <TextField
              placeholder="ငွေပမာဏ"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) => {
                setAddMainMoney({
                  ...addMainMoney,
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
            setAddMainMoney(defaultValue);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          disabled={
            !addMainMoney.date ||
            !addMainMoney.locationId ||
            !addMainMoney.amount
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

export default NewMainMoney;
