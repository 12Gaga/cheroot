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
import { UpdatedLeafAddStock, setIsLoading } from "@/store/slices/leafStock";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { updateLeafAddStock } from "@/types/leafStockType";
import { LoadingButton } from "@mui/lab";
import { TypeOfShop } from "@prisma/client";

interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedStockSeq: string;
}

const defaultValue: updateLeafAddStock = {
  stockSeq: "",
  date: null,
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
  const leafstock = useAppSelector((item) => item.leafStock.item).filter(
    (item) => item.garageId === garageId
  );
  const [updateLeafAddStock, setUpdateLeafAddStock] =
    useState<updateLeafAddStock>(defaultValue);
  const shopTiltes = useAppSelector((store) => store.shopTitle.item).filter(
    (s) => s.workShopId === workShop?.id
  );
  const [showShop, setShowShop] = useState<TypeOfShop[]>([]);
  const [titleId, setTitleId] = useState<number | null>(null);

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

  const handelLeaf = (leafId: number) => {
    const leaf = leafstock.filter((item) => item.typeOfLeafId === leafId);
    const batchno = leaf.length && leaf[leaf.length - 1].batchNo;

    setUpdateLeafAddStock({
      ...updateLeafAddStock,
      typeOfLeafId: leafId,
      batchNo: batchno ? batchno + 1 : 1,
    });
  };

  const handleShopTitle = (shopTitleId: number) => {
    const data = concernShop.filter((s) => s.shopTitleId === shopTitleId);
    setShowShop(data);
    setTitleId(shopTitleId);
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
    setShowShop(concernShop);
  }, [selectedLeafStock, selectedLeafAddStock, updateOpen]);
  useEffect(() => {
    setUpdateLeafAddStock({ ...updateLeafAddStock, date: selecteddate });
  }, [selecteddate]);

  if (!(selectedLeafStock && selectedLeafAddStock)) return null;
  return (
    <>
      <Dialog
        open={updateOpen}
        onClose={() => {
          setUpdateOpen(false), setUpdateLeafAddStock(defaultValue);
        }}
      >
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Box sx={{ mt: 2, mr: 3 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                ဆိုင်ခေါင်းစဉ်
              </Typography>
              <FormControl variant="filled" sx={{ width: 300 }}>
                <Select
                  value={titleId}
                  onChange={(evt) => handleShopTitle(Number(evt.target.value))}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {shopTiltes.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
              <DatePicker
                selected={selecteddate}
                onChange={(date) => setSelectedDate(date as Date)}
              />
            </Box>
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
                  {showShop.map((item) => (
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
                value={updateLeafAddStock.batchNo}
                defaultValue={selectedLeafStock.batchNo}
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
