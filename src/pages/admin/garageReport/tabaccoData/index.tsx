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

const TabaccoReport = () => {
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const tabacco = useAppSelector((store) => store.typeOfTabacco.item);
  const concernTabacco = tabacco.filter((l) => l.workShopId === workShopId);
  const garages = useAppSelector((store) => store.garage.item);
  const concernGarages = garages.filter((g) => g.workShopId === workShopId);
  const tabaccoStocks = useAppSelector((store) => store.tabaccoStock.item);
  const tabaccoGarageTransfer = useAppSelector(
    (store) => store.tabaccoTransfer.item
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
          ဆေးစပ်လက်ကျန်စာရင်း
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
                ဆေးစပ်အမျိုးအစား
              </th>
              <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                ကျန်ရှိတင်း
              </th>
              <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                ကျန်ရှိပြည်
              </th>
              <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                ကျန်ရှိအိတ်
              </th>
            </tr>

            {garage &&
              concernTabacco.map((item) => {
                const findTabaccoData = tabaccoStocks.filter(
                  (t) => t.typeOfTabaccoId === item.id && t.garageId === garage
                );
                const tabaccoTin =
                  findTabaccoData.reduce((total, tab) => {
                    return (total += tab.tin);
                  }, 0) * 16;
                const tabaccoPyi = findTabaccoData.reduce((total, tab) => {
                  return (total += tab.pyi);
                }, 0);
                const tolTabacco = tabaccoPyi + tabaccoTin;
                const tabaccoBag = findTabaccoData.reduce((total, tab) => {
                  return (total += tab.bag);
                }, 0);
                //findTabaccoGarageTrnsfer(EnterGarage)
                const findEnterTabacco = tabaccoGarageTransfer.filter(
                  (et) =>
                    et.typeOfTabaccoId === item.id &&
                    et.enterenceGarageId === garage
                );
                const enterTabaccoTin =
                  findEnterTabacco.reduce((total, tab) => {
                    return (total += tab.tin);
                  }, 0) * 16;
                const enterTabaccoPyi = findEnterTabacco.reduce(
                  (total, tab) => {
                    return (total += tab.pyi);
                  },
                  0
                );
                const tolEnterTabacco = enterTabaccoPyi + enterTabaccoTin;
                const enterTabaccoBag = findEnterTabacco.reduce(
                  (total, tab) => {
                    return (total += tab.bag);
                  },
                  0
                );
                //findTabaccoGarageTrnsfer(ExitGarage)
                const findExitTabacco = tabaccoGarageTransfer.filter(
                  (et) =>
                    et.typeOfTabaccoId === item.id && et.exitGarageId === garage
                );
                const exitTabaccoTin =
                  findExitTabacco.reduce((total, tab) => {
                    return (total += tab.tin);
                  }, 0) * 16;
                const exitTabaccoPyi = findExitTabacco.reduce((total, tab) => {
                  return (total += tab.pyi);
                }, 0);
                const tolExitTabacco = exitTabaccoPyi + exitTabaccoTin;
                const exitTabaccoBag = findExitTabacco.reduce((total, tab) => {
                  return (total += tab.bag);
                }, 0);
                //find from payother
                const findPayTabacco = payOther.filter(
                  (et) =>
                    et.typeOfTabaccoId === item.id && et.garageId === garage
                );
                const payTabaccoTin =
                  findPayTabacco.reduce((total, tab) => {
                    return (total += tab.tabaccoTin);
                  }, 0) * 16;
                const payTabaccoPyi = findPayTabacco.reduce((total, tab) => {
                  return (total += tab.tabaccoPyi);
                }, 0);
                const tolPayTabacco = payTabaccoPyi + payTabaccoTin;
                const payTabaccoBag = findPayTabacco.reduce((tol, tab) => {
                  return (tol += tab.tabaccoBag);
                }, 0);
                //find from extraPurchase
                const findExtraTabacco = extraPurchase.filter(
                  (et) =>
                    et.typeOfTabaccoId === item.id && et.garageId === garage
                );
                const extraTabaccoTin =
                  findExtraTabacco.reduce((total, tab) => {
                    return (total += tab.tabaccoTin);
                  }, 0) * 16;
                const extraTabaccoPyi = findExtraTabacco.reduce(
                  (total, tab) => {
                    return (total += tab.tabaccoPyi);
                  },
                  0
                );
                const tolExtraTabacco = extraTabaccoPyi + extraTabaccoTin;
                const extraTabaccobag = findExtraTabacco.reduce(
                  (total, tab) => {
                    return (total += tab.tabaccoBag);
                  },
                  0
                );
                const quantity =
                  tolTabacco +
                  tolEnterTabacco -
                  (tolExitTabacco + tolPayTabacco + tolExtraTabacco);
                const tolTin = Math.floor(quantity / 16);
                const tolPyi = Math.floor(quantity % 16);
                return (
                  <tr key={item.id}>
                    <td style={{ textAlign: "center", height: 30 }}>
                      {item.name}
                    </td>
                    <td style={{ textAlign: "center" }}>{tolTin}</td>
                    <td style={{ textAlign: "center" }}>{tolPyi}</td>
                    <td style={{ textAlign: "center" }}>
                      {tabaccoBag +
                        enterTabaccoBag -
                        (exitTabaccoBag + payTabaccoBag + extraTabaccobag)}
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
export default TabaccoReport;
