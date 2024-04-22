import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { CreateTypeOfPacking } from "@/store/slices/typeOfPacking";
import { setIsLoading } from "@/store/slices/workShop";
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
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { createNewFormOfPacking } from "@/types/formOfPackingType";
import { CreateFormOfPacking } from "@/store/slices/formOfPacking";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createNewFormOfPacking = {
  name: "",
  typeOfCherootId: undefined,
  typeOfPackingId: undefined,
  quantity: 0,
};

const NewFormOfPacking = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const [newFormOfPacking, setNewFormOfPacking] =
    useState<createNewFormOfPacking>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.formOfPacking);
  const typeOfPackings = useAppSelector((store) => store.typeOfPacking.item);
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item);
  // const handleChangeOne = (evt: SelectChangeEvent<number>) => {
  //   const selectId = evt.target.value as number;
  //   setNewFormOfPacking({ ...newFormOfPacking, typeOfCherootId: selectId });
  //   console.log("skedc", selectId);
  // };
  // const handleChangeTwo = (evt: SelectChangeEvent<number>) => {
  //   const selectId = evt.target.value as number;
  //   setNewFormOfPacking({ ...newFormOfPacking, typeOfPackingId: selectId });
  //   console.log("skedc", selectId);
  // };

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
                  setNewFormOfPacking({
                    ...newFormOfPacking,
                    typeOfCherootId: Number(evt.target.value),
                  });
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {cheroots.map((item) => (
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
                {typeOfPackings.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
        <Button variant="contained" onClick={() => setOpen(false)}>
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          disabled={
            !newFormOfPacking.name ||
            !newFormOfPacking.typeOfCherootId ||
            !newFormOfPacking.typeOfPackingId
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
