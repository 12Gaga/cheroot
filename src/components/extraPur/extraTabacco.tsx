import { useAppSelector } from "@/store/hooks";
import { createNewExtraPurchase } from "@/types/extraPurchaseType";
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
  newExtraPurchase: createNewExtraPurchase;
  setNewExtraPurchase: (value: createNewExtraPurchase) => void;
  workshopId: number;
}

const TabaccoExtra = ({
  newExtraPurchase,
  setNewExtraPurchase,
  workshopId,
}: Props) => {
  const tabacco = useAppSelector((store) => store.typeOfTabacco.item);
  const concernTabacco = tabacco.filter(
    (item) => item.workShopId === workshopId
  );

  const handelChange = (tabaccoId: number) => {
    const selectTabaccoPrice = concernTabacco.find(
      (item) => item.id === tabaccoId
    )?.price as number;
    const tabaccoPyis =
      newExtraPurchase.tabaccoTin * 16 + newExtraPurchase.tabaccoPyi;
    const amount = tabaccoPyis * selectTabaccoPrice;
    const totalAmount =
      newExtraPurchase.filterSizeAmount + newExtraPurchase.labelAmount + amount;
    setNewExtraPurchase({
      ...newExtraPurchase,
      typeOfTabaccoId: tabaccoId,
      tabaccoPrice: selectTabaccoPrice,
      tabaccoAmount: amount,
      totalAmount,
    });
  };

  const handleTin = (tin: number) => {
    const pyis = tin * 16 + newExtraPurchase.tabaccoPyi;
    const amount = newExtraPurchase.tabaccoPrice * pyis;
    const totalAmount =
      newExtraPurchase.filterSizeAmount + newExtraPurchase.labelAmount + amount;
    setNewExtraPurchase({
      ...newExtraPurchase,
      tabaccoTin: tin,
      tabaccoAmount: amount,
      totalAmount,
    });
  };

  const handlePyi = (pyi: number) => {
    const pyis = newExtraPurchase.tabaccoTin * 16 + pyi;
    const amount = newExtraPurchase.tabaccoPrice * pyis;
    const totalAmount =
      newExtraPurchase.filterSizeAmount + newExtraPurchase.labelAmount + amount;
    setNewExtraPurchase({
      ...newExtraPurchase,
      tabaccoPyi: pyi,
      tabaccoAmount: amount,
      totalAmount,
    });
  };
  // useEffect(() => {
  //   if (concernTabacco.length) {
  //     setNewExtraPurchase({
  //       ...newExtraPurchase,
  //       typeOfTabaccoId: concernTabacco[0].id,
  //       tabaccoPrice: concernTabacco[0].price,
  //     });
  //   }
  // }, [concernTabacco.length]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ဆေးစပ်အမျိုးအစား</Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={newExtraPurchase.typeOfTabaccoId}
              onChange={(evt) => {
                handelChange(Number(evt.target.value));
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              {concernTabacco.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>အရေအတွက်</Typography>
          <TextField
            placeholder="အရေအတွက်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={(evt) => {
              setNewExtraPurchase({
                ...newExtraPurchase,
                tabaccoQty: Number(evt.target.value),
              });
            }}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>တင်း</Typography>
          <TextField
            placeholder="တင်း"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={(evt) => {
              handleTin(Number(evt.target.value));
            }}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ပြည်</Typography>
          <TextField
            placeholder="ပြည်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={(evt) => {
              handlePyi(Number(evt.target.value));
            }}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>အိတ်</Typography>
          <TextField
            placeholder="အိတ်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={(evt) => {
              setNewExtraPurchase({
                ...newExtraPurchase,
                tabaccoBag: Number(evt.target.value),
              });
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          width: "40%",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ဈေးနှုန်း</Typography>
          <TextField
            value={newExtraPurchase.tabaccoPrice}
            placeholder="ဈေးနှုန်း"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ကျသင့်ငွေ</Typography>
          <TextField
            value={newExtraPurchase.tabaccoAmount}
            placeholder="ကျသင့်ငွေ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
      </Box>
    </>
  );
};
export default TabaccoExtra;
