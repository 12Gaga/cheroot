import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { Leaf, TypeOfLeaf } from "@prisma/client";

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
              let datums: Leaf[] = [];
              if (!dataArray.length) {
                datums = leafStock.filter(
                  (f) =>
                    new Date(f.date).toLocaleDateString() ===
                      endDate.toLocaleDateString() &&
                    f.typeOfLeafId === item.id &&
                    f.garageId === garage
                );
                endDateViss = datums.reduce((total, leaf) => {
                  return (total += leaf.viss);
                }, 0);
              }

              const leafStockData =
                findLeafStockData.reduce((total, leaf) => {
                  return (total += leaf.viss);
                }, 0) + endDateViss;
              console.log("data", leafStockData);
              console.log("endData", datums);
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
              let findExitDates: Date[];
              if (!dataTransferArray.length) {
                const datum = leafGarageTransfer.filter(
                  (f) =>
                    new Date(f.date).toLocaleDateString() ===
                      endDate.toLocaleDateString() &&
                    f.typeOfLeafId === item.id &&
                    f.exitGarageId === garage
                );
                findExitbatchNo = datum.map((fd) => fd.batchNo);
                findExitDates = datum.map((fd) => fd.enterDate);
                const exitdata = leafStock.filter((l) => {
                  return l.typeOfLeafId === item.id && l.garageId === garage;
                });
                endDateTransferViss = exitdata
                  .filter((l) => {
                    return (
                      findExitbatchNo.includes(l.batchNo) &&
                      findExitDates.includes(l.date)
                    );
                  })
                  .reduce((total, leaf) => {
                    return (total += leaf.viss);
                  }, 0);
              }

              const findbatchNo = findLeafTransferData.map((fd) => fd.batchNo);
              const findDates = findLeafTransferData.map((fd) => fd.enterDate);
              const transferData = leafStock.filter((l) => {
                return l.typeOfLeafId === item.id && l.garageId === garage;
              });
              const leafTransferData =
                transferData
                  .filter(
                    (l) =>
                      findbatchNo.includes(l.batchNo) &&
                      findDates.includes(l.date)
                  )
                  .reduce((tol, leaf) => {
                    return (tol += leaf.viss);
                  }, 0) + endDateTransferViss;
              console.log("data2", leafTransferData);

              let findBatchs;
              if (!dataTransferArray.length) {
                let dataFindBatchs: Leaf[] = [];
                // const dd = findLeafStockData.filter((l) => {
                //   return l.typeOfLeafId === item.id && l.garageId === garage;
                // });
                dataFindBatchs = findLeafStockData.filter(
                  (l) =>
                    !findbatchNo.includes(l.batchNo) ||
                    !findDates.includes(l.date)
                );
                datums.forEach((item) => {
                  return dataFindBatchs.push(item);
                });
                console.log("two", dataFindBatchs);
                // const batchs = dataFindBatchs.filter((l) => {
                //   return l.typeOfLeafId === item.id && l.garageId === garage;
                // });
                findBatchs = dataFindBatchs.filter(
                  (l) =>
                    !findExitbatchNo.includes(l.batchNo) ||
                    !findExitDates.includes(l.date)
                );
              } else {
                // const batchs = findLeafStockData.filter((l) => {
                //   return l.typeOfLeafId === item.id && l.garageId === garage;
                // });
                findBatchs = findLeafStockData.filter(
                  (l) =>
                    !findbatchNo.includes(l.batchNo) ||
                    !findDates.includes(l.date)
                );
              }
              console.log("batch", findBatchs);
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
              let payDates: Date[];
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
                payDates = datum.map((p) => p.enterDate);
              }

              const payLeafData =
                findPayleaf.reduce((tol, pl) => {
                  return (tol += pl.viss);
                }, 0) + endDatePayViss;

              let lastBatchs;
              if (!dataPayArray.length) {
                const paybatchs = findPayleaf.map((p) => p.batchNo);
                const findPayDates = findPayleaf.map((p) => p.enterDate);
                const lastdd = findBatchs.filter(
                  (pb) =>
                    !paybatchs.includes(pb.batchNo) ||
                    !findPayDates.includes(pb.date)
                );
                lastBatchs = lastdd.filter(
                  (pb) =>
                    !findPaybatchNo.includes(pb.batchNo) ||
                    !payDates.includes(pb.date)
                );
              } else {
                const paybatchs = findPayleaf.map((p) => p.batchNo);
                const findPayDates = findPayleaf.map((p) => p.enterDate);
                lastBatchs = findBatchs.filter(
                  (pb) =>
                    !paybatchs.includes(pb.batchNo) ||
                    !findPayDates.includes(pb.date)
                );
              }
              console.log("data3", payLeafData);
              console.log("dghlkgs", lastBatchs);
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
