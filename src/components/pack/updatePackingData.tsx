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
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FormOfPacking, TypeOfPacking } from "@prisma/client";
import { addPackingData, updatePackingData } from "@/types/pacingDataType";
import { LoadingButton } from "@mui/lab";
import {
  AddPackingData,
  UpdatedPackingData,
  setIsLoading,
} from "@/store/slices/packingData";
import { setOpenSnackbar } from "@/store/slices/snackBar";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updatePackingData = {
  id: null,
  date: null,
  typeOfCherootId: null,
  typeOfPackingId: null,
  formOfPackingId: null,
  quantity: 0,
  garageId: null,
  packingPlasticId: null,
  packingPlasticQty: 0,
  warpingPlasticId: null,
  warpingPlasticQty: 0,
  coverPlasticId: null,
  coverPlasticQty: 0,
};

const UpdatePackingData = ({
  updateOpen,
  setUpdateOpen,
  selectedId,
}: Props) => {
  const selectPackingData = useAppSelector(
    (store) => store.packingData.item
  ).find((item) => item.id === selectedId);
  console.log("dfeithg", selectPackingData);
  const [selecteddate, setSelectedDate] = useState<any>(
    new Date().toLocaleDateString()
  );
  const { isLoading } = useAppSelector((store) => store.packingData);
  const dispatch = useAppDispatch();
  const workshop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item);
  const concernCheroots = cheroots.filter(
    (item) => item.workShopId === workshop?.id
  );
  const garages = useAppSelector((store) => store.garage.item);
  const concernGarages = garages.filter((g) => g.workShopId === workshop?.id);
  const typeOfPacking = useAppSelector((store) => store.typeOfPacking.item);
  const formOfPacking = useAppSelector((store) => store.formOfPacking.item);
  const [updatePackingData, setUpdatePackingData] =
    useState<updatePackingData>(defaultValue);
  const [concernPackingType, setConcernPackingType] = useState<TypeOfPacking[]>(
    []
  );
  const [concernPackingForm, setConcernPackingForm] = useState<FormOfPacking[]>(
    []
  );
  const [cherootQty, setCherootQty] = useState<number>(0);
  const handleCheroot = (cherootId: number) => {
    const packingType = typeOfPacking.filter(
      (item) => item.typeOfCherootId === cherootId
    );
    setConcernPackingType(packingType);
    setUpdatePackingData({ ...updatePackingData, typeOfCherootId: cherootId });
  };
  const handlePackingType = (packingTypeId: number) => {
    const packingForm = formOfPacking.filter(
      (item) => item.typeOfPackingId === packingTypeId
    );
    setConcernPackingForm(packingForm);
    setUpdatePackingData({
      ...updatePackingData,
      typeOfPackingId: packingTypeId,
    });
  };

  const handelFormType = (formTypeId: number) => {
    const exit = formOfPacking.find(
      (item) => item.id === formTypeId
    ) as FormOfPacking;
    const tolPackingPlasticQty =
      updatePackingData.quantity * exit.packingPlasticQty;
    const tolWarpingPlasticQty =
      updatePackingData.quantity * exit.warpingPlasticQty;
    const tolCoverPlasticQty =
      updatePackingData.quantity * exit.coverPlasticQty;
    setUpdatePackingData({
      ...updatePackingData,
      formOfPackingId: formTypeId,
      packingPlasticId: exit.packingPlasticId,
      packingPlasticQty: tolPackingPlasticQty,
      warpingPlasticId: exit.warpingPlasticId,
      warpingPlasticQty: tolWarpingPlasticQty,
      coverPlasticId: exit.coverPlasticId,
      coverPlasticQty: tolCoverPlasticQty,
    });
    setCherootQty(exit.cherootQty);
  };

  const handleQty = (qty: number) => {
    const exit = formOfPacking.find(
      (item) => item.id === updatePackingData.formOfPackingId
    ) as FormOfPacking;
    const tolPackingPlasticQty = qty * exit.packingPlasticQty;
    const tolWarpingPlasticQty = qty * exit.warpingPlasticQty;
    const tolCoverPlasticQty = qty * exit.coverPlasticQty;
    setUpdatePackingData({
      ...updatePackingData,
      quantity: qty,
      packingPlasticQty: tolPackingPlasticQty,
      warpingPlasticQty: tolWarpingPlasticQty,
      coverPlasticQty: tolCoverPlasticQty,
    });
  };

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedPackingData({
        ...updatePackingData,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdatePackingData(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update packing success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  useEffect(() => {
    setUpdatePackingData({ ...updatePackingData, date: selecteddate });
  }, [selecteddate, updateOpen]);

  useEffect(() => {
    if (selectPackingData) {
      setSelectedDate(selectPackingData.date);
      setUpdatePackingData({
        ...updatePackingData,
        id: selectedId,
        date: selecteddate,
        garageId: selectPackingData.garageId,
        typeOfCherootId: selectPackingData.typeOfCherootId,
        typeOfPackingId: selectPackingData.typeOfPackingId,
        formOfPackingId: selectPackingData.formOfPackingId,
        packingPlasticId: selectPackingData.packingPlasticId,
        packingPlasticQty: selectPackingData.packingPlasticQty,
        warpingPlasticId: selectPackingData.warpingPlasticId,
        warpingPlasticQty: selectPackingData.warpingPlasticQty,
        coverPlasticId: selectPackingData.coverPlasticId,
        coverPlasticQty: selectPackingData.coverPlasticQty,
        quantity: selectPackingData.quantity,
      });
      const packingType = typeOfPacking.filter(
        (item) => item.typeOfCherootId === selectPackingData.typeOfCherootId
      );
      setConcernPackingType(packingType);
      const packingForm = formOfPacking.filter(
        (item) => item.typeOfPackingId === selectPackingData.typeOfPackingId
      );
      setConcernPackingForm(packingForm);
      const exit = formOfPacking.find(
        (item) => item.id === selectPackingData.formOfPackingId
      ) as FormOfPacking;
      setCherootQty(exit.cherootQty);
    }
  }, [selectPackingData, updateOpen]);
  console.log("updatepackig", updatePackingData);
  console.log("cheroots", concernCheroots);
  console.log("typeoFplastic", concernPackingType);
  console.log("formofplastic", concernPackingForm);

  if (!selectPackingData) return null;
  return (
    <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
      <DialogTitle> ပါကင်စာရင်းထည့်ခြင်း</DialogTitle>
      <DialogContent>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mr: 2,
            }}
          >
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
            <DatePicker
              selected={selecteddate}
              onChange={(date) => setSelectedDate(date?.toLocaleDateString())}
            />
          </Box>

          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>
                ဆေးလိပ်အရေအတွက်
              </Typography>
              <TextField
                value={cherootQty}
                sx={{ bgcolor: "#EEE8CF", width: 150 }}
                onChange={() => {}}
              />
            </Box>
            <Box sx={{ my: 3, display: "flex", alignItems: "center", ml: 2 }}>
              <Typography sx={{ fontWeight: "bold", width: 80 }}>
                ဂိုထောင်
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectPackingData.garageId}
                  value={updatePackingData.garageId}
                  onChange={(evt) => {
                    setUpdatePackingData({
                      ...updatePackingData,
                      garageId: Number(evt.target.value),
                    });
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernGarages.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              ဆေးလိပ်အမျိုးအစား
            </Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                defaultValue={selectPackingData.typeOfCherootId}
                value={updatePackingData.typeOfCherootId}
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
                defaultValue={selectPackingData.typeOfPackingId}
                value={updatePackingData.typeOfPackingId}
                onChange={(evt) => {
                  handlePackingType(Number(evt.target.value));
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

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              ထုပ်ပိုးမှုအမျိုးအစား
            </Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                defaultValue={selectPackingData.formOfPackingId}
                value={updatePackingData.formOfPackingId}
                onChange={(evt) => {
                  handelFormType(Number(evt.target.value));
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {concernPackingForm.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>အရေအတွက်</Typography>
            <TextField
              defaultValue={selectPackingData.quantity}
              placeholder="အရေအတွက်"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) => {
                handleQty(Number(evt.target.value));
              }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setUpdateOpen(false);
            setUpdatePackingData(defaultValue);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          onClick={handleClick}
          loading={isLoading}
        >
          အိုကေ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePackingData;
