import AdminLayout from "@/components/adminLayout";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NewDailyExpenses from "@/components/money/newDailyExpenses";
import { useAppSelector } from "@/store/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateDailyExpenses from "@/components/money/updateDailyExpenses";
import DeleteDailyExpensive from "@/components/money/deleteDailyExpensive";
import { DailyExpensive } from "@prisma/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [expenses, setExpenses] = useState<DailyExpensive[]>([]);

  const handleDate = (date: Date) => {
    const data = concernDailyExpensive.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate.toLocaleDateString() === date.toLocaleDateString();
    });
    setExpenses(data);
  };

  useEffect(() => {
    if (concernDailyExpensive.length) {
      const data = concernDailyExpensive.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
        );
      });
      setExpenses(data);
    }
  }, [dailyExpensives]);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          နေ့စဉ်အသုံးစာရိတ်
        </Typography>

        <Box sx={{ mr: 2, display: "flex", mt: 4, width: 300 }}>
          <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
          <DatePicker
            selected={selecteddate}
            onChange={(date) => {
              setSelectedDate(date as Date);
              handleDate(date as Date);
            }}
          />
        </Box>

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
          {expenses.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <thead key={item.id}>
                <tr style={{ border: "1px solid" }}>
                  <td>{itemdate.toLocaleDateString()}</td>
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
            );
          })}
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
