import {
  Box,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/adminLayout";
import "react-datepicker/dist/react-datepicker.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useAppSelector } from "@/store/hooks";
import AddLabel from "@/components/addSt/addLabel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateAddLabel from "@/components/addSt/updateAddLabel";
import DeleteAddLabel from "@/components/addSt/deleteAddLabel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { checkOnLabelItem } from "@/types/labelStockType";
import { AddStock, Label } from "@prisma/client";

const defaultValue: checkOnLabelItem = {
  typeOfLabel: null,
  typeOfShop: null,
};

const LabelAdd = () => {
  const [addstocks, setAddStocks] = useState<AddStock[]>([]);
  const [labelstocks, setLabelStocks] = useState<Label[]>([]);
  const [selecting, setSelecting] = useState<checkOnLabelItem>(defaultValue);

  const [selecteddate, setSelectedDate] = useState<Date>(new Date());

  const [open, setOpen] = useState<boolean>(false);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const labels = useAppSelector((store) => store.typeOfLabel.item);
  const concernLabel = labels.filter(
    (item) => item.workShopId === workShop?.id
  );
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
  const concernShop = shop.filter((item) => item.workShopId === workShop?.id);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectStockSeq, setSelectStockSeq] = useState<string>("");

  const handleDate = (date: Date) => {
    const dataone = concernStock.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate.toLocaleDateString() === date.toLocaleDateString();
    });
    const labelSeq = dataone.map((item) => item.stockSeq);
    const datatwo = labelAddStockConcern
      .filter((item) => labelSeq.includes(item.stockSeq))
      .sort((a, b) => a.id - b.id);
    setLabelStocks(dataone);
    setAddStocks(datatwo);
    setSelecting({ ...selecting, typeOfLabel: null, typeOfShop: null });
  };

  const handleLabel = (labelId: number) => {
    const dataone = concernStock.filter(
      (item) => item.typeOfLabelId === labelId
    );
    const leafSeq = dataone.map((item) => item.stockSeq);
    const datatwo = labelAddStockConcern
      .filter((item) => leafSeq.includes(item.stockSeq))
      .sort((a, b) => a.id - b.id);
    setLabelStocks(dataone);
    setAddStocks(datatwo);
    console.log("leaf", addstocks);
    setSelecting({ ...selecting, typeOfLabel: labelId, typeOfShop: null });
  };

  const handleshop = (shopid: number) => {
    const dataone = concernStock.filter((item) => item.shopId === shopid);
    const shopSeq = dataone.map((item) => item.stockSeq);
    const datatwo = labelAddStockConcern
      .filter((item) => shopSeq.includes(item.stockSeq))
      .sort((a, b) => a.id - b.id);
    setLabelStocks(dataone);
    setAddStocks(datatwo);
    setSelecting({ ...selecting, typeOfShop: shopid, typeOfLabel: null });
  };

  useEffect(() => {
    if (labelAddStockConcern.length) {
      const data = labelAddStockConcern
        .filter((item) => {
          const itemDate = new Date(item.date);
          return (
            itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
          );
        })
        .sort((a, b) => a.id - b.id);
      console.log("date", data);
      setAddStocks(data);
      setLabelStocks(concernStock);
    }
  }, [addStock]);
  let no = 0;
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          တံဆိပ် (လိပ်)
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ mr: 2, display: "flex", mt: 4, width: 300 }}>
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
            <DatePicker
              selected={selecteddate}
              onChange={(date) => {
                setSelectedDate(date as Date);
                handleDate(date as Date);
              }}
            />
          </Box>
          <Box sx={{ width: 300 }}>
            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 200 }}>
                တံဆိပ်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={selecting.typeOfLabel}
                  onChange={(evt) => {
                    handleLabel(Number(evt.target.value));
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernLabel.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box sx={{ width: 300 }}>
            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ဝယ်ယူခဲ့သည့်ဆိုင်
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={selecting.typeOfShop}
                  onChange={(evt) => {
                    handleshop(Number(evt.target.value));
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernShop.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <AddBoxIcon
            onClick={() => {
              setOpen(true);
            }}
            sx={{ fontSize: 50 }}
          />
        </Box>

        <table border={1}>
          <tr>
            <th style={{ width: 50 }}>စဉ်</th>
            <th style={{ width: 150 }}>နေ့စွဲ</th>
            <th style={{ width: 150 }}>ဘောက်ချာနံပါတ်</th>
            <th style={{ width: 150 }}>ကားနံပါတ်</th>
            <th style={{ width: 150 }}>တံဆိပ်အမျိုးအစား</th>
            <th style={{ width: 150 }}>လိပ်</th>
            <th style={{ width: 200 }}>ဝယ်ယူခဲ့သည့်ဆိုင်အမည်</th>
          </tr>

          {addstocks.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <tr key={item.id}>
                <th>{(no += 1)}</th>
                <td style={{ textAlign: "center" }}>
                  {itemdate.toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>{item.invNo}</td>
                <td style={{ textAlign: "center" }}>{item.carNo}</td>
                {labelstocks.map((i) => {
                  const iDate = new Date(i.date);
                  if (
                    itemdate.toLocaleDateString() ===
                      iDate.toLocaleDateString() &&
                    item.typeOfLabelId === i.typeOfLabelId &&
                    item.stockSeq === i.stockSeq
                  ) {
                    return (
                      <>
                        <td style={{ textAlign: "center" }}>
                          {labels.find((l) => l.id === i.typeOfLabelId)?.name}
                        </td>
                        <td style={{ textAlign: "center" }}>{i.bandle}</td>
                        <td style={{ textAlign: "center" }}>
                          {shop.find((s) => s.id === i.shopId)?.name}
                        </td>
                        <td
                          style={{ textAlign: "center", width: 50 }}
                          onClick={() => {
                            setUpdateOpen(true),
                              setSelectStockSeq(item.stockSeq);
                          }}
                        >
                          {<EditIcon />}
                        </td>
                        <td
                          style={{ textAlign: "center", width: 50 }}
                          onClick={() => {
                            setDeleteOpen(true),
                              setSelectStockSeq(item.stockSeq);
                          }}
                        >
                          {<DeleteIcon />}
                        </td>
                      </>
                    );
                  }
                })}
              </tr>
            );
          })}
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
