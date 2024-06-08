import { Box, Typography } from "@mui/material";
import {
  FilterSizeTransferGarage,
  Garage,
  TypeOfFilterSize,
} from "@prisma/client";

interface Props {
  concernFilterSizes: TypeOfFilterSize[];
  concernGarages: Garage[];
  concernFilterTransferExit: FilterSizeTransferGarage[];
  garage: number | null;
}
const FilterDateThree = ({
  concernFilterSizes,
  concernFilterTransferExit,
  concernGarages,
  garage,
}: Props) => {
  return (
    <>
      <Box sx={{ mr: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          အဆီခံဂိုထောင်ကူးပြောင်းစာရင်း
        </Typography>
        <table border={1} className="table">
          <tr>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>နေ့စွဲ</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              အဝင်ဂိုထောင်
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              အဆီခံအမျိုးအစား
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>အရေအတွက်</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>အိတ်</th>
          </tr>
          {garage &&
            concernFilterTransferExit.map((item) => {
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
                      concernFilterSizes.find(
                        (t) => t.id === item.typeOfFilterSizeId
                      )?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>{item.quantity}</td>
                  <td style={{ textAlign: "center" }}>{item.bag}</td>
                </tr>
              );
            })}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {concernFilterTransferExit.reduce((tol, tt) => {
                return (tol += tt.quantity);
              }, 0)}
            </th>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {concernFilterTransferExit.reduce((tol, tt) => {
                return (tol += tt.bag);
              }, 0)}
            </th>
          </tr>
        </table>
      </Box>
    </>
  );
};
export default FilterDateThree;
