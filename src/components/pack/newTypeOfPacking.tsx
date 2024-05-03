import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createNewTypeOfPacking } from "@/types/typeOfPackingType";
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
import {
  CreateTypeOfPacking,
  setIsLoading,
} from "@/store/slices/typeOfPacking";
import { setOpenSnackbar } from "@/store/slices/snackBar";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createNewTypeOfPacking = {
  name: "",
  typeOfCherootId: undefined,
};

const NewTypeOfPacking = ({ open, setOpen }: Props) => {
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item);
  const dispatch = useAppDispatch();
  const [newTypeOfPacking, setNewTypeOfPacking] =
    useState<createNewTypeOfPacking>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.typeOfPacking);
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateTypeOfPacking({
        ...newTypeOfPacking,
        onSuccess: () => {
          setOpen(false);
          setNewTypeOfPacking(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Create new typeOfPacking success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle> ပါကင်အမျိုးအစားအသစ်ထည့်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) =>
                setNewTypeOfPacking({
                  ...newTypeOfPacking,
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
                value={newTypeOfPacking.typeOfCherootId}
                onChange={(evt) => {
                  setNewTypeOfPacking({
                    ...newTypeOfPacking,
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            setNewTypeOfPacking(defaultValue);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          disabled={!newTypeOfPacking.name || !newTypeOfPacking.typeOfCherootId}
          onClick={handleClick}
          loading={isLoading}
        >
          အိုကေ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewTypeOfPacking;
