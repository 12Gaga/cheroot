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
import {
  createNewLeafTransfer,
  updateLeafTransfer,
} from "@/types/leafTransferGarageType";
import { Leaf } from "@prisma/client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LoadingButton } from "@mui/lab";
import {
  CreateLeafTransfer,
  UpdatedLeafTransfer,
  setIsLoading,
} from "@/store/slices/leafGarageTransfer";
import { setOpenSnackbar } from "@/store/slices/snackBar";
interface Props {
  updateOpen: boolean;
  setUpdateOpen: (value: boolean) => void;
  selectedSeq: string;
}

const defaultValue: updateLeafTransfer = {
  transferSeq: "",
  date: "",
  exitGarageId: null,
  enterenceGarageId: null,
  typeOfLeafId: null,
  batchNos: [],
  tolViss: 0,
};

const UpdateTransferLeaf = ({
  updateOpen,
  setUpdateOpen,
  selectedSeq,
}: Props) => {
  const selectedTransferLeaf = useAppSelector(
    (store) => store.leafTransfer.item
  ).filter((item) => item.transferSeq === selectedSeq);
  const [selecteddate, setSelectedDate] = useState<any>(
    new Date().toLocaleDateString()
  );
  const [updateTransferLeaf, setUpdateTransferLeaf] =
    useState<updateLeafTransfer>(defaultValue);
  const workshop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const leafStock = useAppSelector((store) => store.leafStock.item);
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
    const concernBatch = concernLeafStocks.filter(
      (item) => item.typeOfLeafId === updateTransferLeaf.typeOfLeafId
    );
    setConcernLeafStock(concernLeafStocks);
    setConcernBatchNos(concernBatch);
    setUpdateTransferLeaf({ ...updateTransferLeaf, exitGarageId: exitId });
  };
  const handleLeaf = (leafId: number) => {
    const batchNos = concernLeafStock.filter(
      (item) => item.typeOfLeafId === leafId
    );
    setConcernBatchNos(batchNos);
    setUpdateTransferLeaf({ ...updateTransferLeaf, typeOfLeafId: leafId });
  };
  const handleChange = (evt: SelectChangeEvent<number[]>) => {
    const selectBatchNo = evt.target.value as number[];
    const totalViss = concernLeafStock
      .filter((item) => selectBatchNo.includes(item.id))
      .reduce((totalViss, viss) => {
        return (totalViss += viss.viss);
      }, 0);
    setUpdateTransferLeaf({
      ...updateTransferLeaf,
      batchNos: selectBatchNo,
      tolViss: totalViss,
    });
    console.log("batch", updateTransferLeaf.batchNos);
  };
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.leafTransfer);
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      UpdatedLeafTransfer({
        ...updateTransferLeaf,
        onSuccess: () => {
          setUpdateOpen(false);
          setUpdateTransferLeaf(defaultValue);
          dispatch(setOpenSnackbar({ message: "Update Transferring success" }));
          dispatch(setIsLoading(false));
        },
      })
    );
  };

  useEffect(() => {
    if (selectedTransferLeaf) {
      setSelectedDate(selectedTransferLeaf[0].date);
      setUpdateTransferLeaf({
        ...updateTransferLeaf,
        transferSeq: selectedSeq,
        date: selecteddate,
        exitGarageId: selectedTransferLeaf[0].exitGarageId,
        enterenceGarageId: selectedTransferLeaf[0].enterenceGarageId,
        typeOfLeafId: selectedTransferLeaf[0].typeOfLeafId,
      });
    }
  }, [selectedTransferLeaf, updateOpen]);

  useEffect(() => {
    setUpdateTransferLeaf({
      ...updateTransferLeaf,
      date: selecteddate,
    });
  }, [selecteddate]);
  return (
    <>
      <Dialog open={updateOpen} onClose={() => setUpdateOpen(false)}>
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
              onChange={(date) => setSelectedDate(date?.toLocaleDateString())}
            />
          </Box>

          <Box sx={{ display: "flex" }}>
            <Box sx={{ mt: 2, mr: 3 }}>
              <Typography sx={{ fontWeight: "bold" }}>အထွက်ဂိုထောင်</Typography>
              <FormControl variant="filled" sx={{ width: 150 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={updateTransferLeaf.exitGarageId}
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
                  value={updateTransferLeaf.enterenceGarageId}
                  onChange={(evt) => {
                    setUpdateTransferLeaf({
                      ...updateTransferLeaf,
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
                value={updateTransferLeaf.typeOfLeafId}
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
                value={updateTransferLeaf.batchNos}
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
              value={updateTransferLeaf.tolViss}
              placeholder="ပိဿာ"
              sx={{ bgcolor: "#EEE8CF" }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setUpdateOpen(false);
              setUpdateTransferLeaf(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
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
export default UpdateTransferLeaf;
