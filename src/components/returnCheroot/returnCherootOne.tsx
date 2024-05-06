import { useAppSelector } from "@/store/hooks";
import { createNewReturnCheroot } from "@/types/returnCherootType";
import {
  Typography,
  TextField,
  Box,
  FormControl,
  MenuItem,
  Select,
  ListItemText,
} from "@mui/material";
import { TypeOfCheroot, WorkShop } from "@prisma/client";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  newReturnCheroot: createNewReturnCheroot;
  setNewReturnCheroot: (value: createNewReturnCheroot) => void;
  no: number;
}
const ReturnCherootOne = ({
  newReturnCheroot,
  setNewReturnCheroot,
  no,
}: Props) => {
  const workShop = useAppSelector(
    (store) => store.workShop.selectedWorkShop
  ) as WorkShop;
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item);
  const concernCheroot = cheroots.filter(
    (item) => item.workShopId === workShop.id
  );

  const handleCheroot = (cherootId: number) => {
    const cherootPrice = concernCheroot.find((item) => item.id === cherootId)
      ?.price as number;
    const totalamount = newReturnCheroot.goodQty * cherootPrice;
    setNewReturnCheroot({
      ...newReturnCheroot,
      typeOfCherootId: cherootId,
      goodPrice: cherootPrice,
      amount: totalamount,
    });
  };

  const handleGoodQty = (goodQty: number) => {
    const totalamount = newReturnCheroot.goodPrice * goodQty;
    const totalCheroot = newReturnCheroot.damage + goodQty;
    setNewReturnCheroot({
      ...newReturnCheroot,
      goodQty,
      totalCherootQty: totalCheroot,
      amount: totalamount,
    });
  };

  const handelDamage = (damage: number) => {
    const totalCheroot = newReturnCheroot.goodQty + damage;
    setNewReturnCheroot({
      ...newReturnCheroot,
      damage,
      totalCherootQty: totalCheroot,
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
          <Typography sx={{ fontWeight: "bold" }}>စဉ်</Typography>
          <TextField
            value={no}
            placeholder="စဉ်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ဆေးလိပ်အမျိုးအစား</Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={newReturnCheroot.typeOfCherootId}
              onChange={(evt) => {
                handleCheroot(Number(evt.target.value));
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              {concernCheroot.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>အချောဆေးလိပ်</Typography>
          <TextField
            placeholder="အချောဆေးလိပ်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={(evt) => {
              handleGoodQty(Number(evt.target.value));
            }}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>အကျဆေးလိပ်</Typography>
          <TextField
            placeholder="အကျဆေးလိပ်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={(evt) => {
              handelDamage(Number(evt.target.value));
            }}
          />
        </Box>
      </Box>
    </>
  );
};
export default ReturnCherootOne;
