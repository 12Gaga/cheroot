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
import { updateLeafStock } from "@/types/leafStockType";
import { UpdatedLeafStock, setIsLoading } from "@/store/slices/leafStock";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { TypeOfShop } from "@prisma/client";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateLeafStock = {
  id: null,
  date: null,
  typeOfLeafId: undefined,
  batchNo: 0,
  viss: 0,
  shopId: 0,
  garageId: undefined,
};

const UpdateLeafOpen = ({ updateOpen, setUpdateOpen, selectedId }: Props) => {
  const leafStock = useAppSelector((item) => item.leafStock.item);
  const selectLeafStock = leafStock.find((item) => item.id === selectedId);
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
  const leafstock = useAppSelector((item) => item.leafStock.item).filter(
    (item) => item.garageId === garageId
  );
  const [updateLeafStock, setUpdateLeafStock] =
    useState<updateLeafStock>(defaultValue);
  const shopTiltes = useAppSelector((store) => store.shopTitle.item).filter(
    (s) => s.workShopId === workShop?.id
  );
  const [showShop, setShowShop] = useState<TypeOfShop[]>([]);
  const [titleId, setTitleId] = useState<number | null>(null);

  const { isLoading } = useAppSelector((store) => store.leafStock);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectLeafStock) {
      setSelectedDate(selectLeafStock.date);
      setUpdateLeafStock({
        ...updateLeafStock,
        id: selectedId,
        date: selecteddate,
        typeOfLeafId: selectLeafStock.typeOfLeafId,
        batchNo: selectLeafStock.batchNo,
        viss: selectLeafStock.viss,
        shopId: selectLeafStock.shopId,
        garageId: selectLeafStock.garageId,
      });
    }
    setShowShop(concernShop);
  }, [selectLeafStock, updateOpen]);

  useEffect(() => {
    setUpdateLeafStock({
      ...updateLeafStock,
      date: selecteddate,
    });
  }, [selecteddate]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedLeafStock({
        ...updateLeafStock,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateLeafStock(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update leaf Stock success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  const handelLeaf = (leafId: number) => {
    const leaf = leafstock.filter((item) => item.typeOfLeafId === leafId);
    const batchno = leaf.length && leaf[leaf.length - 1].batchNo;

    setUpdateLeafStock({
      ...updateLeafStock,
      typeOfLeafId: leafId,
      batchNo: batchno ? batchno + 1 : 1,
    });
  };

  const handleShopTitle = (shopTitleId: number) => {
    const data = concernShop.filter((s) => s.shopTitleId === shopTitleId);
    setShowShop(data);
    setTitleId(shopTitleId);
  };

  if (!selectLeafStock) return null;

  return (
    <>
      <Dialog
        open={updateOpen}
        onClose={() => {
          setUpdateOpen(false), setUpdateLeafStock(defaultValue);
        }}
      >
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
            <DatePicker
              selected={selecteddate}
              onChange={(date) => {
                setSelectedDate(date);
              }}
            />
          </Box>

          <Box sx={{ mt: 2, mr: 3 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဆိုင်ခေါင်းစဉ်</Typography>
            <FormControl variant="filled" sx={{ width: 350 }}>
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

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဂိုထောင်</Typography>
            <FormControl variant="filled" sx={{ width: 350 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                defaultValue={selectLeafStock.garageId}
                value={updateLeafStock.garageId}
                onChange={(evt) =>
                  setUpdateLeafStock({
                    ...updateLeafStock,
                    garageId: Number(evt.target.value),
                  })
                }
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
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ဝယ်ယူခဲ့သည့်ဆိုင်
              </Typography>
              <FormControl variant="filled" sx={{ width: 350 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectLeafStock.shopId}
                  value={updateLeafStock.shopId}
                  onChange={(evt) => {
                    setUpdateLeafStock({
                      ...updateLeafStock,
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

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>ဖက်အမျိုးအစား</Typography>
              <FormControl variant="filled" sx={{ width: 350 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectLeafStock.typeOfLeafId}
                  value={updateLeafStock.typeOfLeafId}
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
                value={updateLeafStock.batchNo}
                defaultValue={selectLeafStock.batchNo}
                placeholder="ပိုနံပါတ်"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={(evt) => {}}
              />
            </Box>

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>ပိဿာ</Typography>
              <TextField
                defaultValue={selectLeafStock.viss}
                placeholder="ပိဿာ"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={(evt) =>
                  setUpdateLeafStock({
                    ...updateLeafStock,
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
              setUpdateOpen(false);
              setUpdateLeafStock(defaultValue);
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
export default UpdateLeafOpen;
