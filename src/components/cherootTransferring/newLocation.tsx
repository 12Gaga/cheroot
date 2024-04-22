import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { CreateGarage } from "@/store/slices/garage";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { setIsLoading } from "@/store/slices/workShop";
import { createNewConveyLocation } from "@/types/conveyLocationType";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { CreateConveyLocation } from "@/store/slices/conveyLocation";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createNewConveyLocation = {
  name: "",
};

const NewLocation = ({ open, setOpen }: Props) => {
  const [newConveyLocation, setNewConveyLocation] =
    useState<createNewConveyLocation>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.conveyLocation);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateConveyLocation({
        ...newConveyLocation,
        onSuccess: () => {
          setOpen(false);
          setNewConveyLocation(defaultValue);
          dispatch(setOpenSnackbar({ message: "Create new location success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle> နေရာအသစ်ထည့်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>နေရာအမည်</Typography>
            <TextField
              placeholder="နေရာအမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setNewConveyLocation({
                  ...newConveyLocation,
                  name: evt.target.value,
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
          disabled={!newConveyLocation.name}
          onClick={handleClick}
          loading={isLoading}
        >
          အိုကေ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewLocation;
