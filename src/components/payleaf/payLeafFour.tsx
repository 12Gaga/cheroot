import { useAppSelector } from "@/store/hooks";
import { createNewPayStock, payStock } from "@/types/payStockType";
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Box,
  ListItemText,
} from "@mui/material";
import { Formula } from "@prisma/client";

interface Props {
  newPayStock: createNewPayStock;
  setNewPayStock: (value: createNewPayStock) => void;
  payStock: payStock;
  setPayStock: (value: payStock) => void;
  workShopId: number;
}

const PayLeafFour = ({
  newPayStock,
  setNewPayStock,
  workShopId,
  payStock,
  setPayStock,
}: Props) => {
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item);
  const tabacco = useAppSelector((store) => store.typeOfTabacco.item);
  const concernCheroot = cheroots.filter(
    (item) => item.workShopId === workShopId
  );
  const formula = useAppSelector((store) => store.formula.item);
  const concernFormula = formula.filter(
    (item) => item.workShopId === workShopId
  );

  const handelChange = (cherootId: number) => {
    const selectedFormula = concernFormula.find(
      (item) => item.typeOfCherootId === cherootId
    ) as Formula;
    if (selectedFormula) {
      setNewPayStock({
        ...newPayStock,
        typeOfCherootId: cherootId,
        cherootQty: selectedFormula?.cherootQty,
        typeOfFilterSizeId: selectedFormula.typeOfFilterSizeId,
        filterSizeQty: selectedFormula.filterSizeQty,
        typeOfTabaccoId: selectedFormula.typeOfTabaccoId,
        tabaccoQty: selectedFormula.tabaccoQty,
        tabaccoTin: selectedFormula.tabaccoTin,
        tabaccoPyi: selectedFormula.tabaccoPyi,
      });
      setPayStock({
        ...payStock,
        cherootQty: selectedFormula?.cherootQty,
        filterSizeQty: selectedFormula.filterSizeQty,
        tabaccoQty: selectedFormula.tabaccoQty,
        tabaccoTin: selectedFormula.tabaccoTin,
        tabaccoPyi: selectedFormula.tabaccoPyi,
      });
    }
  };

  const handelChangeQty = (quantity: number) => {
    const changeFilterSizeQty =
      (payStock.filterSizeQty * quantity) / payStock.cherootQty;
    // const changeFilterSizeBag =
    //   (payStock.filterSizeBag * quantity) / payStock.cherootQty;
    const changeTabaccoTin =
      (payStock.tabaccoTin * quantity) / payStock.cherootQty;
    const changeTabaccoPyi =
      (payStock.tabaccoPyi * quantity) / payStock.cherootQty;
    const tolPyi = changeTabaccoTin * 16 + changeTabaccoPyi;
    const tin = Math.floor(tolPyi / 16);
    const pyi = tolPyi % 16;
    setNewPayStock({
      ...newPayStock,
      cherootQty: quantity,
      filterSizeQty: changeFilterSizeQty,
      tabaccoQty: quantity,
      tabaccoTin: tin,
      tabaccoPyi: pyi,
    });
  };

  return (
    <>
      <Box
        sx={{
          width: "37.25%",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ဆေးလိပ်အမျိုးအစား</Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={newPayStock.typeOfCherootId}
              onChange={(evt) => {
                handelChange(Number(evt.target.value));
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
          <Typography sx={{ fontWeight: "bold" }}>ဆေးလိပ်အရေအတွက်</Typography>
          <TextField
            placeholder="အရေအတွက်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={(evt) => {
              handelChangeQty(Number(evt.target.value));
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: "37.25%",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ဆေးစပ်အမျိုးအစား</Typography>
          <TextField
            value={
              tabacco.find((item) => item.id === newPayStock.typeOfTabaccoId)
                ?.name
            }
            placeholder="ဆေးစပ်အမျိုးအစား"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        {/* <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>အရေအတွက်</Typography>
          <TextField
            value={newPayStock.tabaccoQty}
            placeholder="အရေအတွက်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box> */}
        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>တင်း</Typography>
          <TextField
            value={newPayStock.tabaccoTin}
            placeholder="တင်း"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: "25%",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: 170, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ပြည်</Typography>
          <TextField
            value={newPayStock.tabaccoPyi}
            placeholder="ပြည်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
        <Box sx={{ width: 170, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ဆေးစပ်အိတ်</Typography>
          <TextField
            placeholder="အိတ်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={(evt) => {
              setNewPayStock({
                ...newPayStock,
                tabaccoBag: Number(evt.target.value),
              });
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default PayLeafFour;
