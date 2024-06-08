import { Box, Typography } from "@mui/material";
import { Plastic, TypeOfPlastic } from "@prisma/client";

interface Props {
  concernPlasticStock: Plastic[];
  concernPlastic: TypeOfPlastic[];
  garage: number | null;
}
const PlasticDateOne = ({
  concernPlastic,
  concernPlasticStock,
  garage,
}: Props) => {
  return (
    <>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          ပလပ်စတစ်သွင်းစာရင်း
        </Typography>
        <table border={1} className="table">
          <tr>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>နေ့စွဲ</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              ပလပ်စတစ်အမျိုးအစား
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>အိတ်</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>အရေအတွက်</th>
          </tr>
          {garage &&
            concernPlasticStock.map((item) => {
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {concernPlastic.find((l) => l.id === item.plasticId)?.name}
                  </td>
                  <td style={{ textAlign: "center" }}>{item.bag}</td>
                  <td style={{ textAlign: "center" }}>{item.quantity}</td>
                </tr>
              );
            })}
          <tr>
            <td></td>
            <td></td>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {concernPlasticStock.reduce((tol, l) => {
                return (tol += l.bag);
              }, 0)}
            </th>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {concernPlasticStock.reduce((tol, l) => {
                return (tol += l.quantity);
              }, 0)}
            </th>
          </tr>
        </table>
      </Box>
    </>
  );
};
export default PlasticDateOne;
