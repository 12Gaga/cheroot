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
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { LoadingButton } from "@mui/lab";
import { updatePlasticStock } from "@/types/plasticStockType";
import { UpdatedPlasticStock, setIsLoading } from "@/store/slices/plasticStock";
import { TypeOfShop } from "@prisma/client";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updatePlasticStock = {
  id: null,
  date: null,
  typeOfPlasticId: undefined,
  quantity: 0,
  bag: 0,
  shopId: 0,
  garageId: undefined,
};

const UpdatePlasticOpen = ({
  updateOpen,
  setUpdateOpen,
  selectedId,
}: Props) => {
  const plasticStock = useAppSelector((item) => item.plasticStock.item);
  const selectPlasticStock = plasticStock.find(
    (item) => item.id === selectedId
  );
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const { item: garages, selectedGarage } = useAppSelector(
    (store) => store.garage
  );
  const concernGarage = garages.filter(
    (item) => item.workShopId === workShop?.id
  );
  const plastic = useAppSelector((store) => store.typeOfPlastic.item);
  const concernPlastic = plastic.filter(
    (item) => item.workShopId === workShop?.id
  );
  const [updatePlasticStock, setUpdatePlasticStock] =
    useState<updatePlasticStock>(defaultValue);
  const shopTiltes = useAppSelector((store) => store.shopTitle.item).filter(
    (s) => s.workShopId === workShop?.id
  );
  const [showShop, setShowShop] = useState<TypeOfShop[]>([]);
  const [titleId, setTitleId] = useState<number | null>(null);

  const { isLoading } = useAppSelector((store) => store.plasticStock);
  const dispatch = useAppDispatch();
  const shops = useAppSelector((store) => store.typeOfShop.item);
  const concernShop = shops.filter((item) => item.workShopId === workShop?.id);

  useEffect(() => {
    if (selectPlasticStock) {
      setSelectedDate(selectPlasticStock.date);
      setUpdatePlasticStock({
        ...updatePlasticStock,
        id: selectedId,
        date: selecteddate,
        typeOfPlasticId: selectPlasticStock.plasticId,
        quantity: selectPlasticStock.quantity,
        bag: selectPlasticStock.bag,
        shopId: selectPlasticStock.shopId,
        garageId: selectPlasticStock.garageId,
      });
    }
    setShowShop(concernShop);
  }, [selectPlasticStock, updateOpen]);

  useEffect(() => {
    setUpdatePlasticStock({
      ...updatePlasticStock,
      date: selecteddate,
    });
  }, [selecteddate]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedPlasticStock({
        ...updatePlasticStock,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdatePlasticStock(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Update plastic Stock success" })
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
  if (!selectPlasticStock) return null;
  return (
    <>
      <Dialog
        open={updateOpen}
        onClose={() => {
          setUpdateOpen(false), setUpdatePlasticStock(defaultValue);
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
                defaultValue={selectPlasticStock.garageId}
                value={updatePlasticStock.garageId}
                onChange={(evt) => {
                  setUpdatePlasticStock({
                    ...updatePlasticStock,
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
            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ဝယ်ယူခဲ့သည့်ဆိုင်
              </Typography>
              <FormControl variant="filled" sx={{ width: 350 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectPlasticStock.shopId}
                  value={updatePlasticStock.shopId}
                  onChange={(evt) => {
                    setUpdatePlasticStock({
                      ...updatePlasticStock,
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
                ပလပ်စတစ်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 350 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectPlasticStock.plasticId}
                  value={updatePlasticStock.typeOfPlasticId}
                  onChange={(evt) => {
                    setUpdatePlasticStock({
                      ...updatePlasticStock,
                      typeOfPlasticId: Number(evt.target.value),
                    });
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernPlastic.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>အိတ်</Typography>
              <TextField
                defaultValue={selectPlasticStock.bag}
                placeholder="အိတ်"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={(evt) => {
                  setUpdatePlasticStock({
                    ...updatePlasticStock,
                    bag: Number(evt.target.value),
                  });
                }}
              />
            </Box>

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>အရေအတွက်</Typography>
              <TextField
                defaultValue={selectPlasticStock.quantity}
                placeholder="အရေအတွက်"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={(evt) => {
                  setUpdatePlasticStock({
                    ...updatePlasticStock,
                    quantity: Number(evt.target.value),
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
              setUpdatePlasticStock(defaultValue);
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
export default UpdatePlasticOpen;
