import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { TypeOfLeaf } from "@prisma/client";

interface Props {
  garage: number | null;
  concernLeaves: TypeOfLeaf[];
  endDate: Date;
}
const LeafDateFour = ({ garage, concernLeaves, endDate }: Props) => {
  const leafStock = useAppSelector((store) => store.leafStock.item);
  const leafGarageTransfer = useAppSelector((store) => store.leafTransfer.item);
  const payLeaf = useAppSelector((store) => store.payLeaf.item);
  return (
    <>
      <Box sx={{ ml: 5 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          ကျန်ရှိစာရင်း
        </Typography>
        <table border={1} className="table">
          <tr>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              ဖက်အမျိုးအစား
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              ကျန်ရှိပိုနံပါတ်
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              ကျန်ရှိပိသာ
            </th>
          </tr>

          {garage &&
            concernLeaves.map((item) => {
              const findLeafStockData = leafStock.filter((l) => {
                const ldate = new Date(l.date);
                return (
                  l.typeOfLeafId === item.id &&
                  l.garageId === garage &&
                  ldate.getTime() <= endDate.getTime()
                );
              });

              const dataArray = findLeafStockData.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                  endDate.toLocaleDateString()
              );
              let endDateViss = 0;
              if (!dataArray.length) {
                const datum = leafStock.filter(
                  (f) =>
                    new Date(f.date).toLocaleDateString() ===
                      endDate.toLocaleDateString() &&
                    f.typeOfLeafId === item.id &&
                    f.garageId === garage
                );
                endDateViss = datum.reduce((total, leaf) => {
                  return (total += leaf.viss);
                }, 0);
              }

              const leafStockData =
                findLeafStockData.reduce((total, leaf) => {
                  return (total += leaf.viss);
                }, 0) + endDateViss;
              console.log("data", leafStockData);

              //leaf Transfer
              const findLeafTransferData = leafGarageTransfer.filter((gl) => {
                const ldate = new Date(gl.date);
                return (
                  gl.exitGarageId === garage &&
                  gl.typeOfLeafId === item.id &&
                  ldate.getTime() <= endDate.getTime()
                );
              });

              const dataTransferArray = findLeafTransferData.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                  endDate.toLocaleDateString()
              );
              let endDateTransferViss = 0;
              let findExitbatchNo: number[];
              if (!dataTransferArray.length) {
                const datum = leafGarageTransfer.filter(
                  (f) =>
                    new Date(f.date).toLocaleDateString() ===
                      endDate.toLocaleDateString() &&
                    f.typeOfLeafId === item.id &&
                    f.exitGarageId === garage
                );
                findExitbatchNo = datum.map((fd) => fd.batchNo);
                endDateTransferViss = leafStock
                  .filter((l) => {
                    const ldate = new Date(l.date);
                    return (
                      l.typeOfLeafId === item.id &&
                      l.garageId === garage &&
                      findExitbatchNo.includes(l.batchNo)
                    );
                  })
                  .reduce((total, leaf) => {
                    return (total += leaf.viss);
                  }, 0);
              }

              const findbatchNo = findLeafTransferData.map((fd) => fd.batchNo);
              const leafTransferData =
                leafStock
                  .filter((l) => {
                    const ldate = new Date(l.date);
                    return (
                      l.typeOfLeafId === item.id &&
                      l.garageId === garage &&
                      findbatchNo.includes(l.batchNo)
                    );
                  })
                  .reduce((total, leaf) => {
                    return (total += leaf.viss);
                  }, 0) + endDateTransferViss;
              console.log("data2", findLeafTransferData);

              let findBatchs;
              if (!dataTransferArray.length) {
                findBatchs = leafStock
                  .filter((l) => {
                    const ldate = new Date(l.date);
                    return (
                      l.typeOfLeafId === item.id &&
                      l.garageId === garage &&
                      !findbatchNo.includes(l.batchNo) &&
                      !findExitbatchNo.includes(l.batchNo) &&
                      ldate.getTime() <= endDate.getTime()
                    );
                  })
                  .map((lb) => lb.batchNo);
              } else {
                findBatchs = leafStock
                  .filter((l) => {
                    const ldate = new Date(l.date);
                    return (
                      l.typeOfLeafId === item.id &&
                      l.garageId === garage &&
                      !findbatchNo.includes(l.batchNo) &&
                      ldate.getTime() <= endDate.getTime()
                    );
                  })
                  .map((lb) => lb.batchNo);
              }

              //payLeaf
              const findPayleaf = payLeaf.filter((p) => {
                const pdate = new Date(p.date);
                return (
                  p.typeOfLeafId === item.id &&
                  p.garageId === garage &&
                  pdate.getTime() <= endDate.getTime()
                );
              });

              const dataPayArray = findPayleaf.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                  endDate.toLocaleDateString()
              );
              let endDatePayViss = 0;
              let findPaybatchNo: number[];
              if (!dataPayArray.length) {
                const datum = payLeaf.filter((p) => {
                  const pdate = new Date(p.date);
                  return (
                    p.typeOfLeafId === item.id &&
                    p.garageId === garage &&
                    pdate.toLocaleDateString() === endDate.toLocaleDateString()
                  );
                });
                endDatePayViss = datum.reduce((tol, pl) => {
                  return (tol += pl.viss);
                }, 0);
                findPaybatchNo = datum.map((p) => p.batchNo);
              }

              const payLeafData =
                findPayleaf.reduce((tol, pl) => {
                  return (tol += pl.viss);
                }, 0) + endDatePayViss;

              let lastBatchs;
              if (!dataPayArray.length) {
                const paybatchs = findPayleaf.map((p) => p.batchNo);
                lastBatchs = findBatchs.filter(
                  (pb) =>
                    !paybatchs.includes(pb) && !findPaybatchNo.includes(pb)
                );
              } else {
                const paybatchs = findPayleaf.map((p) => p.batchNo);
                lastBatchs = findBatchs.filter((pb) => !paybatchs.includes(pb));
              }
              console.log("data3", payLeafData);

              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center", height: 30 }}>
                    {item.name}
                  </td>
                  <td style={{ textAlign: "center" }}>{lastBatchs.length}</td>
                  <td style={{ textAlign: "center" }}>
                    {leafStockData - (leafTransferData + payLeafData)}
                  </td>
                </tr>
              );
            })}
        </table>
      </Box>
    </>
  );
};
export default LeafDateFour;
