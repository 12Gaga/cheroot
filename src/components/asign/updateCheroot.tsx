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
  CreateCheroot,
  UpdatedCheroot,
  setIsLoading,
} from "@/store/slices/typeOfCheroot";
import { updateCheroot } from "@/types/cherootType";

interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateCheroot = {
  id: null,
  name: "",
  price: 0,
};

const UpdateCheroot = ({ updateOpen, setUpdateOpen, selectedId }: Props) => {
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item);
  const selectCheroot = cheroots.find((item) => item.id === selectedId);
  const [updateCheroot, setUpdateCheroot] =
    useState<updateCheroot>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.typeOfCheroot);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedCheroot({
        ...updateCheroot,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateCheroot(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update cheroot success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    if (selectCheroot) {
      setUpdateCheroot({
        ...updateCheroot,
        id: selectedId,
        name: selectCheroot.name,
        price: selectCheroot.price,
      });
    }
  }, [updateOpen, selectCheroot]);

  if (!selectCheroot) return null;
  return (
    <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
      <DialogTitle>ပြင်ဆင်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              defaultValue={selectCheroot.name}
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setUpdateCheroot({ ...updateCheroot, name: evt.target.value })
              }
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဈေးနှုန်း</Typography>
            <TextField
              defaultValue={selectCheroot.price}
              placeholder="ဈေးနှုန်း"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setUpdateCheroot({
                  ...updateCheroot,
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
            setUpdateOpen(false);
            setUpdateCheroot(defaultValue);
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

export default UpdateCheroot;
