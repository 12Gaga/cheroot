import AdminLayout from "@/components/adminLayout";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NewClosingBalance from "@/components/money/newClosingBalance";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "@/store/hooks";
const ClosingBalance = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const dailyClosing = useAppSelector((store) => store.dailyClosing.item);
  const concernDailyClosing = dailyClosing.filter(
    (item) => item.workShopId === workShop?.id
  );
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          နေ့စဉ်လက်ကျန်ငွေ
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <AddBoxIcon
            onClick={() => {
              setOpen(true);
            }}
            sx={{ fontSize: 50 }}
          />
        </Box>

        <table border={1}>
          <thead>
            <tr style={{ border: "1px solid" }}>
              <th>နေ့စွဲ</th>
              <th>ပမာဏ</th>
            </tr>
          </thead>
          {concernDailyClosing.map((item) => (
            <thead key={item.id}>
              <tr style={{ border: "1px solid" }}>
                <td>{item.date}</td>
                <td>{item.amount}</td>
                {/* <td>{<EditIcon />}</td>
                <td>{<DeleteIcon />}</td> */}
              </tr>
            </thead>
          ))}
        </table>

        <NewClosingBalance open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default ClosingBalance;
