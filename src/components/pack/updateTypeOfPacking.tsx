import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateTypeOfPacking } from "@/types/typeOfPackingType";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  UpdatedTypeOfPacking,
  setIsLoading,
} from "@/store/slices/typeOfPacking";
import { setOpenSnackbar } from "@/store/slices/snackBar";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateTypeOfPacking = {
  id: null,
  name: "",
  typeOfCherootId: undefined,
};

const UpdateTypeOfPacking = ({
  updateOpen,
  setUpdateOpen,
  selectedId,
}: Props) => {
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const typeOfPacking = useAppSelector((store) => store.typeOfPacking.item);
  const selectTypeOfPacking = typeOfPacking.find(
    (item) => item.id === selectedId
  );
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item);
  const concernCheroot = cheroots.filter(
    (item) => item.workShopId === workShop?.id
  );
  const dispatch = useAppDispatch();
  const [updateTypeOfPacking, setUpdateTypeOfPacking] =
    useState<updateTypeOfPacking>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.typeOfPacking);
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedTypeOfPacking({
        ...updateTypeOfPacking,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateTypeOfPacking(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Update typeOfPacking success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    if (selectTypeOfPacking) {
      setUpdateTypeOfPacking({
        ...updateTypeOfPacking,
        id: selectedId,
        name: selectTypeOfPacking.name,
        typeOfCherootId: selectTypeOfPacking.typeOfCherootId,
      });
    }
  }, [updateOpen, selectTypeOfPacking]);
  if (!selectTypeOfPacking) return null;
  return (
    <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
      <DialogTitle> ပြင်ဆင်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
            <TextField
              defaultValue={selectTypeOfPacking.name}
              placeholder="အမည်"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) =>
                setUpdateTypeOfPacking({
                  ...updateTypeOfPacking,
                  name: evt.target.value,
                })
              }
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              ဆေးလိပ်အမျိုးအစား
            </Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                defaultValue={selectTypeOfPacking.typeOfCherootId}
                value={updateTypeOfPacking.typeOfCherootId}
                onChange={(evt) => {
                  setUpdateTypeOfPacking({
                    ...updateTypeOfPacking,
                    typeOfCherootId: Number(evt.target.value),
                  });
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {concernCheroot.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setUpdateOpen(false);
            setUpdateTypeOfPacking(defaultValue);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          onClick={handleClick}
          loading={isLoading}
        >
          ပြင်မည်
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateTypeOfPacking;
