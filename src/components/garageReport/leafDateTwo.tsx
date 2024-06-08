import { Box, Typography } from "@mui/material";
import { PayLeaf, TypeOfLeaf } from "@prisma/client";

interface Props {
  concernPayLeaf: PayLeaf[];
  concernLeaves: TypeOfLeaf[];
  garage: number | null;
}
const LeafDateTwo = ({ concernLeaves, concernPayLeaf, garage }: Props) => {
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
          {garage &&
            concernPayLeaf.map((item) => {
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
              {concernPayLeaf.reduce((tol, l) => {
                return (tol += l.viss);
              }, 0)}
            </th>
          </tr>
        </table>
      </Box>
    </>
  );
};
export default LeafDateTwo;
