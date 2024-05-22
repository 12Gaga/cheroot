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
import { addCherootTransfer } from "@/types/cherootTransfer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FormOfPacking, TypeOfPacking } from "@prisma/client";
import {
  AddCherootTransfer,
  setIsLoading,
} from "@/store/slices/cherootTransfer";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { LoadingButton } from "@mui/lab";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: addCherootTransfer = {
  date: "",
  conveyLocationId: null,
  typeOfCherootId: null,
  typeOfPackingId: null,
  formOfPackingId: null,
  quantity: 0,
  amount: 0,
  totalPrice: 0,
};

const NewTransferCherootData = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.cherootTransfer);
  const [selecteddate, setSelectedDate] = useState<any>(
    new Date().toLocaleDateString()
  );
  const [cherootTransfer, setCherootTransfer] =
    useState<addCherootTransfer>(defaultValue);
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
    setCherootTransfer({ ...cherootTransfer, typeOfCherootId: cherootId });
  };
  const handlePackingType = (packingTypeId: number) => {
    const packingForm = formOfPacking.filter(
      (item) => item.typeOfPackingId === packingTypeId
    );
    setConcernPackingForm(packingForm);
    setCherootTransfer({ ...cherootTransfer, typeOfPackingId: packingTypeId });
  };

  const handelFormType = (formTypeId: number) => {
    const exit = formOfPacking.find(
      (item) => item.id === formTypeId
    ) as FormOfPacking;
    const totalamount = cherootTransfer.quantity * exit.amount;

    setCherootTransfer({
      ...cherootTransfer,
      formOfPackingId: formTypeId,
      amount: exit.amount,
      totalPrice: totalamount,
    });
  };

  const handleQty = (qty: number) => {
    const totalamount = cherootTransfer.amount * qty;
    setCherootTransfer({
      ...cherootTransfer,
      quantity: qty,
      totalPrice: totalamount,
    });
  };

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      AddCherootTransfer({
        ...cherootTransfer,
        onSuccess: () => {
          setOpen(false);
          setCherootTransfer(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Add cheroot transfer success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  useEffect(() => {
    setCherootTransfer({ ...cherootTransfer, date: selecteddate });
  }, [selecteddate, open]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle> ဆေးလိပ်ပို့စာရင်းထည့်ခြင်း</DialogTitle>
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
                value={cherootTransfer.conveyLocationId}
                onChange={(evt) => {
                  setCherootTransfer({
                    ...cherootTransfer,
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
                value={cherootTransfer.typeOfCherootId}
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
                value={cherootTransfer.typeOfPackingId}
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
                value={cherootTransfer.formOfPackingId}
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
              value={cherootTransfer.amount}
              placeholder="တန်ဖိုး"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              စုစုပေါင်းတန်ဖိုး
            </Typography>
            <TextField
              value={cherootTransfer.totalPrice}
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
            setOpen(false);
            setCherootTransfer(defaultValue);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          disabled={
            !cherootTransfer.date ||
            !cherootTransfer.conveyLocationId ||
            !cherootTransfer.typeOfCherootId ||
            !cherootTransfer.typeOfPackingId ||
            !cherootTransfer.formOfPackingId ||
            !cherootTransfer.quantity ||
            !cherootTransfer.totalPrice
          }
          onClick={handleClick}
          loading={isLoading}
        >
          သိမ်းမည်
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewTransferCherootData;
