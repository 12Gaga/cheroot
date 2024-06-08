import { Box, Typography } from "@mui/material";
import {
  FilterSize,
  FilterSizeTransferGarage,
  TypeOfFilterSize,
} from "@prisma/client";

interface Props {
  concernFilterSizeStock: FilterSize[];
  concernFilterTransferEnter: FilterSizeTransferGarage[];
  concernFilterSizes: TypeOfFilterSize[];
  garage: number | null;
}
const FilterDateOne = ({
  concernFilterSizeStock,
  concernFilterSizes,
  concernFilterTransferEnter,
  garage,
}: Props) => {
  return (
    <>
      <Box sx={{ mr: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          အဆီခံသွင်းစာရင်း
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
            concernFilterSizeStock.map((item) => {
              const itemdate = new Date(item.date);
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernFilterSizes.find(
                        (f) => f.id === item.typeOfFilterSizeId
                      )?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>{item.quantity}</td>
                  <td style={{ textAlign: "center" }}>{item.bag}</td>
                </tr>
              );
            })}
          {garage &&
            concernFilterTransferEnter.map((item) => {
              const itemdate = new Date(item.date);
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernFilterSizes.find(
                        (f) => f.id === item.typeOfFilterSizeId
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
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {concernFilterSizeStock.reduce((tol, f) => {
                return (tol += f.quantity);
              }, 0) +
                concernFilterTransferEnter.reduce((tol, tf) => {
                  return (tol += tf.quantity);
                }, 0)}
            </th>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {concernFilterSizeStock.reduce((tol, f) => {
                return (tol += f.bag);
              }, 0) +
                concernFilterTransferEnter.reduce((tol, tf) => {
                  return (tol += tf.bag);
                }, 0)}
            </th>
          </tr>
        </table>
      </Box>
    </>
  );
};
export default FilterDateOne;
