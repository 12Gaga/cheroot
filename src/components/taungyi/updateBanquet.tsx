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
import { UpdatedBanquet, setIsLoading } from "@/store/slices/typeOfBanquet";
import { updateBanquet } from "@/types/banquetType";

interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateBanquet = {
  id: null,
  name: "",
};

const UpdateBanquet = ({ updateOpen, setUpdateOpen, selectedId }: Props) => {
  const banquets = useAppSelector((store) => store.typeOfBanquet.item);
  const selectBanquet = banquets.find((item) => item.id === selectedId);
  const [updateBanquet, setUpdateBanquet] =
    useState<updateBanquet>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.typeOfBanquet);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedBanquet({
        ...updateBanquet,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateBanquet(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update banquet success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    if (selectBanquet) {
      setUpdateBanquet({
        ...updateBanquet,
        id: selectedId,
        name: selectBanquet.name,
      });
    }
  }, [updateOpen, selectBanquet]);
  if (!selectBanquet) return null;
  return (
    <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
      <DialogTitle>ပြင်ဆင်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              defaultValue={selectBanquet.name}
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setUpdateBanquet({ ...updateBanquet, name: evt.target.value })
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
            setUpdateBanquet(defaultValue);
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

export default UpdateBanquet;
