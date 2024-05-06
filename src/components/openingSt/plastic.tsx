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
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { createNewLabelStock } from "@/types/labelStockType";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setSelectedGarage } from "@/store/slices/garage";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { CreateTabaccoStock } from "@/store/slices/tabaccoStock";
import { setIsLoading } from "@/store/slices/workShop";
import { CreateLabelStock } from "@/store/slices/labelStock";
import { LoadingButton } from "@mui/lab";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createNewLabelStock = {
  date: "",
  typeOfLabelId: undefined,
  bandle: 0,
  shop: "",
  garageId: undefined,
};

const PlasticOpen = ({ open, setOpen }: Props) => {
  const [selecteddate, setSelectedDate] = useState<any>(
    new Date().toLocaleDateString()
  );
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const { item: garages, selectedGarage } = useAppSelector(
    (store) => store.garage
  );
  const concernGarage = garages.filter(
    (item) => item.workShopId === workShop?.id
  );
  const labels = useAppSelector((store) => store.typeOfLabel.item);
  const concernLabel = labels.filter(
    (item) => item.workShopId === workShop?.id
  );
  const [newLabelStock, setNewLabelStock] =
    useState<createNewLabelStock>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.labelStock);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setNewLabelStock({ ...newLabelStock, date: selecteddate });
  }, [selecteddate]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateLabelStock({
        ...newLabelStock,
        onSuccess: () => {
          setOpen(false);
          setNewLabelStock(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Create new label Stock success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}>
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
            <DatePicker
              selected={selecteddate}
              onChange={(date) => setSelectedDate(date)}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဂိုထောင်</Typography>
            <FormControl variant="filled" sx={{ width: 350 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={newLabelStock.garageId}
                onChange={(evt) => {
                  setNewLabelStock({
                    ...newLabelStock,
                    garageId: Number(evt.target.value),
                  });
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {concernGarage.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 4,
            }}
          >
            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>
                ဝယ်ယူခဲ့သည့်ဆိုင်အမည်
              </Typography>
              <TextField
                placeholder="ဝယ်ယူခဲ့သည့်ဆိုင်အမည်"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={(evt) => {
                  setNewLabelStock({
                    ...newLabelStock,
                    shop: evt.target.value,
                  });
                }}
              />
            </Box>

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>
                ပလပ်စတစ်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 350 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={newLabelStock.typeOfLabelId}
                  onChange={(evt) => {
                    setNewLabelStock({
                      ...newLabelStock,
                      typeOfLabelId: Number(evt.target.value),
                    });
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernLabel.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>လိပ်</Typography>
              <TextField
                placeholder="လိပ်"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={(evt) => {
                  setNewLabelStock({
                    ...newLabelStock,
                    bandle: Number(evt.target.value),
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
              setNewLabelStock(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newLabelStock.typeOfLabelId ||
              !newLabelStock.bandle ||
              !newLabelStock.garageId ||
              !newLabelStock.shop
            }
            onClick={handleClick}
            loading={isLoading}
          >
            သိမ်းမည်
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default PlasticOpen;
