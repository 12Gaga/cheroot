import AdminLayout from "@/components/adminLayout";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NewMainClosingBalance from "@/components/money/newMainClosingBalance";
import { useAppSelector } from "@/store/hooks";

const MainClosingBalance = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const mainClosing = useAppSelector((store) => store.mainClosing.item);
  const concernMainClosing = mainClosing.filter(
    (item) => item.workShopId === workShop?.id
  );
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ပင်မလက်ကျန်ငွေ
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
          {concernMainClosing.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <thead key={item.id}>
                <tr style={{ border: "1px solid" }}>
                  <td>{itemdate.toLocaleDateString()}</td>
                  <td>{item.amount}</td>
                </tr>
              </thead>
            );
          })}
        </table>

        <NewMainClosingBalance open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default MainClosingBalance;
