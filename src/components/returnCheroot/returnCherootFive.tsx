import { useAppSelector } from "@/store/hooks";
import { createNewOtherDeduction } from "@/types/otherDeductionType";
import { Box, Typography, TextField } from "@mui/material";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  newOtherDeduction: createNewOtherDeduction;
  setNewOtherDeduction: (value: createNewOtherDeduction) => void;
  totalCherootAmount: number;
  totalLeafAmount: number;
}

const ReturnCherootFive = ({
  newOtherDeduction,
  setNewOtherDeduction,
  totalCherootAmount,
  totalLeafAmount,
}: Props) => {
  const [ddate, setDate] = useState<any>(new Date().toLocaleDateString());
  console.log("date", ddate);
  const extraPurchase = useAppSelector((store) => store.extraPurchase.item);
  const exit = extraPurchase.find(
    (item) =>
      item.agentId === newOtherDeduction.agentId &&
      item.date === newOtherDeduction.date
  )?.totalAmount;
  if (exit) {
    const agentPay =
      newOtherDeduction.cashAdvanceSmallDeduction +
      newOtherDeduction.cashAdvanceBigDeduction +
      exit -
      (totalCherootAmount - totalLeafAmount);
    const totalPay =
      agentPay +
      newOtherDeduction.cashAdvanceBig +
      newOtherDeduction.cashAdvanceSmall +
      newOtherDeduction.bonusPayment;
    setNewOtherDeduction({
      ...newOtherDeduction,
      otherDeduction: exit,
      netAgentPayment: agentPay,
      totalNetAgentPayment: totalPay,
    });
  }
  //find leftVissOfSelectAgent
  const agentsLeafViss = useAppSelector((store) => store.agentLeafViss.item);
  const leftViss = agentsLeafViss
    .filter((item) => item.agentId === newOtherDeduction.agentId)
    .reduce((totalViss, agentViss) => {
      return (totalViss += agentViss.viss);
    }, 0);
  //changeDate
  const handelDate = (date: any) => {
    const exitPurchase = extraPurchase.find(
      (item) => item.agentId === newOtherDeduction.agentId && item.date === date
    )?.totalAmount as number;
    const agentPay =
      totalCherootAmount -
      totalLeafAmount -
      (newOtherDeduction.cashAdvanceSmallDeduction +
        newOtherDeduction.cashAdvanceBigDeduction +
        exitPurchase);
    const totalPay =
      agentPay +
      newOtherDeduction.cashAdvanceBig +
      newOtherDeduction.cashAdvanceSmall +
      newOtherDeduction.bonusPayment;
    setNewOtherDeduction({
      ...newOtherDeduction,
      otherDeduction: exitPurchase,
      netAgentPayment: agentPay,
      totalNetAgentPayment: totalPay,
    });
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
              onChange={(date) => handelDate(date?.toLocaleDateString())}
            />
          </Box>
          <Box sx={{ width: 250, mt: 1, ml: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              အခြားခုနှိမ်ခြင်း
            </Typography>
            <TextField
              value={newOtherDeduction.otherDeduction}
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
