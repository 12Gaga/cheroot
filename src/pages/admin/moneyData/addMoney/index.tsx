import AdminLayout from "@/components/adminLayout";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NewAddMoney from "@/components/money/newAddMoney";
import { useAppSelector } from "@/store/hooks";
import UpdateAddMoney from "@/components/money/updateAddMoney";
import DeleteReplenishment from "@/components/money/deleteReplenishment";
import { ReplenishmentMoney } from "@prisma/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AddMoney = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const replenishment = useAppSelector((store) => store.replenishment.item);
  const concernReplenishment = replenishment.filter(
    (item) => item.workShopId === workShop?.id
  );
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);

  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [replenishmetnt, setReplenishment] = useState<ReplenishmentMoney[]>([]);

  const handleDate = (date: Date) => {
    const data = concernReplenishment.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate.toLocaleDateString() === date.toLocaleDateString();
    });
    setReplenishment(data);
  };

  useEffect(() => {
    if (concernReplenishment.length) {
      const data = concernReplenishment.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
        );
      });
      setReplenishment(data);
    }
  }, [replenishment]);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ဖြည့်တင်းငွေစာရင်း
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
              <th>ပမာဏ</th>
            </tr>
          </thead>
          {replenishmetnt.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <thead key={item.id}>
                <tr style={{ border: "1px solid" }}>
                  <td>{itemdate.toLocaleDateString()}</td>
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

        <NewAddMoney open={open} setOpen={setOpen} />
        <UpdateAddMoney
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteReplenishment
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default AddMoney;
