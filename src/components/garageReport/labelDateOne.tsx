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
  //start date
  const exitStartStock = concernLabelStock.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === startDate.toLocaleDateString()
  );
  const exitStartEnter = concernLabelTransferEnter.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === startDate.toLocaleDateString()
  );
  let startStockArray: Label[] = [];
  let startEnterArray: LabelTransferGarage[] = [];
  if (!exitStartStock.length) {
    startStockArray = labelStocks.filter(
      (f) =>
        new Date(f.date).toLocaleDateString() ===
          startDate.toLocaleDateString() && f.garageId === garage
    );
  }
  if (!exitStartEnter.length) {
    startEnterArray = labelGarageTransfer.filter(
      (f) =>
        new Date(f.date).toLocaleDateString() ===
          startDate.toLocaleDateString() && f.enterenceGarageId === garage
    );
  }
  //end date
  const exitEndStock = concernLabelStock.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === endDate.toLocaleDateString()
  );
  const exitEndEnter = concernLabelTransferEnter.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === endDate.toLocaleDateString()
  );
  let endStockArray: Label[] = [];
  let endEnterArray: LabelTransferGarage[] = [];
  if (!exitEndStock.length) {
    endStockArray = labelStocks.filter(
      (f) =>
        new Date(f.date).toLocaleDateString() ===
          endDate.toLocaleDateString() && f.garageId === garage
    );
  }
  if (!exitEndEnter.length) {
    endEnterArray = labelGarageTransfer.filter(
      (f) =>
        new Date(f.date).toLocaleDateString() ===
          endDate.toLocaleDateString() && f.enterenceGarageId === garage
    );
  }
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

          {!exitStartStock.length &&
            startStockArray.map((item) => {
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
          {!exitStartEnter.length &&
            startEnterArray.map((item) => {
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

          {garage &&
            concernLabelStock.map((item) => {
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
            concernLabelTransferEnter.map((item) => {
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

          {!exitEndStock.length &&
            endStockArray.map((item) => {
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
          {!exitEndEnter.length &&
            endEnterArray.map((item) => {
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
                concernLabelStock.reduce((tol, l) => {
                  return (tol += l.bandle);
                }, 0) +
                concernLabelTransferEnter.reduce((tol, lt) => {
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
