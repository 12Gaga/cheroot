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
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CreateLeaf, setIsLoading } from "@/store/slices/typeOfLeaf";
import { setOpenSnackbar } from "@/store/slices/snackBar";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: CreateNewLeaf = {
  name: "",
  price: 0,
};

const NewLeaf = ({ open, setOpen }: Props) => {
  const [newLeaf, setNewLeaf] = useState<CreateNewLeaf>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.typeOfLeaf);
  const dispatch = useAppDispatch();
  console.log(newLeaf);
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateLeaf({
        ...newLeaf,
        onSuccess: () => {
          setOpen(false);
          setNewLeaf(defaultValue);
          dispatch(setOpenSnackbar({ message: "Create new leaf success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>ဖက်အမျိုးအစားအသစ်ထည့်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setNewLeaf({ ...newLeaf, name: evt.target.value })
              }
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဈေးနှုန်း</Typography>
            <TextField
              placeholder="ဈေးနှုန်း"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setNewLeaf({ ...newLeaf, price: Number(evt.target.value) })
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
            setNewLeaf(defaultValue);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          disabled={!newLeaf.name || !newLeaf.price}
          onClick={handleClick}
          loading={isLoading}
        >
          အိုကေ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewLeaf;
