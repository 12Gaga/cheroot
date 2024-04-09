import AdminLayout from "@/components/adminLayout";
import { Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NewPackingData from "@/components/pack/newPackingData";
const PackingData = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ပါကင်စာရင်းထည့်ခြင်း
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <AddBoxIcon
            onClick={() => {
              setOpen(true);
            }}
            sx={{ fontSize: 50 }}
          />
        </Box>
        <NewPackingData open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default PackingData;
