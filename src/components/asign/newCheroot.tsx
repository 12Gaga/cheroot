import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { CreateLeaf } from "@/store/slices/typeOfLeaf";
import { setIsLoading } from "@/store/slices/workShop";
import { createNewCheroot } from "@/types/cherootType";
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
import { CreateCheroot } from "@/store/slices/typeOfCheroot";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createNewCheroot = {
  name: "",
  price: 0,
};

const NewCheroot = ({ open, setOpen }: Props) => {
  const [newCheroot, setNewCheroot] = useState<createNewCheroot>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.typeOfCheroot);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateCheroot({
        ...newCheroot,
        onSuccess: () => {
          setOpen(false);
          setNewCheroot(defaultValue);
          dispatch(setOpenSnackbar({ message: "Create new cheroot success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>ဆေးလိပ်အမျိုးအစားအသစ်ထည့်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setNewCheroot({ ...newCheroot, name: evt.target.value })
              }
            />
          </Box>

          <Box sx={{ mt: 2 }}>
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
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          disabled={!newCheroot.name || !newCheroot.price}
          onClick={handleClick}
          loading={isLoading}
        >
          အိုကေ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewCheroot;
