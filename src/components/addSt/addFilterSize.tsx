import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";

const AddFilterSize = () => {
  const [selectedFilterSize, setSelectedFilterSize] = useState<number>(1);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          mt: 5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", width: 150 }}>
            အဆီခံအမျိုးအစား
          </Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={selectedFilterSize}
              onChange={(evt) => {
                setSelectedFilterSize(Number(evt.target.value));
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              <MenuItem value={1}>ရှယ်</MenuItem>
              <MenuItem value={2}>ကြီး</MenuItem>
              <MenuItem value={3}>လတ်</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", width: 150 }}>
            အရေအတွက်
          </Typography>
          <TextField
            placeholder="အရေအတွက်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", width: 150 }}>အိတ်</Typography>
          <TextField
            placeholder="အိတ်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#E55252",
            mr: 2,
            width: 180,
            height: 40,
            fontSize: 18,
            borderRadius: 10,
            "&:hover": {
              bgcolor: "#FCB500",
              color: "white",
              fontWeight: "bold",
            },
          }}
        >
          သိမ်းမည်
        </Button>
      </Box>
    </>
  );
};
export default AddFilterSize;