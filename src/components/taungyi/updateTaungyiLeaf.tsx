import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import {
  UpdatedTaungyiEnterStock,
  setIsLoading,
} from "@/store/slices/taungyiEnterStock";
import {
  addNewTaungyiEnterStock,
  updateTaungyiEnterStock,
} from "@/types/taungyiEnterStock";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  DialogActions,
  Button,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateTaungyiEnterStock = {
  id: null,
  date: "",
  storeId: null,
  banquetId: null,
  tolBatchNo: 0,
  netWeight: 0,
  netPrice: 0,
  tolNetPrice: 0,
  packingFees: 0,
  tolPackingFees: 0,
  totalPrice: 0,
  cigratteIndustryId: null,
};

const UpdateTaungyiLeaf = ({
  updateOpen,
  setUpdateOpen,
  selectedId,
}: Props) => {
  const taungyiEnterStock = useAppSelector(
    (store) => store.taungyiEnterStock.item
  );
  const selectedTaungyiEnterStock = taungyiEnterStock.find(
    (item) => item.id === selectedId
  );
  const [selecteddate, setSelectedDate] = useState<any>(
    new Date().toLocaleDateString()
  );
  const { isLoading } = useAppSelector((store) => store.taungyiEnterStock);
  const dispatch = useAppDispatch();
  const cigratteIndustryId = useAppSelector((store) => store.industry.item)?.id;
  const stores = useAppSelector((store) => store.typeOfStore.item);
  const concernStores = stores.filter(
    (item) => item.cigratteIndustryId === cigratteIndustryId
  );
  const banquets = useAppSelector((store) => store.typeOfBanquet.item);
  const concernBanquet = banquets.filter(
    (item) => item.cigratteIndustryId === cigratteIndustryId
  );
  const [updateTaungyiEnterStock, setUpdateTaungyiEnterStock] =
    useState<updateTaungyiEnterStock>(defaultValue);

  useEffect(() => {
    if (selectedTaungyiEnterStock) {
      setSelectedDate(selectedTaungyiEnterStock.date);
      setUpdateTaungyiEnterStock({
        ...updateTaungyiEnterStock,
        id: selectedId,
        date: selecteddate,
        cigratteIndustryId: selectedTaungyiEnterStock.cigratteIndustryId,
        storeId: selectedTaungyiEnterStock.storeId,
        banquetId: selectedTaungyiEnterStock.banquetId,
        tolBatchNo: selectedTaungyiEnterStock.tolBatchNo,
        netWeight: selectedTaungyiEnterStock.netWeight,
        netPrice: selectedTaungyiEnterStock.netPrice,
        tolNetPrice: selectedTaungyiEnterStock.tolNetPrice,
        packingFees: selectedTaungyiEnterStock.packingFees,
        tolPackingFees: selectedTaungyiEnterStock.tolPackingFees,
        totalPrice: selectedTaungyiEnterStock.totalPrice,
      });
    }
  }, [selectedTaungyiEnterStock, updateOpen]);

  useEffect(() => {
    setUpdateTaungyiEnterStock({
      ...updateTaungyiEnterStock,
      date: selecteddate,
    });
  }, [selecteddate]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedTaungyiEnterStock({
        ...updateTaungyiEnterStock,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateTaungyiEnterStock(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Update taungyi stock success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  const handleBatch = (batch: number) => {
    const netWeight = batch * 20;
    const tolNetPrice = netWeight * updateTaungyiEnterStock.netPrice;
    const tolPackprice = batch * updateTaungyiEnterStock.packingFees;
    const tolPrice = tolNetPrice + tolPackprice;
    setUpdateTaungyiEnterStock({
      ...updateTaungyiEnterStock,
      tolBatchNo: batch,
      netWeight,
      tolNetPrice,
      tolPackingFees: tolPackprice,
      totalPrice: tolPrice,
    });
  };
  const handlePrice = (price: number) => {
    const tolNetPrice = updateTaungyiEnterStock.netWeight * price;
    const tolPrice = tolNetPrice + updateTaungyiEnterStock.tolPackingFees;
    setUpdateTaungyiEnterStock({
      ...updateTaungyiEnterStock,
      netPrice: price,
      tolNetPrice,
      totalPrice: tolPrice,
    });
  };
  const handlePack = (packPrice: number) => {
    const tolPackprice = packPrice * updateTaungyiEnterStock.tolBatchNo;
    const tolPrice = updateTaungyiEnterStock.tolNetPrice + tolPackprice;
    setUpdateTaungyiEnterStock({
      ...updateTaungyiEnterStock,
      packingFees: packPrice,
      tolPackingFees: tolPackprice,
      totalPrice: tolPrice,
    });
  };
  if (!selectedTaungyiEnterStock) return null;
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
                  defaultValue={selectedTaungyiEnterStock.storeId}
                  value={updateTaungyiEnterStock.storeId}
                  onChange={(evt) => {
                    setUpdateTaungyiEnterStock({
                      ...updateTaungyiEnterStock,
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

            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ပွဲရုံနာမည်
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectedTaungyiEnterStock.banquetId}
                  value={updateTaungyiEnterStock.banquetId}
                  onChange={(evt) => {
                    setUpdateTaungyiEnterStock({
                      ...updateTaungyiEnterStock,
                      banquetId: Number(evt.target.value),
                    });
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernBanquet.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                လုံးရေ
              </Typography>
              <TextField
                defaultValue={selectedTaungyiEnterStock.tolBatchNo}
                placeholder="လုံးရေ"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  handleBatch(Number(evt.target.value));
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ကုန်ချိန်
              </Typography>
              <TextField
                value={updateTaungyiEnterStock.netWeight}
                placeholder="ကုန်ချိန်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {}}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ကုန်ချိန်နှုန်း
              </Typography>
              <TextField
                defaultValue={selectedTaungyiEnterStock.netPrice}
                placeholder="ကုန်ချိန်နှုန်း"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  handlePrice(Number(evt.target.value));
                }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ကုန်ချိန်သင့်ငွေ
              </Typography>
              <TextField
                value={updateTaungyiEnterStock.tolNetPrice}
                placeholder="ကုန်ချိန်သင့်ငွေ"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {}}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ထုတ်ပိုးခနှုန်း
              </Typography>
              <TextField
                defaultValue={selectedTaungyiEnterStock.packingFees}
                placeholder="ထုတ်ပိုးခနှုန်း"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  handlePack(Number(evt.target.value));
                }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ထုတ်ပိုးခသင့်ငွေ
              </Typography>
              <TextField
                value={updateTaungyiEnterStock.tolPackingFees}
                placeholder="ထုတ်ပိုးခသင့်ငွေ"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {}}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                စုစုပေါင်းသင့်ငွေ
              </Typography>
              <TextField
                value={updateTaungyiEnterStock.totalPrice}
                placeholder="စုစုပေါင်းသင့်ငွေ"
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
              setUpdateTaungyiEnterStock(defaultValue);
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
export default UpdateTaungyiLeaf;
