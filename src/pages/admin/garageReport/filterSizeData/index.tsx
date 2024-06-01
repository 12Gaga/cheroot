import AdminLayout from "@/components/adminLayout";
import { useAppSelector } from "@/store/hooks";
import agent from "@/store/slices/agent";
import {
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { useState } from "react";

const FilterSizeReport = () => {
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const filterSizes = useAppSelector((store) => store.typeOfFilterSize.item);
  const concernFilterSizes = filterSizes.filter(
    (l) => l.workShopId === workShopId
  );
  const garages = useAppSelector((store) => store.garage.item);
  const concernGarages = garages.filter((g) => g.workShopId === workShopId);
  const filterSizeStocks = useAppSelector(
    (store) => store.filterSizeStock.item
  );
  const filterGarageTransfer = useAppSelector(
    (store) => store.filterSizeTransfer.item
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
          အဆီခံလက်ကျန်စာရင်း
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
                အဆီခံလက်ကျန်စာရင်း
              </th>
              <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                ကျန်ရှိအရေအတွက်
              </th>
              <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                ကျန်ရှိအိတ်
              </th>
            </tr>
            {garage &&
              concernFilterSizes.map((item) => {
                const findFilterSizeData = filterSizeStocks.filter(
                  (f) =>
                    f.typeOfFilterSizeId === item.id && f.garageId === garage
                );
                const filterSizeQty = findFilterSizeData.reduce(
                  (total, filter) => {
                    return (total += filter.quantity);
                  },
                  0
                );
                const filterSizeBag = findFilterSizeData.reduce(
                  (total, filter) => {
                    return (total += filter.bag);
                  },
                  0
                );
                //findFilterGarageTrnsfer(EnterGarage)
                const findEnterFilter = filterGarageTransfer.filter(
                  (ef) =>
                    ef.typeOfFilterSizeId === item.id &&
                    ef.enterenceGarageId === garage
                );
                const enterFilterQty = findEnterFilter.reduce(
                  (total, filter) => {
                    return (total += filter.quantity);
                  },
                  0
                );
                const enterFilterBag = findEnterFilter.reduce(
                  (total, filter) => {
                    return (total += filter.bag);
                  },
                  0
                );
                //findFilterGarageTrnsfer(ExitGarage)
                const findExitFilter = filterGarageTransfer.filter(
                  (ef) =>
                    ef.typeOfFilterSizeId === item.id &&
                    ef.exitGarageId === garage
                );
                const exitFilterQty = findExitFilter.reduce((total, filter) => {
                  return (total += filter.quantity);
                }, 0);
                const exitFilterBag = findExitFilter.reduce((total, filter) => {
                  return (total += filter.bag);
                }, 0);
                //find from payother
                const findPayFilter = payOther.filter(
                  (ef) =>
                    ef.typeOfFilterSizeId === item.id && ef.garageId === garage
                );
                const payFilterQty = findPayFilter.reduce((total, filter) => {
                  return (total += filter.filterSizeQty);
                }, 0);
                const payFilterBag = findPayFilter.reduce((total, filter) => {
                  return (total += filter.filterSizeBag);
                }, 0);
                //find from extraPurchase
                const findExtraFilter = extraPurchase.filter(
                  (ef) =>
                    ef.typeOfFilterSizeId === item.id && ef.garageId === garage
                );
                const extraFilterQty = findExtraFilter.reduce(
                  (total, filter) => {
                    return (total += filter.filterSizeQty);
                  },
                  0
                );
                const extraFilterBag = findExtraFilter.reduce(
                  (total, filter) => {
                    return (total += filter.filterSizeBag);
                  },
                  0
                );
                return (
                  <tr key={item.id}>
                    <td style={{ textAlign: "center", height: 30 }}>
                      {item.name}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {filterSizeQty +
                        enterFilterQty -
                        (exitFilterQty + payFilterQty + extraFilterQty)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {filterSizeBag +
                        enterFilterBag -
                        (exitFilterBag + payFilterBag + extraFilterBag)}
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
export default FilterSizeReport;
