import AdminLayout from "@/components/adminLayout";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NewMainMoney from "@/components/money/newMainMoney";
const MainClosingBalance = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ပင်မလက်ကျန်ငွေ
        </Typography>

        <h1>MainClosingBalance Table</h1>
      </AdminLayout>
    </>
  );
};
export default MainClosingBalance;
