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
  //start date
  const exitStart = concernLeafStock.filter(
    (item) =>
      new Date(item.date).toLocaleDateString() ===
      startDate.toLocaleDateString()
  );
  const exitStartEnter = concernLeafTransferEnter.filter(
    (item) =>
      new Date(item.date).toLocaleDateString() ===
      startDate.toLocaleDateString()
  );

  let startArray: Leaf[] = [];
  let startEnterArray: LeafTransferGarage[] = [];
  if (!exitStart.length) {
    startArray = leafStock.filter(
      (l) =>
        new Date(l.date).toLocaleDateString() ===
          startDate.toLocaleDateString() && l.garageId === garage
    );
  }
  if (!exitStartEnter.length) {
    startEnterArray = leafGarageTransfer.filter(
      (l) =>
        new Date(l.date).toLocaleDateString() ===
          startDate.toLocaleDateString() && l.enterenceGarageId === garage
    );
  }
  //end date
  const exitEnd = concernLeafStock.filter(
    (item) =>
      new Date(item.date).toLocaleDateString() === endDate.toLocaleDateString()
  );
  const exitEndEnter = concernLeafTransferEnter.filter(
    (item) =>
      new Date(item.date).toLocaleDateString() === endDate.toLocaleDateString()
  );
  let endArray: Leaf[] = [];
  let endEnterArray: LeafTransferGarage[] = [];
  if (!exitEnd.length) {
    endArray = leafStock.filter(
      (l) =>
        new Date(l.date).toLocaleDateString() ===
          endDate.toLocaleDateString() && l.garageId === garage
    );
  }
  if (!exitEndEnter.length) {
    endEnterArray = leafGarageTransfer.filter(
      (l) =>
        new Date(l.date).toLocaleDateString() ===
          endDate.toLocaleDateString() && l.enterenceGarageId === garage
    );
  }
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

          {!exitStart.length &&
            startArray.map((leaf) => {
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
            concernLeafStock.map((item) => {
              const transfer = concernLeafTransferEnter.find(
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

          {!exitEnd.length &&
            endArray.map((leaf) => {
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
                concernLeafStock.reduce((tol, l) => {
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
