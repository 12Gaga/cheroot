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
import { CreateShop, setIsLoading } from "@/store/slices/typeOfShop";
import { updatePlastic } from "@/types/plasticType";
import { UpdatedPlastic } from "@/store/slices/typeOfPlastic";

interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updatePlastic = {
  id: null,
  name: "",
};

const UpdatePlastic = ({ updateOpen, setUpdateOpen, selectedId }: Props) => {
  const plastics = useAppSelector((store) => store.typeOfPlastic.item);
  const selectPlastic = plastics.find((item) => item.id === selectedId);
  const [updatePlastic, setUpdatePlastic] =
    useState<updatePlastic>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.typeOfPlastic);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedPlastic({
        ...updatePlastic,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdatePlastic(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update plastic success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    if (selectPlastic) {
      setUpdatePlastic({
        ...updatePlastic,
        id: selectedId,
        name: selectPlastic.name,
      });
    }
  }, [updateOpen, selectPlastic]);
  if (!selectPlastic) return null;
  return (
    <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
      <DialogTitle>ပြင်ဆင်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              defaultValue={selectPlastic.name}
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setUpdatePlastic({ ...updatePlastic, name: evt.target.value })
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
            setUpdatePlastic(defaultValue);
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

export default UpdatePlastic;
