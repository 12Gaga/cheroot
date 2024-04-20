import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createNewGarage } from "@/types/garageType";

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
import { CreateGarage, setIsLoading } from "@/store/slices/garage";
import { setOpenSnackbar } from "@/store/slices/snackBar";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createNewGarage = {
  name: "",
  workShopId: undefined,
};

const NewGarage = ({ open, setOpen }: Props) => {
  const [newGarage, setNewGarage] = useState<createNewGarage>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.garage);
  const dispatch = useAppDispatch();
  const workShops = useAppSelector((store) => store.workShop.item);
  const handleChange = (evt: SelectChangeEvent<number>) => {
    const selectId = evt.target.value as number;
    setNewGarage({ ...newGarage, workShopId: selectId });
    console.log("skedc", selectId);
  };

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateGarage({
        ...newGarage,
        onSuccess: () => {
          setOpen(false);
          setNewGarage(defaultValue);
          dispatch(setOpenSnackbar({ message: "Create new garage success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>ဂိုထောင်အသစ်ထည့်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) =>
                setNewGarage({ ...newGarage, name: evt.target.value })
              }
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အလုပ်ရုံ</Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                value={newGarage.workShopId}
                onChange={handleChange}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {workShops.map((item) => (
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
        <Button variant="contained" onClick={() => setOpen(false)}>
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          disabled={!newGarage.name || !newGarage.workShopId}
          onClick={handleClick}
          loading={isLoading}
        >
          အိုကေ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewGarage;
