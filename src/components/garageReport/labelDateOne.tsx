import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { Label, LabelTransferGarage, TypeOfLabel } from "@prisma/client";

interface Props {
  concernLabelStock: Label[];
  concernLabelTransferEnter: LabelTransferGarage[];
  concernLabels: TypeOfLabel[];
  garage: number | null;
  startDate: Date;
  endDate: Date;
}
const LabelDateOne = ({
  concernLabelStock,
  concernLabelTransferEnter,
  concernLabels,
  garage,
  startDate,
  endDate,
}: Props) => {
  const labelStocks = useAppSelector((store) => store.labelStock.item);
  const labelGarageTransfer = useAppSelector(
    (store) => store.labelTransfer.item
  );

  const concernStock = concernLabelStock.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() !==
        startDate.toLocaleDateString() &&
      new Date(f.date).toLocaleDateString() !== endDate.toLocaleDateString()
  );
  const concernEnter = concernLabelTransferEnter.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() !==
        startDate.toLocaleDateString() &&
      new Date(f.date).toLocaleDateString() !== endDate.toLocaleDateString()
  );
  //start date
  const startStockArray = labelStocks.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() ===
        startDate.toLocaleDateString() && f.garageId === garage
  );

  const startEnterArray = labelGarageTransfer.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() ===
        startDate.toLocaleDateString() && f.enterenceGarageId === garage
  );

  //end date
  const endStockArray = labelStocks.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === endDate.toLocaleDateString() &&
      f.garageId === garage
  );

  const endEnterArray = labelGarageTransfer.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === endDate.toLocaleDateString() &&
      f.enterenceGarageId === garage
  );

  return (
    <>
      <Box sx={{ mr: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          တံဆိပ်သွင်းစာရင်း
        </Typography>
        <table border={1} className="table">
          <tr>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>နေ့စွဲ</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              တံဆိပ်အမျိုးအစား
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>လိပ်</th>
          </tr>

          {startStockArray.map((item) => {
            return (
              <tr key={item.id}>
                <td style={{ textAlign: "center" }}>
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>
                  {concernLabels.find((l) => l.id === item.typeOfLabelId)?.name}
                </td>
                <td style={{ textAlign: "center" }}>{item.bandle}</td>
              </tr>
            );
          })}
          {startEnterArray.map((item) => {
            return (
              <tr key={item.id}>
                <td style={{ textAlign: "center" }}>
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>
                  {concernLabels.find((l) => l.id === item.typeOfLabelId)?.name}
                </td>
                <td style={{ textAlign: "center", color: "red" }}>
                  {item.bandle}
                </td>
              </tr>
            );
          })}

          {garage &&
            concernStock.map((item) => {
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernLabels.find((l) => l.id === item.typeOfLabelId)
                        ?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>{item.bandle}</td>
                </tr>
              );
            })}
          {garage &&
            concernEnter.map((item) => {
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernLabels.find((l) => l.id === item.typeOfLabelId)
                        ?.name
                    }
                  </td>
                  <td style={{ textAlign: "center", color: "red" }}>
                    {item.bandle}
                  </td>
                </tr>
              );
            })}

          {endStockArray.map((item) => {
            return (
              <tr key={item.id}>
                <td style={{ textAlign: "center" }}>
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>
                  {concernLabels.find((l) => l.id === item.typeOfLabelId)?.name}
                </td>
                <td style={{ textAlign: "center" }}>{item.bandle}</td>
              </tr>
            );
          })}
          {endEnterArray.map((item) => {
            return (
              <tr key={item.id}>
                <td style={{ textAlign: "center" }}>
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>
                  {concernLabels.find((l) => l.id === item.typeOfLabelId)?.name}
                </td>
                <td style={{ textAlign: "center", color: "red" }}>
                  {item.bandle}
                </td>
              </tr>
            );
          })}

          <tr>
            <td></td>
            <td></td>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {startStockArray.reduce((tol, l) => {
                return (tol += l.bandle);
              }, 0) +
                startEnterArray.reduce((tol, lt) => {
                  return (tol += lt.bandle);
                }, 0) +
                concernStock.reduce((tol, l) => {
                  return (tol += l.bandle);
                }, 0) +
                concernEnter.reduce((tol, lt) => {
                  return (tol += lt.bandle);
                }, 0) +
                endStockArray.reduce((tol, l) => {
                  return (tol += l.bandle);
                }, 0) +
                endEnterArray.reduce((tol, lt) => {
                  return (tol += lt.bandle);
                }, 0)}
            </th>
          </tr>
        </table>
      </Box>
    </>
  );
};
export default LabelDateOne;
