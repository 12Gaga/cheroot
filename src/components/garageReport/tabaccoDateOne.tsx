import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { Tabacco, TabaccoTransferGarage, TypeOfTabacco } from "@prisma/client";

interface Props {
  concernTabaccoStock: Tabacco[];
  concernTabaccoTransferEnter: TabaccoTransferGarage[];
  concernTabacco: TypeOfTabacco[];
  garage: number | null;
  startDate: Date;
  endDate: Date;
}
const TabaccoDateOne = ({
  concernTabacco,
  concernTabaccoTransferEnter,
  concernTabaccoStock,
  garage,
  startDate,
  endDate,
}: Props) => {
  const tabaccoStocks = useAppSelector((store) => store.tabaccoStock.item);
  const tabaccoGarageTransfer = useAppSelector(
    (store) => store.tabaccoTransfer.item
  );

  const concernStock = concernTabaccoStock.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() !==
        startDate.toLocaleDateString() &&
      new Date(f.date).toLocaleDateString() !== endDate.toLocaleDateString()
  );
  const concernEnter = concernTabaccoTransferEnter.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() !==
        startDate.toLocaleDateString() &&
      new Date(f.date).toLocaleDateString() !== endDate.toLocaleDateString()
  );
  //start date
  const startStockArray = tabaccoStocks.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() ===
        startDate.toLocaleDateString() && f.garageId === garage
  );

  const startEnterArray = tabaccoGarageTransfer.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() ===
        startDate.toLocaleDateString() && f.enterenceGarageId === garage
  );

  //end date
  const endStockArray = tabaccoStocks.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === endDate.toLocaleDateString() &&
      f.garageId === garage
  );

  const endEnterArray = tabaccoGarageTransfer.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === endDate.toLocaleDateString() &&
      f.enterenceGarageId === garage
  );

  return (
    <>
      <Box sx={{ mr: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          ဆေးစပ်သွင်းစာရင်း
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

          {startStockArray.map((item) => {
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
                <td style={{ textAlign: "center" }}>{item.tin}</td>
                <td style={{ textAlign: "center" }}>{item.pyi}</td>
                <td style={{ textAlign: "center" }}>{item.bag}</td>
              </tr>
            );
          })}
          {startEnterArray.map((item) => {
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
                <td style={{ textAlign: "center", color: "red" }}>
                  {item.tin}
                </td>
                <td style={{ textAlign: "center", color: "red" }}>
                  {item.pyi}
                </td>
                <td style={{ textAlign: "center", color: "red" }}>
                  {item.bag}
                </td>
              </tr>
            );
          })}

          {garage &&
            concernStock.map((item) => {
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
                  <td style={{ textAlign: "center" }}>{item.tin}</td>
                  <td style={{ textAlign: "center" }}>{item.pyi}</td>
                  <td style={{ textAlign: "center" }}>{item.bag}</td>
                </tr>
              );
            })}
          {garage &&
            concernEnter.map((item) => {
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
                  <td style={{ textAlign: "center", color: "red" }}>
                    {item.tin}
                  </td>
                  <td style={{ textAlign: "center", color: "red" }}>
                    {item.pyi}
                  </td>
                  <td style={{ textAlign: "center", color: "red" }}>
                    {item.bag}
                  </td>
                </tr>
              );
            })}

          {endStockArray.map((item) => {
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
                <td style={{ textAlign: "center" }}>{item.tin}</td>
                <td style={{ textAlign: "center" }}>{item.pyi}</td>
                <td style={{ textAlign: "center" }}>{item.bag}</td>
              </tr>
            );
          })}
          {endEnterArray.map((item) => {
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
                <td style={{ textAlign: "center", color: "red" }}>
                  {item.tin}
                </td>
                <td style={{ textAlign: "center", color: "red" }}>
                  {item.pyi}
                </td>
                <td style={{ textAlign: "center", color: "red" }}>
                  {item.bag}
                </td>
              </tr>
            );
          })}

          <tr>
            <td></td>
            <td></td>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {startStockArray.reduce((tol, t) => {
                return tol + t.tin;
              }, 0) +
                startEnterArray.reduce((tol, et) => {
                  return (tol += et.tin);
                }, 0) +
                concernStock.reduce((tol, t) => {
                  return tol + t.tin;
                }, 0) +
                concernEnter.reduce((tol, et) => {
                  return (tol += et.tin);
                }, 0) +
                endStockArray.reduce((tol, t) => {
                  return tol + t.tin;
                }, 0) +
                endEnterArray.reduce((tol, et) => {
                  return (tol += et.tin);
                }, 0)}
            </th>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {startStockArray.reduce((tol, t) => {
                return tol + t.pyi;
              }, 0) +
                startEnterArray.reduce((tol, et) => {
                  return (tol += et.pyi);
                }, 0) +
                concernStock.reduce((tol, t) => {
                  return tol + t.pyi;
                }, 0) +
                concernEnter.reduce((tol, et) => {
                  return (tol += et.pyi);
                }, 0) +
                endStockArray.reduce((tol, t) => {
                  return tol + t.pyi;
                }, 0) +
                endEnterArray.reduce((tol, et) => {
                  return (tol += et.pyi);
                }, 0)}
            </th>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {startStockArray.reduce((tol, t) => {
                return tol + t.bag;
              }, 0) +
                startEnterArray.reduce((tol, et) => {
                  return (tol += et.bag);
                }, 0) +
                concernStock.reduce((tol, t) => {
                  return tol + t.bag;
                }, 0) +
                concernEnter.reduce((tol, et) => {
                  return (tol += et.bag);
                }, 0) +
                endStockArray.reduce((tol, t) => {
                  return tol + t.bag;
                }, 0) +
                endEnterArray.reduce((tol, et) => {
                  return (tol += et.bag);
                }, 0)}
            </th>
          </tr>
        </table>
      </Box>
    </>
  );
};
export default TabaccoDateOne;
