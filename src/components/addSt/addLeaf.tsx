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
import { CreateLeafAddStock, setIsLoading } from "@/store/slices/leafStock";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { createNewLeafAddStock } from "@/types/leafStockType";
import { LoadingButton } from "@mui/lab";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createNewLeafAddStock = {
  date: null,
  invNo: 0,
  carNo: "",
  typeOfLeafId: undefined,
  batchNo: 0,
  viss: 0,
  shopId: 0,
  garageId: undefined,
};

const AddLeaf = ({ open, setOpen }: Props) => {
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
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
  const garageId = useAppSelector((store) => store.garage.selectedGarage)
    ?.id as number;
  const leafstock = useAppSelector((item) => item.leafStock.item);
  const [newLeafAddStock, setNewLeafAddStock] =
    useState<createNewLeafAddStock>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.leafStock);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateLeafAddStock({
        ...newLeafAddStock,
        onSuccess: () => {
          setOpen(false);
          setNewLeafAddStock(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Create new leaf add Stock success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  const handelLeaf = (leafId: number) => {
    const leaf = leafstock.filter(
      (item) =>
        item.typeOfLeafId === leafId &&
        item.garageId === newLeafAddStock.garageId
    );
    const batchno = leaf.length && leaf[leaf.length - 1].batchNo;
    console.log("batcj", leaf);
    setNewLeafAddStock({
      ...newLeafAddStock,
      typeOfLeafId: leafId,
      batchNo: batchno ? batchno + 1 : 1,
    });
  };

  const handelGarage = (garageId: number) => {
    const leaf = leafstock.filter(
      (item) =>
        item.typeOfLeafId === newLeafAddStock.typeOfLeafId &&
        item.garageId === garageId
    );
    const batchno = leaf.length && leaf[leaf.length - 1].batchNo;
    console.log("batcj", leaf);
    setNewLeafAddStock({
      ...newLeafAddStock,
      garageId: garageId,
      batchNo: batchno ? batchno + 1 : 1,
    });
  };

  useEffect(() => {
    setNewLeafAddStock({ ...newLeafAddStock, date: selecteddate });
  }, [selecteddate, open]);
  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setNewLeafAddStock(defaultValue);
        }}
      >
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}>
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
            <DatePicker
              selected={selecteddate}
              onChange={(date) => setSelectedDate(date as Date)}
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
                placeholder="ဘောက်ချာနံပါတ်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setNewLeafAddStock({
                    ...newLeafAddStock,
                    invNo: Number(evt.target.value),
                  });
                }}
              />
            </Box>

            <Box sx={{ mt: 2, width: 150 }}>
              <Typography sx={{ fontWeight: "bold" }}>ကားနံပါတ်</Typography>
              <TextField
                placeholder="ကားနံပါတ်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setNewLeafAddStock({
                    ...newLeafAddStock,
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
                  value={newLeafAddStock.shopId}
                  onChange={(evt) => {
                    setNewLeafAddStock({
                      ...newLeafAddStock,
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
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={newLeafAddStock.garageId}
                  onChange={(evt) => {
                    handelGarage(Number(evt.target.value));
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
                  value={newLeafAddStock.typeOfLeafId}
                  onChange={(evt) => {
                    handelLeaf(Number(evt.target.value));
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
                value={newLeafAddStock.batchNo}
                placeholder="ပိုနံပါတ်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {}}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ပိဿာ
              </Typography>
              <TextField
                placeholder="ပိဿာ"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setNewLeafAddStock({
                    ...newLeafAddStock,
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
              setOpen(false);
              setNewLeafAddStock(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newLeafAddStock.invNo ||
              !newLeafAddStock.carNo ||
              !newLeafAddStock.typeOfLeafId ||
              !newLeafAddStock.batchNo ||
              !newLeafAddStock.viss ||
              !newLeafAddStock.garageId ||
              !newLeafAddStock.shopId
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
export default AddLeaf;
