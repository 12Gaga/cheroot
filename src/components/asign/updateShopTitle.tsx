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
import { updateShopTitle } from "@/types/shopTitleType";
import { UpdatedShopTitle, setIsLoading } from "@/store/slices/typeOfShopTitle";

interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateShopTitle = {
  id: null,
  name: "",
};

const UpdateShopTitle = ({ updateOpen, setUpdateOpen, selectedId }: Props) => {
  const shopTitles = useAppSelector((store) => store.shopTitle.item);
  const selectShopTitle = shopTitles.find((item) => item.id === selectedId);
  const [updateShopTitle, setUpdateShopTitle] =
    useState<updateShopTitle>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.shopTitle);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedShopTitle({
        ...updateShopTitle,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateShopTitle(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update shop title success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    if (selectShopTitle) {
      setUpdateShopTitle({
        ...updateShopTitle,
        id: selectedId,
        name: selectShopTitle.name,
      });
    }
  }, [updateOpen, selectShopTitle]);
  if (!selectShopTitle) return null;
  return (
    <Dialog
      open={updateOpen}
      onClose={() => {
        setUpdateOpen(false);
        setUpdateShopTitle(defaultValue);
      }}
    >
      <DialogTitle>ပြင်ဆင်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              defaultValue={selectShopTitle.name}
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setUpdateShopTitle({
                  ...updateShopTitle,
                  name: evt.target.value,
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
            setUpdateOpen(false);
            setUpdateShopTitle(defaultValue);
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

export default UpdateShopTitle;
