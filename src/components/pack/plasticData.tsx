import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { createNewFormOfPacking } from "@/types/formOfPackingType";
import { useAppSelector } from "@/store/hooks";
interface Props {
  newFormOfPacking: createNewFormOfPacking;
  setNewFormOfPacking: (value: createNewFormOfPacking) => void;
}
const PlasticData = ({ newFormOfPacking, setNewFormOfPacking }: Props) => {
  const typeOfPackings = useAppSelector((store) => store.typeOfPacking.item);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>ပါကင်ပလတ်စတစ်</Typography>
          <FormControl variant="filled" sx={{ width: 150 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={newFormOfPacking.typeOfPackingId}
              onChange={(evt) => {
                setNewFormOfPacking({
                  ...newFormOfPacking,
                  typeOfPackingId: Number(evt.target.value),
                });
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              {typeOfPackings.map((item) => (
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
            placeholder="အရေအတွက်"
            sx={{ bgcolor: "#EEE8CF", width: 130 }}
            onChange={(evt) =>
              setNewFormOfPacking({
                ...newFormOfPacking,
                quantity: Number(evt.target.value),
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
              value={newFormOfPacking.typeOfPackingId}
              onChange={(evt) => {
                setNewFormOfPacking({
                  ...newFormOfPacking,
                  typeOfPackingId: Number(evt.target.value),
                });
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              {typeOfPackings.map((item) => (
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
            placeholder="အရေအတွက်"
            sx={{ bgcolor: "#EEE8CF", width: 130 }}
            onChange={(evt) =>
              setNewFormOfPacking({
                ...newFormOfPacking,
                quantity: Number(evt.target.value),
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
              value={newFormOfPacking.typeOfPackingId}
              onChange={(evt) => {
                setNewFormOfPacking({
                  ...newFormOfPacking,
                  typeOfPackingId: Number(evt.target.value),
                });
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              {typeOfPackings.map((item) => (
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
            placeholder="အရေအတွက်"
            sx={{ bgcolor: "#EEE8CF", width: 130 }}
            onChange={(evt) =>
              setNewFormOfPacking({
                ...newFormOfPacking,
                quantity: Number(evt.target.value),
              })
            }
          />
        </Box>
      </Box>
    </>
  );
};
export default PlasticData;
