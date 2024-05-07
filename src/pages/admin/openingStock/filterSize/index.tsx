import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AdminLayout from "@/components/adminLayout";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FilterSizeOpen from "@/components/openingSt/filterSize";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "@/store/hooks";
import { useSession } from "next-auth/react";
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
  const shop = useAppSelector((store) => store.typeOfShop.item);
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

        <FilterSizeOpen open={open} setOpen={setOpen} />
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
            {concernFilterSizeStock.map((item) => (
              <thead key={item.id}>
                <tr style={{ border: "1px solid" }}>
                  <td>{item.date.toString()}</td>
                  <td>
                    {
                      filterSizes.find((f) => f.id === item.typeOfFilterSizeId)
                        ?.name
                    }
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.bag}</td>
                  <td>{shop.find((s) => s.id === item.shopId)?.name}</td>
                  <td>{<EditIcon />}</td>
                  <td>{<DeleteIcon />}</td>
                </tr>
              </thead>
            ))}
          </table>
        </Box>
      </AdminLayout>
    </>
  );
};
export default FilterSize;
