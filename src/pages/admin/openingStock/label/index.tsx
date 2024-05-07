import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AdminLayout from "@/components/adminLayout";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LabelOpen from "@/components/openingSt/label";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "@/store/hooks";
import { useSession } from "next-auth/react";
const FilterSize = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const labels = useAppSelector((store) => store.typeOfLabel.item);
  const labelStocks = useAppSelector((store) => store.labelStock.item);
  const garage = useAppSelector((store) => store.garage.selectedGarage);
  const concernLabelStock = labelStocks.filter(
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
          တံဆိပ် (လိပ်)
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <AddBoxIcon
            onClick={() => {
              setOpen(true);
            }}
            sx={{ fontSize: 50 }}
          />
        </Box>

        <LabelOpen open={open} setOpen={setOpen} />
        <Box>
          <table border={1}>
            <thead>
              <tr style={{ border: "1px solid" }}>
                <th>နေ့စွဲ</th>
                <th>တံဆိပ်အမျိုးအစား</th>
                <th>လိပ်</th>
                <th>ဝယ်ယူခဲ့သည့်ဆိုင်အမည်</th>
              </tr>
            </thead>
            {concernLabelStock.map((item) => (
              <thead key={item.id}>
                <tr style={{ border: "1px solid" }}>
                  <td>{item.date.toString()}</td>
                  <td>
                    {labels.find((f) => f.id === item.typeOfLabelId)?.name}
                  </td>
                  <td>{item.bandle}</td>
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
