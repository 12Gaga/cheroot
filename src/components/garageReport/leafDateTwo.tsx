import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { PayLeaf, TypeOfLeaf } from "@prisma/client";

interface Props {
  concernPayLeaf: PayLeaf[];
  concernLeaves: TypeOfLeaf[];
  garage: number | null;
  startDate: Date;
  endDate: Date;
}
const LeafDateTwo = ({
  concernLeaves,
  concernPayLeaf,
  garage,
  startDate,
  endDate,
}: Props) => {
  const payLeaf = useAppSelector((store) => store.payLeaf.item);
  const concernPayData = concernPayLeaf.filter(
    (item) =>
      new Date(item.date).toLocaleDateString() !==
        startDate.toLocaleDateString() &&
      new Date(item.date).toLocaleDateString() !== endDate.toLocaleDateString()
  );
  //start
  const startArray = payLeaf.filter(
    (l) =>
      new Date(l.date).toLocaleDateString() ===
        startDate.toLocaleDateString() && l.garageId === garage
  );
  //end
  const endArray = payLeaf.filter(
    (l) =>
      new Date(l.date).toLocaleDateString() === endDate.toLocaleDateString() &&
      l.garageId === garage
  );
  return (
    <>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          ဖက်ထုတ်စာရင်း
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

          {startArray.map((item) => {
            return (
              <tr key={item.id}>
                <td style={{ textAlign: "center" }}>
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>
                  {concernLeaves.find((l) => l.id === item.typeOfLeafId)?.name}
                </td>
                <td style={{ textAlign: "center" }}>{item.batchNo}</td>
                <td style={{ textAlign: "center" }}>{item.viss}</td>
              </tr>
            );
          })}

          {garage &&
            concernPayData.map((item) => {
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
                  <td style={{ textAlign: "center" }}>{item.batchNo}</td>
                  <td style={{ textAlign: "center" }}>{item.viss}</td>
                </tr>
              );
            })}

          {endArray.map((item) => {
            return (
              <tr key={item.id}>
                <td style={{ textAlign: "center" }}>
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>
                  {concernLeaves.find((l) => l.id === item.typeOfLeafId)?.name}
                </td>
                <td style={{ textAlign: "center" }}>{item.batchNo}</td>
                <td style={{ textAlign: "center" }}>{item.viss}</td>
              </tr>
            );
          })}

          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {startArray.reduce((tol, start) => {
                return (tol += start.viss);
              }, 0) +
                concernPayData.reduce((tol, l) => {
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
export default LeafDateTwo;
