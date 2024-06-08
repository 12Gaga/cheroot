import { useAppSelector, useAppDispatch } from "@/store/hooks";
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
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { CreateNewShop } from "@/types/shopType";
import { CreateShop, setIsLoading } from "@/store/slices/typeOfShop";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import newGarage from "./newGarage";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: CreateNewShop = {
  name: "",
  shopTitleId: null,
};

const NewShop = ({ open, setOpen }: Props) => {
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const shopTiltes = useAppSelector((store) => store.shopTitle.item).filter(
    (s) => s.workShopId === workShopId
  );
  const [newShop, setNewShop] = useState<CreateNewShop>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.typeOfShop);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateShop({
        ...newShop,
        onSuccess: () => {
          setOpen(false);
          setNewShop(defaultValue);
          dispatch(setOpenSnackbar({ message: "Create new shop success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false), setNewShop(defaultValue);
      }}
    >
      <DialogTitle>ဆိုင်အမည်အသစ်ထည့်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဆိုင်ခေါင်းစဉ်</Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                value={newShop.shopTitleId}
                onChange={(evt) =>
                  setNewShop({
                    ...newShop,
                    shopTitleId: Number(evt.target.value),
                  })
                }
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {shopTiltes.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setNewShop({ ...newShop, name: evt.target.value })
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
            setNewShop(defaultValue);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          disabled={!newShop.name && !newShop.shopTitleId}
          onClick={handleClick}
          loading={isLoading}
        >
          အိုကေ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewShop;
