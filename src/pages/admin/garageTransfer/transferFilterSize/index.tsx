import AdminLayout from "@/components/adminLayout";
import NewMoneyTitle from "@/components/money/newMoneyTitle";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NewTransferLeaf from "@/components/garageTrans/newTransferLeaf";
import NewTransferFilterSize from "@/components/garageTrans/newTransferFilterSize";
const TransferFilterSize = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          အဆီခံ
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <AddBoxIcon
            onClick={() => {
              setOpen(true);
            }}
            sx={{ fontSize: 50 }}
          />
        </Box>
        <NewTransferFilterSize open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default TransferFilterSize;
