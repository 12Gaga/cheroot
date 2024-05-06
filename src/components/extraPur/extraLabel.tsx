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

const LabelExtra = ({
  newExtraPurchase,
  setNewExtraPurchase,
  workshopId,
}: Props) => {
  const label = useAppSelector((store) => store.typeOfLabel.item);
  const concernLabel = label.filter((item) => item.workShopId === workshopId);

  const handelChange = (labelId: number) => {
    const selectLabelPrice = concernLabel.find((item) => item.id === labelId)
      ?.price as number;
    const amount = newExtraPurchase.labelBandle * selectLabelPrice;
    const totalAmount =
      newExtraPurchase.filterSizeAmount +
      newExtraPurchase.tabaccoAmount +
      amount;
    setNewExtraPurchase({
      ...newExtraPurchase,
      typeOfLabelId: labelId,
      labelPrice: selectLabelPrice,
      labelAmount: amount,
      totalAmount,
    });
  };

  const handleBandle = (bandle: number) => {
    const amount = newExtraPurchase.labelPrice * bandle;
    const totalAmount =
      newExtraPurchase.tabaccoAmount +
      newExtraPurchase.filterSizeAmount +
      amount;
    setNewExtraPurchase({
      ...newExtraPurchase,
      labelBandle: bandle,
      labelAmount: amount,
      totalAmount,
    });
  };

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
          <Typography sx={{ fontWeight: "bold" }}>တံဆိပ်အမျိုးအစား</Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={newExtraPurchase.typeOfLabelId}
              onChange={(evt) => {
                handelChange(Number(evt.target.value));
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              {concernLabel.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>လိပ်</Typography>
          <TextField
            placeholder="လိပ်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={(evt) => {
              handleBandle(Number(evt.target.value));
            }}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ဈေးနှုန်း</Typography>
          <TextField
            value={newExtraPurchase.labelPrice}
            placeholder="ဈေးနှုန်း"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ကျသင့်ငွေ</Typography>
          <TextField
            value={newExtraPurchase.labelAmount}
            placeholder="ကျသင့်ငွေ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box
          sx={{
            width: 230,
            mt: 2,
            p: 2,
            bgcolor: "#F7A71B",
            borderRadius: 5,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            စုစုပေါင်းကျသင့်ငွေ
          </Typography>
          <TextField
            value={newExtraPurchase.totalAmount}
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
      </Box>
    </>
  );
};
export default LabelExtra;
