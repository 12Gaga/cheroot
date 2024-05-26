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
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import {
  createNewLabelTransfer,
  updateLabelTransfer,
} from "@/types/labelTransferGarageType";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import {
  CreateLabelTransfer,
  UpdatedLabelTransfer,
  setIsLoading,
} from "@/store/slices/labelGarageTransfer";
import { LoadingButton } from "@mui/lab";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedId: number;
}

const defaultValue: updateLabelTransfer = {
  id: null,
  date: null,
  exitGarageId: null,
  enterenceGarageId: null,
  typeOfLabelId: null,
  bandle: 0,
};

const UpdateTransferLabel = ({
  updateOpen,
  setUpdateOpen,
  selectedId,
}: Props) => {
  const labelTransfer = useAppSelector((store) => store.labelTransfer.item);
  const selectLabelTransfer = labelTransfer.find(
    (item) => item.id === selectedId
  );
  const dispatch = useAppDispatch();
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [updateLabelTransfer, setUpdateLabelTransfer] =
    useState<updateLabelTransfer>(defaultValue);
  const garages = useAppSelector((store) => store.garage.item);
  const concernGarages = garages.filter(
    (item) => item.workShopId === workShop?.id
  );
  const labels = useAppSelector((store) => store.typeOfLabel.item);
  const concernLabels = labels.filter(
    (item) => item.workShopId === workShop?.id
  );
  const { isLoading } = useAppSelector((store) => store.labelTransfer);
  useEffect(() => {
    if (selectLabelTransfer) {
      setSelectedDate(selectLabelTransfer.date);
      setUpdateLabelTransfer({
        ...updateLabelTransfer,
        id: selectedId,
        date: selecteddate,
        exitGarageId: selectLabelTransfer.exitGarageId,
        enterenceGarageId: selectLabelTransfer.enterenceGarageId,
        typeOfLabelId: selectLabelTransfer.typeOfLabelId,
        bandle: selectLabelTransfer.bandle,
      });
    }
  }, [selectLabelTransfer, updateOpen]);

  useEffect(() => {
    setUpdateLabelTransfer({
      ...updateLabelTransfer,
      date: selecteddate,
    });
  }, [selecteddate]);

  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedLabelTransfer({
        ...updateLabelTransfer,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateLabelTransfer(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update transferring success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  console.log("data", updateLabelTransfer);
  if (!selectLabelTransfer) return null;
  return (
    <>
      <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
        <DialogTitle>ပြင်ဆင်ခြင်း</DialogTitle>
        <DialogContent>
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

          <Box sx={{ display: "flex" }}>
            <Box sx={{ mt: 2, mr: 3 }}>
              <Typography sx={{ fontWeight: "bold" }}>အထွက်ဂိုထောင်</Typography>
              <FormControl variant="filled" sx={{ width: 150 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectLabelTransfer.exitGarageId}
                  value={updateLabelTransfer.exitGarageId}
                  onChange={(evt) => {
                    setUpdateLabelTransfer({
                      ...updateLabelTransfer,
                      exitGarageId: Number(evt.target.value),
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

            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontWeight: "bold" }}>အဝင်ဂိုထောင်</Typography>
              <FormControl variant="filled" sx={{ width: 150 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={selectLabelTransfer.enterenceGarageId}
                  value={updateLabelTransfer.enterenceGarageId}
                  onChange={(evt) => {
                    setUpdateLabelTransfer({
                      ...updateLabelTransfer,
                      enterenceGarageId: Number(evt.target.value),
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

          <Box sx={{ mt: 2, mr: 3 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              တံဆိပ်အမျိုးအစား
            </Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                defaultValue={selectLabelTransfer.typeOfLabelId}
                value={updateLabelTransfer.typeOfLabelId}
                onChange={(evt) => {
                  setUpdateLabelTransfer({
                    ...updateLabelTransfer,
                    typeOfLabelId: Number(evt.target.value),
                  });
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {concernLabels.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>လိပ်</Typography>
            <TextField
              defaultValue={selectLabelTransfer.bandle}
              placeholder="လိပ်"
              sx={{ bgcolor: "#EEE8CF", width: 300 }}
              onChange={(evt) => {
                setUpdateLabelTransfer({
                  ...updateLabelTransfer,
                  bandle: Number(evt.target.value),
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
              setUpdateLabelTransfer(defaultValue);
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
export default UpdateTransferLabel;
