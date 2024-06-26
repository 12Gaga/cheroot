import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { Packing, TypeOfPlastic } from "@prisma/client";

interface Props {
  concernPacking: Packing[];
  concernPlastic: TypeOfPlastic[];
  garage: number | null;
  startDate: Date;
  endDate: Date;
}
const PlasticDateTwo = ({
  concernPacking,
  concernPlastic,
  garage,
  startDate,
  endDate,
}: Props) => {
  const packing = useAppSelector((store) => store.packingData.item);

  const concernData = concernPacking.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() !==
        startDate.toLocaleDateString() &&
      new Date(f.date).toLocaleDateString() !== endDate.toLocaleDateString()
  );
  //start date
  const startArray = packing.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() ===
        startDate.toLocaleDateString() && f.garageId === garage
  );

  //end date
  const endArray = packing.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === endDate.toLocaleDateString() &&
      f.garageId === garage
  );

  return (
    <>
      <Box sx={{ ml: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          ပလပ်စတစ်ကုန်စာရင်း
        </Typography>
        <table border={1} className="table">
          <tr>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>နေ့စွဲ</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              ပါကင်ပလပ်စတစ်
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              ပါကင်ပလပ်စတစ်အရေအတွက်
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              ထုပ်ပိုးပလပ်စတစ်
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              ထုပ်ပိုးပလပ်စတစ်အရေအတွက်
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              ကာဗာပလပ်စတစ်
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              ကာဗာပလပ်စတစ်အရေအတွက်
            </th>
          </tr>

          {startArray.map((item) => {
            return (
              <tr key={item.id}>
                <td style={{ textAlign: "center" }}>
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>
                  {
                    concernPlastic.find((l) => l.id === item.packingPlasticId)
                      ?.name
                  }
                </td>
                <td style={{ textAlign: "center" }}>
                  {item.packingPlasticQty}
                </td>
                <td style={{ textAlign: "center" }}>
                  {
                    concernPlastic.find((l) => l.id === item.warpingPlasticId)
                      ?.name
                  }
                </td>
                <td style={{ textAlign: "center" }}>
                  {item.warpingPlasticQty}
                </td>
                <td style={{ textAlign: "center" }}>
                  {
                    concernPlastic.find((l) => l.id === item.coverPlasticId)
                      ?.name
                  }
                </td>
                <td style={{ textAlign: "center" }}>{item.coverPlasticQty}</td>
              </tr>
            );
          })}

          {garage &&
            concernData.map((item) => {
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernPlastic.find((l) => l.id === item.packingPlasticId)
                        ?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {item.packingPlasticQty}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernPlastic.find((l) => l.id === item.warpingPlasticId)
                        ?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {item.warpingPlasticQty}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      concernPlastic.find((l) => l.id === item.coverPlasticId)
                        ?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {item.coverPlasticQty}
                  </td>
                </tr>
              );
            })}

          {endArray.map((item) => {
            return (
              <tr key={item.id}>
                <td style={{ textAlign: "center" }}>
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>
                  {
                    concernPlastic.find((l) => l.id === item.packingPlasticId)
                      ?.name
                  }
                </td>
                <td style={{ textAlign: "center" }}>
                  {item.packingPlasticQty}
                </td>
                <td style={{ textAlign: "center" }}>
                  {
                    concernPlastic.find((l) => l.id === item.warpingPlasticId)
                      ?.name
                  }
                </td>
                <td style={{ textAlign: "center" }}>
                  {item.warpingPlasticQty}
                </td>
                <td style={{ textAlign: "center" }}>
                  {
                    concernPlastic.find((l) => l.id === item.coverPlasticId)
                      ?.name
                  }
                </td>
                <td style={{ textAlign: "center" }}>{item.coverPlasticQty}</td>
              </tr>
            );
          })}

          {/* <tr>
            <td></td>
            <td></td>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {concernPacking.reduce((tol, l) => {
                return (tol += l.quantity);
              }, 0)}
            </th>
          </tr> */}
        </table>
      </Box>
    </>
  );
};
export default PlasticDateTwo;
