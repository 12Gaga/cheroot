import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import {
  FilterSizeTransferGarage,
  Garage,
  TypeOfFilterSize,
} from "@prisma/client";

interface Props {
  concernFilterSizes: TypeOfFilterSize[];
  concernGarages: Garage[];
  concernFilterTransferExit: FilterSizeTransferGarage[];
  garage: number | null;
  startDate: Date;
  endDate: Date;
}
const FilterDateThree = ({
  concernFilterSizes,
  concernFilterTransferExit,
  concernGarages,
  garage,
  startDate,
  endDate,
}: Props) => {
  const filterGarageTransfer = useAppSelector(
    (store) => store.filterSizeTransfer.item
  );

  const concernExit = concernFilterTransferExit.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() !==
        startDate.toLocaleDateString() &&
      new Date(f.date).toLocaleDateString() !== endDate.toLocaleDateString()
  );
  //start date
  const startExitArray = filterGarageTransfer.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() ===
        startDate.toLocaleDateString() && f.exitGarageId === garage
  );

  //end date
  const endExitArray = filterGarageTransfer.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === endDate.toLocaleDateString() &&
      f.exitGarageId === garage
  );
  return (
    <>
      <Box sx={{ mr: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          အဆီခံဂိုထောင်ကူးပြောင်းစာရင်း
        </Typography>
        <table border={1} className="table">
          <tr>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>နေ့စွဲ</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              အဝင်ဂိုထောင်
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              အဆီခံအမျိုးအစား
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>အရေအတွက်</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>အိတ်</th>
          </tr>
          {startExitArray.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <tr key={item.id}>
                <td style={{ textAlign: "center" }}>
                  {itemdate.toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>
                  {
                    concernGarages.find((g) => g.id === item.enterenceGarageId)
                      ?.name
                  }
                </td>
                <td style={{ textAlign: "center" }}>
                  {
                    concernFilterSizes.find(
                      (t) => t.id === item.typeOfFilterSizeId
                    )?.name
                  }
                </td>
                <td style={{ textAlign: "center" }}>{item.quantity}</td>
                <td style={{ textAlign: "center" }}>{item.bag}</td>
              </tr>
            );
          })}

          {garage &&
            concernExit.map((item) => {
              const itemdate = new Date(item.date);
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernGarages.find(
                        (g) => g.id === item.enterenceGarageId
                      )?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernFilterSizes.find(
                        (t) => t.id === item.typeOfFilterSizeId
                      )?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>{item.quantity}</td>
                  <td style={{ textAlign: "center" }}>{item.bag}</td>
                </tr>
              );
            })}

          {endExitArray.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <tr key={item.id}>
                <td style={{ textAlign: "center" }}>
                  {itemdate.toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>
                  {
                    concernGarages.find((g) => g.id === item.enterenceGarageId)
                      ?.name
                  }
                </td>
                <td style={{ textAlign: "center" }}>
                  {
                    concernFilterSizes.find(
                      (t) => t.id === item.typeOfFilterSizeId
                    )?.name
                  }
                </td>
                <td style={{ textAlign: "center" }}>{item.quantity}</td>
                <td style={{ textAlign: "center" }}>{item.bag}</td>
              </tr>
            );
          })}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {startExitArray.reduce((tol, tt) => {
                return (tol += tt.quantity);
              }, 0) +
                concernExit.reduce((tol, tt) => {
                  return (tol += tt.quantity);
                }, 0) +
                endExitArray.reduce((tol, tt) => {
                  return (tol += tt.quantity);
                }, 0)}
            </th>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {startExitArray.reduce((tol, tt) => {
                return (tol += tt.bag);
              }, 0) +
                concernExit.reduce((tol, tt) => {
                  return (tol += tt.bag);
                }, 0) +
                endExitArray.reduce((tol, tt) => {
                  return (tol += tt.bag);
                }, 0)}
            </th>
          </tr>
        </table>
      </Box>
    </>
  );
};
export default FilterDateThree;
