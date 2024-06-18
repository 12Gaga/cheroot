import { useAppSelector } from "@/store/hooks";
import { createNewOtherDeduction } from "@/types/otherDeductionType";
import { Box, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  newOtherDeduction: createNewOtherDeduction;
  setNewOtherDeduction: (value: createNewOtherDeduction) => void;
  totalCherootAmount: number;
  totalLeafAmount: number;
  selectedDate: Date;
}

const ReturnCherootFive = ({
  newOtherDeduction,
  setNewOtherDeduction,
  totalCherootAmount,
  totalLeafAmount,
  selectedDate,
}: Props) => {
  const [ddate, setDate] = useState<Date>(new Date());
  console.log("date", ddate);
  const extraPurchase = useAppSelector(
    (store) => store.extraPurchaseSummary.item
  );
  //find leftVissOfSelectAgent
  const agentsLeafViss = useAppSelector((store) => store.agentLeafViss.item);
  const leftViss = agentsLeafViss
    .filter((item) => item.agentId === newOtherDeduction.agentId)
    .reduce((totalViss, agentViss) => {
      return (totalViss += agentViss.viss);
    }, 0);
  //changeDate
  const handelDate = (date: Date) => {
    const exitPurchase = extraPurchase.find((item) => {
      const itemdate = new Date(item.date);
      return (
        item.agentId === newOtherDeduction.agentId &&
        itemdate.toLocaleDateString() === date.toLocaleDateString()
      );
    });
    if (exitPurchase) {
      const agentPay =
        totalCherootAmount -
        totalLeafAmount -
        (newOtherDeduction.cashAdvanceSmallDeduction +
          newOtherDeduction.cashAdvanceBigDeduction +
          exitPurchase.tolPrice);
      const totalPay =
        agentPay +
        newOtherDeduction.cashAdvanceBig +
        newOtherDeduction.cashAdvanceSmall +
        newOtherDeduction.bonusPayment;
      setNewOtherDeduction({
        ...newOtherDeduction,
        otherDeduction: exitPurchase.tolPrice,
        netAgentPayment: agentPay,
        totalNetAgentPayment: totalPay,
        deductDate: date,
        purchaseSeq: exitPurchase.purchaseSeq,
      });
    } else {
      const agentPay =
        totalCherootAmount -
        totalLeafAmount -
        (newOtherDeduction.cashAdvanceSmallDeduction +
          newOtherDeduction.cashAdvanceBigDeduction +
          0);
      const totalPay =
        agentPay +
        newOtherDeduction.cashAdvanceBig +
        newOtherDeduction.cashAdvanceSmall +
        newOtherDeduction.bonusPayment;
      setNewOtherDeduction({
        ...newOtherDeduction,
        otherDeduction: 0,
        netAgentPayment: agentPay,
        totalNetAgentPayment: totalPay,
        deductDate: date,
      });
    }

    setDate(date);
  };
  //change bigCashDeduction
  const handleBigCash = (bigCash: number) => {
    const agentPay =
      totalCherootAmount -
      totalLeafAmount -
      (bigCash +
        newOtherDeduction.cashAdvanceSmallDeduction +
        newOtherDeduction.otherDeduction);
    const totalPay =
      agentPay +
      newOtherDeduction.cashAdvanceBig +
      newOtherDeduction.cashAdvanceSmall +
      newOtherDeduction.bonusPayment;
    setNewOtherDeduction({
      ...newOtherDeduction,
      cashAdvanceBigDeduction: bigCash,
      netAgentPayment: agentPay,
      totalNetAgentPayment: totalPay,
    });
  };
  //change smallCashDeduction
  const handleSmallCash = (smallCash: number) => {
    const agentPay =
      totalCherootAmount -
      totalLeafAmount -
      (smallCash +
        newOtherDeduction.cashAdvanceBigDeduction +
        newOtherDeduction.otherDeduction);
    const totalPay =
      agentPay +
      newOtherDeduction.cashAdvanceBig +
      newOtherDeduction.cashAdvanceSmall +
      newOtherDeduction.bonusPayment;
    setNewOtherDeduction({
      ...newOtherDeduction,
      cashAdvanceSmallDeduction: smallCash,
      netAgentPayment: agentPay,
      totalNetAgentPayment: totalPay,
    });
  };
  //payleaf
  const payleaf = useAppSelector((store) => store.payLeaf.item);
  const concernPayLeaf = payleaf.filter(
    (item) =>
      new Date(item.date).toLocaleDateString() ===
      selectedDate.toLocaleDateString()
  );

  useEffect(() => {
    setNewOtherDeduction({ ...newOtherDeduction, deductDate: ddate });
  }, [ddate]);

  useEffect(() => {
    const exit = extraPurchase.find((item) => {
      const itemdate = new Date(item.date);
      return (
        item.agentId === newOtherDeduction.agentId &&
        itemdate.toLocaleDateString() === selectedDate.toLocaleDateString()
      );
    });
    if (exit) {
      const agentPay =
        totalCherootAmount -
        totalLeafAmount -
        (newOtherDeduction.cashAdvanceSmallDeduction +
          newOtherDeduction.cashAdvanceBigDeduction +
          exit.tolPrice);

      const totalPay =
        agentPay +
        newOtherDeduction.cashAdvanceBig +
        newOtherDeduction.cashAdvanceSmall +
        newOtherDeduction.bonusPayment;
      setNewOtherDeduction({
        ...newOtherDeduction,
        otherDeduction: exit.tolPrice,
        netAgentPayment: agentPay,
        totalNetAgentPayment: totalPay,
        purchaseSeq: exit.purchaseSeq,
      });
    } else {
      setNewOtherDeduction({
        ...newOtherDeduction,
        otherDeduction: 0,
        netAgentPayment: 0,
        totalNetAgentPayment: 0,
      });
    }
    console.log("exit", exit);
  }, [extraPurchase, newOtherDeduction.agentId]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            ခုနှိမ်ကြိုယူငွေ(အကြီး)
          </Typography>
          <TextField
            placeholder="ခုနှိမ်ကြိုယူငွေ(အကြီး)"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={(evt) => {
              handleBigCash(Number(evt.target.value));
            }}
          />
        </Box>

        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            ခုနှိမ်ကြိုယူငွေ(အသေး)
          </Typography>
          <TextField
            placeholder="ခုနှိမ်ကြိုယူငွေ(အသေး)"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={(evt) => {
              handleSmallCash(Number(evt.target.value));
            }}
          />
        </Box>

        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>ယူသောပိဿာ</Typography>
          <TextField
            value={
              concernPayLeaf.length &&
              concernPayLeaf[concernPayLeaf.length - 1].netViss
            }
            placeholder="ယူသောပိဿာ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>ကျန်ပိဿာ</Typography>
          <TextField
            value={leftViss}
            placeholder="ကျန်ပိဿာ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box
          sx={{
            width: 250,
            mt: 4,
            bgcolor: "#F7A71B",
            py: 2,
            borderRadius: 3,
          }}
        >
          <Box sx={{ display: "flex", ml: 2 }}>
            <Typography sx={{ mr: 2 }}>ရက်စွဲ</Typography>
            <DatePicker
              selected={ddate}
              onChange={(date) => handelDate(date as Date)}
            />
          </Box>
          <Box sx={{ width: 250, mt: 1, ml: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              အခြားခုနှိမ်ခြင်း
            </Typography>
            <TextField
              value={
                newOtherDeduction.otherDeduction
                  ? newOtherDeduction.otherDeduction
                  : 0
              }
              placeholder="အခြားခုနှိမ်ခြင်း"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={() => {}}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ReturnCherootFive;
