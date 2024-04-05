import { Typography, TextField, Box } from "@mui/material";

const Info = () => {
  return (
    <>
      <Typography sx={{ fontWeight: "bold" }}>အမည်</Typography>
      <TextField
        id="filled-basic"
        label="အမည်"
        variant="filled"
        sx={{ bgcolor: "#EEE8CF" }}
      />

      <Typography sx={{ fontWeight: "bold" }}>ဖုန်းနံပါတ်</Typography>
      <TextField
        id="filled-basic"
        label="ဖုန်းနံပါတ်"
        variant="filled"
        sx={{ bgcolor: "#EEE8CF" }}
      />

      <Typography sx={{ fontWeight: "bold" }}>နေရပ်လိပ်စာ</Typography>
      <TextField
        id="filled-basic"
        label="နေရပ်လိပ်စာ"
        variant="filled"
        sx={{ bgcolor: "#EEE8CF" }}
      />
    </>
  );
};
export default Info;
