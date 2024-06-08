import { TheaterComedy } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { ExtraPurchase, PayOtherItem, TypeOfFilterSize } from "@prisma/client";
interface Props {
  concernExtraPurchase: ExtraPurchase[];
  concernPayOther: PayOtherItem[];
  concernFilterSizes: TypeOfFilterSize[];
  garage: number | null;
}
const FilterDateTwo = ({
  concernExtraPurchase,
  concernFilterSizes,
  concernPayOther,
  garage,
}: Props) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        အဆီခံပေးစာရင်း
      </Typography>
      <table border={1} className="table">
        <tr>
          <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>နေ့စွဲ</th>
          <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
            အဆီခံအမျိုးအစား
          </th>
          <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>အရေအတွက်</th>
          <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>အိတ်</th>
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
                    concernFilterSizes.find(
                      (f) => f.id === item.typeOfFilterSizeId
                    )?.name
                  }
                </td>
                <td style={{ textAlign: "center" }}>{item.filterSizeQty}</td>
                <td style={{ textAlign: "center" }}>{item.filterSizeBag}</td>
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
                    concernFilterSizes.find(
                      (f) => f.id === item.typeOfFilterSizeId
                    )?.name
                  }
                </td>
                <td style={{ textAlign: "center" }}>{item.filterSizeQty}</td>
                <td style={{ textAlign: "center" }}>{item.filterSizeBag}</td>
              </tr>
            );
          })}
        <tr>
          <th></th>
          <th></th>
          <th style={{ backgroundColor: "#FFDB5C" }}>
            {concernExtraPurchase.reduce((tol, f) => {
              return (tol += f.filterSizeQty);
            }, 0) +
              concernPayOther.reduce((tol, tf) => {
                return (tol += tf.filterSizeQty);
              }, 0)}
          </th>
          <th style={{ backgroundColor: "#FFDB5C" }}>
            {concernExtraPurchase.reduce((tol, f) => {
              return (tol += f.filterSizeBag);
            }, 0) +
              concernPayOther.reduce((tol, tf) => {
                return (tol += tf.filterSizeBag);
              }, 0)}
          </th>
        </tr>
      </table>
    </Box>
  );
};
export default FilterDateTwo;
