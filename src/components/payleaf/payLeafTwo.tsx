import { createNewPayLeaf } from "@/types/payLeafType";
import { Typography, TextField, Box } from "@mui/material";

interface Props {
  newPayLeaf: createNewPayLeaf;
  setNewPayLeaf: (value: createNewPayLeaf) => void;
}

const PayLeafTwo = ({ newPayLeaf, setNewPayLeaf }: Props) => {
  const changeNetViss = (discountViss: number) => {
    const netViss = newPayLeaf.viss - discountViss;
    // setNewPayLeaf({ ...newPayLeaf, netViss: Number(netViss) });
    const amount = netViss * newPayLeaf.price;
    setNewPayLeaf({
      ...newPayLeaf,
      discountViss: discountViss,
      netViss: Number(netViss),
      amount: Number(amount),
    });
    console.log("hello");
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
          <Typography sx={{ fontWeight: "bold" }}>လျော့ပေးပိဿာ</Typography>
          <TextField
            placeholder="လျော့ပေးပိဿာ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={(evt) => {
              // setNewPayLeaf({
              //   ...newPayLeaf,
              //   discountViss: Number(evt.target.value),
              // });
              changeNetViss(Number(evt.target.value));
            }}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>အသားတင်ပိဿာ</Typography>
          <TextField
            value={newPayLeaf.netViss}
            placeholder="အသားတင်ပိဿာ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ဈေးနှုန်း</Typography>
          <TextField
            value={newPayLeaf.price}
            placeholder="ဈေးနှုန်း"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ကျသင့်ငွေ</Typography>
          <TextField
            value={newPayLeaf.amount}
            placeholder="ကျသင့်ငွေ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
      </Box>
    </>
  );
};
export default PayLeafTwo;
