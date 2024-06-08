import { Box, Typography } from "@mui/material";
import { Label, LabelTransferGarage, TypeOfLabel } from "@prisma/client";

interface Props {
  concernLabelStock: Label[];
  concernLabelTransferEnter: LabelTransferGarage[];
  concernLabels: TypeOfLabel[];
  garage: number | null;
}
const LabelDateOne = ({
  concernLabelStock,
  concernLabelTransferEnter,
  concernLabels,
  garage,
}: Props) => {
  return (
    <>
      <Box sx={{ mr: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          တံဆိပ်သွင်းစာရင်း
        </Typography>
        <table border={1} className="table">
          <tr>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>နေ့စွဲ</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              တံဆိပ်အမျိုးအစား
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>လိပ်</th>
          </tr>
          {garage &&
            concernLabelStock.map((item) => {
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernLabels.find((l) => l.id === item.typeOfLabelId)
                        ?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>{item.bandle}</td>
                </tr>
              );
            })}
          {garage &&
            concernLabelTransferEnter.map((item) => {
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernLabels.find((l) => l.id === item.typeOfLabelId)
                        ?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>{item.bandle}</td>
                </tr>
              );
            })}
          <tr>
            <td></td>
            <td></td>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {concernLabelStock.reduce((tol, l) => {
                return (tol += l.bandle);
              }, 0) +
                concernLabelTransferEnter.reduce((tol, lt) => {
                  return (tol += lt.bandle);
                }, 0)}
            </th>
          </tr>
        </table>
      </Box>
    </>
  );
};
export default LabelDateOne;
