import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import {
  FilterSize,
  FilterSizeTransferGarage,
  TypeOfFilterSize,
} from "@prisma/client";

interface Props {
  concernFilterSizeStock: FilterSize[];
  concernFilterTransferEnter: FilterSizeTransferGarage[];
  concernFilterSizes: TypeOfFilterSize[];
  garage: number | null;
  startDate: Date;
  endDate: Date;
}
const FilterDateOne = ({
  concernFilterSizeStock,
  concernFilterSizes,
  concernFilterTransferEnter,
  garage,
  startDate,
  endDate,
}: Props) => {
  const filterSizeStocks = useAppSelector(
    (store) => store.filterSizeStock.item
  );
  const filterGarageTransfer = useAppSelector(
    (store) => store.filterSizeTransfer.item
  );
  //start date
  const exitStartStock = concernFilterSizeStock.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === startDate.toLocaleDateString()
  );
  const exitStartEnter = concernFilterTransferEnter.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === startDate.toLocaleDateString()
  );
  let startStockArray: FilterSize[] = [];
  let startEnterArray: FilterSizeTransferGarage[] = [];
  if (!exitStartStock.length) {
    startStockArray = filterSizeStocks.filter(
      (f) =>
        new Date(f.date).toLocaleDateString() ===
          startDate.toLocaleDateString() && f.garageId === garage
    );
  }
  if (!exitStartEnter.length) {
    startEnterArray = filterGarageTransfer.filter(
      (f) =>
        new Date(f.date).toLocaleDateString() ===
          startDate.toLocaleDateString() && f.enterenceGarageId === garage
    );
  }
  //end date
  const exitEndStock = concernFilterSizeStock.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === endDate.toLocaleDateString()
  );
  const exitEndEnter = concernFilterTransferEnter.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === endDate.toLocaleDateString()
  );
  let endStockArray: FilterSize[] = [];
  let endEnterArray: FilterSizeTransferGarage[] = [];
  if (!exitEndStock.length) {
    endStockArray = filterSizeStocks.filter(
      (f) =>
        new Date(f.date).toLocaleDateString() ===
          endDate.toLocaleDateString() && f.garageId === garage
    );
  }
  if (!exitEndEnter.length) {
    endEnterArray = filterGarageTransfer.filter(
      (f) =>
        new Date(f.date).toLocaleDateString() ===
          endDate.toLocaleDateString() && f.enterenceGarageId === garage
    );
  }
  console.log("dfgggh", startStockArray);
  return (
    <>
      <Box sx={{ mr: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          အဆီခံသွင်းစာရင်း
        </Typography>
        <table border={1} className="table">
          <tr>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>နေ့စွဲ</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              အဆီခံအမျိုးအစား
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>အရေအတွက်</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>အိတ်</th>
          </tr>

          {!exitStartStock.length &&
            startStockArray.map((item) => {
              const itemdate = new Date(item.date);
              console.log("hello1");
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernFilterSizes.find(
                        (f) => f.id === item.typeOfFilterSizeId
                      )?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>{item.quantity}</td>
                  <td style={{ textAlign: "center" }}>{item.bag}</td>
                </tr>
              );
            })}
          {!exitStartEnter.length &&
            startEnterArray.map((item) => {
              const itemdate = new Date(item.date);
              console.log("hello2");
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernFilterSizes.find(
                        (f) => f.id === item.typeOfFilterSizeId
                      )?.name
                    }
                  </td>
                  <td style={{ textAlign: "center", color: "red" }}>
                    {item.quantity}
                  </td>
                  <td style={{ textAlign: "center", color: "red" }}>
                    {item.bag}
                  </td>
                </tr>
              );
            })}

          {garage &&
            concernFilterSizeStock.map((item) => {
              const itemdate = new Date(item.date);
              console.log("hello1");
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernFilterSizes.find(
                        (f) => f.id === item.typeOfFilterSizeId
                      )?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>{item.quantity}</td>
                  <td style={{ textAlign: "center" }}>{item.bag}</td>
                </tr>
              );
            })}
          {garage &&
            concernFilterTransferEnter.map((item) => {
              const itemdate = new Date(item.date);
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernFilterSizes.find(
                        (f) => f.id === item.typeOfFilterSizeId
                      )?.name
                    }
                  </td>
                  <td style={{ textAlign: "center", color: "red" }}>
                    {item.quantity}
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
                      concernFilterSizes.find(
                        (f) => f.id === item.typeOfFilterSizeId
                      )?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>{item.quantity}</td>
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
                      concernFilterSizes.find(
                        (f) => f.id === item.typeOfFilterSizeId
                      )?.name
                    }
                  </td>
                  <td style={{ textAlign: "center", color: "red" }}>
                    {item.quantity}
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
              {startStockArray.reduce((tol, f) => {
                return (tol += f.quantity);
              }, 0) +
                startEnterArray.reduce((tol, tf) => {
                  return (tol += tf.quantity);
                }, 0) +
                concernFilterSizeStock.reduce((tol, f) => {
                  return (tol += f.quantity);
                }, 0) +
                concernFilterTransferEnter.reduce((tol, tf) => {
                  return (tol += tf.quantity);
                }, 0) +
                endStockArray.reduce((tol, f) => {
                  return (tol += f.quantity);
                }, 0) +
                endEnterArray.reduce((tol, tf) => {
                  return (tol += tf.quantity);
                }, 0)}
            </th>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {startStockArray.reduce((tol, f) => {
                return (tol += f.bag);
              }, 0) +
                startEnterArray.reduce((tol, tf) => {
                  return (tol += tf.bag);
                }, 0) +
                concernFilterSizeStock.reduce((tol, f) => {
                  return (tol += f.bag);
                }, 0) +
                concernFilterTransferEnter.reduce((tol, tf) => {
                  return (tol += tf.bag);
                }, 0) +
                endStockArray.reduce((tol, f) => {
                  return (tol += f.bag);
                }, 0) +
                endEnterArray.reduce((tol, tf) => {
                  return (tol += tf.bag);
                }, 0)}
            </th>
          </tr>
        </table>
      </Box>
    </>
  );
};
export default FilterDateOne;
