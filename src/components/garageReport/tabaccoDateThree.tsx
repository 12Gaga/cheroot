import { Box, Typography } from "@mui/material";
import { Garage, TabaccoTransferGarage, TypeOfTabacco } from "@prisma/client";

interface Props {
  concernTabaccoTransferExit: TabaccoTransferGarage[];
  concernTabacco: TypeOfTabacco[];
  concernGarages: Garage[];
  garage: number | null;
}
const TabaccoDateThree = ({
  concernGarages,
  concernTabacco,
  concernTabaccoTransferExit,
  garage,
}: Props) => {
  return (
    <>
      <Box sx={{ mr: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          ဆေးစပ်ဂိုထောင်ကူးပြောင်းစာရင်း
        </Typography>
        <table border={1} className="table">
          <tr>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>နေ့စွဲ</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              အဝင်ဂိုထောင်
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              ဆေးစပ်အမျိုးအစား
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>တင်း</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>ပြည်</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>အိတ်</th>
          </tr>
          {garage &&
            concernTabaccoTransferExit.map((item) => {
              const itemdate = new Date(item.date);
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernGarages.find(
                        (g) => g.id === item.enterenceGarageId
                      )?.name
                    }
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
            <td></td>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {concernTabaccoTransferExit.reduce((tol, tt) => {
                return (tol += tt.tin);
              }, 0)}
            </th>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {concernTabaccoTransferExit.reduce((tol, tt) => {
                return (tol += tt.pyi);
              }, 0)}
            </th>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {concernTabaccoTransferExit.reduce((tol, tt) => {
                return (tol += tt.bag);
              }, 0)}
            </th>
          </tr>
        </table>
      </Box>
    </>
  );
};
export default TabaccoDateThree;
