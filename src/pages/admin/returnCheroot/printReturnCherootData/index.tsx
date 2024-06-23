import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { fetchApp } from "@/store/slices/app";
const Printing = () => {
  const tableRef = useRef(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const seq = router.query.seq as string;
  const deductSeq = router.query.deductSeq as string;
  console.log("seq", seq);
  console.log("deductSeq", deductSeq);
  const agentId = Number(router.query.agentId);
  const returnCheroot = useAppSelector((store) => store.returnCheroot.item);
  const concernReturnCheroot = returnCheroot.filter((item) => {
    const itemdate = new Date(item.date);
    return item.agentId === agentId && item.seq === seq;
  });
  const leafDeduction = useAppSelector((store) => store.leafDeduction.item);
  const concernLeafDeduction = leafDeduction.filter((item) => {
    const itemdate = new Date(item.date);
    return item.agentId === agentId && item.seq === seq;
  });
  const otherDeduction = useAppSelector((store) => store.otherDeduction.item);
  const concernOtherDeduction = otherDeduction.find((item) => {
    const itemdate = new Date(item.date);
    return item.agentId === agentId && item.seq === seq;
  });
  const extraPurchase = useAppSelector((store) => store.extraPurchase.item);
  const concernextraPurchase = extraPurchase.find((item) => {
    const itemdate = new Date(item.date);
    return item.agentId === agentId && item.purchaseSeq === deductSeq;
  });
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const agent = useAppSelector((store) => store.agent.item);
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const concernLeave = leaves.filter((l) => l.workShopId === workShopId);
  const cheroot = useAppSelector((store) => store.typeOfCheroot.item);
  const tabacco = useAppSelector((store) => store.typeOfTabacco.item);
  const filterSize = useAppSelector((store) => store.typeOfFilterSize.item);
  const label = useAppSelector((store) => store.typeOfLabel.item);
  const agentRemainLeaf = useAppSelector((store) => store.agentReaminLeaf.item);
  const remainBalance = useAppSelector(
    (store) => store.agentReaminCash.item
  ).filter((item) => item.agentId === agentId);
  const remainLeaf = agentRemainLeaf.filter((leaf) => leaf.agentId === agentId);
  const handlePrint = () => {
    if (tableRef.current) {
      window.print();
    }
  };
  console.log("consern", concernextraPurchase);

  useEffect(() => {
    dispatch(fetchApp({}));
  }, []);

  if (!seq || !agentId) return null;
  return (
    <>
      <Box
        ref={tableRef}
        sx={{
          width: "47%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ backgroundColor: "#ACD793" }}>
          <Typography
            sx={{ textAlign: "center", fontWeight: "bold" }}
            variant="h6"
          >
            ရွှေဘို ဒေါ်မ ဆေးလိပ်လုပ်ငန်း
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src="/cigaretteLogo.png"
              alt={"Logo"}
              width={60}
              height={30}
              style={{ borderRadius: "20%", border: "3px solid white" }}
            />
            <Box>
              <Typography sx={{ fontSize: "20", fontWeight: "bold" }}>
                09-509 5352 , 09-79 80 87001 , 09-759 155 173
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>
              ကိုယ်စားလှယ်အမည် - {agent.find((a) => a.id === agentId)?.name} (
              {agent.find((a) => a.id === agentId)?.adderess})
            </Typography>
          </Box>
          <Box>
            <Typography>
              ရက်စွဲ -
              {new Date(concernReturnCheroot[0].date).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        <table border={1} className="table">
          <thead>
            <tr>
              <th></th>
              <th style={{ backgroundColor: "#FEAE6F" }}>အချော</th>
              <th style={{ backgroundColor: "#FEAE6F" }}>အကျ</th>
              <th style={{ backgroundColor: "#FEAE6F" }}>စုစုပေါင်း</th>
              <th style={{ backgroundColor: "#FEAE6F", width: 100 }}>
                အချောနှုန်း
              </th>
              <th style={{ backgroundColor: "#FEAE6F" }}></th>
              <th style={{ backgroundColor: "#FEAE6F", width: 130 }}>
                သင့်ငွေ
              </th>
            </tr>
          </thead>

          {concernReturnCheroot.map((item) => {
            return (
              <thead key={item.id}>
                <tr>
                  <td
                    style={{ backgroundColor: "#ACD793", textAlign: "center" }}
                  >
                    {cheroot.find((c) => c.id === item.typeOfCherootId)?.name}
                  </td>
                  <td style={{ textAlign: "center" }}>{item.goodQty}</td>
                  <td style={{ textAlign: "center" }}>{item.damage}</td>
                  <td style={{ textAlign: "center" }}>
                    {item.totalCherootQty}
                  </td>
                  <td style={{ textAlign: "center" }}>{item.goodPrice}</td>
                  <th>=</th>
                  <th>{item.amount}</th>
                </tr>
              </thead>
            );
          })}

          <tr>
            <th style={{ backgroundColor: "#F6FAB9" }}>စုစုပေါင်း</th>
            <th style={{ backgroundColor: "#F6FAB9" }}>
              {concernReturnCheroot.reduce((total, goodcheroot) => {
                return (total += goodcheroot.goodQty);
              }, 0)}
            </th>
            <th style={{ backgroundColor: "#F6FAB9" }}>
              {concernReturnCheroot.reduce((total, damageCheroot) => {
                return (total += damageCheroot.damage);
              }, 0)}
            </th>
            <th style={{ backgroundColor: "#F6FAB9" }}>
              {concernReturnCheroot.reduce((total, totalCheroot) => {
                return (total += totalCheroot.totalCherootQty);
              }, 0)}
            </th>
            <th style={{ backgroundColor: "#F6FAB9" }}></th>
            <th style={{ backgroundColor: "#F6FAB9" }}>=</th>
            <th style={{ backgroundColor: "#F6FAB9" }}>
              {concernReturnCheroot.reduce((total, tolAmount) => {
                return (total += tolAmount.amount);
              }, 0)}
            </th>
          </tr>
          {/* leafDeduction */}
          <tr>
            <th style={{ color: "red" }}>ဖက်ဖိုးခုနှိမ်ခြင်း</th>
            <th>အမျိုးအစား</th>
            <th>ပိဿာ</th>
            <th>ဈေးနှုန်း</th>
            <th>သင့်ငွေ</th>
            <th></th>
            <th></th>
          </tr>

          {concernLeafDeduction.map((item) => {
            return (
              <thead key={item.id}>
                <tr>
                  <td></td>
                  <td style={{ textAlign: "center" }}>
                    {leaves.find((l) => l.id === item.typeOfLeafId)?.name}
                  </td>
                  <td style={{ textAlign: "center" }}>{item.deductViss}</td>
                  <td style={{ textAlign: "center" }}>{item.price}</td>
                  <td style={{ textAlign: "center" }}>
                    {item.deductionAmount}
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              </thead>
            );
          })}

          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <th>
              {concernLeafDeduction.reduce((total, leafDeduct) => {
                return (total += leafDeduct.deductionAmount);
              }, 0)}
            </th>
          </tr>

          <tr>
            <td colSpan={2}>ကြိုယူခုနှိမ် (အသေး)</td>
            <td></td>
            <td></td>
            <td style={{ textAlign: "center" }}>
              {concernOtherDeduction?.cashAdvanceSmallDeduction}
            </td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td colSpan={2}>ကြိုယူခုနှိမ် (အကြီး)</td>
            <td></td>
            <td></td>
            <td style={{ textAlign: "center" }}>
              {concernOtherDeduction?.cashAdvanceBigDeduction}
            </td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <th style={{ color: "red" }}>အခြားခုနှိမ်ခြင်း</th>
            {concernextraPurchase && (
              <>
                <th>
                  {
                    tabacco.find(
                      (t) => t.id === concernextraPurchase?.typeOfTabaccoId
                    )?.name
                  }
                </th>
                <th>
                  {
                    filterSize.find(
                      (t) => t.id === concernextraPurchase?.typeOfFilterSizeId
                    )?.name
                  }
                </th>
                <th>
                  {
                    label.find(
                      (t) => t.id === concernextraPurchase?.typeOfLabelId
                    )?.name
                  }
                </th>
              </>
            )}
          </tr>

          {concernextraPurchase && (
            <>
              <tr>
                <th>သင့်ငွေ</th>
                <td style={{ textAlign: "center" }}>
                  {concernextraPurchase?.tabaccoAmount}
                </td>
                <td style={{ textAlign: "center" }}>
                  {concernextraPurchase?.filterSizeAmount}
                </td>
                <td style={{ textAlign: "center" }}>
                  {concernextraPurchase?.labelAmount}
                </td>
                <td></td>
                <td></td>
                <th>{concernextraPurchase?.totalAmount}</th>
              </tr>
            </>
          )}

          <tr>
            <th>ကြိုယူငွေ (အကြီး)</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <th>{concernOtherDeduction?.cashAdvanceBig}</th>
          </tr>

          <tr>
            <th>ကြိုယူငွေ (အသေး)</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <th>{concernOtherDeduction?.cashAdvanceSmall}</th>
          </tr>

          <tr>
            <th></th>
            <td></td>
            <td></td>
            <th colSpan={2}>ကိုယ်စားလှယ်ရှင်းငွေ</th>
            <td></td>
            <th>{concernOtherDeduction?.netAgentPayment}</th>
          </tr>

          <tr>
            <th>ကြိုတင်ငွေလက်ကျန် (အကြီး) </th>
            <th style={{ color: "green" }}>
              {remainBalance.length &&
                remainBalance[remainBalance.length - 1].remainCashBig}
            </th>
            <td></td>
            <th colSpan={2}>ကိုယ်စားလှယ်ဘောက်ဆူးပေးငွေ</th>
            <td></td>
            <th>{concernOtherDeduction?.bonusPayment}</th>
          </tr>

          <tr>
            <th>ကြိုတင်ငွေလက်ကျန် (အသေး) </th>
            <th style={{ color: "green" }}>
              {remainBalance.length &&
                remainBalance[remainBalance.length - 1].remainCashSmall}
            </th>
            <td></td>
            <th colSpan={2}>စုစုပေါင်းကိုယ်စားလှယ်ရှင်းငွေ</th>
            <td></td>
            <th style={{ backgroundColor: "#E6FF94" }}>
              {concernOtherDeduction?.totalNetAgentPayment}
            </th>
          </tr>
        </table>
        <Box sx={{ mt: 1 }}>
          <table border={1} className="table">
            <tr>
              <th rowSpan={2} style={{ width: 225 }}>
                ဖက်လက်ကျန် =
              </th>
              {concernLeave.map((item) => {
                return (
                  <th key={item.id} style={{ width: 60 }}>
                    {item.name}
                  </th>
                );
              })}
            </tr>
            <tr>
              {concernLeave.map((item) => {
                const data = remainLeaf.filter((l) => l.leafId === item.id);
                return (
                  <>
                    <th style={{ color: "green" }} key={item.id}>
                      {data.length && data[data.length - 1].Viss}
                    </th>
                  </>
                );
              })}
            </tr>
          </table>
        </Box>
        <Typography
          sx={{
            color: "#240750",
            fontWeight: "bold",
            textAlign: "center",
            mt: 2,
          }}
        >
          အတူတကွ ပူးပေါင်းဆောင်ရွက်ခြင်းအတွက် အထူး ကျေးဇူးတင်ရှိပါသည်
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            variant="contained"
            className="print-btn"
            onClick={() => handlePrint()}
            style={{ marginTop: 5 }}
          >
            Print
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Printing;
