import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setIsLoading } from "@/store/slices/workShop";
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
import { CreateNewShop } from "@/types/shopType";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: CreateNewShop = {
  name: "",
};

const NewShop = ({ open, setOpen }: Props) => {
  const [newShop, setNewShop] = useState<CreateNewShop>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.typeOfCheroot);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    // dispatch(
    //   CreateCheroot({
    //     ...newPlastic,
    //     onSuccess: () => {
    //       setOpen(false);
    //       setNewPlastic(defaultValue);
    //       dispatch(setOpenSnackbar({ message: "Create new cheroot success" }));
    //       dispatch(setIsLoading(false));
    //     },
    //   })
    // );
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>ဆိုင်အမည်အသစ်ထည့်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
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
            setNewShop(defaultValue);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          disabled={!newShop.name}
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
