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
  CreateStore,
  UpdatedStore,
  setIsLoading,
} from "@/store/slices/typeOfStore";
import { CreateNewStore, updateStore } from "@/types/storeType";

interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateStore = {
  id: null,
  name: "",
};

const UpdateStore = ({ updateOpen, setUpdateOpen, selectedId }: Props) => {
  const stores = useAppSelector((store) => store.typeOfStore.item);
  const selectStore = stores.find((item) => item.id === selectedId);
  const [updateStore, setUpdateStore] = useState<updateStore>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.typeOfStore);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedStore({
        ...updateStore,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateStore(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update store success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    if (selectStore) {
      setUpdateStore({
        ...updateStore,
        id: selectedId,
        name: selectStore.name,
      });
    }
  }, [updateOpen, selectStore]);
  if (!selectStore) return null;
  return (
    <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
      <DialogTitle>ပြင်ဆင်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              defaultValue={selectStore.name}
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setUpdateStore({ ...updateStore, name: evt.target.value })
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
            setUpdateStore(defaultValue);
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

export default UpdateStore;
