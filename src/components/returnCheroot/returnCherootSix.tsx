import { createNewOtherDeduction } from "@/types/otherDeductionType";
import { Box, Typography, TextField } from "@mui/material";

interface Props {
  newOtherDeduction: createNewOtherDeduction;
  setNewOtherDeduction: (value: createNewOtherDeduction) => void;
}

const ReturnCherootSix = ({
  newOtherDeduction,
  setNewOtherDeduction,
}: Props) => {
  const handelAdvanceBig = (advanceBig: number) => {
    const totalPay =
      newOtherDeduction.netAgentPayment +
      advanceBig +
      newOtherDeduction.cashAdvanceSmall +
      newOtherDeduction.bonusPayment;
    setNewOtherDeduction({
      ...newOtherDeduction,
      cashAdvanceBig: advanceBig,
      totalNetAgentPayment: totalPay,
    });
  };

  const handelAdvanceSmall = (advanceSmall: number) => {
    const totalPay =
      newOtherDeduction.netAgentPayment +
      advanceSmall +
      newOtherDeduction.cashAdvanceBig +
      newOtherDeduction.bonusPayment;
    setNewOtherDeduction({
      ...newOtherDeduction,
      cashAdvanceSmall: advanceSmall,
      totalNetAgentPayment: totalPay,
    });
  };

  const handelBonus = (bouns: number) => {
    const totalPay =
      newOtherDeduction.netAgentPayment +
      newOtherDeduction.cashAdvanceSmall +
      newOtherDeduction.cashAdvanceBig +
      bouns;
    setNewOtherDeduction({
      ...newOtherDeduction,
      bonusPayment: bouns,
      totalNetAgentPayment: totalPay,
    });
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "80%",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            ကိုယ်စားလှယ်ရှင်းငွေ
          </Typography>
          <TextField
            value={newOtherDeduction.netAgentPayment}
            placeholder="ကိုယ်စားလှယ်ရှင်းငွေ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>ကြိုယူငွေ(အကြီး)</Typography>
          <TextField
            placeholder="ကြိုယူငွေ(အကြီး)"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={(evt) => {
              handelAdvanceBig(Number(evt.target.value));
            }}
          />
        </Box>

        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>ကြိုယူငွေ(အသေး)</Typography>
          <TextField
            placeholder="ကြိုယူငွေ(အသေး)"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={(evt) => {
              handelAdvanceSmall(Number(evt.target.value));
            }}
          />
        </Box>

        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>ဘောက်ဆူး</Typography>
          <TextField
            placeholder="ဘောက်ဆူး"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={(evt) => {
              handelBonus(Number(evt.target.value));
            }}
          />
        </Box>

        <Box sx={{ width: 250, mt: 4 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            စုစုပေါင်းကိုယ်စားလှယ်ရှင်းငွေ
          </Typography>
          <TextField
            value={newOtherDeduction.totalNetAgentPayment}
            placeholder="စုစုပေါင်းကိုယ်စားလှယ်ရှင်းငွေ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
      </Box>
    </>
  );
};
export default ReturnCherootSix;
