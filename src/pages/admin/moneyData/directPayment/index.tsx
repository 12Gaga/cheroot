import AdminLayout from "@/components/adminLayout";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NewDirectPayment from "@/components/money/newDirectPayment";
import { useAppSelector } from "@/store/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateDirectPayment from "@/components/money/updateDirectPayment";
import DeleteDirectPayment from "@/components/money/deleteDirectPayment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MainDirectPayment } from "@prisma/client";
const DirectPayment = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const directPayment = useAppSelector((store) => store.directPayment.item);
  const concernDirectPayment = directPayment.filter(
    (item) => item.workShopId === workShop?.id
  );
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);

  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [payment, setPayment] = useState<MainDirectPayment[]>([]);

  const handleDate = (date: Date) => {
    const data = concernDirectPayment.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate.toLocaleDateString() === date.toLocaleDateString();
    });
    setPayment(data);
  };

  useEffect(() => {
    if (concernDirectPayment.length) {
      const data = concernDirectPayment.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
        );
      });
      setPayment(data);
    }
  }, [directPayment]);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ပင်မငွေစာရင်းမှတိုက်ရိုက်ထုတ်ယူခြင်း
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
              <th>အကြောင်းအရာ</th>
              <th>ပမာဏ</th>
            </tr>
          </thead>
          {payment.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <thead key={item.id}>
                <tr style={{ border: "1px solid" }}>
                  <td>{itemdate.toLocaleDateString()}</td>
                  <td>{item.tilte}</td>
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

        <NewDirectPayment open={open} setOpen={setOpen} />
        <UpdateDirectPayment
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteDirectPayment
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default DirectPayment;
