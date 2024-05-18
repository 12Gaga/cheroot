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
import {
  addNewTaungyiExitStock,
  updateTaungyiExitStock,
} from "@/types/taungyiExitStock";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  AddTaungyiExitStock,
  UpdatedTaungyiExitStock,
  setIsLoading,
} from "@/store/slices/taungyiExitStock";
import { setOpenSnackbar } from "@/store/slices/snackBar";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateTaungyiExitStock = {
  id: null,
  date: "",
  storeId: null,
  tolBatchNo: 0,
  netWeight: 0,
  cigratteIndustryId: null,
};

const UpdateTaungyiQuitStock = ({
  updateOpen,
  setUpdateOpen,
  selectedId,
}: Props) => {
  const taungyiExitStock = useAppSelector(
    (store) => store.taungyiExitStock.item
  );
  const selectedTaungyiExitStock = taungyiExitStock.find(
    (item) => item.id === selectedId
  );
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
  const [updateTaungyiExitStock, setUpdateTaungyiExitStock] =
    useState<updateTaungyiExitStock>(defaultValue);

  useEffect(() => {
    if (selectedTaungyiExitStock) {
      setSelectedDate(selectedTaungyiExitStock.date);
      setUpdateTaungyiExitStock({
        ...updateTaungyiExitStock,
        id: selectedId,
        date: selecteddate,
        cigratteIndustryId: selectedTaungyiExitStock.cigratteIndustryId,
        storeId: selectedTaungyiExitStock.storeId,
        tolBatchNo: selectedTaungyiExitStock.tolBatchNo,
        netWeight: selectedTaungyiExitStock.netWeight,
      });
    }
  }, [selectedTaungyiExitStock, updateOpen]);

  useEffect(() => {
    setUpdateTaungyiExitStock({
      ...updateTaungyiExitStock,
      date: selecteddate,
    });
  }, [selecteddate]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedTaungyiExitStock({
        ...updateTaungyiExitStock,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateTaungyiExitStock(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Update Stock exiting success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  const handleBatch = (batch: number) => {
    const netWeight = batch * 20;
    setUpdateTaungyiExitStock({
      ...updateTaungyiExitStock,
      netWeight,
      tolBatchNo: batch,
    });
  };
  if (!selectedTaungyiExitStock) return null;
  return (
    <>
      <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
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
                  defaultValue={selectedTaungyiExitStock.storeId}
                  value={updateTaungyiExitStock.storeId}
                  onChange={(evt) => {
                    setUpdateTaungyiExitStock({
                      ...updateTaungyiExitStock,
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
                defaultValue={selectedTaungyiExitStock.tolBatchNo}
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
                value={updateTaungyiExitStock.netWeight}
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
              setUpdateOpen(false);
              setUpdateTaungyiExitStock(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            onClick={handleClick}
            loading={isLoading}
          >
            ပြင်ဆင်မည်
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default UpdateTaungyiQuitStock;
