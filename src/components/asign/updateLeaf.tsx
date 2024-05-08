import { CreateNewLeaf, updateLeaf } from "@/types/LeafType";
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
import typeOfLeaf, {
  CreateLeaf,
  UpdatedLeaf,
  setIsLoading,
} from "@/store/slices/typeOfLeaf";
import { setOpenSnackbar } from "@/store/slices/snackBar";

interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateLeaf = {
  id: null,
  name: "",
  price: 0,
};

const UpdateLeaf = ({ updateOpen, setUpdateOpen, selectedId }: Props) => {
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const selectLeaf = leaves.find((item) => item.id === selectedId);
  const [updateLeaf, setUpdateLeaf] = useState<updateLeaf>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.typeOfLeaf);
  const dispatch = useAppDispatch();
  console.log(updateLeaf);
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedLeaf({
        ...updateLeaf,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateLeaf(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update leaf success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    if (selectLeaf) {
      setUpdateLeaf({
        ...updateLeaf,
        id: selectedId,
        name: selectLeaf.name,
        price: selectLeaf.price,
      });
    }
  }, [updateOpen, selectLeaf]);
  if (!selectLeaf) return null;
  return (
    <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
      <DialogTitle>ပြင်ဆင်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              defaultValue={selectLeaf.name}
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setUpdateLeaf({ ...updateLeaf, name: evt.target.value })
              }
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဈေးနှုန်း</Typography>
            <TextField
              defaultValue={selectLeaf.price}
              placeholder="ဈေးနှုန်း"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setUpdateLeaf({
                  ...updateLeaf,
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
            setUpdateLeaf(defaultValue);
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

export default UpdateLeaf;
