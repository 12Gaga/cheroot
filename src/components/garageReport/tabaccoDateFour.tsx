import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { TypeOfTabacco } from "@prisma/client";
interface Props {
  garage: number | null;
  concernTabacco: TypeOfTabacco[];
  endDate: Date;
}
const TabaccoDateFour = ({ garage, concernTabacco, endDate }: Props) => {
  const tabaccoStocks = useAppSelector((store) => store.tabaccoStock.item);
  const tabaccoGarageTransfer = useAppSelector(
    (store) => store.tabaccoTransfer.item
  );
  const payOther = useAppSelector((store) => store.payStock.item);
  const extraPurchase = useAppSelector((store) => store.extraPurchase.item);
  return (
    <>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          ဆေးစပ်လက်ကျန်စာရင်း
        </Typography>
        <table border={1} className="table">
          <tr>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              ဆေးစပ်အမျိုးအစား
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              ကျန်ရှိတင်း
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              ကျန်ရှိပြည်
            </th>
            <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
              ကျန်ရှိအိတ်
            </th>
          </tr>

          {garage &&
            concernTabacco.map((item) => {
              const findTabaccoData = tabaccoStocks.filter((t) => {
                const tdate = new Date(t.date);
                return (
                  t.typeOfTabaccoId === item.id &&
                  t.garageId === garage &&
                  tdate.getTime() <= endDate.getTime()
                );
              });

              const dataArray = findTabaccoData.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                  endDate.toLocaleDateString()
              );
              let endDateTin = 0;
              let endDatePyi = 0;
              let endDateBag = 0;
              if (!dataArray.length) {
                const datum = tabaccoStocks.filter(
                  (f) =>
                    new Date(f.date).toLocaleDateString() ===
                      endDate.toLocaleDateString() &&
                    f.typeOfTabaccoId === item.id &&
                    f.garageId === garage
                );
                endDateTin =
                  datum.reduce((total, tab) => {
                    return (total += tab.tin);
                  }, 0) * 16;
                endDatePyi = datum.reduce((total, tab) => {
                  return (total += tab.pyi);
                }, 0);
                endDateBag = datum.reduce((total, tab) => {
                  return (total += tab.bag);
                }, 0);
              }

              const tabaccoTin =
                findTabaccoData.reduce((total, tab) => {
                  return (total += tab.tin);
                }, 0) *
                  16 +
                endDateTin;
              const tabaccoPyi =
                findTabaccoData.reduce((total, tab) => {
                  return (total += tab.pyi);
                }, 0) + endDatePyi;
              const tolTabacco = tabaccoPyi + tabaccoTin;
              const tabaccoBag =
                findTabaccoData.reduce((total, tab) => {
                  return (total += tab.bag);
                }, 0) + endDateBag;

              console.log("data1", findTabaccoData);

              //findTabaccoGarageTrnsfer(EnterGarage)
              const findEnterTabacco = tabaccoGarageTransfer.filter((et) => {
                const tdate = new Date(et.date);
                return (
                  et.typeOfTabaccoId === item.id &&
                  et.enterenceGarageId === garage &&
                  tdate.getTime() <= endDate.getTime()
                );
              });

              const dataEnterArray = findEnterTabacco.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                  endDate.toLocaleDateString()
              );
              let endDateEnterTin = 0;
              let endDateEnterPyi = 0;
              let endDateEnterBag = 0;
              if (!dataEnterArray.length) {
                const datum = tabaccoGarageTransfer.filter(
                  (f) =>
                    new Date(f.date).toLocaleDateString() ===
                      endDate.toLocaleDateString() &&
                    f.typeOfTabaccoId === item.id &&
                    f.enterenceGarageId === garage
                );
                endDateEnterTin =
                  datum.reduce((total, tab) => {
                    return (total += tab.tin);
                  }, 0) * 16;
                endDateEnterPyi = datum.reduce((total, tab) => {
                  return (total += tab.pyi);
                }, 0);
                endDateEnterBag = datum.reduce((total, tab) => {
                  return (total += tab.bag);
                }, 0);
              }

              const enterTabaccoTin =
                findEnterTabacco.reduce((total, tab) => {
                  return (total += tab.tin);
                }, 0) *
                  16 +
                endDateEnterTin;
              const enterTabaccoPyi =
                findEnterTabacco.reduce((total, tab) => {
                  return (total += tab.pyi);
                }, 0) + endDateEnterPyi;
              const tolEnterTabacco = enterTabaccoPyi + enterTabaccoTin;
              const enterTabaccoBag =
                findEnterTabacco.reduce((total, tab) => {
                  return (total += tab.bag);
                }, 0) + endDateEnterBag;

              console.log("enterData", findEnterTabacco);

              //findTabaccoGarageTrnsfer(ExitGarage)
              const findExitTabacco = tabaccoGarageTransfer.filter((et) => {
                const tdate = new Date(et.date);
                return (
                  et.typeOfTabaccoId === item.id &&
                  et.exitGarageId === garage &&
                  tdate.getTime() <= endDate.getTime()
                );
              });

              const dataExitArray = findExitTabacco.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                  endDate.toLocaleDateString()
              );
              let endDateExitTin = 0;
              let endDateExitPyi = 0;
              let endDateExitBag = 0;
              if (!dataExitArray.length) {
                const datum = tabaccoGarageTransfer.filter(
                  (f) =>
                    new Date(f.date).toLocaleDateString() ===
                      endDate.toLocaleDateString() &&
                    f.typeOfTabaccoId === item.id &&
                    f.exitGarageId === garage
                );
                endDateExitTin =
                  datum.reduce((total, tab) => {
                    return (total += tab.tin);
                  }, 0) * 16;
                endDateExitPyi = datum.reduce((total, tab) => {
                  return (total += tab.pyi);
                }, 0);
                endDateExitBag = datum.reduce((total, tab) => {
                  return (total += tab.bag);
                }, 0);
              }
              const exitTabaccoTin =
                findExitTabacco.reduce((total, tab) => {
                  return (total += tab.tin);
                }, 0) *
                  16 +
                endDateExitTin;
              const exitTabaccoPyi =
                findExitTabacco.reduce((total, tab) => {
                  return (total += tab.pyi);
                }, 0) + endDateExitPyi;
              const tolExitTabacco = exitTabaccoPyi + exitTabaccoTin;
              const exitTabaccoBag =
                findExitTabacco.reduce((total, tab) => {
                  return (total += tab.bag);
                }, 0) + endDateExitBag;

              console.log("exitData", findExitTabacco);

              //find from payother
              const findPayTabacco = payOther.filter((et) => {
                return (
                  et.typeOfTabaccoId === item.id &&
                  et.garageId === garage &&
                  new Date(et.date).getTime() <= endDate.getTime()
                );
              });

              const dataPayArray = findPayTabacco.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                  endDate.toLocaleDateString()
              );
              let endDatePayTin = 0;
              let endDatePayPyi = 0;
              let endDatePayBag = 0;
              if (!dataPayArray.length) {
                const datum = payOther.filter(
                  (f) =>
                    new Date(f.date).toLocaleDateString() ===
                      endDate.toLocaleDateString() &&
                    f.typeOfTabaccoId === item.id &&
                    f.garageId === garage
                );
                endDatePayTin =
                  datum.reduce((total, tab) => {
                    return (total += tab.tabaccoTin);
                  }, 0) * 16;
                endDatePayPyi = datum.reduce((total, tab) => {
                  return (total += tab.tabaccoPyi);
                }, 0);
                endDatePayBag = datum.reduce((total, tab) => {
                  return (total += tab.tabaccoBag);
                }, 0);
              }

              const payTabaccoTin =
                findPayTabacco.reduce((total, tab) => {
                  return (total += tab.tabaccoTin);
                }, 0) *
                  16 +
                endDatePayTin;
              const payTabaccoPyi =
                findPayTabacco.reduce((total, tab) => {
                  return (total += tab.tabaccoPyi);
                }, 0) + endDatePayPyi;
              const tolPayTabacco = payTabaccoPyi + payTabaccoTin;
              const payTabaccoBag =
                findPayTabacco.reduce((tol, tab) => {
                  return (tol += tab.tabaccoBag);
                }, 0) + endDatePayBag;

              console.log("pay", findPayTabacco);

              //find from extraPurchase
              const findExtraTabacco = extraPurchase.filter((et) => {
                const tdate = new Date(et.date);
                return (
                  et.typeOfTabaccoId === item.id &&
                  et.garageId === garage &&
                  tdate.getTime() <= endDate.getTime()
                );
              });

              const dataExtraArray = findExtraTabacco.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                  endDate.toLocaleDateString()
              );
              let endDateExtraTin = 0;
              let endDateExtraPyi = 0;
              let endDateExtraBag = 0;
              if (!dataExtraArray.length) {
                const datum = extraPurchase.filter(
                  (f) =>
                    new Date(f.date).toLocaleDateString() ===
                      endDate.toLocaleDateString() &&
                    f.typeOfTabaccoId === item.id &&
                    f.garageId === garage
                );
                endDateExtraTin =
                  datum.reduce((total, tab) => {
                    return (total += tab.tabaccoTin);
                  }, 0) * 16;
                endDateExtraPyi = datum.reduce((total, tab) => {
                  return (total += tab.tabaccoPyi);
                }, 0);
                endDateExtraBag = datum.reduce((total, tab) => {
                  return (total += tab.tabaccoBag);
                }, 0);
              }

              const extraTabaccoTin =
                findExtraTabacco.reduce((total, tab) => {
                  return (total += tab.tabaccoTin);
                }, 0) *
                  16 +
                endDateExtraTin;
              const extraTabaccoPyi =
                findExtraTabacco.reduce((total, tab) => {
                  return (total += tab.tabaccoPyi);
                }, 0) + endDateExtraPyi;
              const tolExtraTabacco = extraTabaccoPyi + extraTabaccoTin;
              const extraTabaccobag =
                findExtraTabacco.reduce((total, tab) => {
                  return (total += tab.tabaccoBag);
                }, 0) + endDateExtraBag;

              const quantity =
                tolTabacco +
                tolEnterTabacco -
                (tolExitTabacco + tolPayTabacco + tolExtraTabacco);
              const tolTin = Math.floor(quantity / 16);
              const tolPyi = Math.floor(quantity % 16);
              console.log("extra", findExtraTabacco);
              return (
                <tr key={item.id}>
                  <td style={{ textAlign: "center", height: 30 }}>
                    {item.name}
                  </td>
                  <td style={{ textAlign: "center" }}>{tolTin}</td>
                  <td style={{ textAlign: "center" }}>{tolPyi}</td>
                  <td style={{ textAlign: "center" }}>
                    {tabaccoBag +
                      enterTabaccoBag -
                      (exitTabaccoBag + payTabaccoBag + extraTabaccobag)}
                  </td>
                </tr>
              );
            })}
        </table>
      </Box>
    </>
  );
};

export default TabaccoDateFour;
