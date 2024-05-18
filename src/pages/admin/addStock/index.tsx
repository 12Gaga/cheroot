import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AdminLayout from "@/components/adminLayout";
import "react-datepicker/dist/react-datepicker.css";
import AddLeaf from "@/components/addSt/addLeaf";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useAppSelector } from "@/store/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateAddLeaf from "@/components/addSt/updateAddLeaf";
import DeleteAddLeaf from "@/components/addSt/deleteAddLeaf";
const AddStock = () => {
  const [open, setOpen] = useState<boolean>(false);
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const leafStocks = useAppSelector((store) => store.leafStock.item);
  const garage = useAppSelector((store) => store.garage.selectedGarage);
  const concernLeafStock = leafStocks.filter(
    (item) => item.garageId === garage?.id
  );
  const concernLeafStockIds = concernLeafStock.map((item) => item.typeOfLeafId);

  const addStock = useAppSelector((store) => store.addStock.item);
  const concernAddStocks = addStock.filter(
    (item) => item.garageId === garage?.id
  );

  const leafAddStockConcern = concernAddStocks.filter((item) =>
    concernLeafStockIds.includes(item.typeOfLeafId as number)
  );
  const leafAddStockConcernStockSeq = leafAddStockConcern.map(
    (item) => item.stockSeq
  );

  const concernStock = concernLeafStock.filter((item) =>
    leafAddStockConcernStockSeq.includes(item.stockSeq)
  );
  const shop = useAppSelector((store) => store.typeOfShop.item);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectStockSeq, setSelectStockSeq] = useState<string>("");
  console.log("concernLeaf", concernStock);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ပိုနံပါတ်
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
              <th>ဖက်အမျိုးအစား</th>
              <th>ပိုနံပါတ်</th>
              <th>ပိဿာ</th>
              <th>ဝယ်ယူခဲ့သည့်ဆိုင်အမည်</th>
            </tr>
          </thead>
          {leafAddStockConcern.map((item) => (
            <thead key={item.id}>
              <tr style={{ border: "1px solid" }}>
                <td>{item.date}</td>
                <td>{item.invNo}</td>
                <td>{item.carNo}</td>
                {concernStock.map((i) => {
                  if (
                    item.date === i.date &&
                    item.typeOfLeafId === i.typeOfLeafId &&
                    item.stockSeq === i.stockSeq
                  ) {
                    return (
                      <>
                        <td>
                          {leaves.find((l) => l.id === i.typeOfLeafId)?.name}
                        </td>
                        <td>{i.batchNo}</td>
                        <td>{i.viss}</td>
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
                    );
                  }
                })}
              </tr>
            </thead>
          ))}
        </table>
        <AddLeaf open={open} setOpen={setOpen} />
        <UpdateAddLeaf
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedStockSeq={selectStockSeq}
        />
        <DeleteAddLeaf
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedStockSeq={selectStockSeq}
        />
      </AdminLayout>
    </>
  );
};
export default AddStock;
