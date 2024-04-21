import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const NewDirectPayment = ({ open, setOpen }: Props) => {
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle> ပင်မငွေစာရင်းမှတိုက်ရိုက်ထုတ်ယူခြင်း</DialogTitle>
        <DialogContent sx={{ height: 210 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontWeight: "bold" }}>ခေါင်းစဉ်</Typography>
              <TextField
                placeholder="ခေါင်းစဉ်"
                sx={{ bgcolor: "#EEE8CF", width: 300 }}
                onChange={() => {}}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: "bold" }}>ငွေပမာဏ</Typography>
              <TextField
                placeholder="ငွေပမာဏ"
                sx={{ bgcolor: "#EEE8CF", width: 300 }}
                onChange={() => {}}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpen(false)}>
            မလုပ်တော့ပါ
          </Button>
          <Button variant="contained">သိမ်းမည်</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default NewDirectPayment;
