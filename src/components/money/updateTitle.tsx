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
import { createNewTitle, updateTitle } from "@/types/moneyTitleType";
import {
  CreateTitle,
  UpdatedTitle,
  setIsLoading,
} from "@/store/slices/moneyTitle";

interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateTitle = {
  id: null,
  name: "",
};

const UpdateTitle = ({ updateOpen, setUpdateOpen, selectedId }: Props) => {
  const tiltes = useAppSelector((store) => store.expensiveLabel.item);
  const selectTitle = tiltes.find((item) => item.id === selectedId);
  const [updateTilte, setUpdateTitle] = useState<updateTitle>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.expensiveLabel);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedTitle({
        ...updateTilte,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateTitle(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update title success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    if (selectTitle) {
      setUpdateTitle({
        ...updateTilte,
        id: selectedId,
        name: selectTitle.name,
      });
    }
  }, [updateOpen, selectTitle]);
  if (!selectTitle) return null;
  return (
    <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
      <DialogTitle>ပြင်ဆင်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              defaultValue={selectTitle.name}
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setUpdateTitle({ ...updateTilte, name: evt.target.value })
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
            setUpdateTitle(defaultValue);
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

export default UpdateTitle;
