import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CreateFormula, setIsLoading } from "@/store/slices/formula";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { createNewFormula } from "@/types/formulaType";
import { LoadingButton } from "@mui/lab";
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
import { useState } from "react";

export interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const defaultValue: createNewFormula = {
  typeOfCherootId: undefined,
  cherootQty: 0,
  typeOfFilterSizeId: undefined,
  filterSizeQty: 0,
  filterSizeBag: 0,
  typeOfTabaccoId: undefined,
  tabaccoQty: 0,
  tin: 0,
  pyi: 0,
};

export const NewFormula = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const [newFormula, setNewFormula] = useState<createNewFormula>(defaultValue);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item);
  const concernCheroots = cheroots.filter(
    (item) => item.workShopId === workShop?.id
  );
  const filterSizes = useAppSelector((store) => store.typeOfFilterSize.item);
  const concernFilterSizes = filterSizes.filter(
    (item) => item.workShopId === workShop?.id
  );
  const tabaccos = useAppSelector((store) => store.typeOfTabacco.item);
  const concernTabaccos = tabaccos.filter(
    (item) => item.workShopId === workShop?.id
  );
  const { isLoading } = useAppSelector((store) => store.formula);
  const handleClick = () => {
    dispatch(setIsLoading(true)),
      dispatch(
        CreateFormula({
          ...newFormula,
          onSuccess: () => {
            setOpen(false);
            setNewFormula(defaultValue);
            dispatch(
              setOpenSnackbar({
                message: "Create new tabacco add Stock success",
              })
            );
            dispatch(setIsLoading(false));
          },
        })
      );
  };
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Formula ထည့်သွင်းခြင်း</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ဆေးလိပ်အမျိုးအစား
            </Typography>
            <FormControl variant="filled" sx={{ width: 225 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={newFormula.typeOfCherootId}
                onChange={(evt) => {
                  setNewFormula({
                    ...newFormula,
                    typeOfCherootId: Number(evt.target.value),
                  });
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {concernCheroots.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ဆေးလိပ်အရေအတွက်
            </Typography>
            <TextField
              placeholder="ဆေးလိပ်အရေအတွက်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setNewFormula({
                  ...newFormula,
                  cherootQty: Number(evt.target.value),
                });
              }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              အဆီခံအမျိုးအစား
            </Typography>
            <FormControl variant="filled" sx={{ width: 225 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={newFormula.typeOfFilterSizeId}
                onChange={(evt) => {
                  setNewFormula({
                    ...newFormula,
                    typeOfFilterSizeId: Number(evt.target.value),
                  });
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {concernFilterSizes.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              အဆီခံအရေအတွက်
            </Typography>
            <TextField
              placeholder="အဆီခံအရေအတွက်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setNewFormula({
                  ...newFormula,
                  filterSizeQty: Number(evt.target.value),
                });
              }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ဆေးစပ်အမျိုးအစား
            </Typography>
            <FormControl variant="filled" sx={{ width: 225 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={newFormula.typeOfTabaccoId}
                onChange={(evt) => {
                  setNewFormula({
                    ...newFormula,
                    typeOfTabaccoId: Number(evt.target.value),
                  });
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {concernTabaccos.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ဆေးလိပ်အရေအတွက်
            </Typography>
            <TextField
              placeholder="အရေအတွက်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setNewFormula({
                  ...newFormula,
                  tabaccoQty: Number(evt.target.value),
                });
              }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              တင်း
            </Typography>
            <TextField
              placeholder="တင်း"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setNewFormula({
                  ...newFormula,
                  tin: Number(evt.target.value),
                });
              }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ပြည်
            </Typography>
            <TextField
              placeholder="ပြည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setNewFormula({
                  ...newFormula,
                  pyi: Number(evt.target.value),
                });
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
              setNewFormula(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !newFormula.typeOfCherootId ||
              !newFormula.cherootQty ||
              !newFormula.typeOfFilterSizeId ||
              !newFormula.filterSizeQty ||
              !newFormula.typeOfTabaccoId ||
              !newFormula.tabaccoQty ||
              !newFormula.tin ||
              !newFormula.pyi
            }
            onClick={handleClick}
            loading={isLoading}
          >
            သိမ်းမည်
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewFormula;
