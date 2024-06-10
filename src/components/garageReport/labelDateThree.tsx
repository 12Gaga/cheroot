import { useAppSelector } from "@/store/hooks";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Garage, LabelTransferGarage, TypeOfLabel } from "@prisma/client";

interface Props {
  concernLabelTransferExit: LabelTransferGarage[];
  concernLabels: TypeOfLabel[];
  concernGarages: Garage[];
  garage: number | null;
  startDate: Date;
  endDate: Date;
}
const LabelDateThree = ({
  concernLabelTransferExit,
  concernLabels,
  garage,
  concernGarages,
  startDate,
  endDate,
}: Props) => {
  const labelGarageTransfer = useAppSelector(
    (store) => store.labelTransfer.item
  );
  //start date
  const exitStartExit = concernLabelTransferExit.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === startDate.toLocaleDateString()
  );
  let startExitArray: LabelTransferGarage[] = [];
  if (!exitStartExit.length) {
    startExitArray = labelGarageTransfer.filter(
      (f) =>
        new Date(f.date).toLocaleDateString() ===
          startDate.toLocaleDateString() && f.exitGarageId === garage
    );
  }
  //end date
  const exitEndExit = concernLabelTransferExit.filter(
    (f) =>
      new Date(f.date).toLocaleDateString() === endDate.toLocaleDateString()
  );
  let endExitArray: LabelTransferGarage[] = [];
  if (!exitEndExit.length) {
    endExitArray = labelGarageTransfer.filter(
      (f) =>
        new Date(f.date).toLocaleDateString() ===
          endDate.toLocaleDateString() && f.exitGarageId === garage
    );
  }
  return (
    <>
      <Box sx={{ mr: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          တံဆိပ်ဂိုထောင်ကူးပြောင်းစာရင်း
        </Typography>
        <table border={1} className="table">
          <tr>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>နေ့စွဲ</th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              အဝင်ဂိုထောင်
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              တံဆိပ်အမျိုးအစား
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>လိပ်</th>
          </tr>
          {!exitStartExit.length &&
            startExitArray.map((item) => {
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {new Date(item.date).toLocaleDateString()}
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
                      concernLabels.find((l) => l.id === item.typeOfLabelId)
                        ?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>{item.bandle}</td>
                </tr>
              );
            })}
          {garage &&
            concernLabelTransferExit.map((item) => {
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {new Date(item.date).toLocaleDateString()}
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
                      concernLabels.find((l) => l.id === item.typeOfLabelId)
                        ?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>{item.bandle}</td>
                </tr>
              );
            })}
          {!exitEndExit.length &&
            endExitArray.map((item) => {
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>
                    {new Date(item.date).toLocaleDateString()}
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
                      concernLabels.find((l) => l.id === item.typeOfLabelId)
                        ?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>{item.bandle}</td>
                </tr>
              );
            })}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <th style={{ backgroundColor: "#FFDB5C" }}>
              {startExitArray.reduce((tol, l) => {
                return (tol += l.bandle);
              }, 0) +
                concernLabelTransferExit.reduce((tol, l) => {
                  return (tol += l.bandle);
                }, 0) +
                endExitArray.reduce((tol, l) => {
                  return (tol += l.bandle);
                }, 0)}
            </th>
          </tr>
        </table>
      </Box>
    </>
  );
};
export default LabelDateThree;
