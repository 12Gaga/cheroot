import AdminLayout from "@/components/adminLayout";
import { useAppSelector } from "@/store/hooks";
import { setGarage } from "@/store/slices/garage";
import {
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import garage from "../../asignNamePrice/garage";
import { useState } from "react";

const PlasticReport = () => {
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const plastics = useAppSelector((store) => store.typeOfPlastic.item);
  const concernPlastic = plastics.filter((l) => l.workShopId === workShopId);
  const garages = useAppSelector((store) => store.garage.item);
  const concernGarages = garages.filter((g) => g.workShopId === workShopId);
  const plasticStocks = useAppSelector((store) => store.plasticStock.item);
  const packing = useAppSelector((store) => store.packingData.item);
  const [garage, setGarage] = useState<number | null>(null);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ပလပ်စတစ်လက်ကျန်စာရင်း
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
                ပလပ်စတစ်အမျိုးအစား
              </th>
              <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                ကျန်ရှိအရေအတွက်
              </th>
            </tr>
            {garage &&
              concernPlastic.map((item) => {
                const findPlasticData = plasticStocks.filter(
                  (p) => p.plasticId === item.id && p.garageId === garage
                );
                const plasticData = findPlasticData.reduce((total, plastic) => {
                  return (total += plastic.quantity);
                }, 0);
                //find form packing
                const findPackingPlastic = packing.filter(
                  (p) => p.garageId === garage && p.packingPlasticId === item.id
                );
                const packingPlastic = findPackingPlastic.reduce(
                  (total, plastic) => {
                    return (total += plastic.packingPlasticQty);
                  },
                  0
                );
                const findWarppingPlastic = packing.filter(
                  (p) => p.garageId === garage && p.warpingPlasticId === item.id
                );
                const warppingPlastic = findWarppingPlastic.reduce(
                  (total, plastic) => {
                    return (total += plastic.warpingPlasticQty);
                  },
                  0
                );
                const findCoverPlastic = packing.filter(
                  (p) => p.garageId === garage && p.coverPlasticId === item.id
                );
                const coverPlastic = findCoverPlastic.reduce(
                  (total, plastic) => {
                    return (total += plastic.coverPlasticQty);
                  },
                  0
                );
                return (
                  <tr key={item.id}>
                    <td style={{ textAlign: "center", height: 30 }}>
                      {item.name}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {plasticData -
                        (packingPlastic + warppingPlastic + coverPlastic)}
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
export default PlasticReport;
