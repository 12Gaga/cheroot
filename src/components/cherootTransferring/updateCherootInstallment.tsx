import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  AddCherootInstallment,
  UpdatedCherootInstallment,
  setIsLoading,
} from "@/store/slices/cherootInstallment";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import {
  addCherootInstallment,
  updateCherootInstallment,
} from "@/types/cherootInstallment";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  DialogActions,
  Button,
  ListItemText,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateCherootInstallment = {
  id: null,
  date: "",
  conveyLocationId: null,
  cashBalance: 0,
  payBalance: 0,
};

const UpdateCherootInstallment = ({
  updateOpen,
  setUpdateOpen,
  selectedId,
}: Props) => {
  const selectedInstallment = useAppSelector(
    (store) => store.cherootInstallment.item
  ).find((item) => item.id === selectedId);
  const [selecteddate, setSelectedDate] = useState<any>(
    new Date().toLocaleDateString()
  );
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.cherootInstallment);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const locations = useAppSelector((store) => store.conveyLocation.item);
  const concernLocation = locations.filter(
    (item) => item.workShopId === workShop?.id
  );
  const cherootTransfer = useAppSelector((store) => store.cherootTransfer.item);
  const installment = useAppSelector((store) => store.cherootInstallment.item);
  const [updateCherootInstallment, setUpdateCherootInstallment] =
    useState<updateCherootInstallment>(defaultValue);

  const handleChange = (locationId: number) => {
    const Cherootamount = cherootTransfer
      .filter((item) => item.conveyLocationId === locationId)
      .reduce((total, cheroot) => {
        return (total += cheroot.totalPrice);
      }, 0);
    const installmentAmount = installment
      .filter((item) => item.conveyLocationId === locationId)
      .reduce((total, cheroot) => {
        return (total += cheroot.payBalance);
      }, 0);
    const amount = Cherootamount - installmentAmount;
    setUpdateCherootInstallment({
      ...updateCherootInstallment,
      conveyLocationId: locationId,
      cashBalance: amount,
    });
  };

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedCherootInstallment({
        ...updateCherootInstallment,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateCherootInstallment(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update installment success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  useEffect(() => {
    if (selectedInstallment) {
      setSelectedDate(selectedInstallment.date);
      setUpdateCherootInstallment({
        ...updateCherootInstallment,
        id: selectedId,
        date: selecteddate,
        conveyLocationId: selectedInstallment.conveyLocationId,
        cashBalance: selectedInstallment.cashBalance,
        payBalance: selectedInstallment.payBalance,
      });
    }
  }, [selectedInstallment, updateOpen]);

  useEffect(() => {
    setUpdateCherootInstallment({
      ...updateCherootInstallment,
      date: selecteddate,
    });
  }, [selecteddate]);
  if (!selectedInstallment) return null;
  return (
    <>
      <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}>
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
            <DatePicker
              selected={selecteddate}
              onChange={(date) => setSelectedDate(date?.toLocaleDateString())}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              mt: 5,
            }}
          >
            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                မြိုနာမည်
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectedInstallment.conveyLocationId}
                  value={updateCherootInstallment.conveyLocationId}
                  onChange={(evt) => {
                    handleChange(Number(evt.target.value));
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernLocation.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ဖက်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={1}
                  onChange={(evt) => {
                    setNewFilterSizeAddStock({
                      ...newFilterSizeAddStock,
                      typeOfFilterSizeId: Number(evt.target.value),
                    });
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernFilterSize.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box> */}

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ရရန်ကျန်ငွေ
              </Typography>
              <TextField
                value={updateCherootInstallment.cashBalance}
                placeholder="ကျန်ငွေ"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {}}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                သွင်းငွေ
              </Typography>
              <TextField
                defaultValue={selectedInstallment.payBalance}
                placeholder="သွင်းငွေ"
                sx={{ bgcolor: "#EEE8CF" }}
                onChange={(evt) => {
                  setUpdateCherootInstallment({
                    ...updateCherootInstallment,
                    payBalance: Number(evt.target.value),
                  });
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
              setUpdateCherootInstallment(defaultValue);
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
    </>
  );
};
export default UpdateCherootInstallment;
