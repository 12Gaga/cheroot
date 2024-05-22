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
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { updateCherootTransfer } from "@/types/cherootTransfer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FormOfPacking, TypeOfPacking } from "@prisma/client";
import {
  UpdatedCherootTransfer,
  setIsLoading,
} from "@/store/slices/cherootTransfer";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { LoadingButton } from "@mui/lab";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateCherootTransfer = {
  id: null,
  date: "",
  conveyLocationId: null,
  typeOfCherootId: null,
  typeOfPackingId: null,
  formOfPackingId: null,
  quantity: 0,
  amount: 0,
  totalPrice: 0,
};

const UpdateTransferCherootData = ({
  updateOpen,
  setUpdateOpen,
  selectedId,
}: Props) => {
  const selectCherootTransfer = useAppSelector(
    (store) => store.cherootTransfer.item
  ).find((item) => item.id === selectedId);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.cherootTransfer);
  const [selecteddate, setSelectedDate] = useState<any>(
    new Date().toLocaleDateString()
  );
  const [updatecherootTransfer, setUpdateCherootTransfer] =
    useState<updateCherootTransfer>(defaultValue);
  const workshop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const locations = useAppSelector((store) => store.conveyLocation.item);
  const concernLocations = locations.filter(
    (item) => item.workShopId === workshop?.id
  );
  const concernCheroots = useAppSelector(
    (store) => store.typeOfCheroot.item
  ).filter((item) => item.workShopId === workshop?.id);
  const typeOfPacking = useAppSelector((store) => store.typeOfPacking.item);
  const formOfPacking = useAppSelector((store) => store.formOfPacking.item);
  const [concernPackingType, setConcernPackingType] = useState<TypeOfPacking[]>(
    []
  );
  const [concernPackingForm, setConcernPackingForm] = useState<FormOfPacking[]>(
    []
  );
  const handleCheroot = (cherootId: number) => {
    const packingType = typeOfPacking.filter(
      (item) => item.typeOfCherootId === cherootId
    );
    setConcernPackingType(packingType);
    setUpdateCherootTransfer({
      ...updatecherootTransfer,
      typeOfCherootId: cherootId,
    });
  };
  const handlePackingType = (packingTypeId: number) => {
    const packingForm = formOfPacking.filter(
      (item) => item.typeOfPackingId === packingTypeId
    );
    setConcernPackingForm(packingForm);
    setUpdateCherootTransfer({
      ...updatecherootTransfer,
      typeOfPackingId: packingTypeId,
    });
  };

  const handelFormType = (formTypeId: number) => {
    const exit = formOfPacking.find(
      (item) => item.id === formTypeId
    ) as FormOfPacking;
    const totalamount = updatecherootTransfer.quantity * exit.amount;

    setUpdateCherootTransfer({
      ...updatecherootTransfer,
      formOfPackingId: formTypeId,
      amount: exit.amount,
      totalPrice: totalamount,
    });
  };

  const handleQty = (qty: number) => {
    const totalamount = updatecherootTransfer.amount * qty;
    setUpdateCherootTransfer({
      ...updatecherootTransfer,
      quantity: qty,
      totalPrice: totalamount,
    });
  };

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedCherootTransfer({
        ...updatecherootTransfer,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateCherootTransfer(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Update cheroot transfer success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  useEffect(() => {
    if (selectCherootTransfer) {
      setSelectedDate(selectCherootTransfer.date);
      setUpdateCherootTransfer({
        ...updatecherootTransfer,
        id: selectedId,
        date: selecteddate,
        conveyLocationId: selectCherootTransfer.conveyLocationId,
        typeOfCherootId: selectCherootTransfer.typeOfCherootId,
        typeOfPackingId: selectCherootTransfer.typeOfPackingId,
        formOfPackingId: selectCherootTransfer.formOfPackingId,
        quantity: selectCherootTransfer.quantity,
        amount: selectCherootTransfer.amount,
        totalPrice: selectCherootTransfer.totalPrice,
      });
      const packingType = typeOfPacking.filter(
        (item) => item.typeOfCherootId === selectCherootTransfer.typeOfCherootId
      );
      setConcernPackingType(packingType);
      const packingForm = formOfPacking.filter(
        (item) => item.typeOfPackingId === selectCherootTransfer.typeOfPackingId
      );
      setConcernPackingForm(packingForm);
    }
  }, [selectCherootTransfer, updateOpen]);
  useEffect(() => {
    setUpdateCherootTransfer({ ...updatecherootTransfer, date: selecteddate });
  }, [selecteddate]);
  if (!selectCherootTransfer) return null;
  return (
    <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
      <DialogTitle> ဆေးလိပ်ပို့စာရင်းပြင်ဆင်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mr: 2,
            }}
          >
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
            <DatePicker
              selected={selecteddate}
              onChange={(date) => setSelectedDate(date?.toLocaleDateString())}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>နေရာ</Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                defaultValue={selectCherootTransfer.conveyLocationId}
                value={updatecherootTransfer.conveyLocationId}
                onChange={(evt) => {
                  setUpdateCherootTransfer({
                    ...updatecherootTransfer,
                    conveyLocationId: Number(evt.target.value),
                  });
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {concernLocations.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              ဆေးလိပ်အမျိုးအစား
            </Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                defaultValue={selectCherootTransfer.typeOfCherootId}
                value={updatecherootTransfer.typeOfCherootId}
                onChange={(evt) => {
                  handleCheroot(Number(evt.target.value));
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {concernCheroots.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ပါကင်အမျိုးအစား</Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                defaultValue={selectCherootTransfer.typeOfPackingId}
                value={updatecherootTransfer.typeOfPackingId}
                onChange={(evt) => {
                  handlePackingType(Number(evt.target.value));
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {concernPackingType.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              ထုပ်ပိုးမှုအမျိုးအစား
            </Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                defaultValue={selectCherootTransfer.formOfPackingId}
                value={updatecherootTransfer.formOfPackingId}
                onChange={(evt) => {
                  handelFormType(Number(evt.target.value));
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {concernPackingForm.map((item) => (
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
              defaultValue={selectCherootTransfer.quantity}
              placeholder="အရေအတွက်"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) => {
                handleQty(Number(evt.target.value));
              }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>တန်ဖိုး</Typography>
            <TextField
              value={updatecherootTransfer.amount}
              placeholder="တန်ဖိုး"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              စုစုပေါင်းတန်ဖိုး
            </Typography>
            <TextField
              value={updatecherootTransfer.totalPrice}
              placeholder="စုစုပေါင်းတန်ဖိုး"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
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
            setUpdateCherootTransfer(defaultValue);
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
  );
};

export default UpdateTransferCherootData;
