import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { TypeOfPlastic } from "@prisma/client";

interface Props {
  concernPlastic: TypeOfPlastic[];
  garage: number | null;
  endDate: Date;
}
const PlasticDateThree = ({ concernPlastic, garage, endDate }: Props) => {
  const plasticStocks = useAppSelector((store) => store.plasticStock.item);
  const packing = useAppSelector((store) => store.packingData.item);
  return (
    <>
      <Box sx={{ width: "40%", margin: "0 auto" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          ကျန်ရှိပလပ်စတစ်စာရင်း
        </Typography>
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
              const findPlasticData = plasticStocks.filter((p) => {
                const pdate = new Date(p.date);
                return (
                  p.plasticId === item.id &&
                  p.garageId === garage &&
                  pdate.getTime() <= endDate.getTime()
                );
              });
              const dataArray = findPlasticData.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() !==
                  endDate.toLocaleDateString()
              );

              const datum = plasticStocks.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                    endDate.toLocaleDateString() &&
                  f.plasticId === item.id &&
                  f.garageId === garage
              );
              const endDateQty = datum.reduce((total, pack) => {
                return (total += pack.quantity);
              }, 0);

              const plasticData =
                dataArray.reduce((total, plastic) => {
                  return (total += plastic.quantity);
                }, 0) + endDateQty;

              console.log("data1", dataArray);
              //find form packing / packing plastic
              const findPackingPlastic = packing.filter((p) => {
                const pdate = new Date(p.date);
                return (
                  p.garageId === garage &&
                  p.packingPlasticId === item.id &&
                  pdate.getTime() <= endDate.getTime()
                );
              });

              const dataPackingArray = findPackingPlastic.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() !==
                  endDate.toLocaleDateString()
              );

              const datumTwo = packing.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                    endDate.toLocaleDateString() &&
                  f.packingPlasticId === item.id &&
                  f.garageId === garage
              );
              const endDatePackingQty = datumTwo.reduce((total, pack) => {
                return (total += pack.quantity);
              }, 0);

              const packingPlastic =
                dataPackingArray.reduce((total, plastic) => {
                  return (total += plastic.packingPlasticQty);
                }, 0) + endDatePackingQty;

              //warpping Plastic
              const findWarppingPlastic = packing.filter(
                (p) =>
                  p.garageId === garage &&
                  p.warpingPlasticId === item.id &&
                  new Date(p.date).getTime() <= endDate.getTime()
              );

              const dataWarppingArray = findWarppingPlastic.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() !==
                  endDate.toLocaleDateString()
              );

              const datumThree = packing.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                    endDate.toLocaleDateString() &&
                  f.warpingPlasticId === item.id &&
                  f.garageId === garage
              );
              const endDateWarppingQty = datumThree.reduce((total, pack) => {
                return (total += pack.quantity);
              }, 0);

              const warppingPlastic =
                dataWarppingArray.reduce((total, plastic) => {
                  return (total += plastic.warpingPlasticQty);
                }, 0) + endDateWarppingQty;

              //cover Plastic
              const findCoverPlastic = packing.filter(
                (p) =>
                  p.garageId === garage &&
                  p.coverPlasticId === item.id &&
                  new Date(p.date).getTime() <= endDate.getTime()
              );

              const dataCoverArray = findCoverPlastic.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() !==
                  endDate.toLocaleDateString()
              );

              const datumFour = packing.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                    endDate.toLocaleDateString() &&
                  f.coverPlasticId === item.id &&
                  f.garageId === garage
              );
              const endDateCoverQty = datumFour.reduce((total, pack) => {
                return (total += pack.quantity);
              }, 0);

              const coverPlastic =
                dataCoverArray.reduce((total, plastic) => {
                  return (total += plastic.coverPlasticQty);
                }, 0) + endDateCoverQty;

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
    </>
  );
};
export default PlasticDateThree;
