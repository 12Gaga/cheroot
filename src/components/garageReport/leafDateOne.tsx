import { Box, Typography } from "@mui/material";
import { Leaf, TypeOfLeaf } from "@prisma/client";

interface Props {
  concernLeafStock: Leaf[];
  concernLeaves: TypeOfLeaf[];
  garage: number | null;
}
const LeafDateOne = ({ concernLeafStock, concernLeaves, garage }: Props) => {
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
          {garage &&
            concernLeafStock.map((item) => {
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
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {concernLeafStock.reduce((tol, l) => {
                return (tol += l.viss);
              }, 0)}
            </th>
          </tr>
        </table>
      </Box>
    </>
  );
};
export default LeafDateOne;
