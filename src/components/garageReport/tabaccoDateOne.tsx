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
  //start date
  const exitStartStock = concernTabaccoStock.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === startDate.toLocaleDateString()
  );
  const exitStartEnter = concernTabaccoTransferEnter.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === startDate.toLocaleDateString()
  );
  let startStockArray: Tabacco[] = [];
  let startEnterArray: TabaccoTransferGarage[] = [];
  if (!exitStartStock.length) {
    startStockArray = tabaccoStocks.filter(
      (f) =>
        new Date(f.date).toLocaleDateString() ===
          startDate.toLocaleDateString() && f.garageId === garage
    );
  }
  if (!exitStartEnter.length) {
    startEnterArray = tabaccoGarageTransfer.filter(
      (f) =>
        new Date(f.date).toLocaleDateString() ===
          startDate.toLocaleDateString() && f.enterenceGarageId === garage
    );
  }
  //end date
  const exitEndStock = concernTabaccoStock.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === endDate.toLocaleDateString()
  );
  const exitEndEnter = concernTabaccoTransferEnter.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === endDate.toLocaleDateString()
  );
  let endStockArray: Tabacco[] = [];
  let endEnterArray: TabaccoTransferGarage[] = [];
  if (!exitEndStock.length) {
    endStockArray = tabaccoStocks.filter(
      (f) =>
        new Date(f.date).toLocaleDateString() ===
          endDate.toLocaleDateString() && f.garageId === garage
    );
  }
  if (!exitEndEnter.length) {
    endEnterArray = tabaccoGarageTransfer.filter(
      (f) =>
        new Date(f.date).toLocaleDateString() ===
          endDate.toLocaleDateString() && f.enterenceGarageId === garage
    );
  }
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

          {!exitStartStock.length &&
            startStockArray.map((item) => {
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
          {!exitStartEnter.length &&
            startEnterArray.map((item) => {
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
            concernTabaccoStock.map((item) => {
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
            concernTabaccoTransferEnter.map((item) => {
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

          {!exitEndStock.length &&
            endStockArray.map((item) => {
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
          {!exitEndEnter.length &&
            endEnterArray.map((item) => {
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
                concernTabaccoStock.reduce((tol, t) => {
                  return tol + t.tin;
                }, 0) +
                concernTabaccoTransferEnter.reduce((tol, et) => {
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
                concernTabaccoStock.reduce((tol, t) => {
                  return tol + t.pyi;
                }, 0) +
                concernTabaccoTransferEnter.reduce((tol, et) => {
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
                concernTabaccoStock.reduce((tol, t) => {
                  return tol + t.bag;
                }, 0) +
                concernTabaccoTransferEnter.reduce((tol, et) => {
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
