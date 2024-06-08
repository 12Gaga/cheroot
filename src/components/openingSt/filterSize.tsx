import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
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
import { createNewFilterSizeStock } from "@/types/filterSizeStockType";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import {
  CreateFilterSizeStock,
  setIsLoading,
} from "@/store/slices/filterSizeStock";
import { LoadingButton } from "@mui/lab";
import { TypeOfShop } from "@prisma/client";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createNewFilterSizeStock = {
  date: null,
  typeOfFilterSizeId: undefined,
  quantity: 0,
  bag: 0,
  shopId: 0,
  garageId: undefined,
};

const FilterSizeOpen = ({ open, setOpen }: Props) => {
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
  const filterSizes = useAppSelector((store) => store.typeOfFilterSize.item);
  const concernFilterSizes = filterSizes.filter(
    (item) => item.workShopId === workShop?.id
  );
  const [newFilterSizeStock, setNewFilterSizeStock] =
    useState<createNewFilterSizeStock>(defaultValue);
  const shopTiltes = useAppSelector((store) => store.shopTitle.item).filter(
    (s) => s.workShopId === workShop?.id
  );
  const [showShop, setShowShop] = useState<TypeOfShop[]>([]);
  const [titleId, setTitleId] = useState<number | null>(null);

  const { isLoading } = useAppSelector((store) => store.filterSizeStock);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setNewFilterSizeStock({ ...newFilterSizeStock, date: selecteddate });
  }, [selecteddate, open]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateFilterSizeStock({
        ...newFilterSizeStock,
        onSuccess: () => {
          setOpen(false);
          setNewFilterSizeStock(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Create new filter size Stock success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  const handleShopTitle = (shopTitleId: number) => {
    const data = concernShop.filter((s) => s.shopTitleId === shopTitleId);
    setShowShop(data);
    setTitleId(shopTitleId);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setNewFilterSizeStock(defaultValue);
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
              onChange={(date) => setSelectedDate(date as Date)}
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
                value={newFilterSizeStock.garageId}
                onChange={(evt) => {
                  setNewFilterSizeStock({
                    ...newFilterSizeStock,
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
            <Box sx={{ alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ဝယ်ယူခဲ့သည့်ဆိုင်
              </Typography>
              <FormControl variant="filled" sx={{ width: 350 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={newFilterSizeStock.shopId}
                  onChange={(evt) => {
                    setNewFilterSizeStock({
                      ...newFilterSizeStock,
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
              <Typography sx={{ fontWeight: "bold" }}>
                အဆီခံအမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 350 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={newFilterSizeStock.typeOfFilterSizeId}
                  onChange={(evt) => {
                    setNewFilterSizeStock({
                      ...newFilterSizeStock,
                      typeOfFilterSizeId: Number(evt.target.value),
                    });
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernFilterSizes.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontWeight: "bold" }}>အရေအတွက်</Typography>
              <TextField
                placeholder="အရေအတွက်"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={(evt) => {
                  setNewFilterSizeStock({
                    ...newFilterSizeStock,
                    quantity: Number(evt.target.value),
                  });
                }}
              />
            </Box>

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>အိတ်</Typography>
              <TextField
                placeholder="အိတ်"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={(evt) => {
                  setNewFilterSizeStock({
                    ...newFilterSizeStock,
                    bag: Number(evt.target.value),
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
              setNewFilterSizeStock(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newFilterSizeStock.typeOfFilterSizeId ||
              !newFilterSizeStock.quantity ||
              !newFilterSizeStock.bag ||
              !newFilterSizeStock.garageId ||
              !newFilterSizeStock.shopId
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
export default FilterSizeOpen;
