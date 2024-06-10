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
  //start date
  const exitStartpay = concernPayOther.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === startDate.toLocaleDateString()
  );
  const exitStartExtra = concernExtraPurchase.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === startDate.toLocaleDateString()
  );
  let startPayArray: PayOtherItem[] = [];
  let startExtraArray: ExtraPurchase[] = [];
  if (!exitStartpay.length) {
    startPayArray = payOther.filter(
      (f) =>
        new Date(f.date).toLocaleDateString() ===
          startDate.toLocaleDateString() && f.garageId === garage
    );
  }
  if (!exitStartExtra.length) {
    startExtraArray = extraPurchase.filter(
      (f) =>
        new Date(f.date).toLocaleDateString() ===
          startDate.toLocaleDateString() && f.garageId === garage
    );
  }
  //end date
  const exitEndpay = concernPayOther.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === endDate.toLocaleDateString()
  );
  const exitEndExtra = concernExtraPurchase.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === endDate.toLocaleDateString()
  );
  let endPayArray: PayOtherItem[] = [];
  let endExtraArray: ExtraPurchase[] = [];
  if (!exitEndpay.length) {
    endPayArray = payOther.filter(
      (f) =>
        new Date(f.date).toLocaleDateString() ===
          endDate.toLocaleDateString() && f.garageId === garage
    );
  }
  if (!exitEndExtra.length) {
    endExtraArray = extraPurchase.filter(
      (f) =>
        new Date(f.date).toLocaleDateString() ===
          endDate.toLocaleDateString() && f.garageId === garage
    );
  }
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

          {!exitStartpay.length &&
            startPayArray.map((item) => {
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
          {!exitStartExtra.length &&
            startExtraArray.map((item) => {
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
            concernPayOther.map((item) => {
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
            concernExtraPurchase.map((item) => {
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

          {!exitEndpay.length &&
            endPayArray.map((item) => {
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
          {!exitEndExtra.length &&
            endExtraArray.map((item) => {
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
                concernPayOther.reduce((tol, l) => {
                  return (tol += l.labelBandle);
                }, 0) +
                concernExtraPurchase.reduce((tol, lt) => {
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
