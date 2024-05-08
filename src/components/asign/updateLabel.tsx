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
  CreateLabel,
  UpdatedLabel,
  setIsLoading,
} from "@/store/slices/typeOfLabel";
import { updateLabel } from "@/types/labelType";

interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateLabel = {
  id: null,
  name: "",
  price: 0,
};

const UpdateLabel = ({ updateOpen, setUpdateOpen, selectedId }: Props) => {
  const labels = useAppSelector((store) => store.typeOfLabel.item);
  const selectLabel = labels.find((item) => item.id === selectedId);
  const [updateLabel, setUpdateLabel] = useState<updateLabel>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.typeOfLabel);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedLabel({
        ...updateLabel,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateLabel(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update label success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  useEffect(() => {
    if (selectLabel) {
      setUpdateLabel({
        ...updateLabel,
        id: selectedId,
        name: selectLabel.name,
        price: selectLabel.price,
      });
    }
  }, [updateOpen, selectLabel]);
  if (!selectLabel) return null;
  return (
    <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
      <DialogTitle>ပြင်ဆင်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              defaultValue={selectLabel.name}
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setUpdateLabel({ ...updateLabel, name: evt.target.value })
              }
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဈေးနှုန်း</Typography>
            <TextField
              defaultValue={selectLabel.price}
              placeholder="ဈေးနှုန်း"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setUpdateLabel({
                  ...updateLabel,
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
            setUpdateLabel(defaultValue);
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

export default UpdateLabel;
