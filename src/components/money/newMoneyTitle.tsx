import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CreateTitle, setIsLoading } from "@/store/slices/moneyTitle";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { createNewTitle } from "@/types/moneyTitleType";
import { LoadingButton } from "@mui/lab";
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

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createNewTitle = {
  name: "",
};

const NewMoneyTitle = ({ open, setOpen }: Props) => {
  const [newTitle, setNewTitle] = useState<createNewTitle>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.expensiveLabel);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateTitle({
        ...newTitle,
        onSuccess: () => {
          setOpen(false);
          setNewTitle(defaultValue);
          dispatch(setOpenSnackbar({ message: "Create new title success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle> ငွေစာရင်းခေါင်းစဉ်အသစ်ထည့်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setNewTitle({ ...newTitle, name: evt.target.value });
              }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false), setNewTitle(defaultValue);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          disabled={!newTitle.name}
          onClick={handleClick}
          loading={isLoading}
        >
          အိုကေ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewMoneyTitle;
