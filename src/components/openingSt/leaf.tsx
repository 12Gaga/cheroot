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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LoadingButton } from "@mui/lab";
import { createNewLeafStock } from "@/types/leafStockType";
import leafStock, {
  CreateLeafStock,
  setIsLoading,
} from "@/store/slices/leafStock";
import { setOpenSnackbar } from "@/store/slices/snackBar";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createNewLeafStock = {
  date: null,
  typeOfLeafId: undefined,
  batchNo: 0,
  viss: 0,
  shopId: 0,
  garageId: undefined,
};

const LeafOpen = ({ open, setOpen }: Props) => {
  const [selecteddate, setSelectedDate] = useState<any>(new Date());
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
  const [newLeafStock, setNewLeafStock] =
    useState<createNewLeafStock>(defaultValue);

  const { isLoading } = useAppSelector((store) => store.leafStock);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateLeafStock({
        ...newLeafStock,
        onSuccess: () => {
          setOpen(false);
          setNewLeafStock(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Create new leaf Stock success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  const handelLeaf = (leafId: number) => {
    const leaf = leafstock.filter(
      (item) =>
        item.typeOfLeafId === leafId && item.garageId === newLeafStock.garageId
    );
    const batchno = leaf.length && leaf[leaf.length - 1].batchNo;

    setNewLeafStock({
      ...newLeafStock,
      typeOfLeafId: leafId,
      batchNo: batchno ? batchno + 1 : 1,
    });
  };

  const handelGarage = (garageId: number) => {
    const leaf = leafstock.filter(
      (item) =>
        item.typeOfLeafId === newLeafStock.typeOfLeafId &&
        item.garageId === garageId
    );
    const batchno = leaf.length && leaf[leaf.length - 1].batchNo;
    console.log("batcj", leaf);
    setNewLeafStock({
      ...newLeafStock,
      garageId: garageId,
      batchNo: batchno ? batchno + 1 : 1,
    });
  };

  useEffect(() => {
    setNewLeafStock({ ...newLeafStock, date: selecteddate });
  }, [selecteddate, open]);
  console.log("dhf", newLeafStock);
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}>
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
            <DatePicker
              selected={selecteddate}
              onChange={(date) => {
                setSelectedDate(date);
              }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဂိုထောင်</Typography>
            <FormControl variant="filled" sx={{ width: 350 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={newLeafStock.garageId}
                onChange={(evt) => handelGarage(Number(evt.target.value))}
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
            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ဝယ်ယူခဲ့သည့်ဆိုင်
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={newLeafStock.shopId}
                  onChange={(evt) => {
                    setNewLeafStock({
                      ...newLeafStock,
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

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>ဖက်အမျိုးအစား</Typography>
              <FormControl variant="filled" sx={{ width: 350 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={newLeafStock.typeOfLeafId}
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

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>ပိုနံပါတ်</Typography>
              <TextField
                value={newLeafStock.batchNo}
                placeholder="ပိုနံပါတ်"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={(evt) => {}}
              />
            </Box>

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>ပိဿာ</Typography>
              <TextField
                placeholder="ပိဿာ"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={(evt) =>
                  setNewLeafStock({
                    ...newLeafStock,
                    viss: Number(evt.target.value),
                  })
                }
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
              setNewLeafStock(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newLeafStock.typeOfLeafId ||
              !newLeafStock.batchNo ||
              !newLeafStock.viss ||
              !newLeafStock.garageId ||
              !newLeafStock.shopId
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
export default LeafOpen;
