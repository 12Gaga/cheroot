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
import { CreateNewBanquet } from "@/types/banquetType";
import { CreateBanquet, setIsLoading } from "@/store/slices/typeOfBanquet";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: CreateNewBanquet = {
  name: "",
  cigratteIndustryId: undefined,
};

const NewBanquet = ({ open, setOpen }: Props) => {
  const [newBanquet, setNewBanquet] = useState<CreateNewBanquet>(defaultValue);
  const cigratteIndustryId = useAppSelector((store) => store.industry.item)
    ?.id as number;
  const { isLoading } = useAppSelector((store) => store.typeOfBanquet);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateBanquet({
        ...newBanquet,
        onSuccess: () => {
          setOpen(false);
          setNewBanquet(defaultValue);
          dispatch(setOpenSnackbar({ message: "Create new banquet success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    setNewBanquet({ ...newBanquet, cigratteIndustryId });
  }, []);
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>ပွဲရုံအသစ်ထည့်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setNewBanquet({ ...newBanquet, name: evt.target.value });
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
            setNewBanquet(defaultValue);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          disabled={!newBanquet.name}
          onClick={handleClick}
          loading={isLoading}
        >
          အိုကေ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewBanquet;
