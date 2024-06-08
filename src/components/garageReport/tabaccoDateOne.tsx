import { Box, Typography } from "@mui/material";
import { Tabacco, TabaccoTransferGarage, TypeOfTabacco } from "@prisma/client";

interface Props {
  concernTabaccoStock: Tabacco[];
  concernTabaccoTransferEnter: TabaccoTransferGarage[];
  concernTabacco: TypeOfTabacco[];
  garage: number | null;
}
const TabaccoDateOne = ({
  concernTabacco,
  concernTabaccoTransferEnter,
  concernTabaccoStock,
  garage,
}: Props) => {
  return (
    <>
      <Box sx={{ mr: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          ဆေးစပ်သွင်းစာရင်း
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
            concernTabaccoStock.map((item) => {
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
                  <td style={{ textAlign: "center" }}>{item.tin}</td>
                  <td style={{ textAlign: "center" }}>{item.pyi}</td>
                  <td style={{ textAlign: "center" }}>{item.bag}</td>
                </tr>
              );
            })}
          {garage &&
            concernTabaccoTransferEnter.map((item) => {
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
                  <td style={{ textAlign: "center" }}>{item.tin}</td>
                  <td style={{ textAlign: "center" }}>{item.pyi}</td>
                  <td style={{ textAlign: "center" }}>{item.bag}</td>
                </tr>
              );
            })}
          <tr>
            <td></td>
            <td></td>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {concernTabaccoStock.reduce((tol, t) => {
                return tol + t.tin;
              }, 0) +
                concernTabaccoTransferEnter.reduce((tol, et) => {
                  return (tol += et.tin);
                }, 0)}
            </th>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {concernTabaccoStock.reduce((tol, t) => {
                return tol + t.pyi;
              }, 0) +
                concernTabaccoTransferEnter.reduce((tol, et) => {
                  return (tol += et.pyi);
                }, 0)}
            </th>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {concernTabaccoStock.reduce((tol, t) => {
                return tol + t.bag;
              }, 0) +
                concernTabaccoTransferEnter.reduce((tol, et) => {
                  return (tol += et.bag);
                }, 0)}
            </th>
          </tr>
        </table>
      </Box>
    </>
  );
};
export default TabaccoDateOne;
