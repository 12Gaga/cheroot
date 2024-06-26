import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { ExtraPurchase, PayOtherItem, TypeOfTabacco } from "@prisma/client";

interface Props {
  concernExtraPurchase: ExtraPurchase[];
  concernPayOther: PayOtherItem[];
  concernTabacco: TypeOfTabacco[];
  garage: number | null;
  startDate: Date;
  endDate: Date;
}
const TabaccoDateTwo = ({
  concernExtraPurchase,
  concernPayOther,
  concernTabacco,
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
          ဆေးစပ်ပေးစာရင်း
        </Typography>
        <table border={1} className="table">
          <tr>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>နေ့စွဲ</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              ဆေးစပ်အမျိုးအစား
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>တင်း</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>ပြည်</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>အိတ်</th>
          </tr>

          {startPayArray.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <tr key={item.id}>
                <td style={{ textAlign: "center" }}>
                  {itemdate.toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>
                  {
                    concernTabacco.find((t) => t.id === item.typeOfTabaccoId)
                      ?.name
                  }
                </td>
                <td style={{ textAlign: "center" }}>{item.tabaccoTin}</td>
                <td style={{ textAlign: "center" }}>{item.tabaccoPyi}</td>
                <td style={{ textAlign: "center" }}>{item.tabaccoBag}</td>
              </tr>
            );
          })}
          {startExtraArray.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <tr key={item.id}>
                <td style={{ textAlign: "center" }}>
                  {itemdate.toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>
                  {
                    concernTabacco.find((t) => t.id === item.typeOfTabaccoId)
                      ?.name
                  }
                </td>
                <td style={{ textAlign: "center" }}>{item.tabaccoTin}</td>
                <td style={{ textAlign: "center" }}>{item.tabaccoPyi}</td>
                <td style={{ textAlign: "center" }}>{item.tabaccoBag}</td>
              </tr>
            );
          })}

          {garage &&
            concernPay.map((item) => {
              const itemdate = new Date(item.date);
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernTabacco.find((t) => t.id === item.typeOfTabaccoId)
                        ?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>{item.tabaccoTin}</td>
                  <td style={{ textAlign: "center" }}>{item.tabaccoPyi}</td>
                  <td style={{ textAlign: "center" }}>{item.tabaccoBag}</td>
                </tr>
              );
            })}
          {garage &&
            concernExtra.map((item) => {
              const itemdate = new Date(item.date);
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernTabacco.find((t) => t.id === item.typeOfTabaccoId)
                        ?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>{item.tabaccoTin}</td>
                  <td style={{ textAlign: "center" }}>{item.tabaccoPyi}</td>
                  <td style={{ textAlign: "center" }}>{item.tabaccoBag}</td>
                </tr>
              );
            })}

          {endPayArray.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <tr key={item.id}>
                <td style={{ textAlign: "center" }}>
                  {itemdate.toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>
                  {
                    concernTabacco.find((t) => t.id === item.typeOfTabaccoId)
                      ?.name
                  }
                </td>
                <td style={{ textAlign: "center" }}>{item.tabaccoTin}</td>
                <td style={{ textAlign: "center" }}>{item.tabaccoPyi}</td>
                <td style={{ textAlign: "center" }}>{item.tabaccoBag}</td>
              </tr>
            );
          })}
          {endExtraArray.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <tr key={item.id}>
                <td style={{ textAlign: "center" }}>
                  {itemdate.toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>
                  {
                    concernTabacco.find((t) => t.id === item.typeOfTabaccoId)
                      ?.name
                  }
                </td>
                <td style={{ textAlign: "center" }}>{item.tabaccoTin}</td>
                <td style={{ textAlign: "center" }}>{item.tabaccoPyi}</td>
                <td style={{ textAlign: "center" }}>{item.tabaccoBag}</td>
              </tr>
            );
          })}

          <tr>
            <td></td>
            <td></td>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {startPayArray.reduce((tol, rt) => {
                return (tol += rt.tabaccoTin);
              }, 0) +
                startExtraArray.reduce((tol, et) => {
                  return (tol += et.tabaccoTin);
                }, 0) +
                concernPay.reduce((tol, rt) => {
                  return (tol += rt.tabaccoTin);
                }, 0) +
                concernExtra.reduce((tol, et) => {
                  return (tol += et.tabaccoTin);
                }, 0) +
                endPayArray.reduce((tol, rt) => {
                  return (tol += rt.tabaccoTin);
                }, 0) +
                endExtraArray.reduce((tol, et) => {
                  return (tol += et.tabaccoTin);
                }, 0)}
            </th>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {startPayArray.reduce((tol, rt) => {
                return (tol += rt.tabaccoPyi);
              }, 0) +
                startExtraArray.reduce((tol, et) => {
                  return (tol += et.tabaccoPyi);
                }, 0) +
                concernPay.reduce((tol, rt) => {
                  return (tol += rt.tabaccoPyi);
                }, 0) +
                concernExtra.reduce((tol, et) => {
                  return (tol += et.tabaccoPyi);
                }, 0) +
                endPayArray.reduce((tol, rt) => {
                  return (tol += rt.tabaccoPyi);
                }, 0) +
                endExtraArray.reduce((tol, et) => {
                  return (tol += et.tabaccoPyi);
                }, 0)}
            </th>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {startPayArray.reduce((tol, rt) => {
                return (tol += rt.tabaccoBag);
              }, 0) +
                startExtraArray.reduce((tol, et) => {
                  return (tol += et.tabaccoBag);
                }, 0) +
                concernPay.reduce((tol, rt) => {
                  return (tol += rt.tabaccoBag);
                }, 0) +
                concernExtra.reduce((tol, et) => {
                  return (tol += et.tabaccoBag);
                }, 0) +
                endPayArray.reduce((tol, rt) => {
                  return (tol += rt.tabaccoBag);
                }, 0) +
                endExtraArray.reduce((tol, et) => {
                  return (tol += et.tabaccoBag);
                }, 0)}
            </th>
          </tr>
        </table>
      </Box>
    </>
  );
};
export default TabaccoDateTwo;
