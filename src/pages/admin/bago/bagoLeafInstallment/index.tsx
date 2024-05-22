import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AdminLayout from "@/components/adminLayout";
import "react-datepicker/dist/react-datepicker.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useAppSelector } from "@/store/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NewBagoLeafInstallment from "@/components/bago/newBagoLeafInstallment";
import UpdateBagoLeafInstallment from "@/components/bago/updateBagoLeafInstallment";
import DeleteBagoLeafInstallment from "@/components/bago/deleteBagoLeafInstallment";
const BagoLeafInstallment = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workshop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const bagoInstallment = useAppSelector(
    (store) => store.bagoLeafInstallment.item
  );
  const shops = useAppSelector((store) => store.typeOfShop.item);
  const concernBagoInstallment = bagoInstallment.filter(
    (item) => item.workShopId === workshop?.id
  );
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ပဲခူးဖက်အရစ်ကျစာရင်း
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
              <th>ဆိုင်နာမည်</th>
              <th>ပေးရန်ကျန်ငွေ</th>
              <th>သွင်းငွေ</th>
              <th>လက်ကျန်ငွေ</th>
            </tr>
          </thead>
          {concernBagoInstallment.map((item) => {
            return (
              <>
                <thead key={item.id}>
                  <tr style={{ border: "1px solid" }}>
                    <td>{item.date}</td>
                    <td>{shops.find((s) => s.id === item.shopId)?.name}</td>
                    <td>{item.cashBalance}</td>
                    <td>{item.payBalance}</td>
                    <td>{item.cashBalance - item.payBalance}</td>
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
              </>
            );
          })}
        </table>
        <NewBagoLeafInstallment open={open} setOpen={setOpen} />
        <UpdateBagoLeafInstallment
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteBagoLeafInstallment
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default BagoLeafInstallment;
