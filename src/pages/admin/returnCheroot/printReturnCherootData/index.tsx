import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useRef } from "react";
import Image from "next/image";
const Printing = () => {
  const tableRef = useRef(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { date, deductDate } = router.query;
  const cherootDate = new Date(date as string);
  const extraPurchaseDate = new Date(deductDate as string);
  const agentId = Number(router.query.agentId);
  const returnCheroot = useAppSelector((store) => store.returnCheroot.item);
  const concernReturnCheroot = returnCheroot.filter((item) => {
    const itemdate = new Date(item.date);
    return (
      item.agentId === agentId &&
      itemdate.toLocaleDateString() === cherootDate.toLocaleDateString()
    );
  });
  const leafDeduction = useAppSelector((store) => store.leafDeduction.item);
  const concernLeafDeduction = leafDeduction.filter((item) => {
    const itemdate = new Date(item.date);
    return (
      item.agentId === agentId &&
      itemdate.toLocaleDateString() === cherootDate.toLocaleDateString()
    );
  });
  const otherDeduction = useAppSelector((store) => store.otherDeduction.item);
  const concernOtherDeduction = otherDeduction.find((item) => {
    const itemdate = new Date(item.date);
    return (
      item.agentId === agentId &&
      itemdate.toLocaleDateString() === cherootDate.toLocaleDateString()
    );
  });
  const extraPurchase = useAppSelector((store) => store.extraPurchase.item);
  const concernextraPurchase = extraPurchase.find((item) => {
    const itemdate = new Date(item.date);
    console.log("itemdate", itemdate.toLocaleDateString());
    console.log("ddate", extraPurchaseDate.toLocaleDateString());
    return (
      item.agentId === agentId &&
      itemdate.toLocaleDateString() === extraPurchaseDate.toLocaleDateString()
    );
  });
  const agent = useAppSelector((store) => store.agent.item);
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const cheroot = useAppSelector((store) => store.typeOfCheroot.item);
  const tabacco = useAppSelector((store) => store.typeOfTabacco.item);
  const filterSize = useAppSelector((store) => store.typeOfFilterSize.item);
  const label = useAppSelector((store) => store.typeOfLabel.item);

  const handlePrint = () => {
    if (tableRef.current) {
      window.print();
    }
  };
  console.log("consern", concernextraPurchase);

  if (!date || !deductDate || !agentId) return null;
  return (
    <>
      <Box
        ref={tableRef}
        sx={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ backgroundColor: "#ACD793", p: 1 }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "bold" }}
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
              width={70}
              height={35}
              style={{ borderRadius: "20%", border: "3px solid white" }}
            />
            <Box>
              <Typography sx={{ fontSize: "20", fontWeight: "bold" }}>
                09-509 5352 , 09-79 80 87001 , 09-759 155 173
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>
              ကိုယ်စားလှယ်အမည် - {agent.find((a) => a.id === agentId)?.name}
            </Typography>
            <Typography>
              နေရပ်လိပ်စာ - {agent.find((a) => a.id === agentId)?.adderess}
            </Typography>
          </Box>
          <Box>
            <Typography>ရက်စွဲ - {cherootDate.toLocaleDateString()}</Typography>
          </Box>
        </Box>

        <table border={1} className="table">
          <thead>
            <tr>
              <th></th>
              <th style={{ backgroundColor: "#FEAE6F" }}>အချော</th>
              <th style={{ backgroundColor: "#FEAE6F" }}>အကျ</th>
              <th style={{ backgroundColor: "#FEAE6F" }}>စုစုပေါင်း</th>
              <th style={{ backgroundColor: "#FEAE6F" }}>အချောနှုန်း</th>
              <th style={{ backgroundColor: "#FEAE6F" }}></th>
              <th style={{ backgroundColor: "#FEAE6F" }}>သင့်ငွေ</th>
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
                  <td>{item.goodQty}</td>
                  <td>{item.damage}</td>
                  <td>{item.totalCherootQty}</td>
                  <td>{item.goodPrice}</td>
                  <th>=</th>
                  <th>{item.amount}</th>
                </tr>
              </thead>
            );
          })}

          <tr>
            <th style={{ backgroundColor: "#F6FAB9" }}>စုစုပေါင်း</th>
            <td style={{ backgroundColor: "#F6FAB9" }}>
              {concernReturnCheroot.reduce((total, goodcheroot) => {
                return (total += goodcheroot.goodQty);
              }, 0)}
            </td>
            <td style={{ backgroundColor: "#F6FAB9" }}>
              {concernReturnCheroot.reduce((total, damageCheroot) => {
                return (total += damageCheroot.damage);
              }, 0)}
            </td>
            <td style={{ backgroundColor: "#F6FAB9" }}>
              {concernReturnCheroot.reduce((total, totalCheroot) => {
                return (total += totalCheroot.totalCherootQty);
              }, 0)}
            </td>
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
                  <td>
                    {leaves.find((l) => l.id === item.typeOfLeafId)?.name}
                  </td>
                  <td>{item.deductViss}</td>
                  <td>{item.price}</td>
                  <td>{item.deductionAmount}</td>
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
            <td>{concernOtherDeduction?.cashAdvanceSmallDeduction}</td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td colSpan={2}>ကြိုယူခုနှိမ် (အကြီး)</td>
            <td></td>
            <td></td>
            <td>{concernOtherDeduction?.cashAdvanceBigDeduction}</td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <th style={{ color: "red" }}>အခြားခုနှိမ်ခြင်း</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          {concernextraPurchase && (
            <>
              <tr>
                <td>
                  {
                    tabacco.find(
                      (t) => t.id === concernextraPurchase?.typeOfTabaccoId
                    )?.name
                  }
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td>{concernextraPurchase?.tabaccoAmount}</td>
                <td></td>
                <td></td>
              </tr>

              <tr>
                <td>
                  {
                    filterSize.find(
                      (t) => t.id === concernextraPurchase?.typeOfFilterSizeId
                    )?.name
                  }
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td>{concernextraPurchase?.filterSizeAmount}</td>
                <td></td>
                <td></td>
              </tr>

              <tr>
                <td>
                  {
                    label.find(
                      (t) => t.id === concernextraPurchase?.typeOfLabelId
                    )?.name
                  }
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td>{concernextraPurchase?.labelAmount}</td>
                <td></td>
                <td></td>
              </tr>

              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
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
            <th></th>
            <td></td>
            <td></td>
            <th colSpan={2}>ကိုယ်စားလှယ်ဘောက်ဆူးပေးငွေ</th>
            <td></td>
            <th>{concernOtherDeduction?.bonusPayment}</th>
          </tr>

          <tr>
            <th></th>
            <td></td>
            <td></td>
            <th colSpan={2}>စုစုပေါင်းကိုယ်စားလှယ်ရှင်းငွေ</th>
            <td></td>
            <th style={{ backgroundColor: "#E6FF94" }}>
              {concernOtherDeduction?.totalNetAgentPayment}
            </th>
          </tr>
        </table>
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
