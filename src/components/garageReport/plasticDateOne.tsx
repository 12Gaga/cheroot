import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { Plastic, TypeOfPlastic } from "@prisma/client";

interface Props {
  concernPlasticStock: Plastic[];
  concernPlastic: TypeOfPlastic[];
  garage: number | null;
  startDate: Date;
  endDate: Date;
}
const PlasticDateOne = ({
  concernPlastic,
  concernPlasticStock,
  garage,
  startDate,
  endDate,
}: Props) => {
  const plasticStocks = useAppSelector((store) => store.plasticStock.item);
  //start date
  const exitStart = concernPlasticStock.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === startDate.toLocaleDateString()
  );
  let startArray: Plastic[] = [];
  if (!exitStart.length) {
    startArray = plasticStocks.filter(
      (f) =>
        new Date(f.date).toLocaleDateString() ===
          startDate.toLocaleDateString() && f.garageId === garage
    );
  }
  //end date
  const exitEnd = concernPlasticStock.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === endDate.toLocaleDateString()
  );
  let endArray: Plastic[] = [];
  if (!exitEnd.length) {
    endArray = plasticStocks.filter(
      (f) =>
        new Date(f.date).toLocaleDateString() ===
          endDate.toLocaleDateString() && f.garageId === garage
    );
  }
  return (
    <>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          ပလပ်စတစ်သွင်းစာရင်း
        </Typography>
        <table border={1} className="table">
          <tr>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>နေ့စွဲ</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              ပလပ်စတစ်အမျိုးအစား
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>အိတ်</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>အရေအတွက်</th>
          </tr>

          {!exitStart.length &&
            startArray.map((item) => {
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {concernPlastic.find((l) => l.id === item.plasticId)?.name}
                  </td>
                  <td style={{ textAlign: "center" }}>{item.bag}</td>
                  <td style={{ textAlign: "center" }}>{item.quantity}</td>
                </tr>
              );
            })}

          {garage &&
            concernPlasticStock.map((item) => {
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {concernPlastic.find((l) => l.id === item.plasticId)?.name}
                  </td>
                  <td style={{ textAlign: "center" }}>{item.bag}</td>
                  <td style={{ textAlign: "center" }}>{item.quantity}</td>
                </tr>
              );
            })}

          {!exitEnd.length &&
            endArray.map((item) => {
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {concernPlastic.find((l) => l.id === item.plasticId)?.name}
                  </td>
                  <td style={{ textAlign: "center" }}>{item.bag}</td>
                  <td style={{ textAlign: "center" }}>{item.quantity}</td>
                </tr>
              );
            })}
          <tr>
            <td></td>
            <td></td>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {startArray.reduce((tol, l) => {
                return (tol += l.bag);
              }, 0) +
                concernPlasticStock.reduce((tol, l) => {
                  return (tol += l.bag);
                }, 0) +
                endArray.reduce((tol, l) => {
                  return (tol += l.bag);
                }, 0)}
            </th>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {startArray.reduce((tol, l) => {
                return (tol += l.quantity);
              }, 0) +
                concernPlasticStock.reduce((tol, l) => {
                  return (tol += l.quantity);
                }, 0) +
                endArray.reduce((tol, l) => {
                  return (tol += l.quantity);
                }, 0)}
            </th>
          </tr>
        </table>
      </Box>
    </>
  );
};
export default PlasticDateOne;
