import { useAppSelector } from "@/store/hooks";
import { createNewLeafDeduction } from "@/types/leafDeductionType";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  ListItemText,
} from "@mui/material";

interface Props {
  newLeafDeduction: createNewLeafDeduction;
  setNewLeafDeduction: (value: createNewLeafDeduction) => void;
  totalAmount: number;
}

const ReturnCherootFour = ({
  newLeafDeduction,
  setNewLeafDeduction,
  totalAmount,
}: Props) => {
  const agentsLeafViss = useAppSelector((store) => store.agentLeafViss.item);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const concernLeaves = leaves.filter(
    (item) => item.workShopId === workShop?.id
  );
  const handleChange = (leafId: number) => {
    // const leftViss = agentsLeafViss
    //   .filter((item) => item.agentId === newLeafDeduction.agentId)
    //   .reduce((totalViss, agentViss) => {
    //     return (totalViss += agentViss.viss);
    //   }, 0);
    const selectLeafPrice = concernLeaves.find((item) => item.id === leafId)
      ?.price as number;
    console.log("prie", selectLeafPrice);
    const totalamount = newLeafDeduction.deductViss * selectLeafPrice;
    setNewLeafDeduction({
      ...newLeafDeduction,
      typeOfLeafId: leafId,
      price: selectLeafPrice,
      deductionAmount: totalamount,
    });
  };

  const handleViss = (viss: number) => {
    const totalamount = newLeafDeduction.price * viss;
    setNewLeafDeduction({
      ...newLeafDeduction,
      deductViss: viss,
      deductionAmount: totalamount,
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
        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ဖက်အမျိုးအစား</Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={newLeafDeduction.typeOfLeafId}
              onChange={(evt) => {
                handleChange(Number(evt.target.value));
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              {concernLeaves.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ခုနှိမ်ပိဿာ</Typography>
          <TextField
            placeholder="ခုနှိမ်ပိဿာ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={(evt) => {
              handleViss(Number(evt.target.value));
            }}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>နှုန်း</Typography>
          <TextField
            value={newLeafDeduction.price}
            placeholder="နှုန်း"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ခုနှိမ်ငွေ</Typography>
          <TextField
            value={newLeafDeduction.deductionAmount}
            placeholder="ခုနှိမ်ငွေ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            ဖက်ဖိုးခုနှိမ်ငွေပေါင်း
          </Typography>
          <TextField
            value={totalAmount}
            placeholder="ဖက်ဖိုးခုနှိမ်ငွေပေါင်း"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
      </Box>
    </>
  );
};
export default ReturnCherootFour;
