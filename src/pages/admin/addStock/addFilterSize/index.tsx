import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AdminLayout from "@/components/adminLayout";
import "react-datepicker/dist/react-datepicker.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useAppSelector } from "@/store/hooks";
import AddFilterSize from "@/components/addSt/addFilterSize";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateAddFilterSize from "@/components/addSt/updateFilterSize";
import DeleteAddFilterSize from "@/components/addSt/deleteAddFilterSize";
const FilterSizeAdd = () => {
  const [open, setOpen] = useState<boolean>(false);
  const filterSizes = useAppSelector((store) => store.typeOfFilterSize.item);
  const filterSizeStocks = useAppSelector(
    (store) => store.filterSizeStock.item
  );
  const garage = useAppSelector((store) => store.garage.selectedGarage);
  const concernFilterSizeStock = filterSizeStocks.filter(
    (item) => item.garageId === garage?.id
  );
  const concernFilterSizeStockIds = concernFilterSizeStock.map(
    (item) => item.typeOfFilterSizeId
  );

  const addStock = useAppSelector((store) => store.addStock.item);
  const concernAddStocks = addStock.filter(
    (item) => item.garageId === garage?.id
  );

  const filterSizeAddStockConcern = concernAddStocks.filter((item) =>
    concernFilterSizeStockIds.includes(item.typeOfFilterSizeId as number)
  );
  const filterSizeAddStockConcernStockSeq = filterSizeAddStockConcern.map(
    (item) => item.stockSeq
  );

  const concernStock = concernFilterSizeStock.filter((item) =>
    filterSizeAddStockConcernStockSeq.includes(item.stockSeq)
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
          အဆီခံ (အရေအတွက်/အိတ်)
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
              <th>အဆီခံအမျိုးအစား</th>
              <th>အရေအတွက်</th>
              <th>အိတ်</th>
              <th>ဝယ်ယူခဲ့သည့်ဆိုင်အမည်</th>
            </tr>
          </thead>
          {filterSizeAddStockConcern.map((item) => (
            <thead key={item.id}>
              <tr style={{ border: "1px solid" }}>
                <td>{item.date}</td>
                <td>{item.invNo}</td>
                <td>{item.carNo}</td>
                {concernStock.map(
                  (i) =>
                    item.date === i.date &&
                    item.typeOfFilterSizeId === i.typeOfFilterSizeId &&
                    item.stockSeq === i.stockSeq && (
                      <>
                        <td>
                          {
                            filterSizes.find(
                              (f) => f.id === i.typeOfFilterSizeId
                            )?.name
                          }
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
        <AddFilterSize open={open} setOpen={setOpen} />
        <UpdateAddFilterSize
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedStockSeq={selectStockSeq}
        />
        <DeleteAddFilterSize
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedStockSeq={selectStockSeq}
        />
      </AdminLayout>
    </>
  );
};
export default FilterSizeAdd;
