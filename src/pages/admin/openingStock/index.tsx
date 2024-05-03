import { Box, Typography } from "@mui/material";
import AdminLayout from "@/components/adminLayout";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LeafOpen from "@/components/openingSt/leaf";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/store/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const OpeningStock = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const leafStocks = useAppSelector((store) => store.leafStock.item);
  const garage = useAppSelector((store) => store.garage.selectedGarage);

  if (!session) return null;
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

        <LeafOpen open={open} setOpen={setOpen} />

        <Box>
          <table border={1}>
            <thead>
              <tr style={{ border: "1px solid" }}>
                <th>နေ့စွဲ</th>
                <th>ဖက်အမျိုးအစား</th>
                <th>ပိုနံပါတ်</th>
                <th>ပိဿာ</th>
                <th>ဝယ်ယူခဲ့သည့်ဆိုင်အမည်</th>
              </tr>
            </thead>
            {leafStocks.map((item) => {
              const exit = item.garageId === garage?.id;
              if (!exit) return null;
              return (
                <thead key={item.id}>
                  <tr style={{ border: "1px solid" }}>
                    <td>{item.date.toString()}</td>
                    <td>
                      {leaves.find((l) => l.id === item.typeOfLeafId)?.name}
                    </td>

                    <td>{item.batchNo}</td>
                    <td>{item.viss}</td>
                    <td>{item.shop}</td>
                    <td>{<EditIcon />}</td>
                    <td>{<DeleteIcon />}</td>
                  </tr>
                </thead>
              );
            })}
          </table>
        </Box>
      </AdminLayout>
    </>
  );
};
export default OpeningStock;
