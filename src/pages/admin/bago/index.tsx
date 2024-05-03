import { Box, Typography } from "@mui/material";
import DatePicker from "react-datepicker";
import { useState } from "react";
import AdminLayout from "@/components/adminLayout";
import "react-datepicker/dist/react-datepicker.css";
import AddLeaf from "@/components/addSt/addLeaf";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useAppSelector } from "@/store/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NewBagoLeaf from "@/components/bago/newBagoLeaf";
const Bago = () => {
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

  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ဖက်ဝယ်ယူခြင်း
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <AddBoxIcon
            onClick={() => {
              setOpen(true);
            }}
            sx={{ fontSize: 50 }}
          />
        </Box>
        <NewBagoLeaf open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default Bago;
