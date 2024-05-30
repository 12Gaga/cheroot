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
import { useEffect } from "react";

interface Props {
  newExtraPurchase: createNewExtraPurchase;
  setNewExtraPurchase: (value: createNewExtraPurchase) => void;
  workshopId: number;
}

const FilterSizeExtra = ({
  newExtraPurchase,
  setNewExtraPurchase,
  workshopId,
}: Props) => {
  const filterSize = useAppSelector((store) => store.typeOfFilterSize.item);
  const concernFilterSize = filterSize.filter(
    (item) => item.workShopId === workshopId
  );
  const tabacco = useAppSelector((store) => store.typeOfTabacco.item);
  const concernTabacco = tabacco.filter(
    (item) => item.workShopId === workshopId
  );
  const label = useAppSelector((store) => store.typeOfLabel.item);
  const concernLabel = label.filter((item) => item.workShopId === workshopId);
  const handelChange = (filterSizeId: number) => {
    const selectFilterSizePrice = concernFilterSize.find(
      (item) => item.id === filterSizeId
    )?.price as number;
    console.log("jjj", selectFilterSizePrice);
    const amount = newExtraPurchase.filterSizeQty * selectFilterSizePrice;
    const totalAmount =
      newExtraPurchase.tabaccoAmount + newExtraPurchase.labelAmount + amount;
    setNewExtraPurchase({
      ...newExtraPurchase,
      typeOfFilterSizeId: filterSizeId,
      filterSizePrice: selectFilterSizePrice,
      filterSizeAmount: amount,
      totalAmount,
    });
  };

  const handleQty = (filterQty: number) => {
    const amount = newExtraPurchase.filterSizePrice * filterQty;
    const totalAmount =
      newExtraPurchase.tabaccoAmount + newExtraPurchase.labelAmount + amount;
    setNewExtraPurchase({
      ...newExtraPurchase,
      filterSizeQty: filterQty,
      filterSizeAmount: amount,
      totalAmount,
    });
  };
  // useEffect(() => {
  //   if (concernFilterSize.length) {
  //     setNewExtraPurchase({
  //       ...newExtraPurchase,
  //       typeOfFilterSizeId: concernFilterSize[0].id,
  //       typeOfTabaccoId: concernTabacco[0].id,
  //       typeOfLabelId: concernLabel[0].id,
  //     });
  //     console.log("hello");
  //   }
  // }, [concernFilterSize.length]);

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
          <Typography sx={{ fontWeight: "bold" }}>အဆီခံအမျိုးအစား</Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={newExtraPurchase.typeOfFilterSizeId}
              onChange={(evt) => {
                handelChange(Number(evt.target.value));
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              {concernFilterSize.map((item) => (
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
              handleQty(Number(evt.target.value));
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
                filterSizeBag: Number(evt.target.value),
              });
            }}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ဈေးနှုန်း</Typography>
          <TextField
            value={newExtraPurchase.filterSizePrice}
            placeholder="ဈေးနှုန်း"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ width: 250, mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ကျသင့်ငွေ</Typography>
          <TextField
            value={newExtraPurchase.filterSizeAmount}
            placeholder="ကျသင့်ငွေ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
      </Box>
    </>
  );
};
export default FilterSizeExtra;
