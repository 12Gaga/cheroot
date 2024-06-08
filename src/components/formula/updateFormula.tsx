import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UpdatedFormula, setIsLoading } from "@/store/slices/formula";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { updateFormula } from "@/types/formulaType";
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
import { useEffect, useState } from "react";

export interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

export const defaultValue: updateFormula = {
  id: null,
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

export const UpdateFormula = ({
  updateOpen,
  setUpdateOpen,
  selectedId,
}: Props) => {
  const formula = useAppSelector((store) => store.formula.item);
  const selectFormula = formula.find((item) => item.id === selectedId);
  const dispatch = useAppDispatch();
  const [updateFormula, setUpdateFormula] =
    useState<updateFormula>(defaultValue);
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
        UpdatedFormula({
          ...updateFormula,
          onSuccess: () => {
            setUpdateOpen(false);
            setUpdateFormula(defaultValue);
            dispatch(
              setOpenSnackbar({
                message: "Update formula success",
              })
            );
            dispatch(setIsLoading(false));
          },
        })
      );
  };

  useEffect(() => {
    if (selectFormula) {
      setUpdateFormula({
        ...updateFormula,
        id: selectedId,
        typeOfCherootId: selectFormula.typeOfCherootId,
        cherootQty: selectFormula.cherootQty,
        typeOfFilterSizeId: selectFormula.typeOfFilterSizeId,
        filterSizeQty: selectFormula.filterSizeQty,
        filterSizeBag: selectFormula.filterSizeBag,
        typeOfTabaccoId: selectFormula.typeOfTabaccoId,
        tabaccoQty: selectFormula.tabaccoQty,
        tin: selectFormula.tabaccoTin,
        pyi: selectFormula.tabaccoPyi,
      });
    }
  }, [updateOpen, selectFormula]);

  if (!selectFormula) return null;
  return (
    <>
      <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
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
                defaultValue={selectFormula.typeOfCherootId}
                value={updateFormula.typeOfCherootId}
                onChange={(evt) => {
                  setUpdateFormula({
                    ...updateFormula,
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
              defaultValue={selectFormula.cherootQty}
              placeholder="ဆေးလိပ်အရေအတွက်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setUpdateFormula({
                  ...updateFormula,
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
                defaultValue={selectFormula.typeOfFilterSizeId}
                value={updateFormula.typeOfFilterSizeId}
                onChange={(evt) => {
                  setUpdateFormula({
                    ...updateFormula,
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
              defaultValue={selectFormula.filterSizeQty}
              placeholder="အဆီခံအရေအတွက်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setUpdateFormula({
                  ...updateFormula,
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
                defaultValue={selectFormula.typeOfTabaccoId}
                value={updateFormula.typeOfTabaccoId}
                onChange={(evt) => {
                  setUpdateFormula({
                    ...updateFormula,
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
              defaultValue={selectFormula.tabaccoQty}
              placeholder="အရေအတွက်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setUpdateFormula({
                  ...updateFormula,
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
              defaultValue={selectFormula.tabaccoTin}
              placeholder="တင်း"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setUpdateFormula({
                  ...updateFormula,
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
              defaultValue={selectFormula.tabaccoPyi}
              placeholder="ပြည်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setUpdateFormula({
                  ...updateFormula,
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
              setUpdateOpen(false);
              setUpdateFormula(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
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
export default UpdateFormula;
