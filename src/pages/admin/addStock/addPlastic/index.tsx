import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AdminLayout from "@/components/adminLayout";
import "react-datepicker/dist/react-datepicker.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useAppSelector } from "@/store/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPlastic from "@/components/addSt/addPlastic";
import UpdateAddPlastic from "@/components/addSt/updateAddPlastic";
import DeleteAddPlastic from "@/components/addSt/deleteAddPlastic";
const PlasticAdd = () => {
  const [open, setOpen] = useState<boolean>(false);
  const plastics = useAppSelector((store) => store.typeOfPlastic.item);
  const plasticStocks = useAppSelector((store) => store.plasticStock.item);
  const garage = useAppSelector((store) => store.garage.selectedGarage);
  const concernPlasticStock = plasticStocks.filter(
    (item) => item.garageId === garage?.id
  );
  const concernPlasticStockIds = concernPlasticStock.map(
    (item) => item.plasticId
  );

  const addStock = useAppSelector((store) => store.addStock.item);
  const concernAddStocks = addStock.filter(
    (item) => item.garageId === garage?.id
  );

  const plasticAddStockConcern = concernAddStocks.filter((item) =>
    concernPlasticStockIds.includes(item.typeOfPlasticId as number)
  );
  const plasticAddStockConcernStockSeq = plasticAddStockConcern.map(
    (item) => item.stockSeq
  );

  const concernStock = concernPlasticStock.filter((item) =>
    plasticAddStockConcernStockSeq.includes(item.stockSeq)
  );
  const shop = useAppSelector((store) => store.typeOfShop.item);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectStockSeq, setSelectStockSeq] = useState<string>("");
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

        <table border={1}>
          <thead>
            <tr style={{ border: "1px solid" }}>
              <th>နေ့စွဲ</th>
              <th>ဘောက်ချာနံပါတ်</th>
              <th>ကားနံပါတ်</th>
              <th>တံဆိပ်အမျိုးအစား</th>
              <th>လိပ်</th>
              <th>ဝယ်ယူခဲ့သည့်ဆိုင်အမည်</th>
            </tr>
          </thead>
          {plasticAddStockConcern.map((item) => (
            <thead key={item.id}>
              <tr style={{ border: "1px solid" }}>
                <td>{item.date}</td>
                <td>{item.invNo}</td>
                <td>{item.carNo}</td>
                {concernStock.map(
                  (i) =>
                    item.date === i.date &&
                    item.typeOfPlasticId === i.plasticId &&
                    item.stockSeq === i.stockSeq && (
                      <>
                        <td>
                          {plastics.find((l) => l.id === i.plasticId)?.name}
                        </td>
                        <td>{i.quantity}</td>
                        <td>{i.bag}</td>
                        <td>{shop.find((s) => s.id === i.shopId)?.name}</td>
                        <td
                          onClick={() => {
                            setUpdateOpen(true),
                              setSelectStockSeq(item.stockSeq);
                          }}
                        >
                          {<EditIcon />}
                        </td>
                        <td
                          onClick={() => {
                            setDeleteOpen(true),
                              setSelectStockSeq(item.stockSeq);
                          }}
                        >
                          {<DeleteIcon />}
                        </td>
                      </>
                    )
                )}
              </tr>
            </thead>
          ))}
        </table>
        <AddPlastic open={open} setOpen={setOpen} />
        <UpdateAddPlastic
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedStockSeq={selectStockSeq}
        />
        <DeleteAddPlastic
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedStockSeq={selectStockSeq}
        />
      </AdminLayout>
    </>
  );
};
export default PlasticAdd;
