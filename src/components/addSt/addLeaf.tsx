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

const AddLeaf = () => {
  const [selectedLeaf, setSelectedLeaf] = useState<number>(1);
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
            ဖက်အမျိုးအစား
          </Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={selectedLeaf}
              onChange={(evt) => {
                setSelectedLeaf(Number(evt.target.value));
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              <MenuItem value={1}>၅ ၁/၄ (ငါးတမတ်)</MenuItem>
              <MenuItem value={2}>၅ (၄ဝါ)</MenuItem>
              <MenuItem value={3}>၄ ၁/၂ (၂လိပ်ဝါ)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", width: 150 }}>
            ပိုနံပါတ်
          </Typography>
          <TextField
            placeholder="ပိုနံပါတ်"
            sx={{ bgcolor: "#EEE8CF" }}
            onChange={() => {}}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", width: 150 }}>ပိဿာ</Typography>
          <TextField
            placeholder="ပိဿာ"
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
export default AddLeaf;