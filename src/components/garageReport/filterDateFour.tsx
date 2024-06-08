import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { TypeOfFilterSize } from "@prisma/client";

interface Props {
  garage: number | null;
  concernFilterSizes: TypeOfFilterSize[];
  endDate: Date;
}
const FilterDateFour = ({ garage, concernFilterSizes, endDate }: Props) => {
  const filterSizeStocks = useAppSelector(
    (store) => store.filterSizeStock.item
  );
  const filterGarageTransfer = useAppSelector(
    (store) => store.filterSizeTransfer.item
  );
  const payOther = useAppSelector((store) => store.payStock.item);
  const extraPurchase = useAppSelector((store) => store.extraPurchase.item);
  return (
    <>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          ကျန်ရှိစာရင်း
        </Typography>
        <table border={1} className="table">
          <tr>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              အဆီခံအမျိုးအစား
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
              const findFilterSizeData = filterSizeStocks.filter((f) => {
                const fdate = new Date(f.date);
                return (
                  f.typeOfFilterSizeId === item.id &&
                  f.garageId === garage &&
                  fdate.getTime() <= endDate.getTime()
                );
              });

              const dataArray = findFilterSizeData.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                  endDate.toLocaleDateString()
              );
              let endDateQty = 0;
              let endDateBag = 0;
              if (!dataArray.length) {
                const datum = filterSizeStocks.filter(
                  (f) =>
                    new Date(f.date).toLocaleDateString() ===
                      endDate.toLocaleDateString() &&
                    f.typeOfFilterSizeId === item.id &&
                    f.garageId === garage
                );
                endDateQty = datum.reduce((total, filter) => {
                  return (total += filter.quantity);
                }, 0);
                endDateBag = datum.reduce((total, filter) => {
                  return (total += filter.bag);
                }, 0);
              }
              console.log("data", findFilterSizeData);
              const filterSizeQty =
                findFilterSizeData.reduce((total, filter) => {
                  return (total += filter.quantity);
                }, 0) + endDateQty;
              const filterSizeBag =
                findFilterSizeData.reduce((total, filter) => {
                  return (total += filter.bag);
                }, 0) + endDateBag;

              //findFilterGarageTrnsfer(EnterGarage)
              const findEnterFilter = filterGarageTransfer.filter((ef) => {
                const fdate = new Date(ef.date);
                return (
                  ef.typeOfFilterSizeId === item.id &&
                  ef.enterenceGarageId === garage &&
                  fdate.getTime() <= endDate.getTime()
                );
              });
              const dataEnterArray = findEnterFilter.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                  endDate.toLocaleDateString()
              );
              let endDateEnterQty = 0;
              let endDateEnterBag = 0;
              if (!dataEnterArray.length) {
                const datum = filterGarageTransfer.filter(
                  (f) =>
                    new Date(f.date).toLocaleDateString() ===
                      endDate.toLocaleDateString() &&
                    f.typeOfFilterSizeId === item.id &&
                    f.enterenceGarageId === garage
                );
                endDateEnterQty = datum.reduce((total, filter) => {
                  return (total += filter.quantity);
                }, 0);
                endDateEnterBag = datum.reduce((total, filter) => {
                  return (total += filter.bag);
                }, 0);
              }
              const enterFilterQty =
                findEnterFilter.reduce((total, filter) => {
                  return (total += filter.quantity);
                }, 0) + endDateEnterQty;
              const enterFilterBag =
                findEnterFilter.reduce((total, filter) => {
                  return (total += filter.bag);
                }, 0) + endDateEnterBag;

              //findFilterGarageTrnsfer(ExitGarage)
              const findExitFilter = filterGarageTransfer.filter((ef) => {
                const fdate = new Date(ef.date);
                return (
                  ef.typeOfFilterSizeId === item.id &&
                  ef.exitGarageId === garage &&
                  fdate.getTime() <= endDate.getTime()
                );
              });

              const dataExitArray = findExitFilter.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                  endDate.toLocaleDateString()
              );
              let endDateExitQty = 0;
              let endDateExitBag = 0;
              if (!dataExitArray.length) {
                const datum = filterGarageTransfer.filter(
                  (f) =>
                    new Date(f.date).toLocaleDateString() ===
                      endDate.toLocaleDateString() &&
                    f.typeOfFilterSizeId === item.id &&
                    f.exitGarageId === garage
                );
                endDateExitQty = datum.reduce((total, filter) => {
                  return (total += filter.quantity);
                }, 0);
                endDateExitBag = datum.reduce((total, filter) => {
                  return (total += filter.bag);
                }, 0);
              }
              const exitFilterQty =
                findExitFilter.reduce((total, filter) => {
                  return (total += filter.quantity);
                }, 0) + endDateExitQty;
              const exitFilterBag =
                findExitFilter.reduce((total, filter) => {
                  return (total += filter.bag);
                }, 0) + endDateExitBag;

              //find from payother
              const findPayFilter = payOther.filter((ef) => {
                const fdate = new Date(ef.date);
                return (
                  ef.typeOfFilterSizeId === item.id &&
                  ef.garageId === garage &&
                  fdate.getTime() <= endDate.getTime()
                );
              });

              const dataPayArray = findPayFilter.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                  endDate.toLocaleDateString()
              );
              let endDatePayQty = 0;
              let endDatePayBag = 0;
              if (!dataPayArray.length) {
                const datum = payOther.filter(
                  (f) =>
                    new Date(f.date).toLocaleDateString() ===
                      endDate.toLocaleDateString() &&
                    f.typeOfFilterSizeId === item.id &&
                    f.garageId === garage
                );
                endDatePayQty = datum.reduce((total, filter) => {
                  return (total += filter.filterSizeQty);
                }, 0);
                endDatePayBag = datum.reduce((total, filter) => {
                  return (total += filter.filterSizeBag);
                }, 0);
              }

              const payFilterQty =
                findPayFilter.reduce((total, filter) => {
                  return (total += filter.filterSizeQty);
                }, 0) + endDatePayQty;
              const payFilterBag =
                findPayFilter.reduce((total, filter) => {
                  return (total += filter.filterSizeBag);
                }, 0) + endDatePayBag;

              //find from extraPurchase
              const findExtraFilter = extraPurchase.filter((ef) => {
                const fdate = new Date(ef.date);
                return (
                  ef.typeOfFilterSizeId === item.id &&
                  ef.garageId === garage &&
                  fdate.getTime() <= endDate.getTime()
                );
              });

              const dataExtraArray = findExtraFilter.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                  endDate.toLocaleDateString()
              );
              let endDateExtraQty = 0;
              let endDateExtraBag = 0;
              if (!dataExtraArray.length) {
                const datum = extraPurchase.filter(
                  (f) =>
                    new Date(f.date).toLocaleDateString() ===
                      endDate.toLocaleDateString() &&
                    f.typeOfFilterSizeId === item.id &&
                    f.garageId === garage
                );
                endDateExtraQty = datum.reduce((total, filter) => {
                  return (total += filter.filterSizeQty);
                }, 0);
                endDateExtraBag = datum.reduce((total, filter) => {
                  return (total += filter.filterSizeBag);
                }, 0);
              }
              const extraFilterQty =
                findExtraFilter.reduce((total, filter) => {
                  return (total += filter.filterSizeQty);
                }, 0) + endDateExtraQty;
              const extraFilterBag =
                findExtraFilter.reduce((total, filter) => {
                  return (total += filter.filterSizeBag);
                }, 0) + endDateExtraBag;

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
    </>
  );
};
export default FilterDateFour;
