import AdminLayout from "@/components/adminLayout";
import { useAppSelector } from "@/store/hooks";
import {
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { useState } from "react";

const LabelReport = () => {
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const labels = useAppSelector((store) => store.typeOfLabel.item);
  const concernLabels = labels.filter((l) => l.workShopId === workShopId);
  const garages = useAppSelector((store) => store.garage.item);
  const concernGarages = garages.filter((g) => g.workShopId === workShopId);
  const labelStocks = useAppSelector((store) => store.labelStock.item);
  const labelGarageTransfer = useAppSelector(
    (store) => store.labelTransfer.item
  );
  const payOther = useAppSelector((store) => store.payStock.item);
  const extraPurchase = useAppSelector((store) => store.extraPurchase.item);
  const [garage, setGarage] = useState<number | null>(null);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          တံဆိပ်လက်ကျန်စာရင်း
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
                တံဆိပ်အမျိုးအစား
              </th>
              <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                ကျန်ရှိလိပ်
              </th>
            </tr>
            {garage &&
              concernLabels.map((item) => {
                const findLabelData = labelStocks.filter(
                  (l) => l.typeOfLabelId === item.id && l.garageId === garage
                );
                const labelBandle = findLabelData.reduce((total, label) => {
                  return (total += label.bandle);
                }, 0);
                //findLabelGarageTrnsfer(EnterGarage)
                const findEnterLabel = labelGarageTransfer.filter(
                  (el) =>
                    el.typeOfLabelId === item.id &&
                    el.enterenceGarageId === garage
                );
                const enterLabelBandle = findEnterLabel.reduce(
                  (total, label) => {
                    return (total += label.bandle);
                  },
                  0
                );
                //findLabelGarageTransfer(ExitGarage)
                const findExitLabel = labelGarageTransfer.filter(
                  (el) =>
                    el.typeOfLabelId === item.id && el.exitGarageId === garage
                );
                const exitLabelBandle = findExitLabel.reduce((total, label) => {
                  return (total += label.bandle);
                }, 0);
                //find from payother
                const findPayLabel = payOther.filter(
                  (el) => el.typeOfLabelId === item.id && el.garageId === garage
                );
                const payLabelBandle = findPayLabel.reduce((total, label) => {
                  return (total += label.labelBandle);
                }, 0);
                //find from extraPurchase
                const findExtraLabel = extraPurchase.filter(
                  (el) => el.typeOfLabelId === item.id && el.garageId === garage
                );
                const extraLabelBandle = findExtraLabel.reduce(
                  (total, label) => {
                    return (total += label.labelBandle);
                  },
                  0
                );
                return (
                  <tr key={item.id}>
                    <td style={{ textAlign: "center", height: 30 }}>
                      {item.name}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {labelBandle +
                        enterLabelBandle -
                        (exitLabelBandle + payLabelBandle + extraLabelBandle)}
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
export default LabelReport;
