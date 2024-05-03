import { useAppSelector } from "@/store/hooks";
import { createNewPayStock } from "@/types/payStockType";
import {
  Typography,
  TextField,
  Box,
  FormControl,
  MenuItem,
  Select,
  ListItemText,
} from "@mui/material";
import { useState } from "react";

interface Props {
  newPayStock: createNewPayStock;
  setNewPayStock: (value: createNewPayStock) => void;
  workShopId: number;
}

const PayLeafFive = ({ newPayStock, setNewPayStock, workShopId }: Props) => {
  const label = useAppSelector((store) => store.typeOfLabel.item);
  const concernLabel = label.filter((item) => item.workShopId === workShopId);
  const filterSize = useAppSelector((store) => store.typeOfFilterSize.item);
  return (
    <>
      <Box
        sx={{
          width: "37.25%",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>တံဆိပ်အမျိုးအစား</Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={newPayStock.typeOfLabelId}
              onChange={(evt) => {
                setNewPayStock({
                  ...newPayStock,
                  typeOfLabelId: Number(evt.target.value),
                });
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              {concernLabel.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>လိပ်</Typography>
          <TextField
            placeholder="လိပ်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={(evt) => {
              setNewPayStock({
                ...newPayStock,
                labelBandle: Number(evt.target.value),
              });
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: "37.25%",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>အဆီခံအမျိုးအစား</Typography>
          <TextField
            value={
              filterSize.find(
                (item) => item.id === newPayStock.typeOfFilterSizeId
              )?.name
            }
            placeholder="အဆီခံအမျိုးအစား"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>အရေအတွက်</Typography>
          <TextField
            value={newPayStock.filterSizeQty}
            placeholder="အရေအတွက်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: "25%",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: 170, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>အိတ်</Typography>
          <TextField
            value={newPayStock.filterSizeBag}
            placeholder="အိတ်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
        <Box sx={{ width: 170, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>စုစုပေါင်းငွေ</Typography>
          <TextField
            value={0}
            placeholder="စုစုပေါင်းငွေ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
      </Box>
    </>
  );
};
export default PayLeafFive;
