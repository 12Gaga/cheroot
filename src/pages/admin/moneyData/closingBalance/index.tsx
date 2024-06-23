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
  const concernDailyClosing = dailyClosing
    .filter((item) => item.workShopId === workShop?.id)
    .sort((a, b) => a.id - b.id);
  let no = 0;
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
          <tr>
            <th style={{ width: 50 }}>စဉ်</th>
            <th style={{ width: 150 }}>နေ့စွဲ</th>
            <th style={{ width: 150 }}>ပမာဏ</th>
          </tr>
          {concernDailyClosing.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <tr key={item.id}>
                <th style={{ height: 30 }}>{(no += 1)}</th>
                <td style={{ textAlign: "center" }}>
                  {itemdate.toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>{item.amount}</td>
              </tr>
            );
          })}
        </table>

        <NewClosingBalance open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default ClosingBalance;
