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
import { updateMainMoney } from "@/types/mainMoneyType";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UpdatedMainMoney, setIsLoading } from "@/store/slices/mainMoney";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { LoadingButton } from "@mui/lab";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateMainMoney = {
  id: null,
  date: "",
  locationId: null,
  amount: 0,
};

const UpdateMainMoney = ({ updateOpen, setUpdateOpen, selectedId }: Props) => {
  const mainMoney = useAppSelector((store) => store.mainMoney.item);
  const selectMainMoney = mainMoney.find((item) => item.id === selectedId);
  const dispatch = useAppDispatch();
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const { isLoading } = useAppSelector((store) => store.mainMoney);
  const locations = useAppSelector((store) => store.conveyLocation.item);
  const concernLocation = locations.filter(
    (item) => item.workShopId === workShop?.id
  );
  const [selecteddate, setSelectedDate] = useState<any>(
    new Date().toLocaleDateString()
  );
  const [updateMainMoney, setUpdateMainMoney] =
    useState<updateMainMoney>(defaultValue);
  useEffect(() => {
    if (selectMainMoney) {
      setSelectedDate(selectMainMoney.date);
      setUpdateMainMoney({
        ...updateMainMoney,
        id: selectedId,
        date: selecteddate,
        locationId: selectMainMoney.locationId,
        amount: selectMainMoney.amount,
      });
    }
  }, [selectMainMoney, updateOpen]);
  useEffect(() => {
    setUpdateMainMoney({ ...updateMainMoney, date: selecteddate });
  }, [selecteddate]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedMainMoney({
        ...updateMainMoney,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateMainMoney(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update Main Money success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  if (!selectMainMoney) return null;
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
              onChange={(date) => setSelectedDate(date?.toLocaleDateString())}
            />
          </Box>

          <Box sx={{ width: 250 }}>
            <Typography sx={{ fontWeight: "bold" }}>မြို့နာမည်</Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                defaultValue={selectMainMoney?.locationId}
                value={updateMainMoney.locationId}
                onChange={(evt) => {
                  setUpdateMainMoney({
                    ...updateMainMoney,
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
              defaultValue={selectMainMoney.amount}
              placeholder="ငွေပမာဏ"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) => {
                setUpdateMainMoney({
                  ...updateMainMoney,
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
            setUpdateMainMoney(defaultValue);
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

export default UpdateMainMoney;
