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

          {!exitStartpay.length &&
            startPayArray.map((item) => {
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
          {!exitStartExtra.length &&
            startExtraArray.map((item) => {
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
            concernPayOther.map((item) => {
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
            concernExtraPurchase.map((item) => {
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

          {!exitEndpay.length &&
            endPayArray.map((item) => {
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
          {!exitEndExtra.length &&
            endExtraArray.map((item) => {
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
                concernPayOther.reduce((tol, rt) => {
                  return (tol += rt.tabaccoTin);
                }, 0) +
                concernExtraPurchase.reduce((tol, et) => {
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
                concernPayOther.reduce((tol, rt) => {
                  return (tol += rt.tabaccoPyi);
                }, 0) +
                concernExtraPurchase.reduce((tol, et) => {
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
                concernPayOther.reduce((tol, rt) => {
                  return (tol += rt.tabaccoBag);
                }, 0) +
                concernExtraPurchase.reduce((tol, et) => {
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
