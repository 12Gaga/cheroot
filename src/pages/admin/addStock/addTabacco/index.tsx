import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import AdminLayout from "@/components/adminLayout";
import "react-datepicker/dist/react-datepicker.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useAppSelector } from "@/store/hooks";
import AddTabacco from "@/components/addSt/addTabacco";
const TabaccoAdd = () => {
  const [open, setOpen] = useState<boolean>(false);
  const tabaccos = useAppSelector((store) => store.typeOfTabacco.item);
  const tabaccoStocks = useAppSelector((store) => store.tabaccoStock.item);
  const garage = useAppSelector((store) => store.garage.selectedGarage);
  const concernTabaccoStock = tabaccoStocks.filter(
    (item) => item.garageId === garage?.id
  );
  const concernTabaccoStockIds = concernTabaccoStock.map(
    (item) => item.typeOfTabaccoId
  );

  const addStock = useAppSelector((store) => store.addStock.item);
  const concernAddStocks = addStock.filter(
    (item) => item.garageId === garage?.id
  );

  const tabaccoAddStockConcern = concernAddStocks.filter((item) =>
    concernTabaccoStockIds.includes(item.typeOfTabaccoId as number)
  );
  const tabaccoAddStockConcernDate = tabaccoAddStockConcern.map(
    (item) => item.date
  );

  const concernStock = concernTabaccoStock.filter((item) =>
    tabaccoAddStockConcernDate.includes(item.date)
  );
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ဆေးစပ် (တင်း/ပြည်)
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <AddBoxIcon
            onClick={() => {
              setOpen(true);
            }}
            sx={{ fontSize: 50 }}
          />
        </Box>
        <AddTabacco open={open} setOpen={setOpen} />
        <table border={1}>
          <thead>
            <tr style={{ border: "1px solid" }}>
              {/* <th>နေ့စွဲ</th> */}
              <th>ဘောက်ချာနံပါတ်</th>
              <th>ကားနံပါတ်</th>
              <th>ဆေးစပ်အမျိုးအစား</th>
              <th>တင်း</th>
              <th>ပြည်</th>
              <th>အိတ်</th>
              <th>ဝယ်ယူခဲ့သည့်ဆိုင်အမည်</th>
            </tr>
          </thead>
          {tabaccoAddStockConcern.map((item) => (
            <thead key={item.id}>
              <tr style={{ border: "1px solid" }}>
                <td>{item.invNo}</td>
                <td>{item.carNo}</td>
                {concernStock.map(
                  (i) =>
                    item.date === i.date &&
                    item.typeOfLeafId === i.typeOfTabaccoId && (
                      <>
                        <td>
                          {
                            tabaccos.find((l) => l.id === i.typeOfTabaccoId)
                              ?.name
                          }
                        </td>
                        <td>{i.tin}</td>
                        <td>{i.pyi}</td>
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
export default TabaccoAdd;
