import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AdminLayout from "@/components/adminLayout";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FilterSizeOpen from "@/components/openingSt/filterSize";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "@/store/hooks";
import { useSession } from "next-auth/react";
import UpdateFilterSizeOpen from "@/components/openingSt/updateFilterSize";
import DeleteFilterSizeOpen from "@/components/openingSt/deleteFilterSize";
const FilterSize = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const filterSizes = useAppSelector((store) => store.typeOfFilterSize.item);
  const filterSizeStocks = useAppSelector(
    (store) => store.filterSizeStock.item
  );
  const garage = useAppSelector((store) => store.garage.selectedGarage);
  const concernFilterSizeStock = filterSizeStocks.filter(
    (item) => item.garageId === garage?.id
  );
  const addStocks = useAppSelector((store) => store.addStock.item);
  const concernAddStocks = addStocks.filter(
    (item) => item.garageId === garage?.id
  );
  const addStockStockSeq = concernAddStocks.map((item) => item.stockSeq);
  const concernFilterSize = concernFilterSizeStock.filter(
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

        <Box>
          <table border={1}>
            <thead>
              <tr style={{ border: "1px solid" }}>
                <th>နေ့စွဲ</th>
                <th>အဆီခံအမျိုးအစား</th>
                <th>အရေအတွက်</th>
                <th>အိတ်</th>
                <th>ဝယ်ယူခဲ့သည့်ဆိုင်အမည်</th>
              </tr>
            </thead>
            {concernFilterSize.map((item) => {
              const itemdate = new Date(item.date);
              return (
                <thead key={item.id}>
                  <tr style={{ border: "1px solid" }}>
                    <td>{itemdate.toLocaleDateString()}</td>
                    <td>
                      {
                        filterSizes.find(
                          (f) => f.id === item.typeOfFilterSizeId
                        )?.name
                      }
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
        <FilterSizeOpen open={open} setOpen={setOpen} />
        <UpdateFilterSizeOpen
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteFilterSizeOpen
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default FilterSize;
