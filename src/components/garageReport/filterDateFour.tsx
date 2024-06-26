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
                  new Date(f.date).toLocaleDateString() !==
                  endDate.toLocaleDateString()
              );

              const datum = filterSizeStocks.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                    endDate.toLocaleDateString() &&
                  f.typeOfFilterSizeId === item.id &&
                  f.garageId === garage
              );
              const endDateQty = datum.reduce((total, filter) => {
                return (total += filter.quantity);
              }, 0);
              const endDateBag = datum.reduce((total, filter) => {
                return (total += filter.bag);
              }, 0);

              console.log("data", dataArray);
              const filterSizeQty =
                dataArray.reduce((total, filter) => {
                  return (total += filter.quantity);
                }, 0) + endDateQty;
              const filterSizeBag =
                dataArray.reduce((total, filter) => {
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
                  new Date(f.date).toLocaleDateString() !==
                  endDate.toLocaleDateString()
              );

              const datumTwo = filterGarageTransfer.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                    endDate.toLocaleDateString() &&
                  f.typeOfFilterSizeId === item.id &&
                  f.enterenceGarageId === garage
              );
              const endDateEnterQty = datumTwo.reduce((total, filter) => {
                return (total += filter.quantity);
              }, 0);
              const endDateEnterBag = datumTwo.reduce((total, filter) => {
                return (total += filter.bag);
              }, 0);

              const enterFilterQty =
                dataEnterArray.reduce((total, filter) => {
                  return (total += filter.quantity);
                }, 0) + endDateEnterQty;
              const enterFilterBag =
                dataEnterArray.reduce((total, filter) => {
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
                  new Date(f.date).toLocaleDateString() !==
                  endDate.toLocaleDateString()
              );

              const datumThree = filterGarageTransfer.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                    endDate.toLocaleDateString() &&
                  f.typeOfFilterSizeId === item.id &&
                  f.exitGarageId === garage
              );
              const endDateExitQty = datumThree.reduce((total, filter) => {
                return (total += filter.quantity);
              }, 0);
              const endDateExitBag = datumThree.reduce((total, filter) => {
                return (total += filter.bag);
              }, 0);

              const exitFilterQty =
                dataExitArray.reduce((total, filter) => {
                  return (total += filter.quantity);
                }, 0) + endDateExitQty;
              const exitFilterBag =
                dataExitArray.reduce((total, filter) => {
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
                  new Date(f.date).toLocaleDateString() !==
                  endDate.toLocaleDateString()
              );

              const datumFour = payOther.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                    endDate.toLocaleDateString() &&
                  f.typeOfFilterSizeId === item.id &&
                  f.garageId === garage
              );
              const endDatePayQty = datumFour.reduce((total, filter) => {
                return (total += filter.filterSizeQty);
              }, 0);
              const endDatePayBag = datumFour.reduce((total, filter) => {
                return (total += filter.filterSizeBag);
              }, 0);

              const payFilterQty =
                dataPayArray.reduce((total, filter) => {
                  return (total += filter.filterSizeQty);
                }, 0) + endDatePayQty;
              const payFilterBag =
                dataPayArray.reduce((total, filter) => {
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
                  new Date(f.date).toLocaleDateString() !==
                  endDate.toLocaleDateString()
              );
              const datumFive = extraPurchase.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                    endDate.toLocaleDateString() &&
                  f.typeOfFilterSizeId === item.id &&
                  f.garageId === garage
              );
              const endDateExtraQty = datumFive.reduce((total, filter) => {
                return (total += filter.filterSizeQty);
              }, 0);
              const endDateExtraBag = datumFive.reduce((total, filter) => {
                return (total += filter.filterSizeBag);
              }, 0);

              const extraFilterQty =
                dataExtraArray.reduce((total, filter) => {
                  return (total += filter.filterSizeQty);
                }, 0) + endDateExtraQty;
              const extraFilterBag =
                dataExtraArray.reduce((total, filter) => {
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
