import { LoadingButton } from "@mui/lab";
import {
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { TypeOfCheroot } from "@prisma/client";

interface Props {
  cheroots: TypeOfCheroot[];
}
const TabaccoCompensation = ({ cheroots }: Props) => {
  return (
    <>
      <Typography
        variant="h6"
        sx={{
          color: "white",
          fontWeight: "bold",
          bgcolor: "#FCB500",
          mt: 2,
          pl: 1,
          width: 150,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        ဆေးစပ်
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: 300 }}>
          <Box sx={{ mt: 5, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ဆေးလိပ်အမျိုးအစား
            </Typography>
            <FormControl variant="filled" sx={{ width: 225 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={0}
                onChange={(evt) => {}}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {cheroots.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ mt: 2, width: 150 }}>
          <Typography sx={{ fontWeight: "bold" }}>ကျန်ရှိပြည်</Typography>
          <TextField
            defaultValue={0}
            placeholder="ကျန်အရေအတွက်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={(evt) => {}}
          />
        </Box>
        <Box sx={{ mt: 2, width: 150 }}>
          <Typography sx={{ fontWeight: "bold" }}>လျော်ပေးပြည်</Typography>
          <TextField
            defaultValue={0}
            placeholder="လျော်ပေးအရေအတွက်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={(evt) => {}}
          />
        </Box>
        <Box sx={{ mt: 2, width: 220 }}>
          <Typography sx={{ fontWeight: "bold" }}>ပေးချေရမည့်ပြည်</Typography>
          <TextField
            defaultValue={0}
            placeholder="ပေးချေရမည့်အရေအတွက်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={(evt) => {}}
          />
        </Box>
        <Box sx={{ mt: 2, width: 150 }}>
          <Typography sx={{ fontWeight: "bold" }}>ဈေးနှုန်း</Typography>
          <TextField
            defaultValue={0}
            placeholder="ဈေးနှုန်း"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={(evt) => {}}
          />
        </Box>
        <Box sx={{ mt: 2, width: 150 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            စုစုပေါင်းဈေးနှုန်း
          </Typography>
          <TextField
            defaultValue={0}
            placeholder="ဈေးနှုန်း"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={(evt) => {}}
          />
        </Box>
      </Box>
    </>
  );
};

export default TabaccoCompensation;
