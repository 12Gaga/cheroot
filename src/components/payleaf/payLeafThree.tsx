import {
  Typography,
  TextField,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";

const PayLeafThree = () => {
  const [selectedName, setSelectedName] = useState<number>(1);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          ml: 2,
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", width: 150 }}>အမည်</Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <InputLabel id="demo-simple-select-filled-label">အမည်</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={selectedName}
              onChange={(evt) => {
                setSelectedName(Number(evt.target.value));
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              <MenuItem value={1}>စုစု</MenuItem>
              <MenuItem value={2}>လှလှ</MenuItem>
              <MenuItem value={3}>ကိုကို</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", width: 150 }}>
            လိပ်စာ
          </Typography>
          <TextField
            placeholder="လိပ်စာ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", width: 150 }}>
            ဖုန်းနံပါတ်
          </Typography>
          <TextField
            placeholder="ဖုန်းနံပါတ်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", width: 150 }}>
            လက်ကျန်ငွေ(အကြီး)
          </Typography>
          <TextField
            placeholder="လက်ကျန်ငွေ(အကြီး)"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", width: 150 }}>
            လက်ကျန်ငွေ(အသေး)
          </Typography>
          <TextField
            placeholder="လက်ကျန်ငွေ(အသေး)"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", width: 150 }}>
            ကျန်ပိဿာ
          </Typography>
          <TextField
            placeholder="ကျန်ပိဿာ"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
      </Box>
    </>
  );
};
export default PayLeafThree;
