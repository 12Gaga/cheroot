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
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { CreateNewLeaf } from "@/types/LeafType";
import { useState } from "react";
import newLeaf from "./newLeaf";
import { CreateLabel, setIsLoading } from "@/store/slices/typeOfLabel";
import { setOpenSnackbar } from "@/store/slices/snackBar";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: CreateNewLeaf = {
  name: "",
  price: 0,
};

const NewLabel = ({ open, setOpen }: Props) => {
  const [newLabel, setNewLabel] = useState<CreateNewLeaf>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.typeOfLabel);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateLabel({
        ...newLabel,
        onSuccess: () => {
          setOpen(false);
          setNewLabel(defaultValue);
          dispatch(setOpenSnackbar({ message: "Create new label success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>တံဆိပ်အမျိုးအစားအသစ်ထည့်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setNewLabel({ ...newLabel, name: evt.target.value })
              }
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဈေးနှုန်း</Typography>
            <TextField
              placeholder="ဈေးနှုန်း"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setNewLabel({ ...newLabel, price: Number(evt.target.value) })
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
          disabled={!newLabel.name || !newLabel.price}
          onClick={handleClick}
          loading={isLoading}
        >
          အိုကေ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewLabel;
