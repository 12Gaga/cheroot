import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import {
  AddTaungyiEnterStock,
  setIsLoading,
} from "@/store/slices/taungyiEnterStock";
import { addNewTaungyiEnterStock } from "@/types/taungyiEnterStock";
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
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: addNewTaungyiEnterStock = {
  date: null,
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

const NewTaungyiLeaf = ({ open, setOpen }: Props) => {
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
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
  const [newTaungyiEnterStock, setTaungyiEnterStock] =
    useState<addNewTaungyiEnterStock>(defaultValue);
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      AddTaungyiEnterStock({
        ...newTaungyiEnterStock,
        onSuccess: () => {
          setOpen(false);
          setTaungyiEnterStock(defaultValue);
          dispatch(setOpenSnackbar({ message: "Add taungyi stock success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  const handleBatch = (batch: number) => {
    const netWeight = batch * 20;
    const tolNetPrice = netWeight * newTaungyiEnterStock.netPrice;
    const tolPackprice = batch * newTaungyiEnterStock.packingFees;
    const tolPrice = tolNetPrice + tolPackprice;
    setTaungyiEnterStock({
      ...newTaungyiEnterStock,
      tolBatchNo: batch,
      netWeight,
      tolNetPrice,
      tolPackingFees: tolPackprice,
      totalPrice: tolPrice,
    });
  };
  const handlePrice = (price: number) => {
    const tolNetPrice = newTaungyiEnterStock.netWeight * price;
    const tolPrice = tolNetPrice + newTaungyiEnterStock.tolPackingFees;
    setTaungyiEnterStock({
      ...newTaungyiEnterStock,
      netPrice: price,
      tolNetPrice,
      totalPrice: tolPrice,
    });
  };
  const handlePack = (packPrice: number) => {
    const tolPackprice = packPrice * newTaungyiEnterStock.tolBatchNo;
    const tolPrice = newTaungyiEnterStock.tolNetPrice + tolPackprice;
    setTaungyiEnterStock({
      ...newTaungyiEnterStock,
      packingFees: packPrice,
      tolPackingFees: tolPackprice,
      totalPrice: tolPrice,
    });
  };
  useEffect(() => {
    if (cigratteIndustryId) {
      setTaungyiEnterStock({
        ...newTaungyiEnterStock,
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
              onChange={(date) => setSelectedDate(date as Date)}
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
                  value={newTaungyiEnterStock.storeId}
                  onChange={(evt) => {
                    setTaungyiEnterStock({
                      ...newTaungyiEnterStock,
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
                  value={newTaungyiEnterStock.banquetId}
                  onChange={(evt) => {
                    setTaungyiEnterStock({
                      ...newTaungyiEnterStock,
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
                value={newTaungyiEnterStock.netWeight}
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
                value={newTaungyiEnterStock.tolNetPrice}
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
                value={newTaungyiEnterStock.tolPackingFees}
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
                value={newTaungyiEnterStock.totalPrice}
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
              setOpen(false);
              setTaungyiEnterStock(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newTaungyiEnterStock.date ||
              !newTaungyiEnterStock.storeId ||
              !newTaungyiEnterStock.banquetId ||
              !newTaungyiEnterStock.netWeight ||
              !newTaungyiEnterStock.netPrice ||
              !newTaungyiEnterStock.tolNetPrice ||
              !newTaungyiEnterStock.packingFees ||
              !newTaungyiEnterStock.tolPackingFees ||
              !newTaungyiEnterStock.tolBatchNo ||
              !newTaungyiEnterStock.totalPrice
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
export default NewTaungyiLeaf;
