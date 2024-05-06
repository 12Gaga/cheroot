import { useAppSelector } from "@/store/hooks";
import { createNewReturnCheroot } from "@/types/returnCherootType";
import { Typography, TextField, Box } from "@mui/material";

interface Props {
  newReturnCheroot: createNewReturnCheroot;
  setNewReturnCheroot: (value: createNewReturnCheroot) => void;
  totalAmount: number;
}
const ReturnCherootTwo = ({
  newReturnCheroot,
  setNewReturnCheroot,
  totalAmount,
}: Props) => {
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  // const returnCheroots = useAppSelector((store) => store.returnCheroot.item);
  // const concernReturnCheroots = returnCheroots
  //   .filter((item) => item.workShopId === workShop?.id)
  //   .filter(
  //     (i) =>
  //       i.date.toLocaleDateString() ===
  //         newReturnCheroot.date?.toLocaleDateString() &&
  //       i.agentId === newReturnCheroot.agentId
  //   );
  // console.log("djof", concernReturnCheroots);
  // console.log("date", selectedDate);
  // const totalAmount = concernReturnCheroots.reduce(
  //   (total, cheroot) => (total += cheroot.amount),
  //   0
  // );
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
          <Typography sx={{ fontWeight: "bold" }}>စုစုပေါင်းဆေးလိပ်</Typography>
          <TextField
            value={newReturnCheroot.totalCherootQty}
            placeholder="စုစုပေါင်းဆေးလိပ်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>အချောနှုန်း</Typography>
          <TextField
            value={newReturnCheroot.goodPrice}
            placeholder="အချောနှုန်း"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>သင့်ငွေ</Typography>
          <TextField
            value={newReturnCheroot.amount}
            placeholder="သင့်ငွေ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            ဆေးလိပ်စုစုပေါင်းသင့်ငွေ
          </Typography>
          <TextField
            value={totalAmount}
            placeholder="ဆေးလိပ်စုစုပေါင်းသင့်ငွေ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
      </Box>
    </>
  );
};
export default ReturnCherootTwo;
