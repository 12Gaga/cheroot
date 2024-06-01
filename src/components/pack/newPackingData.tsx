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
import { addPackingData } from "@/types/pacingDataType";
import { LoadingButton } from "@mui/lab";
import { AddPackingData, setIsLoading } from "@/store/slices/packingData";
import { setOpenSnackbar } from "@/store/slices/snackBar";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: addPackingData = {
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

const NewPackingData = ({ open, setOpen }: Props) => {
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
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
  const [packingData, setPackingData] = useState<addPackingData>(defaultValue);
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
    setPackingData({ ...packingData, typeOfCherootId: cherootId });
  };
  const handlePackingType = (packingTypeId: number) => {
    const packingForm = formOfPacking.filter(
      (item) => item.typeOfPackingId === packingTypeId
    );
    setConcernPackingForm(packingForm);
    setPackingData({ ...packingData, typeOfPackingId: packingTypeId });
  };

  const handelFormType = (formTypeId: number) => {
    const exit = formOfPacking.find(
      (item) => item.id === formTypeId
    ) as FormOfPacking;
    const tolPackingPlasticQty = packingData.quantity * exit.packingPlasticQty;
    const tolWarpingPlasticQty = packingData.quantity * exit.warpingPlasticQty;
    const tolCoverPlasticQty = packingData.quantity * exit.coverPlasticQty;
    setPackingData({
      ...packingData,
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
      (item) => item.id === packingData.formOfPackingId
    ) as FormOfPacking;
    const tolPackingPlasticQty = qty * exit.packingPlasticQty;
    const tolWarpingPlasticQty = qty * exit.warpingPlasticQty;
    const tolCoverPlasticQty = qty * exit.coverPlasticQty;
    setPackingData({
      ...packingData,
      quantity: qty,
      packingPlasticQty: tolPackingPlasticQty,
      warpingPlasticQty: tolWarpingPlasticQty,
      coverPlasticQty: tolCoverPlasticQty,
    });
  };

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      AddPackingData({
        ...packingData,
        onSuccess: () => {
          setOpen(false);
          setPackingData(defaultValue);
          dispatch(setOpenSnackbar({ message: "Add new packing success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  useEffect(() => {
    setPackingData({ ...packingData, date: selecteddate });
  }, [selecteddate, open]);

  console.log("packingData", packingData);
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
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
              onChange={(date) => setSelectedDate(date as Date)}
            />
          </Box>

          <Box sx={{ mt: 2, display: "flex" }}>
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
                  value={packingData.garageId}
                  onChange={(evt) => {
                    setPackingData({
                      ...packingData,
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
                value={packingData.typeOfCherootId}
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
                value={packingData.typeOfPackingId}
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
                value={packingData.formOfPackingId}
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
            setOpen(false);
            setPackingData(defaultValue);
          }}
        >
          မလုပ်တော့ပါ
        </Button>
        <LoadingButton
          variant="contained"
          disabled={
            !packingData.date ||
            !packingData.typeOfCherootId ||
            !packingData.typeOfPackingId ||
            !packingData.packingPlasticId ||
            !packingData.packingPlasticQty ||
            !packingData.warpingPlasticId ||
            !packingData.warpingPlasticQty ||
            !packingData.coverPlasticId ||
            !packingData.coverPlasticQty ||
            !packingData.formOfPackingId ||
            !packingData.quantity
          }
          onClick={handleClick}
          loading={isLoading}
        >
          အိုကေ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewPackingData;
