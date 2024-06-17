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
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { createNewLeafTransfer } from "@/types/leafTransferGarageType";
import { Leaf } from "@prisma/client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LoadingButton } from "@mui/lab";
import {
  CreateLeafTransfer,
  setIsLoading,
} from "@/store/slices/leafGarageTransfer";
import { setOpenSnackbar } from "@/store/slices/snackBar";
interface Props {
  open: boolean;
  setOpen: (Value: boolean) => void;
}

const defaultValue: createNewLeafTransfer = {
  date: null,
  exitGarageId: null,
  enterenceGarageId: null,
  typeOfLeafId: null,
  batchNos: [],
  tolViss: 0,
};

const NewTransferLeaf = ({ open, setOpen }: Props) => {
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [transferLeaf, setTransferLeaf] =
    useState<createNewLeafTransfer>(defaultValue);
  const workshop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const leafStock = useAppSelector((store) => store.leafStock.item);
  const leafTransfer = useAppSelector((store) => store.leafTransfer.item);
  const payLeaf = useAppSelector((store) => store.payLeaf.item);
  const concernGarages = useAppSelector((store) => store.garage.item).filter(
    (item) => item.workShopId === workshop?.id
  );
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const concernLeaves = leaves.filter(
    (item) => item.workShopId === workshop?.id
  );
  const [concernLeafStock, setConcernLeafStock] = useState<Leaf[]>([]);
  const [concernBatchNos, setConcernBatchNos] = useState<Leaf[]>([]);
  useState<number>(1);

  const handleExitGarage = (exitId: number) => {
    const concernLeafStocks = leafStock.filter(
      (item) => item.garageId === exitId
    );
    const findTransferData = leafTransfer.filter(
      (item) =>
        item.exitGarageId === exitId &&
        item.typeOfLeafId === transferLeaf.typeOfLeafId
    );
    const transferBatchNo = findTransferData.map((item) => item.batchNo);
    const transferDates = findTransferData.map((item) => item.enterDate);
    const concerndata = concernLeafStocks.filter(
      (item) =>
        !transferBatchNo.includes(item.batchNo) ||
        !transferDates.includes(item.date)
    );
    const findPayData = payLeaf.filter(
      (item) =>
        item.garageId === exitId &&
        item.typeOfLeafId === transferLeaf.typeOfLeafId
    );
    const findPayBatch = findPayData.map((p) => p.batchNo);
    const payDates = findPayData.map((p) => p.enterDate);
    const lastconcernData = concerndata.filter(
      (item) =>
        !findPayBatch.includes(item.batchNo) || !payDates.includes(item.date)
    );
    const concernBatch = lastconcernData.filter(
      (item) => item.typeOfLeafId === transferLeaf.typeOfLeafId
    );
    setConcernLeafStock(lastconcernData);
    setConcernBatchNos(concernBatch);
    setTransferLeaf({ ...transferLeaf, exitGarageId: exitId });
  };
  const handleLeaf = (leafId: number) => {
    const concernLeafStocks = leafStock.filter(
      (item) => item.garageId === transferLeaf.exitGarageId
    );
    const findTransferData = leafTransfer.filter(
      (item) =>
        item.exitGarageId === transferLeaf.exitGarageId &&
        item.typeOfLeafId === leafId
    );
    const transferBatchNo = findTransferData.map((item) => item.batchNo);
    const transferDates = findTransferData.map((item) => item.enterDate);
    const concerndata = concernLeafStocks.filter(
      (item) =>
        !transferBatchNo.includes(item.batchNo) ||
        !transferDates.includes(item.date)
    );
    const findPayData = payLeaf.filter(
      (item) =>
        item.garageId === transferLeaf.exitGarageId &&
        item.typeOfLeafId === leafId
    );
    const findPayBatch = findPayData.map((p) => p.batchNo);
    const payDates = findPayData.map((p) => p.enterDate);
    const lastconcernData = concerndata.filter(
      (item) =>
        !findPayBatch.includes(item.batchNo) || !payDates.includes(item.date)
    );
    const batchNos = lastconcernData.filter(
      (item) => item.typeOfLeafId === leafId
    );
    setConcernLeafStock(concerndata);
    setConcernBatchNos(batchNos);
    setTransferLeaf({ ...transferLeaf, typeOfLeafId: leafId });
  };
  const handleChange = (evt: SelectChangeEvent<number[]>) => {
    const selectBatchNo = evt.target.value as number[];
    const totalViss = concernLeafStock
      .filter((item) => selectBatchNo.includes(item.id))
      .reduce((totalViss, viss) => {
        return (totalViss += viss.viss);
      }, 0);
    setTransferLeaf({
      ...transferLeaf,
      batchNos: selectBatchNo,
      tolViss: totalViss,
    });
    console.log("batch", transferLeaf.batchNos);
  };
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.leafTransfer);
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreateLeafTransfer({
        ...transferLeaf,
        onSuccess: () => {
          setOpen(false);
          setTransferLeaf(defaultValue);
          dispatch(setOpenSnackbar({ message: "Transferring success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  useEffect(() => {
    setTransferLeaf({ ...transferLeaf, date: selecteddate });
  }, [selecteddate, open]);
  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setTransferLeaf(defaultValue);
        }}
      >
        <DialogTitle></DialogTitle>
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
                  value={transferLeaf.exitGarageId}
                  onChange={(evt) => {
                    handleExitGarage(Number(evt.target.value));
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
                  value={transferLeaf.enterenceGarageId}
                  onChange={(evt) => {
                    setTransferLeaf({
                      ...transferLeaf,
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
            <Typography sx={{ fontWeight: "bold" }}>ဖက်အမျိုးအစား</Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={transferLeaf.typeOfLeafId}
                onChange={(evt) => {
                  handleLeaf(Number(evt.target.value));
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {concernLeaves.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ပိုနံပါတ်</Typography>
            <FormControl variant="filled" sx={{ width: 300 }}>
              <Select
                multiple
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={transferLeaf.batchNos}
                onChange={(evt) => {
                  handleChange(evt);
                }}
                sx={{ bgcolor: "#EEE8CF" }}
                renderValue={(selectedBatchNoIds) => {
                  return selectedBatchNoIds
                    .map((batchNoId) => {
                      const batchNo = concernBatchNos.find(
                        (item) => item.id === batchNoId
                      ) as Leaf;
                      return batchNo;
                    })
                    .map((item) => item.batchNo)
                    .join(", ");
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.5 + 8,
                      width: 250,
                    },
                  },
                }}
              >
                {concernBatchNos.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.batchNo} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ width: 250, mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>ပိဿာ</Typography>
            <TextField
              value={transferLeaf.tolViss}
              placeholder="ပိဿာ"
              sx={{ bgcolor: "#EEE8CF" }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
              setTransferLeaf(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            disabled={
              !transferLeaf.exitGarageId ||
              !transferLeaf.enterenceGarageId ||
              !transferLeaf.typeOfLeafId ||
              !transferLeaf.batchNos.length ||
              !transferLeaf.tolViss
            }
            onClick={handleClick}
            loading={isLoading}
          >
            ကူးပြောင်းမည်
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default NewTransferLeaf;
