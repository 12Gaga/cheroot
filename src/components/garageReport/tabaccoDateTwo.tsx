import { Box, Typography } from "@mui/material";
import { ExtraPurchase, PayOtherItem, TypeOfTabacco } from "@prisma/client";

interface Props {
  concernExtraPurchase: ExtraPurchase[];
  concernPayOther: PayOtherItem[];
  concernTabacco: TypeOfTabacco[];
  garage: number | null;
}
const TabaccoDateTwo = ({
  concernExtraPurchase,
  concernPayOther,
  concernTabacco,
  garage,
}: Props) => {
  return (
    <>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          ဆေးစပ်ပေးစာရင်း
        </Typography>
        <table border={1} className="table">
          <tr>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>နေ့စွဲ</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              ဆေးစပ်အမျိုးအစား
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>တင်း</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>ပြည်</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>အိတ်</th>
          </tr>
          {garage &&
            concernPayOther.map((item) => {
              const itemdate = new Date(item.date);
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernTabacco.find((t) => t.id === item.typeOfTabaccoId)
                        ?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>{item.tabaccoTin}</td>
                  <td style={{ textAlign: "center" }}>{item.tabaccoPyi}</td>
                  <td style={{ textAlign: "center" }}>{item.tabaccoBag}</td>
                </tr>
              );
            })}
          {garage &&
            concernExtraPurchase.map((item) => {
              const itemdate = new Date(item.date);
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernTabacco.find((t) => t.id === item.typeOfTabaccoId)
                        ?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>{item.tabaccoTin}</td>
                  <td style={{ textAlign: "center" }}>{item.tabaccoPyi}</td>
                  <td style={{ textAlign: "center" }}>{item.tabaccoBag}</td>
                </tr>
              );
            })}
          <tr>
            <td></td>
            <td></td>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {concernPayOther.reduce((tol, rt) => {
                return (tol += rt.tabaccoTin);
              }, 0) +
                concernExtraPurchase.reduce((tol, et) => {
                  return (tol += et.tabaccoTin);
                }, 0)}
            </th>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {concernPayOther.reduce((tol, rt) => {
                return (tol += rt.tabaccoPyi);
              }, 0) +
                concernExtraPurchase.reduce((tol, et) => {
                  return (tol += et.tabaccoPyi);
                }, 0)}
            </th>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {concernPayOther.reduce((tol, rt) => {
                return (tol += rt.tabaccoBag);
              }, 0) +
                concernExtraPurchase.reduce((tol, et) => {
                  return (tol += et.tabaccoBag);
                }, 0)}
            </th>
          </tr>
        </table>
      </Box>
    </>
  );
};
export default TabaccoDateTwo;
