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
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import {
  CreateWorkShop,
  UpdatedWorkShop,
  setIsLoading,
} from "@/store/slices/workShop";
import { createNewWorkShop, updateWorkShop } from "@/types/workShopType";

interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateWorkShop = {
  id: null,
  name: "",
};

const UpdateWorkShop = ({ updateOpen, setUpdateOpen, selectedId }: Props) => {
  const workShops = useAppSelector((store) => store.workShop.item);
  const selectWorkshop = workShops.find((item) => item.id === selectedId);
  const [updateWorkshop, setUpdateWorkshop] =
    useState<updateWorkShop>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.workShop);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedWorkShop({
        ...updateWorkshop,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateWorkshop(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update workShop success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    if (selectWorkshop) {
      setUpdateWorkshop({
        ...updateWorkshop,
        id: selectedId,
        name: selectWorkshop.name,
      });
    }
  }, [updateOpen, selectWorkshop]);
  if (!selectWorkshop) return null;
  return (
    <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
      <DialogTitle>ပြင်ဆင်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              defaultValue={selectWorkshop.name}
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setUpdateWorkshop({ ...updateWorkshop, name: evt.target.value })
              }
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setUpdateOpen(false);
            setUpdateWorkshop(defaultValue);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          onClick={handleClick}
          loading={isLoading}
        >
          ပြင်ဆင်မည်
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateWorkShop;
