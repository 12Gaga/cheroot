import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { Garage, LeafTransferGarage, TypeOfLeaf } from "@prisma/client";

interface Props {
  concernLeafTransfer: LeafTransferGarage[];
  concernLeaves: TypeOfLeaf[];
  concernGarages: Garage[];
  garage: number | null;
  startDate: Date;
  endDate: Date;
}
const LeafDateThree = ({
  concernLeafTransfer,
  concernLeaves,
  garage,
  concernGarages,
  startDate,
  endDate,
}: Props) => {
  const leafStock = useAppSelector((store) => store.leafStock.item);
  const leafGarageTransfer = useAppSelector((store) => store.leafTransfer.item);
  const concernTransferData = concernLeafTransfer.filter(
    (item) =>
      new Date(item.date).toLocaleDateString() !==
        startDate.toLocaleDateString() &&
      new Date(item.date).toLocaleDateString() !== endDate.toLocaleDateString()
  );
  //start
  const startArray = leafGarageTransfer.filter(
    (l) =>
      new Date(l.date).toLocaleDateString() ===
        startDate.toLocaleDateString() && l.exitGarageId === garage
  );
  //end
  const endArray = leafGarageTransfer.filter(
    (l) =>
      new Date(l.date).toLocaleDateString() === endDate.toLocaleDateString() &&
      l.exitGarageId === garage
  );
  return (
    <>
      <Box sx={{ mr: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          ဖက်ဂိုထောင်ကူးပြောင်းစာရင်း
        </Typography>
        <table border={1} className="table">
          <tr>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>နေ့စွဲ</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              အဝင်ဂိုထောင်
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              ဖက်အမျိုးအစား
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              ပိုနံပါတ်
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>ပိဿာ</th>
          </tr>

          {startArray.map((item) => {
            const itemdate = new Date(item.date);
            const finddata = leafStock.find(
              (ls) =>
                ls.typeOfLeafId === item.typeOfLeafId &&
                ls.batchNo === item.batchNo &&
                ls.garageId === garage
            );
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
                  {concernLeaves.find((t) => t.id === item.typeOfLeafId)?.name}
                </td>
                <td style={{ textAlign: "center" }}>{item.batchNo}</td>
                <td style={{ textAlign: "center" }}>{finddata?.viss}</td>
              </tr>
            );
          })}

          {garage &&
            concernTransferData.map((item) => {
              const itemdate = new Date(item.date);
              const finddata = leafStock.find(
                (ls) =>
                  ls.typeOfLeafId === item.typeOfLeafId &&
                  ls.batchNo === item.batchNo &&
                  ls.garageId === garage
              );
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
                      concernLeaves.find((t) => t.id === item.typeOfLeafId)
                        ?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>{item.batchNo}</td>
                  <td style={{ textAlign: "center" }}>{finddata?.viss}</td>
                </tr>
              );
            })}

          {endArray.map((item) => {
            const itemdate = new Date(item.date);
            const finddata = leafStock.find(
              (ls) =>
                ls.typeOfLeafId === item.typeOfLeafId &&
                ls.batchNo === item.batchNo &&
                ls.garageId === garage
            );
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
                  {concernLeaves.find((t) => t.id === item.typeOfLeafId)?.name}
                </td>
                <td style={{ textAlign: "center" }}>{item.batchNo}</td>
                <td style={{ textAlign: "center" }}>{finddata?.viss}</td>
              </tr>
            );
          })}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {startArray
                .map((item) => {
                  return leafStock.find(
                    (ls) =>
                      ls.typeOfLeafId === item.typeOfLeafId &&
                      ls.batchNo === item.batchNo &&
                      ls.garageId === garage
                  )?.viss as number;
                })
                .reduce((tol, viss) => {
                  return (tol += viss);
                }, 0) +
                concernTransferData
                  .map((item) => {
                    return leafStock.find(
                      (ls) =>
                        ls.typeOfLeafId === item.typeOfLeafId &&
                        ls.batchNo === item.batchNo &&
                        ls.garageId === garage
                    )?.viss as number;
                  })
                  .reduce((tol, viss) => {
                    return (tol += viss);
                  }, 0) +
                endArray
                  .map((item) => {
                    return leafStock.find(
                      (ls) =>
                        ls.typeOfLeafId === item.typeOfLeafId &&
                        ls.batchNo === item.batchNo &&
                        ls.garageId === garage
                    )?.viss as number;
                  })
                  .reduce((tol, viss) => {
                    return (tol += viss);
                  }, 0)}
            </th>
          </tr>
        </table>
      </Box>
    </>
  );
};
export default LeafDateThree;
