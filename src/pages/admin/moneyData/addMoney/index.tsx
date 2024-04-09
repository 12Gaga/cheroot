import AdminLayout from "@/components/adminLayout";
import NewMoneyTitle from "@/components/money/newMoneyTitle";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NewDailyExpenses from "@/components/money/newDailyExpenses";
import NewMainMoney from "@/components/money/newMainMoney";
import NewAddMoney from "@/components/money/newAddMoney";
const AddMoney = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ဖြည့်တင်းငွေစာရင်း
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <AddBoxIcon
            onClick={() => {
              setOpen(true);
            }}
            sx={{ fontSize: 50 }}
          />
        </Box>
        <NewAddMoney open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default AddMoney;
