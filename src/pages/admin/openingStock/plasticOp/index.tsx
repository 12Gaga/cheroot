import { Box, Typography } from "@mui/material";
import AdminLayout from "@/components/adminLayout";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useState } from "react";
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
  const concernPlastic = concernPlasticStocks
    .filter((item) => !addStockStockSeq.includes(item.stockSeq))
    .sort((a, b) => a.id - b.id);
  const shop = useAppSelector((store) => store.typeOfShop.item);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);
  let no = 0;
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
            <tr>
              <th style={{ width: 50 }}>စဉ်</th>
              <th style={{ width: 150 }}>နေ့စွဲ</th>
              <th style={{ width: 200 }}>ပလပ်စတစ်အမျိုးအစား</th>
              <th style={{ width: 150 }}>အရေအတွက်</th>
              <th style={{ width: 150 }}>အိတ်</th>
              <th style={{ width: 200 }}>ဝယ်ယူခဲ့သည့်ဆိုင်အမည်</th>
            </tr>

            {concernPlastic.map((item) => {
              const itemdate = new Date(item.date);
              return (
                <tr key={item.id}>
                  <th>{(no += 1)}</th>
                  <td style={{ textAlign: "center" }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {plastics.find((p) => p.id === item.plasticId)?.name}
                  </td>

                  <td style={{ textAlign: "center" }}>{item.quantity}</td>
                  <td style={{ textAlign: "center" }}>{item.bag}</td>
                  <td style={{ textAlign: "center" }}>
                    {shop.find((s) => s.id === item.shopId)?.name}
                  </td>
                  <td
                    style={{ textAlign: "center", width: 50 }}
                    onClick={() => {
                      setUpdateOpen(true), setSelectId(item.id);
                    }}
                  >
                    {<EditIcon />}
                  </td>
                  <td
                    style={{ textAlign: "center", width: 50 }}
                    onClick={() => {
                      setDeleteOpen(true), setSelectId(item.id);
                    }}
                  >
                    {<DeleteIcon />}
                  </td>
                </tr>
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
