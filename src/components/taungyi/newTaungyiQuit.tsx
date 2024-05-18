import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  DialogActions,
  Button,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { addNewTaungyiExitStock } from "@/types/taungyiExitStock";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  AddTaungyiExitStock,
  setIsLoading,
} from "@/store/slices/taungyiExitStock";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { setTaungyiEnterStock } from "@/store/slices/taungyiEnterStock";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: addNewTaungyiExitStock = {
  date: "",
  storeId: null,
  tolBatchNo: 0,
  netWeight: 0,
  cigratteIndustryId: null,
};

const NewTaungyiQuitStock = ({ open, setOpen }: Props) => {
  const [selecteddate, setSelectedDate] = useState<any>(
    new Date().toLocaleDateString()
  );
  const { isLoading } = useAppSelector((store) => store.taungyiExitStock);
  const dispatch = useAppDispatch();
  const cigratteIndustryId = useAppSelector((store) => store.industry.item)?.id;
  const stores = useAppSelector((store) => store.typeOfStore.item);
  const concernStores = stores.filter(
    (item) => item.cigratteIndustryId === cigratteIndustryId
  );
  const [newTaungyiExitStock, setTaungyiExitStock] =
    useState<addNewTaungyiExitStock>(defaultValue);
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      AddTaungyiExitStock({
        ...newTaungyiExitStock,
        onSuccess: () => {
          setOpen(false);
          setTaungyiExitStock(defaultValue);
          dispatch(setOpenSnackbar({ message: "Stock exiting success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  const handleBatch = (batch: number) => {
    const netWeight = batch * 20;
    setTaungyiExitStock({
      ...newTaungyiExitStock,
      netWeight,
      tolBatchNo: batch,
    });
  };
  useEffect(() => {
    if (cigratteIndustryId) {
      setTaungyiExitStock({
        ...newTaungyiExitStock,
        date: selecteddate,
        cigratteIndustryId,
      });
    }
  }, [selecteddate, open, cigratteIndustryId]);
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}>
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
            <DatePicker
              selected={selecteddate}
              onChange={(date) => setSelectedDate(date?.toLocaleDateString())}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              mt: 5,
            }}
          >
            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                သိုလှောင်ရုံနာမည်
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={newTaungyiExitStock.storeId}
                  onChange={(evt) => {
                    setTaungyiExitStock({
                      ...newTaungyiExitStock,
                      storeId: Number(evt.target.value),
                    });
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernStores.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ပိုအရေအတွက်
              </Typography>
              <TextField
                placeholder="ပိုအရေအတွက်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  handleBatch(Number(evt.target.value));
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ပိဿာချိန်ပေါင်း
              </Typography>
              <TextField
                value={newTaungyiExitStock.netWeight}
                placeholder="ပိဿာချိန်ပေါင်း"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {}}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
              setTaungyiExitStock(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newTaungyiExitStock.date ||
              !newTaungyiExitStock.storeId ||
              !newTaungyiExitStock.tolBatchNo ||
              !newTaungyiExitStock.netWeight
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
export default NewTaungyiQuitStock;
