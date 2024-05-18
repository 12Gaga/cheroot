import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  CreateLeafAddStock,
  CreateLeafStock,
  UpdatedLeafAddStock,
  setIsLoading,
} from "@/store/slices/leafStock";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import {
  createNewLeafAddStock,
  updateLeafAddStock,
} from "@/types/leafStockType";
import { LoadingButton } from "@mui/lab";

interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedStockSeq: string;
}

const defaultValue: updateLeafAddStock = {
  stockSeq: "",
  date: "",
  invNo: 0,
  carNo: "",
  typeOfLeafId: undefined,
  batchNo: 0,
  viss: 0,
  shopId: 0,
  garageId: undefined,
};

const UpdateAddLeaf = ({
  updateOpen,
  setUpdateOpen,
  selectedStockSeq,
}: Props) => {
  const leafStock = useAppSelector((store) => store.leafStock.item);
  const selectedLeafStock = leafStock.find(
    (item) => item.stockSeq === selectedStockSeq
  );
  const leafAddStock = useAppSelector((store) => store.addStock.item);
  const selectedLeafAddStock = leafAddStock.find(
    (item) => item.stockSeq === selectedStockSeq
  );
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
  const shops = useAppSelector((store) => store.typeOfShop.item);
  const concernShop = shops.filter((item) => item.workShopId === workShop?.id);

  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const concernleaves = leaves.filter(
    (item) => item.workShopId === workShop?.id
  );
  const [updateLeafAddStock, setUpdateLeafAddStock] =
    useState<updateLeafAddStock>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.leafStock);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedLeafAddStock({
        ...updateLeafAddStock,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateLeafAddStock(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Updated leaf add Stock success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  useEffect(() => {
    if (selectedLeafStock && selectedLeafAddStock) {
      setSelectedDate(selectedLeafStock.date);
      setUpdateLeafAddStock({
        ...updateLeafAddStock,
        stockSeq: selectedStockSeq,
        date: selecteddate,
        invNo: selectedLeafAddStock.invNo,
        carNo: selectedLeafAddStock.carNo,
        typeOfLeafId: selectedLeafStock.typeOfLeafId,
        batchNo: selectedLeafStock.batchNo,
        viss: selectedLeafStock.viss,
        shopId: selectedLeafStock.shopId,
        garageId: selectedLeafStock.garageId,
      });
    }
  }, [selectedLeafStock, selectedLeafAddStock, updateOpen]);
  useEffect(() => {
    setUpdateLeafAddStock({ ...updateLeafAddStock, date: selecteddate });
  }, [selecteddate]);

  if (!(selectedLeafStock && selectedLeafAddStock)) return null;
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
              flexWrap: "wrap",
              justifyContent: "space-around",
              mt: 2,
              gap: 2,
            }}
          >
            <Box sx={{ mt: 2, width: 150 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                ဘောက်ချာနံပါတ်
              </Typography>
              <TextField
                defaultValue={selectedLeafAddStock.invNo}
                placeholder="ဘောက်ချာနံပါတ်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateLeafAddStock({
                    ...updateLeafAddStock,
                    invNo: Number(evt.target.value),
                  });
                }}
              />
            </Box>

            <Box sx={{ mt: 2, width: 150 }}>
              <Typography sx={{ fontWeight: "bold" }}>ကားနံပါတ်</Typography>
              <TextField
                defaultValue={selectedLeafAddStock.carNo}
                placeholder="ကားနံပါတ်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateLeafAddStock({
                    ...updateLeafAddStock,
                    carNo: evt.target.value,
                  });
                }}
              />
            </Box>

            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ဝယ်ယူခဲ့သည့်ဆိုင်
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectedLeafStock.shopId}
                  value={updateLeafAddStock.shopId}
                  onChange={(evt) => {
                    setUpdateLeafAddStock({
                      ...updateLeafAddStock,
                      shopId: Number(evt.target.value),
                    });
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernShop.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
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
                ဂိုထောင်
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  defaultValue={selectedLeafStock.garageId}
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={updateLeafAddStock.garageId}
                  onChange={(evt) => {
                    setUpdateLeafAddStock({
                      ...updateLeafAddStock,
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

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ဖက်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectedLeafStock.typeOfLeafId}
                  value={updateLeafAddStock.typeOfLeafId}
                  onChange={(evt) => {
                    setUpdateLeafAddStock({
                      ...updateLeafAddStock,
                      typeOfLeafId: Number(evt.target.value),
                    });
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernleaves.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ပိုနံပါတ်
              </Typography>
              <TextField
                defaultValue={selectedLeafStock.batchNo}
                placeholder="ပိုနံပါတ်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateLeafAddStock({
                    ...updateLeafAddStock,
                    batchNo: Number(evt.target.value),
                  });
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ပိဿာ
              </Typography>
              <TextField
                defaultValue={selectedLeafStock.viss}
                placeholder="ပိဿာ"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateLeafAddStock({
                    ...updateLeafAddStock,
                    viss: Number(evt.target.value),
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
              setUpdateLeafAddStock(defaultValue);
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
export default UpdateAddLeaf;
