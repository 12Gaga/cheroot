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
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { createNewGarage } from "@/types/garageType";
import {
  CreateShop,
  UpdatedShop,
  setIsLoading,
} from "@/store/slices/typeOfShop";
import { updateShop } from "@/types/shopType";

interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateShop = {
  id: null,
  name: "",
};

const UpdateShop = ({ updateOpen, setUpdateOpen, selectedId }: Props) => {
  const shops = useAppSelector((store) => store.typeOfShop.item);
  const selectShop = shops.find((item) => item.id === selectedId);
  const [updateShop, setUpdateShop] = useState<updateShop>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.typeOfShop);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedShop({
        ...updateShop,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateShop(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update shop success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    if (selectShop) {
      setUpdateShop({
        ...updateShop,
        id: selectedId,
        name: selectShop.name,
      });
    }
  }, [updateOpen, selectShop]);
  if (!selectShop) return null;
  return (
    <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
      <DialogTitle>ပြင်ဆင်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              defaultValue={selectShop.name}
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setUpdateShop({ ...updateShop, name: evt.target.value })
              }
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setUpdateOpen(false);
            setUpdateShop(defaultValue);
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

export default UpdateShop;
