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
                  new Date(f.date).toLocaleDateString() !==
                  endDate.toLocaleDateString()
              );

              const datum = tabaccoStocks.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                    endDate.toLocaleDateString() &&
                  f.typeOfTabaccoId === item.id &&
                  f.garageId === garage
              );
              const endDateTin =
                datum.reduce((total, tab) => {
                  return (total += tab.tin);
                }, 0) * 16;
              const endDatePyi = datum.reduce((total, tab) => {
                return (total += tab.pyi);
              }, 0);
              const endDateBag = datum.reduce((total, tab) => {
                return (total += tab.bag);
              }, 0);

              const tabaccoTin =
                dataArray.reduce((total, tab) => {
                  return (total += tab.tin);
                }, 0) *
                  16 +
                endDateTin;
              const tabaccoPyi =
                dataArray.reduce((total, tab) => {
                  return (total += tab.pyi);
                }, 0) + endDatePyi;
              const tolTabacco = tabaccoPyi + tabaccoTin;
              const tabaccoBag =
                dataArray.reduce((total, tab) => {
                  return (total += tab.bag);
                }, 0) + endDateBag;

              console.log("data1", findTabaccoData);

              //findTabaccoGarageTransfer(EnterGarage)
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
                  new Date(f.date).toLocaleDateString() !==
                  endDate.toLocaleDateString()
              );

              const datumTwo = tabaccoGarageTransfer.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                    endDate.toLocaleDateString() &&
                  f.typeOfTabaccoId === item.id &&
                  f.enterenceGarageId === garage
              );
              const endDateEnterTin =
                datumTwo.reduce((total, tab) => {
                  return (total += tab.tin);
                }, 0) * 16;
              const endDateEnterPyi = datumTwo.reduce((total, tab) => {
                return (total += tab.pyi);
              }, 0);
              const endDateEnterBag = datumTwo.reduce((total, tab) => {
                return (total += tab.bag);
              }, 0);

              const enterTabaccoTin =
                dataEnterArray.reduce((total, tab) => {
                  return (total += tab.tin);
                }, 0) *
                  16 +
                endDateEnterTin;
              const enterTabaccoPyi =
                dataEnterArray.reduce((total, tab) => {
                  return (total += tab.pyi);
                }, 0) + endDateEnterPyi;
              const tolEnterTabacco = enterTabaccoPyi + enterTabaccoTin;
              const enterTabaccoBag =
                dataEnterArray.reduce((total, tab) => {
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
                  new Date(f.date).toLocaleDateString() !==
                  endDate.toLocaleDateString()
              );

              const datumThree = tabaccoGarageTransfer.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                    endDate.toLocaleDateString() &&
                  f.typeOfTabaccoId === item.id &&
                  f.exitGarageId === garage
              );
              const endDateExitTin =
                datumThree.reduce((total, tab) => {
                  return (total += tab.tin);
                }, 0) * 16;
              const endDateExitPyi = datumThree.reduce((total, tab) => {
                return (total += tab.pyi);
              }, 0);
              const endDateExitBag = datumThree.reduce((total, tab) => {
                return (total += tab.bag);
              }, 0);

              const exitTabaccoTin =
                dataExitArray.reduce((total, tab) => {
                  return (total += tab.tin);
                }, 0) *
                  16 +
                endDateExitTin;
              const exitTabaccoPyi =
                dataExitArray.reduce((total, tab) => {
                  return (total += tab.pyi);
                }, 0) + endDateExitPyi;
              const tolExitTabacco = exitTabaccoPyi + exitTabaccoTin;
              const exitTabaccoBag =
                dataExitArray.reduce((total, tab) => {
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
                  new Date(f.date).toLocaleDateString() !==
                  endDate.toLocaleDateString()
              );

              const datumFour = payOther.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                    endDate.toLocaleDateString() &&
                  f.typeOfTabaccoId === item.id &&
                  f.garageId === garage
              );
              const endDatePayTin =
                datumFour.reduce((total, tab) => {
                  return (total += tab.tabaccoTin);
                }, 0) * 16;
              const endDatePayPyi = datumFour.reduce((total, tab) => {
                return (total += tab.tabaccoPyi);
              }, 0);
              const endDatePayBag = datumFour.reduce((total, tab) => {
                return (total += tab.tabaccoBag);
              }, 0);

              const payTabaccoTin =
                dataPayArray.reduce((total, tab) => {
                  return (total += tab.tabaccoTin);
                }, 0) *
                  16 +
                endDatePayTin;
              const payTabaccoPyi =
                dataPayArray.reduce((total, tab) => {
                  return (total += tab.tabaccoPyi);
                }, 0) + endDatePayPyi;
              const tolPayTabacco = payTabaccoPyi + payTabaccoTin;
              const payTabaccoBag =
                dataPayArray.reduce((tol, tab) => {
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
                  new Date(f.date).toLocaleDateString() !==
                  endDate.toLocaleDateString()
              );

              const datumFive = extraPurchase.filter(
                (f) =>
                  new Date(f.date).toLocaleDateString() ===
                    endDate.toLocaleDateString() &&
                  f.typeOfTabaccoId === item.id &&
                  f.garageId === garage
              );
              const endDateExtraTin =
                datumFive.reduce((total, tab) => {
                  return (total += tab.tabaccoTin);
                }, 0) * 16;
              const endDateExtraPyi = datumFive.reduce((total, tab) => {
                return (total += tab.tabaccoPyi);
              }, 0);
              const endDateExtraBag = datumFive.reduce((total, tab) => {
                return (total += tab.tabaccoBag);
              }, 0);

              const extraTabaccoTin =
                dataExtraArray.reduce((total, tab) => {
                  return (total += tab.tabaccoTin);
                }, 0) *
                  16 +
                endDateExtraTin;
              const extraTabaccoPyi =
                dataExtraArray.reduce((total, tab) => {
                  return (total += tab.tabaccoPyi);
                }, 0) + endDateExtraPyi;
              const tolExtraTabacco = extraTabaccoPyi + extraTabaccoTin;
              const extraTabaccobag =
                dataExtraArray.reduce((total, tab) => {
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
