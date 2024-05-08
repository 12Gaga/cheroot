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
  CreateGarage,
  UpdatedGarage,
  setIsLoading,
} from "@/store/slices/garage";
import { createNewGarage, updateGarage } from "@/types/garageType";

interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateGarage = {
  id: null,
  name: "",
};

const UpdateGarage = ({ updateOpen, setUpdateOpen, selectedId }: Props) => {
  const garages = useAppSelector((store) => store.garage.item);
  const selectGarage = garages.find((item) => item.id === selectedId);
  const [updateGarage, setUpdateGarage] = useState<updateGarage>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.garage);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedGarage({
        ...updateGarage,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateGarage(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update garage success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    if (selectGarage) {
      setUpdateGarage({
        ...updateGarage,
        id: selectedId,
        name: selectGarage.name,
      });
    }
  }, [updateOpen, selectGarage]);
  if (!selectGarage) return null;
  return (
    <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
      <DialogTitle>ပြင်ဆင်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              defaultValue={selectGarage.name}
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setUpdateGarage({ ...updateGarage, name: evt.target.value })
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
            setUpdateGarage(defaultValue);
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

export default UpdateGarage;
