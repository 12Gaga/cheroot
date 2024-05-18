import { Box, Typography } from "@mui/material";
import AdminLayout from "@/components/adminLayout";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LeafOpen from "@/components/openingSt/leaf";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/store/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PlasticOpen from "@/components/openingSt/plastic";
import UpdatePlasticOpen from "@/components/openingSt/updatePlastic";
import DeletePlasticOpen from "@/components/openingSt/deletePlastic";
const OpeningPlastic = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const plastics = useAppSelector((store) => store.typeOfPlastic.item);
  const plasticStock = useAppSelector((store) => store.plasticStock.item);
  const garage = useAppSelector((store) => store.garage.selectedGarage);
  const concernPlasticStocks = plasticStock.filter(
    (item) => item.garageId === garage?.id
  );
  const addStocks = useAppSelector((store) => store.addStock.item);
  const concernAddStocks = addStocks.filter(
    (item) => item.garageId === garage?.id
  );
  const addStockStockSeq = concernAddStocks.map((item) => item.stockSeq);
  const concernPlastic = concernPlasticStocks.filter(
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
          ပလပ်စတစ်
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
                <th>ပလပ်စတစ်အမျိုးအစား</th>
                <th>အရေအတွက်</th>
                <th>အိတ်</th>
                <th>ဝယ်ယူခဲ့သည့်ဆိုင်အမည်</th>
              </tr>
            </thead>
            {concernPlastic.map((item) => {
              return (
                <thead key={item.id}>
                  <tr style={{ border: "1px solid" }}>
                    <td>{item.date}</td>
                    <td>
                      {plastics.find((p) => p.id === item.plasticId)?.name}
                    </td>

                    <td>{item.quantity}</td>
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
              );
            })}
          </table>
        </Box>
        <PlasticOpen open={open} setOpen={setOpen} />
        <UpdatePlasticOpen
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeletePlasticOpen
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default OpeningPlastic;
