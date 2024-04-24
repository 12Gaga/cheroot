import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AdminLayout from "@/components/adminLayout";
import "react-datepicker/dist/react-datepicker.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useAppSelector } from "@/store/hooks";
import AddFilterSize from "@/components/addSt/addFilterSize";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
  const filterSizeAddStockConcernDate = filterSizeAddStockConcern.map(
    (item) => item.date
  );

  const concernStock = concernFilterSizeStock.filter((item) =>
    filterSizeAddStockConcernDate.includes(item.date)
  );
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
        <AddFilterSize open={open} setOpen={setOpen} />
        <table border={1}>
          <thead>
            <tr style={{ border: "1px solid" }}>
              {/* <th>နေ့စွဲ</th> */}
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
                <td>{item.invNo}</td>
                <td>{item.carNo}</td>
                {concernStock.map(
                  (i) =>
                    item.date === i.date &&
                    item.typeOfFilterSizeId === i.typeOfFilterSizeId && (
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
                        <td>{i.shop}</td>
                      </>
                    )
                )}
                <td>{<EditIcon />}</td>
                <td>{<DeleteIcon />}</td>
              </tr>
            </thead>
          ))}
        </table>
      </AdminLayout>
    </>
  );
};
export default FilterSizeAdd;
