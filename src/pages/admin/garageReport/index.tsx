import AdminLayout from "@/components/adminLayout";
import { useAppSelector } from "@/store/hooks";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { useState } from "react";

const LeafReport = () => {
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const concernLeaves = leaves.filter((l) => l.workShopId === workShopId);
  const garages = useAppSelector((store) => store.garage.item);
  const concernGarages = garages.filter((g) => g.workShopId === workShopId);
  const leafStock = useAppSelector((store) => store.leafStock.item);
  const leafGarageTransfer = useAppSelector((store) => store.leafTransfer.item);
  const payLeaf = useAppSelector((store) => store.payLeaf.item);
  const [garage, setGarage] = useState<number | null>(null);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ဖက်လက်ကျန်စာရင်း
        </Typography>
        <Box sx={{ my: 3, display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", width: 100 }}>
            ဂိုထောင်
          </Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={garage}
              onChange={(evt) => {
                setGarage(Number(evt.target.value));
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
        <Box sx={{ width: "50%", margin: "0 auto" }}>
          <table border={1} className="table">
            <tr>
              <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                ဖက်အမျိုးအစား
              </th>
              <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                ကျန်ရှိပိုလုံးရေ
              </th>
              <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                ကျန်ရှိပိသာ
              </th>
            </tr>

            {garage &&
              concernLeaves.map((item) => {
                const leafStockData = leafStock
                  .filter(
                    (l) => l.typeOfLeafId === item.id && l.garageId === garage
                  )
                  .reduce((total, leaf) => {
                    return (total += leaf.viss);
                  }, 0);

                const findLeafTransferData = leafGarageTransfer.filter(
                  (gl) =>
                    gl.exitGarageId === garage && gl.typeOfLeafId === item.id
                );

                const findbatchNo = findLeafTransferData.map(
                  (fd) => fd.batchNo
                );
                const leafTransferData = leafStock
                  .filter(
                    (l) =>
                      l.typeOfLeafId === item.id &&
                      l.garageId === garage &&
                      findbatchNo.includes(l.batchNo)
                  )
                  .reduce((total, leaf) => {
                    return (total += leaf.viss);
                  }, 0);
                const findBatchs = leafStock
                  .filter(
                    (l) =>
                      l.typeOfLeafId === item.id &&
                      l.garageId === garage &&
                      !findbatchNo.includes(l.batchNo)
                  )
                  .map((lb) => lb.batchNo);

                const findPayLeaf = payLeaf.filter(
                  (p) => p.typeOfLeafId === item.id && p.garageId === garage
                );
                const payLeafData = findPayLeaf.reduce((tol, pl) => {
                  return (tol += pl.viss);
                }, 0);
                const paybatchs = findPayLeaf.map((p) => p.batchNo);
                const lastBatchs = findBatchs.filter(
                  (pb) => !paybatchs.includes(pb)
                );
                return (
                  <tr key={item.id}>
                    <td style={{ textAlign: "center", height: 30 }}>
                      {item.name}
                    </td>
                    <td>{lastBatchs.length}</td>
                    <td style={{ textAlign: "center" }}>
                      {leafStockData - (leafTransferData + payLeafData)}
                    </td>
                  </tr>
                );
              })}
          </table>
        </Box>
      </AdminLayout>
    </>
  );
};
export default LeafReport;
