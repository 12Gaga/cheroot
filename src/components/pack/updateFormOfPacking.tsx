import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
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
import { updateFormOfPacking } from "@/types/formOfPackingType";
import {
  UpdatedFormOfPacking,
  setIsLoading,
} from "@/store/slices/formOfPacking";
import UpdatePlasticData from "./updateplasticData";
import { FormOfPacking, TypeOfPacking } from "@prisma/client";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateFormOfPacking = {
  id: null,
  name: "",
  typeOfCherootId: undefined,
  typeOfPackingId: undefined,
  packingPlasticId: undefined,
  packingQty: 0,
  warppingPlasticId: undefined,
  warppingQty: 0,
  coverPlasticId: undefined,
  coverQty: 0,
  amount: 0,
  quantity: 0,
};

const UpdateFormOfPacking = ({
  updateOpen,
  setUpdateOpen,
  selectedId,
}: Props) => {
  const formOfPacking = useAppSelector((store) => store.formOfPacking.item);
  const selectFormOfPacking = formOfPacking.find(
    (item) => item.id === selectedId
  );
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const dispatch = useAppDispatch();
  const [updateFormOfPacking, setUpdateFormOfPacking] =
    useState<updateFormOfPacking>(defaultValue);
  const { isLoading } = useAppSelector((store) => store.formOfPacking);
  const typeOfPackings = useAppSelector((store) => store.typeOfPacking.item);
  const concernCheroots = useAppSelector(
    (store) => store.typeOfCheroot.item
  ).filter((item) => item.workShopId === workShop?.id);
  const [concernPackingType, setConcernPackingType] = useState<TypeOfPacking[]>(
    []
  );
  const handleCheroot = (cherootId: number) => {
    const packingType = typeOfPackings.filter(
      (item) => item.typeOfCherootId === cherootId
    );
    setConcernPackingType(packingType);
    setUpdateFormOfPacking({
      ...updateFormOfPacking,
      typeOfCherootId: cherootId,
    });
  };
  console.log("select", selectFormOfPacking);
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedFormOfPacking({
        ...updateFormOfPacking,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateFormOfPacking(defaultValue);
          dispatch(
            setOpenSnackbar({ message: "Update formOfPacking success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    if (selectFormOfPacking) {
      setUpdateFormOfPacking({
        ...updateFormOfPacking,
        id: selectedId,
        name: selectFormOfPacking.name,
        typeOfCherootId: selectFormOfPacking.typeOfCherootId,
        typeOfPackingId: selectFormOfPacking.typeOfPackingId,
        packingPlasticId: selectFormOfPacking.packingPlasticId,
        packingQty: selectFormOfPacking.packingPlasticQty,
        warppingPlasticId: selectFormOfPacking.warpingPlasticId,
        warppingQty: selectFormOfPacking.warpingPlasticQty,
        coverPlasticId: selectFormOfPacking.coverPlasticId,
        coverQty: selectFormOfPacking.coverPlasticQty,
        quantity: selectFormOfPacking.cherootQty,
        amount: selectFormOfPacking.amount,
      });
      const packingType = typeOfPackings.filter(
        (item) => item.typeOfCherootId === selectFormOfPacking.typeOfCherootId
      );
      setConcernPackingType(packingType);
    }
  }, [updateOpen, selectFormOfPacking]);
  if (!selectFormOfPacking) return null;
  return (
    <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
      <DialogTitle> ပြင်ဆင်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ထုပ်ပိုးမှုအမည်</Typography>
            <TextField
              defaultValue={selectFormOfPacking.name}
              placeholder="ထုပ်ပိုးမှုအမည်"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) =>
                setUpdateFormOfPacking({
                  ...updateFormOfPacking,
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
                defaultValue={selectFormOfPacking.typeOfCherootId}
                value={updateFormOfPacking.typeOfCherootId}
                onChange={(evt) => {
                  handleCheroot(Number(evt.target.value));
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

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ပါကင်အမျိုးအစား</Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                defaultValue={selectFormOfPacking.typeOfPackingId}
                value={updateFormOfPacking.typeOfPackingId}
                onChange={(evt) => {
                  setUpdateFormOfPacking({
                    ...updateFormOfPacking,
                    typeOfPackingId: Number(evt.target.value),
                  });
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {concernPackingType.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <UpdatePlasticData
            selectFormOfPacking={selectFormOfPacking}
            updateFormOfPacking={updateFormOfPacking}
            setUpdateFormOfPacking={setUpdateFormOfPacking}
          />

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဈေးနှုန်း</Typography>
            <TextField
              defaultValue={selectFormOfPacking.amount}
              placeholder="ဈေးနှုန်း"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) =>
                setUpdateFormOfPacking({
                  ...updateFormOfPacking,
                  amount: Number(evt.target.value),
                })
              }
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ဆေးလိပ်အရေအတွက်</Typography>
            <TextField
              defaultValue={selectFormOfPacking.cherootQty}
              placeholder="ဆေးလိပ်အရေအတွက်"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) =>
                setUpdateFormOfPacking({
                  ...updateFormOfPacking,
                  quantity: Number(evt.target.value),
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
            setUpdateFormOfPacking(defaultValue);
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

export default UpdateFormOfPacking;
