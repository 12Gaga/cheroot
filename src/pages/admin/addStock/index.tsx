import {
  Box,
  Button,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/adminLayout";
import "react-datepicker/dist/react-datepicker.css";
import AddLeaf from "@/components/addSt/addLeaf";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useAppSelector } from "@/store/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateAddLeaf from "@/components/addSt/updateAddLeaf";
import DeleteAddLeaf from "@/components/addSt/deleteAddLeaf";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AddStock, Leaf } from "@prisma/client";
import { checkOnItem } from "@/types/leafStockType";
import AddLoopLeaf from "@/components/addSt/addLoopLeaf";

const defaultValue: checkOnItem = {
  typeOfLeaf: null,
  typeOfShop: null,
};

const AddStocks = () => {
  const [addstocks, setAddStocks] = useState<AddStock[]>([]);
  const [leafstocks, setLeafStocks] = useState<Leaf[]>([]);
  const [selecting, setSelecting] = useState<checkOnItem>(defaultValue);

  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const [loopOpen, setLoopOpen] = useState<boolean>(false);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const concernLeaf = leaves.filter((item) => item.workShopId === workShop?.id);
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
  const leafAddStockConcernStockSeq = leafAddStockConcern.map(
    (item) => item.stockSeq
  );

  const concernStock = concernLeafStock.filter((item) =>
    leafAddStockConcernStockSeq.includes(item.stockSeq)
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
    const leafSeq = dataone.map((item) => item.stockSeq);
    const datatwo = leafAddStockConcern
      .filter((item) => leafSeq.includes(item.stockSeq))
      .sort((a, b) => a.id - b.id);
    setLeafStocks(dataone);
    setAddStocks(datatwo);
    setSelecting({ ...selecting, typeOfLeaf: null, typeOfShop: null });
  };

  const handleLeaf = (leafId: number) => {
    const dataone = concernStock.filter((item) => item.typeOfLeafId === leafId);
    const leafSeq = dataone.map((item) => item.stockSeq);
    const datatwo = leafAddStockConcern
      .filter((item) => leafSeq.includes(item.stockSeq))
      .sort((a, b) => a.id - b.id);
    setLeafStocks(dataone);
    setAddStocks(datatwo);
    console.log("leaf", addstocks);
    setSelecting({ ...selecting, typeOfLeaf: leafId, typeOfShop: null });
  };

  const handleshop = (shopid: number) => {
    const dataone = concernStock.filter((item) => item.shopId === shopid);
    const shopSeq = dataone.map((item) => item.stockSeq);
    const datatwo = leafAddStockConcern
      .filter((item) => shopSeq.includes(item.stockSeq))
      .sort((a, b) => a.id - b.id);
    setLeafStocks(dataone);
    setAddStocks(datatwo);
    setSelecting({ ...selecting, typeOfShop: shopid, typeOfLeaf: null });
  };

  useEffect(() => {
    if (leafAddStockConcern.length) {
      const data = leafAddStockConcern
        .filter((item) => {
          const itemDate = new Date(item.date);
          return (
            itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
          );
        })
        .sort((a, b) => a.id - b.id);
      setAddStocks(data);
      setLeafStocks(concernStock);
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
          ပိုနံပါတ်
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
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ဖက်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={selecting.typeOfLeaf}
                  onChange={(evt) => {
                    handleLeaf(Number(evt.target.value));
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernLeaf.map((item) => (
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
            <th style={{ width: 150 }}>ဖက်အမျိုးအစား</th>
            <th style={{ width: 150 }}>ပိုနံပါတ်</th>
            <th style={{ width: 150 }}>ပိဿာ</th>
            <th style={{ width: 200 }}>ဝယ်ယူခဲ့သည့်ဆိုင်အမည်</th>
          </tr>

          {addstocks.map((item) => {
            const itemDate = new Date(item.date);
            return (
              <tr key={item.id}>
                <th>{(no += 1)}</th>
                <td style={{ textAlign: "center" }}>
                  {itemDate.toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>{item.invNo}</td>
                <td style={{ textAlign: "center" }}>{item.carNo}</td>
                {leafstocks.map((i) => {
                  const iDate = new Date(i.date);
                  if (
                    itemDate.toLocaleDateString() ===
                      iDate.toLocaleDateString() &&
                    item.typeOfLeafId === i.typeOfLeafId &&
                    item.stockSeq === i.stockSeq
                  ) {
                    return (
                      <>
                        <td style={{ textAlign: "center" }}>
                          {leaves.find((l) => l.id === i.typeOfLeafId)?.name}
                        </td>
                        <td style={{ textAlign: "center" }}>{i.batchNo}</td>
                        <td style={{ textAlign: "center" }}>{i.viss}</td>
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
        <AddLeaf open={open} setOpen={setOpen} />
        <UpdateAddLeaf
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedStockSeq={selectStockSeq}
        />
        <DeleteAddLeaf
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedStockSeq={selectStockSeq}
        />
        <Box sx={{ position: "fixed", right: 3, bottom: 5 }}>
          <Button variant="contained" onClick={() => setLoopOpen(true)}>
            add stock by looping
          </Button>
        </Box>
        <AddLoopLeaf loopOpen={loopOpen} setLoopOpen={setLoopOpen} />
      </AdminLayout>
    </>
  );
};
export default AddStocks;
