import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AdminLayout from "@/components/adminLayout";
import "react-datepicker/dist/react-datepicker.css";
import AddLeaf from "@/components/addSt/addLeaf";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useAppSelector } from "@/store/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
  const leafAddStockConcernDate = leafAddStockConcern.map((item) => item.date);

  const concernStock = concernLeafStock.filter((item) =>
    leafAddStockConcernDate.includes(item.date)
  );
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
        <AddLeaf open={open} setOpen={setOpen} />
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
                    item.typeOfLeafId === i.typeOfLeafId
                  ) {
                    return (
                      <>
                        <td>
                          {leaves.find((l) => l.id === i.typeOfLeafId)?.name}
                        </td>
                        <td>{i.batchNo}</td>
                        <td>{i.viss}</td>
                        <td>{i.shop}</td>
                        <td>{<EditIcon />}</td>
                        <td>{<DeleteIcon />}</td>
                      </>
                    );
                  }
                })}
              </tr>
            </thead>
          ))}
        </table>
      </AdminLayout>
    </>
  );
};
export default AddStock;
