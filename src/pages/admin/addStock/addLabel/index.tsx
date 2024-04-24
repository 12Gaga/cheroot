import { Box, Typography } from "@mui/material";

import { useState } from "react";
import AdminLayout from "@/components/adminLayout";
import "react-datepicker/dist/react-datepicker.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useAppSelector } from "@/store/hooks";
import AddLabel from "@/components/addSt/addLabel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const LabelAdd = () => {
  const [open, setOpen] = useState<boolean>(false);
  const labels = useAppSelector((store) => store.typeOfLabel.item);
  const labelStocks = useAppSelector((store) => store.labelStock.item);
  const garage = useAppSelector((store) => store.garage.selectedGarage);
  const concernLeafStock = labelStocks.filter(
    (item) => item.garageId === garage?.id
  );
  const concernLabelStockIds = concernLeafStock.map(
    (item) => item.typeOfLabelId
  );

  const addStock = useAppSelector((store) => store.addStock.item);
  const concernAddStocks = addStock.filter(
    (item) => item.garageId === garage?.id
  );

  const labelAddStockConcern = concernAddStocks.filter((item) =>
    concernLabelStockIds.includes(item.typeOfLabelId as number)
  );
  const labelAddStockConcernDate = labelAddStockConcern.map(
    (item) => item.date
  );

  const concernStock = concernLeafStock.filter((item) =>
    labelAddStockConcernDate.includes(item.date)
  );

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
        <AddLabel open={open} setOpen={setOpen} />
        <table border={1}>
          <thead>
            <tr style={{ border: "1px solid" }}>
              {/* <th>နေ့စွဲ</th> */}
              <th>ဘောက်ချာနံပါတ်</th>
              <th>ကားနံပါတ်</th>
              <th>တံဆိပ်အမျိုးအစား</th>
              <th>လိပ်</th>
              <th>ဝယ်ယူခဲ့သည့်ဆိုင်အမည်</th>
            </tr>
          </thead>
          {labelAddStockConcern.map((item) => (
            <thead key={item.id}>
              <tr style={{ border: "1px solid" }}>
                <td>{item.invNo}</td>
                <td>{item.carNo}</td>
                {concernStock.map(
                  (i) =>
                    item.date === i.date &&
                    item.typeOfLeafId === i.typeOfLabelId && (
                      <>
                        <td>
                          {labels.find((l) => l.id === i.typeOfLabelId)?.name}
                        </td>
                        <td>{i.bandle}</td>
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
export default LabelAdd;
