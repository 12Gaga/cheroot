import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
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
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { createNewFormOfPacking } from "@/types/formOfPackingType";
import {
  CreateFormOfPacking,
  setIsLoading,
} from "@/store/slices/formOfPacking";
import PlasticData from "./plasticData";
import { TypeOfPacking } from "@prisma/client";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createNewFormOfPacking = {
  name: "",
  typeOfCherootId: undefined,
  typeOfPackingId: undefined,
  packingPlasticId: undefined,
  packingQty: 0,
  warppingPlasticId: undefined,
  warppingQty: 0,
  coverPlasticId: undefined,
  coverQty: 0,
  amount: 0,
  quantity: 0,
};

const NewFormOfPacking = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const [newFormOfPacking, setNewFormOfPacking] =
    useState<createNewFormOfPacking>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.formOfPacking);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const typeOfPackings = useAppSelector((store) => store.typeOfPacking.item);
  const concernCheroots = useAppSelector(
    (store) => store.typeOfCheroot.item
  ).filter((item) => item.workShopId === workShop?.id);
  const [concernPackingType, setConcernPackingType] = useState<TypeOfPacking[]>(
    []
  );
  const handleCheroot = (cherootId: number) => {
    const packingType = typeOfPackings.filter(
      (item) => item.typeOfCherootId === cherootId
    );
    setConcernPackingType(packingType);
    setNewFormOfPacking({ ...newFormOfPacking, typeOfCherootId: cherootId });
  };

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateFormOfPacking({
        ...newFormOfPacking,
        onSuccess: () => {
          setOpen(false);
          setNewFormOfPacking(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Create new formOfPacking success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle> ထုပ်ပိုးမှုအမျိုးအစားအသစ်ထည့်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ထုပ်ပိုးမှုအမည်</Typography>
            <TextField
              placeholder="ထုပ်ပိုးမှုအမည်"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) =>
                setNewFormOfPacking({
                  ...newFormOfPacking,
                  name: evt.target.value,
                })
              }
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              ဆေးလိပ်အမျိုးအစား
            </Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={newFormOfPacking.typeOfCherootId}
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
                value={newFormOfPacking.typeOfPackingId}
                onChange={(evt) => {
                  setNewFormOfPacking({
                    ...newFormOfPacking,
                    typeOfPackingId: Number(evt.target.value),
                  });
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

          <PlasticData
            newFormOfPacking={newFormOfPacking}
            setNewFormOfPacking={setNewFormOfPacking}
          />
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဈေးနှုန်း</Typography>
            <TextField
              placeholder="ဈေးနှုန်း"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) =>
                setNewFormOfPacking({
                  ...newFormOfPacking,
                  amount: Number(evt.target.value),
                })
              }
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဆေးလိပ်အရေအတွက်</Typography>
            <TextField
              placeholder="ဆေးလိပ်အရေအတွက်"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) =>
                setNewFormOfPacking({
                  ...newFormOfPacking,
                  quantity: Number(evt.target.value),
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
            setOpen(false);
            setNewFormOfPacking(defaultValue);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          disabled={
            !newFormOfPacking.name ||
            !newFormOfPacking.typeOfCherootId ||
            !newFormOfPacking.typeOfPackingId ||
            !newFormOfPacking.packingPlasticId ||
            !newFormOfPacking.packingQty ||
            !newFormOfPacking.warppingPlasticId ||
            !newFormOfPacking.warppingQty ||
            !newFormOfPacking.coverPlasticId ||
            !newFormOfPacking.coverQty ||
            !newFormOfPacking.amount ||
            !newFormOfPacking.quantity
          }
          onClick={handleClick}
          loading={isLoading}
        >
          အိုကေ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewFormOfPacking;
