import AdminLayout from "@/components/adminLayout";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NewDailyExpenses from "@/components/money/newDailyExpenses";
import { useAppSelector } from "@/store/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateDailyExpenses from "@/components/money/updateDailyExpenses";
import DeleteDailyExpensive from "@/components/money/deleteDailyExpensive";
const DailyExpenses = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const dailyExpensives = useAppSelector((store) => store.dailyExpensive.item);
  const concernDailyExpensive = dailyExpensives.filter(
    (item) => item.workShopId === workShop?.id
  );
  const titles = useAppSelector((store) => store.expensiveLabel.item);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);
  console.log("id", selectId);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          နေ့စဉ်အသုံးစာရိတ်
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
              <th>စာရင်းခေါင်းစဉ်</th>
              <th>အကြောင်းအရာ</th>
              <th>ပမာဏ</th>
            </tr>
          </thead>
          {concernDailyExpensive.map((item) => (
            <thead key={item.id}>
              <tr style={{ border: "1px solid" }}>
                <td>{item.date}</td>
                <td>
                  {titles.find((t) => t.id === item.expensiveLabelId)?.name}
                </td>
                <td>{item.content}</td>
                <td>{item.amount}</td>
                <td
                  onClick={() => {
                    setUpdateOpen(true), setSelectId(item.id);
                  }}
                >
                  {<EditIcon />}
                </td>
                <td
                  onClick={() => {
                    setDeleteOpen(true), setSelectId(item.id);
                  }}
                >
                  {<DeleteIcon />}
                </td>
              </tr>
            </thead>
          ))}
        </table>

        <NewDailyExpenses open={open} setOpen={setOpen} />
        <UpdateDailyExpenses
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteDailyExpensive
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default DailyExpenses;
