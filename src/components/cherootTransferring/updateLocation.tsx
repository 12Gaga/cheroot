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
import { updateConveyLocation } from "@/types/conveyLocationType";
import {
  UpdatedConveyLocation,
  setIsLoading,
} from "@/store/slices/conveyLocation";

interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateConveyLocation = {
  id: null,
  name: "",
};

const UpdateLocation = ({ updateOpen, setUpdateOpen, selectedId }: Props) => {
  const locations = useAppSelector((store) => store.conveyLocation.item);
  const selectLocation = locations.find((item) => item.id === selectedId);
  const [updateLocation, setUpdateLocation] =
    useState<updateConveyLocation>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.conveyLocation);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedConveyLocation({
        ...updateLocation,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateLocation(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update Location success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    if (selectLocation) {
      setUpdateLocation({
        ...updateLocation,
        id: selectedId,
        name: selectLocation.name,
      });
    }
  }, [updateOpen, selectLocation]);
  if (!selectLocation) return null;
  return (
    <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
      <DialogTitle>ပြင်ဆင်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              defaultValue={selectLocation.name}
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) =>
                setUpdateLocation({ ...updateLocation, name: evt.target.value })
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
            setUpdateLocation(defaultValue);
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

export default UpdateLocation;
