import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  CreateNewFilterSize,
  setIsLoading,
} from "@/store/slices/typeOfFilterSize";
import { createNewFilterSize } from "@/types/FilterSizeType";
import { setOpenSnackbar } from "@/store/slices/snackBar";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createNewFilterSize = {
  name: "",
  price: 0,
};

const NewFilterSize = ({ open, setOpen }: Props) => {
  const [newFilterSize, setNewFilterSize] =
    useState<createNewFilterSize>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.typeOfFilterSize);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateNewFilterSize({
        ...newFilterSize,
        onSuccess: () => {
          setOpen(false);
          setNewFilterSize(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Create new filter size success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>အဆီခံအမျိုးအစားအသစ်ထည့်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setNewFilterSize({ ...newFilterSize, name: evt.target.value })
              }
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဈေးနှုန်း</Typography>
            <TextField
              placeholder="ဈေးနှုန်း"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setNewFilterSize({
                  ...newFilterSize,
                  price: Number(evt.target.value),
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
            setNewFilterSize(defaultValue);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          disabled={!newFilterSize.name || !newFilterSize.price}
          onClick={handleClick}
          loading={isLoading}
        >
          အိုကေ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewFilterSize;
