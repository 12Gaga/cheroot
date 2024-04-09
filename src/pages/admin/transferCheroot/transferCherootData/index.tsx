import AdminLayout from "@/components/adminLayout";
import { Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NewTransferCherootData from "@/components/cherootTransferring/newTransferCherootData";
const TransferCherootData = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ဆေးလိပ်ပို့စာရင်းထည့်ခြင်း
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <AddBoxIcon
            onClick={() => {
              setOpen(true);
            }}
            sx={{ fontSize: 50 }}
          />
        </Box>
        <NewTransferCherootData open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default TransferCherootData;
