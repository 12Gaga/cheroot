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
import { CreateNewStore } from "@/types/storeType";
import { CreateStore, setIsLoading } from "@/store/slices/typeOfStore";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: CreateNewStore = {
  name: "",
  cigratteIndustryId: undefined,
};

const NewStore = ({ open, setOpen }: Props) => {
  const [newStore, setNewStore] = useState<CreateNewStore>(defaultValue);
  const cigratteIndustryId = useAppSelector((store) => store.industry.item)
    ?.id as number;
  const { isLoading } = useAppSelector((store) => store.typeOfStore);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateStore({
        ...newStore,
        onSuccess: () => {
          setOpen(false);
          setNewStore(defaultValue);
          dispatch(setOpenSnackbar({ message: "Create new store success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    setNewStore({ ...newStore, cigratteIndustryId });
  }, []);
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>သိုလှောင်ရုံအသစ်ထည့်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setNewStore({ ...newStore, name: evt.target.value });
              }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            setNewStore(defaultValue);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          disabled={!newStore.name}
          onClick={handleClick}
          loading={isLoading}
        >
          အိုကေ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewStore;
