import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
  DialogActions,
  Button,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { updateBagoLeaf } from "@/types/bagoLeafType";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UpdatedBagoLeaf, setIsLoading } from "@/store/slices/bagoLeaf";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { TypeOfShop } from "@prisma/client";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}
const defaultValue: updateBagoLeaf = {
  id: null,
  date: null,
  shopId: null,
  typeOfLeafId: null,
  netWeight: 0,
  netPrice: 0,
  totalPrice: 0,
};

const UpdateBagoLeaf = ({ updateOpen, setUpdateOpen, selectedId }: Props) => {
  const bagoLeaf = useAppSelector((store) => store.bagoLeaf.item);
  const selectBagoLeaf = bagoLeaf.find((item) => item.id === selectedId);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [updateBagoLeaf, setUpdateBagoLeaf] =
    useState<updateBagoLeaf>(defaultValue);
  const dispatch = useAppDispatch();
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const concernLeaves = leaves.filter(
    (item) => item.workShopId === workShop?.id
  );
  const shops = useAppSelector((store) => store.typeOfShop.item);
  const concernShop = shops.filter((item) => item.workShopId === workShop?.id);
  const shopTiltes = useAppSelector((store) => store.shopTitle.item).filter(
    (s) => s.workShopId === workShop?.id
  );
  const [showShop, setShowShop] = useState<TypeOfShop[]>([]);
  const [titleId, setTitleId] = useState<number | null>(null);

  const { isLoading } = useAppSelector((store) => store.bagoLeaf);

  useEffect(() => {
    if (selectBagoLeaf) {
      setSelectedDate(selectBagoLeaf.date);
      setUpdateBagoLeaf({
        ...updateBagoLeaf,
        id: selectedId,
        date: selecteddate,
        shopId: selectBagoLeaf.shopId,
        typeOfLeafId: selectBagoLeaf.typeOfLeafId,
        netWeight: selectBagoLeaf.netWeight,
        netPrice: selectBagoLeaf.netPrice,
        totalPrice: selectBagoLeaf.totalPrice,
      });
    }
    setShowShop(concernShop);
  }, [selectBagoLeaf, updateOpen]);

  useEffect(() => {
    setUpdateBagoLeaf({
      ...updateBagoLeaf,
      date: selecteddate,
    });
  }, [selecteddate]);

  const handleWeight = (weight: number) => {
    const tolamount = weight * updateBagoLeaf.netPrice;
    setUpdateBagoLeaf({
      ...updateBagoLeaf,
      netWeight: weight,
      totalPrice: tolamount,
    });
  };
  const handlePrice = (price: number) => {
    const tolamount = updateBagoLeaf.netWeight * price;
    setUpdateBagoLeaf({
      ...updateBagoLeaf,
      netPrice: price,
      totalPrice: tolamount,
    });
  };
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedBagoLeaf({
        ...updateBagoLeaf,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateBagoLeaf(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Update Leaf Purchase success" })
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
  if (!selectBagoLeaf) return null;
  return (
    <>
      <Dialog
        open={updateOpen}
        onClose={() => {
          setUpdateOpen(false), setUpdateBagoLeaf(defaultValue);
        }}
      >
        <DialogTitle>ပြင်ဆင်ခြင်း</DialogTitle>
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
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              mt: 5,
            }}
          >
            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ဆိုင်နာမည်
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectBagoLeaf.shopId}
                  value={updateBagoLeaf.shopId}
                  onChange={(evt) => {
                    setUpdateBagoLeaf({
                      ...updateBagoLeaf,
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

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ဖက်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectBagoLeaf.typeOfLeafId}
                  value={updateBagoLeaf.typeOfLeafId}
                  onChange={(evt) => {
                    setUpdateBagoLeaf({
                      ...updateBagoLeaf,
                      typeOfLeafId: Number(evt.target.value),
                    });
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernLeaves.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ကုန်ချိန်
              </Typography>
              <TextField
                defaultValue={selectBagoLeaf.netWeight}
                placeholder="ကုန်ချိန်"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  handleWeight(Number(evt.target.value));
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                နှုန်း
              </Typography>
              <TextField
                defaultValue={selectBagoLeaf.netPrice}
                placeholder="နှုန်း"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  handlePrice(Number(evt.target.value));
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                စုစုပေါင်းငွေ
              </Typography>
              <TextField
                value={updateBagoLeaf.totalPrice}
                placeholder="စုစုပေါင်းငွေ"
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
              setUpdateBagoLeaf(defaultValue);
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
export default UpdateBagoLeaf;
