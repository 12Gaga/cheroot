import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { updateFormOfPacking } from "@/types/formOfPackingType";
import { useAppSelector } from "@/store/hooks";
import { FormOfPacking } from "@prisma/client";
interface Props {
  selectFormOfPacking: FormOfPacking;
  updateFormOfPacking: updateFormOfPacking;
  setUpdateFormOfPacking: (value: updateFormOfPacking) => void;
}
const UpdatePlasticData = ({
  updateFormOfPacking,
  setUpdateFormOfPacking,
  selectFormOfPacking,
}: Props) => {
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const plastics = useAppSelector((store) => store.typeOfPlastic.item);
  const concernPlastic = plastics.filter(
    (item) => item.workShopId === workShop?.id
  );
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ပါကင်ပလတ်စတစ်</Typography>
          <FormControl variant="filled" sx={{ width: 150 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              defaultValue={selectFormOfPacking.packingPlasticId}
              value={updateFormOfPacking.packingPlasticId}
              onChange={(evt) => {
                setUpdateFormOfPacking({
                  ...updateFormOfPacking,
                  packingPlasticId: Number(evt.target.value),
                });
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              {concernPlastic.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mt: 2, ml: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>အရေအတွက်</Typography>
          <TextField
            defaultValue={selectFormOfPacking.packingPlasticQty}
            placeholder="အရေအတွက်"
            sx={{ bgcolor: "#EEE8CF", width: 130 }}
            onChange={(evt) =>
              setUpdateFormOfPacking({
                ...updateFormOfPacking,
                packingQty: Number(evt.target.value),
              })
            }
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ထုတ်ပိုးပလတ်စတစ်</Typography>
          <FormControl variant="filled" sx={{ width: 150 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              defaultValue={selectFormOfPacking.warpingPlasticId}
              value={updateFormOfPacking.warppingPlasticId}
              onChange={(evt) => {
                setUpdateFormOfPacking({
                  ...updateFormOfPacking,
                  warppingPlasticId: Number(evt.target.value),
                });
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              {concernPlastic.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mt: 2, ml: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>အရေအတွက်</Typography>
          <TextField
            defaultValue={selectFormOfPacking.warpingPlasticQty}
            placeholder="အရေအတွက်"
            sx={{ bgcolor: "#EEE8CF", width: 130 }}
            onChange={(evt) =>
              setUpdateFormOfPacking({
                ...updateFormOfPacking,
                warppingQty: Number(evt.target.value),
              })
            }
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ကာဗာပလတ်စတစ်</Typography>
          <FormControl variant="filled" sx={{ width: 150 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              defaultValue={selectFormOfPacking.coverPlasticId}
              value={updateFormOfPacking.coverPlasticId}
              onChange={(evt) => {
                setUpdateFormOfPacking({
                  ...updateFormOfPacking,
                  coverPlasticId: Number(evt.target.value),
                });
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              {concernPlastic.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mt: 2, ml: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>အရေအတွက်</Typography>
          <TextField
            defaultValue={selectFormOfPacking.coverPlasticQty}
            placeholder="အရေအတွက်"
            sx={{ bgcolor: "#EEE8CF", width: 130 }}
            onChange={(evt) =>
              setUpdateFormOfPacking({
                ...updateFormOfPacking,
                coverQty: Number(evt.target.value),
              })
            }
          />
        </Box>
      </Box>
    </>
  );
};
export default UpdatePlasticData;
