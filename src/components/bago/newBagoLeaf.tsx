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
} from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { createNewBagoLeaf } from "@/types/bagoLeafType";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CreateBagoLeaf, setIsLoading } from "@/store/slices/bagoLeaf";
import { setOpenSnackbar } from "@/store/slices/snackBar";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const defaultValue: createNewBagoLeaf = {
  date: "",
  shopId: null,
  typeOfLeafId: null,
  netWeight: 0,
  netPrice: 0,
  totalPrice: 0,
};

const NewBagoLeaf = ({ open, setOpen }: Props) => {
  const [selecteddate, setSelectedDate] = useState<any>(
    new Date().toLocaleDateString()
  );
  const [newBagoLeaf, setNewBagoLeaf] =
    useState<createNewBagoLeaf>(defaultValue);
  const dispatch = useAppDispatch();
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const concernLeaves = leaves.filter(
    (item) => item.workShopId === workShop?.id
  );
  const shops = useAppSelector((store) => store.typeOfShop.item);
  const concernShop = shops.filter((item) => item.workShopId === workShop?.id);
  const { isLoading } = useAppSelector((store) => store.bagoLeaf);
  const handleWeight = (weight: number) => {
    const tolamount = weight * newBagoLeaf.netPrice;
    setNewBagoLeaf({
      ...newBagoLeaf,
      netWeight: weight,
      totalPrice: tolamount,
    });
  };
  const handlePrice = (price: number) => {
    const tolamount = newBagoLeaf.netWeight * price;
    setNewBagoLeaf({
      ...newBagoLeaf,
      netPrice: price,
      totalPrice: tolamount,
    });
  };
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateBagoLeaf({
        ...newBagoLeaf,
        onSuccess: () => {
          setOpen(false);
          setNewBagoLeaf(defaultValue);
          dispatch(setOpenSnackbar({ message: "Add Leaf Purchase success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  useEffect(() => {
    setNewBagoLeaf({ ...newBagoLeaf, date: selecteddate });
  }, [selecteddate, open]);

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
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
                ဆိုင်နာမည်
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={newBagoLeaf.shopId}
                  onChange={(evt) => {
                    setNewBagoLeaf({
                      ...newBagoLeaf,
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

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ဖက်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={newBagoLeaf.typeOfLeafId}
                  onChange={(evt) => {
                    setNewBagoLeaf({
                      ...newBagoLeaf,
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
                value={newBagoLeaf.totalPrice}
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
              setOpen(false);
              setNewBagoLeaf(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newBagoLeaf.date ||
              !newBagoLeaf.shopId ||
              !newBagoLeaf.typeOfLeafId ||
              !newBagoLeaf.netWeight ||
              !newBagoLeaf.netPrice ||
              !newBagoLeaf.totalPrice
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
export default NewBagoLeaf;
