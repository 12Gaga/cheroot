import { Box, Typography } from "@mui/material";
import { ExtraPurchase, PayOtherItem, TypeOfLabel } from "@prisma/client";

interface Props {
  concernExtraPurchase: ExtraPurchase[];
  concernPayOther: PayOtherItem[];
  concernLabels: TypeOfLabel[];
  garage: number | null;
}
const LabelDateTwo = ({
  concernExtraPurchase,
  concernLabels,
  concernPayOther,
  garage,
}: Props) => {
  return (
    <>
      <Box>
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
            concernPayOther.map((item) => {
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
                  <td style={{ textAlign: "center" }}>{item.labelBandle}</td>
                </tr>
              );
            })}
          {garage &&
            concernExtraPurchase.map((item) => {
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
                  <td style={{ textAlign: "center" }}>{item.labelBandle}</td>
                </tr>
              );
            })}
          <tr>
            <td></td>
            <td></td>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {concernPayOther.reduce((tol, l) => {
                return (tol += l.labelBandle);
              }, 0) +
                concernExtraPurchase.reduce((tol, lt) => {
                  return (tol += lt.labelBandle);
                }, 0)}
            </th>
          </tr>
        </table>
      </Box>
    </>
  );
};
export default LabelDateTwo;
