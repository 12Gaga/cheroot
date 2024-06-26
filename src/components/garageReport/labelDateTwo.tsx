import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { ExtraPurchase, PayOtherItem, TypeOfLabel } from "@prisma/client";

interface Props {
  concernExtraPurchase: ExtraPurchase[];
  concernPayOther: PayOtherItem[];
  concernLabels: TypeOfLabel[];
  garage: number | null;
  startDate: Date;
  endDate: Date;
}
const LabelDateTwo = ({
  concernExtraPurchase,
  concernLabels,
  concernPayOther,
  garage,
  startDate,
  endDate,
}: Props) => {
  const payOther = useAppSelector((store) => store.payStock.item);
  const extraPurchase = useAppSelector((store) => store.extraPurchase.item);

  const concernPay = concernPayOther.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() !==
        startDate.toLocaleDateString() &&
      new Date(f.date).toLocaleDateString() !== endDate.toLocaleDateString()
  );
  const concernExtra = concernExtraPurchase.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() !==
        startDate.toLocaleDateString() &&
      new Date(f.date).toLocaleDateString() !== endDate.toLocaleDateString()
  );
  //start date
  const startPayArray = payOther.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() ===
        startDate.toLocaleDateString() && f.garageId === garage
  );

  const startExtraArray = extraPurchase.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() ===
        startDate.toLocaleDateString() && f.garageId === garage
  );

  //end date
  const endPayArray = payOther.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === endDate.toLocaleDateString() &&
      f.garageId === garage
  );

  const endExtraArray = extraPurchase.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === endDate.toLocaleDateString() &&
      f.garageId === garage
  );

  return (
    <>
      <Box>
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

          {startPayArray.map((item) => {
            return (
              <tr key={item.id}>
                <td style={{ textAlign: "center" }}>
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>
                  {concernLabels.find((l) => l.id === item.typeOfLabelId)?.name}
                </td>
                <td style={{ textAlign: "center" }}>{item.labelBandle}</td>
              </tr>
            );
          })}
          {startExtraArray.map((item) => {
            return (
              <tr key={item.id}>
                <td style={{ textAlign: "center" }}>
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>
                  {concernLabels.find((l) => l.id === item.typeOfLabelId)?.name}
                </td>
                <td style={{ textAlign: "center" }}>{item.labelBandle}</td>
              </tr>
            );
          })}

          {garage &&
            concernPay.map((item) => {
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
                  <td style={{ textAlign: "center" }}>{item.labelBandle}</td>
                </tr>
              );
            })}
          {garage &&
            concernExtra.map((item) => {
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
                  <td style={{ textAlign: "center" }}>{item.labelBandle}</td>
                </tr>
              );
            })}

          {endPayArray.map((item) => {
            return (
              <tr key={item.id}>
                <td style={{ textAlign: "center" }}>
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>
                  {concernLabels.find((l) => l.id === item.typeOfLabelId)?.name}
                </td>
                <td style={{ textAlign: "center" }}>{item.labelBandle}</td>
              </tr>
            );
          })}
          {endExtraArray.map((item) => {
            return (
              <tr key={item.id}>
                <td style={{ textAlign: "center" }}>
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>
                  {concernLabels.find((l) => l.id === item.typeOfLabelId)?.name}
                </td>
                <td style={{ textAlign: "center" }}>{item.labelBandle}</td>
              </tr>
            );
          })}

          <tr>
            <td></td>
            <td></td>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {startPayArray.reduce((tol, l) => {
                return (tol += l.labelBandle);
              }, 0) +
                startExtraArray.reduce((tol, lt) => {
                  return (tol += lt.labelBandle);
                }, 0) +
                concernPay.reduce((tol, l) => {
                  return (tol += l.labelBandle);
                }, 0) +
                concernExtra.reduce((tol, lt) => {
                  return (tol += lt.labelBandle);
                }, 0) +
                endPayArray.reduce((tol, l) => {
                  return (tol += l.labelBandle);
                }, 0) +
                endExtraArray.reduce((tol, lt) => {
                  return (tol += lt.labelBandle);
                }, 0)}
            </th>
          </tr>
        </table>
      </Box>
    </>
  );
};
export default LabelDateTwo;
