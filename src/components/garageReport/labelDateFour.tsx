import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { TypeOfLabel } from "@prisma/client";

interface Props {
  concernLabels: TypeOfLabel[];
  garage: number | null;
  endDate: Date;
}
const LabelDateFour = ({ concernLabels, garage, endDate }: Props) => {
  const labelStocks = useAppSelector((store) => store.labelStock.item);
  const labelGarageTransfer = useAppSelector(
    (store) => store.labelTransfer.item
  );
  const payOther = useAppSelector((store) => store.payStock.item);
  const extraPurchase = useAppSelector((store) => store.extraPurchase.item);
  return (
    <>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          တံဆိပ်လက်ကျန်စာရင်း
        </Typography>
        <table border={1} className="table">
          <tr>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              တံဆိပ်အမျိုးအစား
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              ကျန်ရှိလိပ်
            </th>
          </tr>
          {garage &&
            concernLabels.map((item) => {
              const findLabelData = labelStocks.filter((l) => {
                const ldate = new Date(l.date);
                return (
                  l.typeOfLabelId === item.id &&
                  l.garageId === garage &&
                  ldate.getTime() <= endDate.getTime()
                );
              });

              const dataArray = findLabelData.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                  endDate.toLocaleDateString()
              );
              let endDateBandle = 0;
              if (!dataArray.length) {
                const datum = labelStocks.filter(
                  (f) =>
                    new Date(f.date).toLocaleDateString() ===
                      endDate.toLocaleDateString() &&
                    f.typeOfLabelId === item.id &&
                    f.garageId === garage
                );
                endDateBandle = datum.reduce((total, label) => {
                  return (total += label.bandle);
                }, 0);
              }
              const labelBandle =
                findLabelData.reduce((total, label) => {
                  return (total += label.bandle);
                }, 0) + endDateBandle;

              //findLabelGarageTrnsfer(EnterGarage)
              const findEnterLabel = labelGarageTransfer.filter((el) => {
                const ldate = new Date(el.date);
                return (
                  el.typeOfLabelId === item.id &&
                  el.enterenceGarageId === garage &&
                  ldate.getTime() <= endDate.getTime()
                );
              });

              const dataEnterArray = findEnterLabel.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                  endDate.toLocaleDateString()
              );
              let endDateEnterBandle = 0;
              if (!dataEnterArray.length) {
                const datum = labelGarageTransfer.filter(
                  (f) =>
                    new Date(f.date).toLocaleDateString() ===
                      endDate.toLocaleDateString() &&
                    f.typeOfLabelId === item.id &&
                    f.enterenceGarageId === garage
                );
                endDateEnterBandle = datum.reduce((total, label) => {
                  return (total += label.bandle);
                }, 0);
              }
              const enterLabelBandle =
                findEnterLabel.reduce((total, label) => {
                  return (total += label.bandle);
                }, 0) + endDateEnterBandle;

              //findLabelGarageTransfer(ExitGarage)
              const findExitLabel = labelGarageTransfer.filter((el) => {
                const ldate = new Date(el.date);
                return (
                  el.typeOfLabelId === item.id &&
                  el.exitGarageId === garage &&
                  ldate.getTime() <= endDate.getTime()
                );
              });

              const dataExitArray = findExitLabel.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                  endDate.toLocaleDateString()
              );
              let endDateExitBandle = 0;
              if (!dataExitArray.length) {
                const datum = labelGarageTransfer.filter(
                  (f) =>
                    new Date(f.date).toLocaleDateString() ===
                      endDate.toLocaleDateString() &&
                    f.typeOfLabelId === item.id &&
                    f.exitGarageId === garage
                );
                endDateExitBandle = datum.reduce((total, label) => {
                  return (total += label.bandle);
                }, 0);
              }
              const exitLabelBandle =
                findExitLabel.reduce((total, label) => {
                  return (total += label.bandle);
                }, 0) + endDateExitBandle;

              //find from payother
              const findPayLabel = payOther.filter((el) => {
                const ldate = new Date(el.date);
                return (
                  el.typeOfLabelId === item.id &&
                  el.garageId === garage &&
                  ldate.getTime() <= endDate.getTime()
                );
              });

              const dataPayArray = findPayLabel.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                  endDate.toLocaleDateString()
              );
              let endDatePayBandle = 0;
              if (!dataPayArray.length) {
                const datum = payOther.filter(
                  (f) =>
                    new Date(f.date).toLocaleDateString() ===
                      endDate.toLocaleDateString() &&
                    f.typeOfLabelId === item.id &&
                    f.garageId === garage
                );
                endDatePayBandle = datum.reduce((total, label) => {
                  return (total += label.labelBandle);
                }, 0);
              }
              const payLabelBandle =
                findPayLabel.reduce((total, label) => {
                  return (total += label.labelBandle);
                }, 0) + endDatePayBandle;

              //find from extraPurchase
              const findExtraLabel = extraPurchase.filter((el) => {
                const ldate = new Date(el.date);
                return (
                  el.typeOfLabelId === item.id &&
                  el.garageId === garage &&
                  ldate.getTime() <= endDate.getTime()
                );
              });

              const dataExtraArray = findExtraLabel.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                  endDate.toLocaleDateString()
              );
              let endDateExtraBandle = 0;
              if (!dataExtraArray.length) {
                const datum = extraPurchase.filter(
                  (f) =>
                    new Date(f.date).toLocaleDateString() ===
                      endDate.toLocaleDateString() &&
                    f.typeOfLabelId === item.id &&
                    f.garageId === garage
                );
                endDateExtraBandle = datum.reduce((total, label) => {
                  return (total += label.labelBandle);
                }, 0);
              }
              const extraLabelBandle =
                findExtraLabel.reduce((total, label) => {
                  return (total += label.labelBandle);
                }, 0) + endDateExtraBandle;

              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center", height: 30 }}>
                    {item.name}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {labelBandle +
                      enterLabelBandle -
                      (exitLabelBandle + payLabelBandle + extraLabelBandle)}
                  </td>
                </tr>
              );
            })}
        </table>
      </Box>
    </>
  );
};
export default LabelDateFour;
