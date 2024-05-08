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
  CreateTabacco,
  UpdatedTabacco,
  setIsLoading,
} from "@/store/slices/typeOfTabacco";
import { updateTabacco } from "@/types/tabaccoType";

interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateTabacco = {
  id: null,
  name: "",
  price: 0,
};

const UpdateTabacco = ({ updateOpen, setUpdateOpen, selectedId }: Props) => {
  const tabaccos = useAppSelector((store) => store.typeOfTabacco.item);
  const selectTabacco = tabaccos.find((item) => item.id === selectedId);
  const [updateTabacco, setUpdateTabacco] =
    useState<updateTabacco>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.typeOfTabacco);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedTabacco({
        ...updateTabacco,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateTabacco(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update tabacco success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    if (selectTabacco) {
      setUpdateTabacco({
        ...updateTabacco,
        id: selectedId,
        name: selectTabacco.name,
        price: selectTabacco.price,
      });
    }
  }, [updateOpen, selectTabacco]);

  if (!selectTabacco) return null;
  return (
    <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
      <DialogTitle>ပြင်ဆင်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              defaultValue={selectTabacco.name}
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setUpdateTabacco({ ...updateTabacco, name: evt.target.value })
              }
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဈေးနှုန်း</Typography>
            <TextField
              defaultValue={selectTabacco.price}
              placeholder="ဈေးနှုန်း"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setUpdateTabacco({
                  ...updateTabacco,
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
            setUpdateTabacco(defaultValue);
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

export default UpdateTabacco;
