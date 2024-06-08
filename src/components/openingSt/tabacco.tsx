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
import { createNewTabaccoStock } from "@/types/tabaccoStockType";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { CreateTabaccoStock, setIsLoading } from "@/store/slices/tabaccoStock";
import { LoadingButton } from "@mui/lab";
import { TypeOfShop } from "@prisma/client";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createNewTabaccoStock = {
  date: null,
  typeOfTabaccoId: undefined,
  tin: 0,
  pyi: 0,
  bag: 0,
  shopId: 0,
  garageId: undefined,
};

const TabaccoOpen = ({ open, setOpen }: Props) => {
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
  const tabacco = useAppSelector((store) => store.typeOfTabacco.item);
  const concernTabacco = tabacco.filter(
    (item) => item.workShopId === workShop?.id
  );
  const [newTabaccoStock, setNewTabaccoStock] =
    useState<createNewTabaccoStock>(defaultValue);

  const shopTiltes = useAppSelector((store) => store.shopTitle.item).filter(
    (s) => s.workShopId === workShop?.id
  );
  const [showShop, setShowShop] = useState<TypeOfShop[]>([]);
  const [titleId, setTitleId] = useState<number | null>(null);
  const { isLoading } = useAppSelector((store) => store.tabaccoStock);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setNewTabaccoStock({ ...newTabaccoStock, date: selecteddate });
  }, [selecteddate, open]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateTabaccoStock({
        ...newTabaccoStock,
        onSuccess: () => {
          setOpen(false);
          setNewTabaccoStock(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Create new tabacco Stock success" })
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
          setOpen(false), setNewTabaccoStock(defaultValue);
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
                value={newTabaccoStock.garageId}
                onChange={(evt) => {
                  setNewTabaccoStock({
                    ...newTabaccoStock,
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
                  value={newTabaccoStock.shopId}
                  onChange={(evt) => {
                    setNewTabaccoStock({
                      ...newTabaccoStock,
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
                ဆေးစပ်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 350 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={newTabaccoStock.typeOfTabaccoId}
                  onChange={(evt) => {
                    setNewTabaccoStock({
                      ...newTabaccoStock,
                      typeOfTabaccoId: Number(evt.target.value),
                    });
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernTabacco.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>တင်း</Typography>
              <TextField
                placeholder="တင်း"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={(evt) => {
                  setNewTabaccoStock({
                    ...newTabaccoStock,
                    tin: Number(evt.target.value),
                  });
                }}
              />
            </Box>

            <Box sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>ပြည်</Typography>
              <TextField
                placeholder="ပြည်"
                sx={{ bgcolor: "#EEE8CF", width: 350 }}
                onChange={(evt) => {
                  setNewTabaccoStock({
                    ...newTabaccoStock,
                    pyi: Number(evt.target.value),
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
                  setNewTabaccoStock({
                    ...newTabaccoStock,
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
              setNewTabaccoStock(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newTabaccoStock.typeOfTabaccoId ||
              !newTabaccoStock.tin ||
              !newTabaccoStock.pyi ||
              !newTabaccoStock.bag ||
              !newTabaccoStock.garageId ||
              !newTabaccoStock.shopId
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
export default TabaccoOpen;
