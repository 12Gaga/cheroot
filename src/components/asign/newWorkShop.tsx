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
import { useEffect, useState } from "react";
import { createNewWorkShop } from "@/types/workShopType";
import { CreateWorkShop, setIsLoading } from "@/store/slices/workShop";
import { setOpenSnackbar } from "@/store/slices/snackBar";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createNewWorkShop = {
  name: "",
  industryId: null,
};

const NewWorkShop = ({ open, setOpen }: Props) => {
  const [newWorkShop, setNewWorkShop] =
    useState<createNewWorkShop>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.workShop);
  const dispatch = useAppDispatch();
  const industry = useAppSelector((store) => store.industry.item);
  console.log("infjd", industry?.id);
  useEffect(() => {
    if (industry) {
      setNewWorkShop({ ...newWorkShop, industryId: industry.id });
    }
  }, [industry]);
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateWorkShop({
        ...newWorkShop,
        onSuccess: () => {
          setOpen(false);
          setNewWorkShop(defaultValue);
          dispatch(setOpenSnackbar({ message: "Create new workShop success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>အလုပ်ရုံအသစ်ထည့်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setNewWorkShop({ ...newWorkShop, name: evt.target.value })
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
            setNewWorkShop(defaultValue);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          disabled={!newWorkShop.name}
          onClick={handleClick}
          loading={isLoading}
        >
          အိုကေ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewWorkShop;
