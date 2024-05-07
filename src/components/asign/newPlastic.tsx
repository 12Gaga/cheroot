import { useAppSelector, useAppDispatch } from "@/store/hooks";
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
import { CreateNewPlastic } from "@/types/plasticType";
import { CreatePlastic, setIsLoading } from "@/store/slices/typeOfPlastic";
import { setOpenSnackbar } from "@/store/slices/snackBar";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: CreateNewPlastic = {
  name: "",
};

const NewPlastic = ({ open, setOpen }: Props) => {
  const [newPlastic, setNewPlastic] = useState<CreateNewPlastic>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.typeOfPlastic);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreatePlastic({
        ...newPlastic,
        onSuccess: () => {
          setOpen(false);
          setNewPlastic(defaultValue);
          dispatch(setOpenSnackbar({ message: "Create new plastic success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>ပလတ်စတစ်အမျိုးအစားအသစ်ထည့်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setNewPlastic({ ...newPlastic, name: evt.target.value })
              }
            />
          </Box>

          {/* <Box sx={{ mt: 2 }}>
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
          </Box> */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            setNewPlastic(defaultValue);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          disabled={!newPlastic.name}
          onClick={handleClick}
          loading={isLoading}
        >
          အိုကေ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewPlastic;
