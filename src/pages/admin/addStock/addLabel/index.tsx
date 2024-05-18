import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AdminLayout from "@/components/adminLayout";
import "react-datepicker/dist/react-datepicker.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useAppSelector } from "@/store/hooks";
import AddLabel from "@/components/addSt/addLabel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateAddLabel from "@/components/addSt/updateAddLabel";
import DeleteAddLabel from "@/components/addSt/deleteAddLabel";
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
  const labelAddStockConcernStockSeq = labelAddStockConcern.map(
    (item) => item.stockSeq
  );

  const concernStock = concernLeafStock.filter((item) =>
    labelAddStockConcernStockSeq.includes(item.stockSeq)
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

        <table border={1}>
          <thead>
            <tr style={{ border: "1px solid" }}>
              <th>နေ့စွဲ</th>
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
                <td>{item.date}</td>
                <td>{item.invNo}</td>
                <td>{item.carNo}</td>
                {concernStock.map(
                  (i) =>
                    item.date === i.date &&
                    item.typeOfLabelId === i.typeOfLabelId &&
                    item.stockSeq === i.stockSeq && (
                      <>
                        <td>
                          {labels.find((l) => l.id === i.typeOfLabelId)?.name}
                        </td>
                        <td>{i.bandle}</td>
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
        <AddLabel open={open} setOpen={setOpen} />
        <UpdateAddLabel
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedStockSeq={selectStockSeq}
        />
        <DeleteAddLabel
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedStockSeq={selectStockSeq}
        />
      </AdminLayout>
    </>
  );
};
export default LabelAdd;
