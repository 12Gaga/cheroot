import { CreateNewLeaf } from "@/types/LeafType";
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
import {
  CreateNewFilterSize,
  UpdatedFilterSize,
  setIsLoading,
} from "@/store/slices/typeOfFilterSize";
import { updateFilterSize } from "@/types/FilterSizeType";

interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateFilterSize = {
  id: null,
  name: "",
  price: 0,
};

const UpdateFilterSize = ({ updateOpen, setUpdateOpen, selectedId }: Props) => {
  const filterSize = useAppSelector((store) => store.typeOfFilterSize.item);
  const selectFilterSize = filterSize.find((item) => item.id === selectedId);
  const [updateFilterSize, setUpdateFilterSize] =
    useState<updateFilterSize>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.typeOfFilterSize);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedFilterSize({
        ...updateFilterSize,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateFilterSize(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update filterSize success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    if (selectFilterSize) {
      setUpdateFilterSize({
        ...updateFilterSize,
        id: selectedId,
        name: selectFilterSize.name,
        price: selectFilterSize.price,
      });
    }
  }, [updateOpen, selectFilterSize]);

  if (!selectFilterSize) return null;
  return (
    <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
      <DialogTitle>ပြင်ဆင်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              defaultValue={selectFilterSize.name}
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setUpdateFilterSize({
                  ...updateFilterSize,
                  name: evt.target.value,
                })
              }
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဈေးနှုန်း</Typography>
            <TextField
              defaultValue={selectFilterSize.price}
              placeholder="ဈေးနှုန်း"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setUpdateFilterSize({
                  ...updateFilterSize,
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
            setUpdateOpen(false);
            setUpdateFilterSize(defaultValue);
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

export default UpdateFilterSize;
