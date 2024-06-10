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
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
interface Props {
  newPayLeaf: createNewPayLeaf;
  setNewPayLeaf: (value: createNewPayLeaf) => void;
  setConcernBatchNo: (value: Leaf[]) => void;
  setConcernLeafStock: (value: Leaf[]) => void;
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
  setConcernLeafStock,
}: Props) => {
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const concernLeaves = leaves.filter((item) => item.workShopId === workShopId);
  const shop = useAppSelector((store) => store.typeOfShop.item);
  const leafTransfer = useAppSelector((store) => store.leafTransfer.item);
  const leafStock = useAppSelector((store) => store.leafStock.item);
  const payLeaf = useAppSelector((store) => store.payLeaf.item);
  const [shops, setShops] = useState<number[]>([]);
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
    const shopData = concernLeafStock
      .filter((item) => selectBatchNo.includes(item.id))
      .map((shop) => shop.shopId);
    setShops(shopData);
    console.log("batch", newPayLeaf.batchNo);
  };

  const changeBatchNo = (leafId: number) => {
    const data = leafStock.filter(
      (item) => item.garageId === newPayLeaf.garageId
    );
    const transferBatchNo = leafTransfer
      .filter(
        (item) =>
          item.exitGarageId === newPayLeaf.garageId &&
          item.typeOfLeafId === leafId
      )
      .map((item) => item.batchNo);
    const concerndata = data.filter(
      (item) => !transferBatchNo.includes(item.batchNo)
    );
    const findPayBatch = payLeaf
      .filter(
        (item) =>
          item.garageId === newPayLeaf.garageId && item.typeOfLeafId === leafId
      )
      .map((p) => p.batchNo);
    const lastconcernData = concerndata.filter(
      (item) => !findPayBatch.includes(item.batchNo)
    );

    const batchNos = lastconcernData.filter(
      (item) => item.typeOfLeafId === leafId
    );
    setConcernLeafStock(lastconcernData);
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
            value={shop
              .filter((s) => shops.includes(s.id))
              .map((sh) => sh.name)
              .join(",")}
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
