import { Box, Typography } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import AdminLayout from "@/components/adminLayout";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TabaccoOpen from "@/components/openingSt/tabacco";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "@/store/hooks";
import { useSession } from "next-auth/react";
import UpdateTabaccoOpen from "@/components/openingSt/updateTabacco";
import DeleteTabaccoOpen from "@/components/openingSt/deleteTabacco";
const Tabacco = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const tabacco = useAppSelector((store) => store.typeOfTabacco.item);
  const tabaccoStocks = useAppSelector((store) => store.tabaccoStock.item);
  const garage = useAppSelector((store) => store.garage.selectedGarage);
  const concernTabaccoStock = tabaccoStocks.filter(
    (item) => item.garageId === garage?.id
  );
  const addStocks = useAppSelector((store) => store.addStock.item);
  const concernAddStocks = addStocks.filter(
    (item) => item.garageId === garage?.id
  );
  const addStockStockSeq = concernAddStocks.map((item) => item.stockSeq);
  const concernTabacco = concernTabaccoStock.filter(
    (item) => !addStockStockSeq.includes(item.stockSeq)
  );
  const shop = useAppSelector((store) => store.typeOfShop.item);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);
  if (!session) return null;
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ဆေးစပ် (တင်း/ပြည်)
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <AddBoxIcon
            onClick={() => {
              setOpen(true);
            }}
            sx={{ fontSize: 50 }}
          />
        </Box>

        <Box>
          <table border={1}>
            <thead>
              <tr style={{ border: "1px solid" }}>
                <th>နေ့စွဲ</th>
                <th>ဆေးစပ်အမျိုးအစား</th>
                <th>တင်း</th>
                <th>ပြည်</th>
                <th>အိတ်</th>
                <th>ဝယ်ယူခဲ့သည့်ဆိုင်အမည်</th>
              </tr>
            </thead>
            {concernTabacco.map((item) => (
              <thead key={item.id}>
                <tr style={{ border: "1px solid" }}>
                  <td>{item.date.toString()}</td>
                  <td>
                    {tabacco.find((f) => f.id === item.typeOfTabaccoId)?.name}
                  </td>
                  <td>{item.tin}</td>
                  <td>{item.pyi}</td>
                  <td>{item.bag}</td>
                  <td>{shop.find((s) => s.id === item.shopId)?.name}</td>
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
        </Box>
        <TabaccoOpen open={open} setOpen={setOpen} />
        <UpdateTabaccoOpen
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteTabaccoOpen
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default Tabacco;
