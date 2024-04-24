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
import { LoadingButton } from "@mui/lab";
import { createNewTabacco } from "@/types/tabaccoType";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import newLeaf from "./newLeaf";
import { CreateTabacco, setIsLoading } from "@/store/slices/typeOfTabacco";
import { setOpenSnackbar } from "@/store/slices/snackBar";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createNewTabacco = {
  name: "",
  price: 0,
};

const NewTabacco = ({ open, setOpen }: Props) => {
  const [newTabacco, setNewTabacco] = useState<createNewTabacco>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.typeOfTabacco);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateTabacco({
        ...newTabacco,
        onSuccess: () => {
          setOpen(false);
          setNewTabacco(defaultValue);
          dispatch(setOpenSnackbar({ message: "Create new tabacco success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>ဆေးစပ်အမျိုးအစားအသစ်ထည့်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setNewTabacco({ ...newTabacco, name: evt.target.value })
              }
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဈေးနှုန်း</Typography>
            <TextField
              placeholder="ဈေးနှုန်း"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setNewTabacco({
                  ...newTabacco,
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
            setOpen(false);
            setNewTabacco(defaultValue);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          disabled={!newTabacco.name || !newTabacco.price}
          onClick={handleClick}
          loading={isLoading}
        >
          အိုကေ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewTabacco;
