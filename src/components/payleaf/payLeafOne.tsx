import { useAppSelector } from "@/store/hooks";
import { createNewPayLeaf } from "@/types/payLeafType";
import {
  Typography,
  TextField,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ListItemText,
  SelectChangeEvent,
} from "@mui/material";
import { Leaf } from "@prisma/client";
import "react-datepicker/dist/react-datepicker.css";
interface Props {
  newPayLeaf: createNewPayLeaf;
  setNewPayLeaf: (value: createNewPayLeaf) => void;
  setConcernBatchNo: (value: Leaf[]) => void;
  workShopId: number;
  concernLeafStock: Leaf[];
  concernBatchNo: Leaf[];
}
const PayLeafOne = ({
  newPayLeaf,
  setNewPayLeaf,
  workShopId,
  concernLeafStock,
  concernBatchNo,
  setConcernBatchNo,
}: Props) => {
  // const leafStock = useAppSelector((store) => store.leafStock.item);
  // const concernLeafStock = leafStock.filter(
  //   (item) => item.garageId === newPayLeaf.garageId
  // );
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const concernLeaves = leaves.filter((item) => item.workShopId === workShopId);

  console.log("newLeaf", newPayLeaf);

  const handleChange = (evt: SelectChangeEvent<number[]>) => {
    const selectBatchNo = evt.target.value as number[];
    const totalViss = concernLeafStock
      .filter((item) => selectBatchNo.includes(item.id))
      .reduce((totalViss, viss) => {
        return (totalViss += viss.viss);
      }, 0);
    const netViss = totalViss - newPayLeaf.discountViss;
    const amount = netViss * newPayLeaf.price;
    setNewPayLeaf({
      ...newPayLeaf,
      batchNo: selectBatchNo,
      viss: totalViss,
      netViss: Number(netViss),
      amount: Number(amount),
    });
    console.log("batch", newPayLeaf.batchNo);
  };

  const changeBatchNo = (leafId: number) => {
    const batchNos = concernLeafStock.filter(
      (item) => item.typeOfLeafId === leafId
    );
    setConcernBatchNo(batchNos);
    const concernPrice = leaves.find((item) => item.id === leafId)
      ?.price as number;
    setNewPayLeaf({ ...newPayLeaf, price: concernPrice, typeOfLeafId: leafId });
  };
  console.log("leafid", newPayLeaf.typeOfLeafId);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ဝယ်ယူခဲ့သည့်ဆိုင်</Typography>
          <TextField
            placeholder="ဝယ်ယူခဲ့သည့်ဆိုင်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={(evt) => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ဖက်အမျိုးအစား</Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={newPayLeaf.typeOfLeafId}
              onChange={(evt) => {
                changeBatchNo(Number(evt.target.value));
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

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ပိုနံပါတ်</Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              multiple
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={newPayLeaf.batchNo}
              onChange={(evt) => {
                handleChange(evt);
                // TotalViss(evt);
              }}
              sx={{ bgcolor: "#EEE8CF" }}
              renderValue={(selectedBatchNoIds) => {
                return selectedBatchNoIds
                  .map((batchNoId) => {
                    const batchNo = concernBatchNo.find(
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
              {concernBatchNo.map((item) => (
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
            value={newPayLeaf.viss}
            placeholder="ပိဿာ"
            sx={{ bgcolor: "#EEE8CF" }}
          />
        </Box>
      </Box>
    </>
  );
};
export default PayLeafOne;
