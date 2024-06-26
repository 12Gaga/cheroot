import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { Leaf, LeafTransferGarage, TypeOfLeaf } from "@prisma/client";

interface Props {
  concernLeafStock: Leaf[];
  concernLeafTransferEnter: LeafTransferGarage[];
  concernLeaves: TypeOfLeaf[];
  garage: number | null;
  startDate: Date;
  endDate: Date;
}
const LeafDateOne = ({
  concernLeafStock,
  concernLeaves,
  concernLeafTransferEnter,
  garage,
  startDate,
  endDate,
}: Props) => {
  const leafStock = useAppSelector((store) => store.leafStock.item);
  const leafGarageTransfer = useAppSelector((store) => store.leafTransfer.item);

  const concernData = concernLeafStock.filter(
    (item) =>
      new Date(item.date).toLocaleDateString() !==
        startDate.toLocaleDateString() &&
      new Date(item.date).toLocaleDateString() !== endDate.toLocaleDateString()
  );
  const concernEnterData = concernLeafTransferEnter.filter(
    (item) =>
      new Date(item.date).toLocaleDateString() !==
        startDate.toLocaleDateString() &&
      new Date(item.date).toLocaleDateString() !== endDate.toLocaleDateString()
  );
  //start date
  const startArray = leafStock.filter(
    (l) =>
      new Date(l.date).toLocaleDateString() ===
        startDate.toLocaleDateString() && l.garageId === garage
  );
  const startEnterArray = leafGarageTransfer.filter(
    (l) =>
      new Date(l.date).toLocaleDateString() ===
        startDate.toLocaleDateString() && l.enterenceGarageId === garage
  );
  //end date
  const endArray = leafStock.filter(
    (l) =>
      new Date(l.date).toLocaleDateString() === endDate.toLocaleDateString() &&
      l.garageId === garage
  );
  const endEnterArray = leafGarageTransfer.filter(
    (l) =>
      new Date(l.date).toLocaleDateString() === endDate.toLocaleDateString() &&
      l.enterenceGarageId === garage
  );
  return (
    <>
      <Box sx={{ mr: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          ဖက်သွင်းစာရင်း
        </Typography>
        <table border={1} className="table">
          <tr>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>နေ့စွဲ</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              ဖက်အမျိုးအစား
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              ပိုနံပါတ်
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>ပိသာ</th>
          </tr>

          {startArray.map((leaf) => {
            const transfer = startEnterArray.find(
              (g) => g.transferSeq === leaf.stockSeq
            );
            return (
              <>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    {new Date(leaf.date).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernLeaves.find((l) => l.id === leaf.typeOfLeafId)
                        ?.name
                    }
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      color: transfer ? "red" : "black",
                    }}
                  >
                    {leaf.batchNo}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      color: transfer ? "red" : "black",
                    }}
                  >
                    {leaf.viss}
                  </td>
                </tr>
              </>
            );
          })}

          {garage &&
            concernData.map((item) => {
              const transfer = concernEnterData.find(
                (g) => g.transferSeq === item.stockSeq
              );
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernLeaves.find((l) => l.id === item.typeOfLeafId)
                        ?.name
                    }
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      color: transfer ? "red" : "black",
                    }}
                  >
                    {item.batchNo}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      color: transfer ? "red" : "black",
                    }}
                  >
                    {item.viss}
                  </td>
                </tr>
              );
            })}

          {endArray.map((leaf) => {
            const transfer = endEnterArray.find(
              (g) => g.transferSeq === leaf.stockSeq
            );
            return (
              <>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    {new Date(leaf.date).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernLeaves.find((l) => l.id === leaf.typeOfLeafId)
                        ?.name
                    }
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      color: transfer ? "red" : "black",
                    }}
                  >
                    {leaf.batchNo}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      color: transfer ? "red" : "black",
                    }}
                  >
                    {leaf.viss}
                  </td>
                </tr>
              </>
            );
          })}

          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {startArray.reduce((tol, leaf) => {
                return (tol += leaf.viss);
              }, 0) +
                concernData.reduce((tol, l) => {
                  return (tol += l.viss);
                }, 0) +
                endArray.reduce((tol, end) => {
                  return (tol += end.viss);
                }, 0)}
            </th>
          </tr>
        </table>
      </Box>
    </>
  );
};
export default LeafDateOne;
