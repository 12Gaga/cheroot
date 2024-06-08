import { useAppSelector, useAppDispatch } from "@/store/hooks";
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
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { CreateNewShopTitle } from "@/types/shopTitleType";
import { CreateShopTitle, setIsLoading } from "@/store/slices/typeOfShopTitle";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: CreateNewShopTitle = {
  name: "",
};

const NewShopTitle = ({ open, setOpen }: Props) => {
  const [newShopTitle, setNewShopTitle] =
    useState<CreateNewShopTitle>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.shopTitle);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateShopTitle({
        ...newShopTitle,
        onSuccess: () => {
          setOpen(false);
          setNewShopTitle(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Create new shop title success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false), setNewShopTitle(defaultValue);
      }}
    >
      <DialogTitle>ဆိုင်ခေါင်းစဉ်အသစ်ထည့်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setNewShopTitle({ ...newShopTitle, name: evt.target.value })
              }
            />
          </Box>

          {/* <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဈေးနှုန်း</Typography>
            <TextField
              placeholder="ဈေးနှုန်း"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setNewCheroot({
                  ...newCheroot,
                  price: Number(evt.target.value),
                })
              }
            />
          </Box> */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            setNewShopTitle(defaultValue);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          disabled={!newShopTitle.name}
          onClick={handleClick}
          loading={isLoading}
        >
          အိုကေ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewShopTitle;
