import { useAppSelector } from "@/store/hooks";
import { TheaterComedy } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { ExtraPurchase, PayOtherItem, TypeOfFilterSize } from "@prisma/client";
interface Props {
  concernExtraPurchase: ExtraPurchase[];
  concernPayOther: PayOtherItem[];
  concernFilterSizes: TypeOfFilterSize[];
  garage: number | null;
  startDate: Date;
  endDate: Date;
}
const FilterDateTwo = ({
  concernExtraPurchase,
  concernFilterSizes,
  concernPayOther,
  garage,
  startDate,
  endDate,
}: Props) => {
  const payOther = useAppSelector((store) => store.payStock.item);
  const extraPurchase = useAppSelector((store) => store.extraPurchase.item);

  const concernPay = concernPayOther.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() !==
        startDate.toLocaleDateString() &&
      new Date(f.date).toLocaleDateString() !== endDate.toLocaleDateString()
  );
  const concernExtra = concernExtraPurchase.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() !==
        startDate.toLocaleDateString() &&
      new Date(f.date).toLocaleDateString() !== endDate.toLocaleDateString()
  );
  //start date
  const startPayArray = payOther.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() ===
        startDate.toLocaleDateString() && f.garageId === garage
  );

  const startExtraArray = extraPurchase.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() ===
        startDate.toLocaleDateString() && f.garageId === garage
  );
  //end date
  const endPayArray = payOther.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === endDate.toLocaleDateString() &&
      f.garageId === garage
  );

  const endExtraArray = extraPurchase.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === endDate.toLocaleDateString() &&
      f.garageId === garage
  );

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

        {startPayArray.map((item) => {
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
        {startExtraArray.map((item) => {
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
          concernPay.map((item) => {
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
          concernExtra.map((item) => {
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

        {endPayArray.map((item) => {
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
        {endExtraArray.map((item) => {
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
            {startExtraArray.reduce((tol, f) => {
              return (tol += f.filterSizeQty);
            }, 0) +
              startPayArray.reduce((tol, tf) => {
                return (tol += tf.filterSizeQty);
              }, 0) +
              concernExtra.reduce((tol, f) => {
                return (tol += f.filterSizeQty);
              }, 0) +
              concernPay.reduce((tol, tf) => {
                return (tol += tf.filterSizeQty);
              }, 0) +
              endExtraArray.reduce((tol, f) => {
                return (tol += f.filterSizeQty);
              }, 0) +
              endPayArray.reduce((tol, tf) => {
                return (tol += tf.filterSizeQty);
              }, 0)}
          </th>
          <th style={{ backgroundColor: "#FFDB5C" }}>
            {startExtraArray.reduce((tol, f) => {
              return (tol += f.filterSizeBag);
            }, 0) +
              startPayArray.reduce((tol, tf) => {
                return (tol += tf.filterSizeBag);
              }, 0) +
              concernExtra.reduce((tol, f) => {
                return (tol += f.filterSizeBag);
              }, 0) +
              concernPay.reduce((tol, tf) => {
                return (tol += tf.filterSizeBag);
              }, 0) +
              endExtraArray.reduce((tol, f) => {
                return (tol += f.filterSizeBag);
              }, 0) +
              endPayArray.reduce((tol, tf) => {
                return (tol += tf.filterSizeBag);
              }, 0)}
          </th>
        </tr>
      </table>
    </Box>
  );
};
export default FilterDateTwo;
