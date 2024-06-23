import {
  Box,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/adminLayout";
import "react-datepicker/dist/react-datepicker.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useAppSelector } from "@/store/hooks";
import AddTabacco from "@/components/addSt/addTabacco";
import UpdateAddTabacco from "@/components/addSt/updateTabacco";
import DeleteAddTabacco from "@/components/addSt/deleteAddTabacco";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { checkOnTabaccoItem } from "@/types/tabaccoStockType";
import { AddStock, Tabacco } from "@prisma/client";

const defaultValue: checkOnTabaccoItem = {
  typeOfTabacco: null,
  typeOfShop: null,
};

const TabaccoAdd = () => {
  const [addstocks, setAddStocks] = useState<AddStock[]>([]);
  const [tabaccostocks, setTabaaccoStocks] = useState<Tabacco[]>([]);
  const [selecting, setSelecting] = useState<checkOnTabaccoItem>(defaultValue);

  const [selecteddate, setSelectedDate] = useState<Date>(new Date());

  const [open, setOpen] = useState<boolean>(false);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const tabaccos = useAppSelector((store) => store.typeOfTabacco.item);
  const concernTabacco = tabaccos.filter(
    (item) => item.workShopId === workShop?.id
  );
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
  const tabaccoAddStockConcernStockSeq = tabaccoAddStockConcern.map(
    (item) => item.stockSeq
  );

  const concernStock = concernTabaccoStock.filter((item) =>
    tabaccoAddStockConcernStockSeq.includes(item.stockSeq)
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
    const datatwo = tabaccoAddStockConcern
      .filter((item) => leafSeq.includes(item.stockSeq))
      .sort((a, b) => a.id - b.id);
    setTabaaccoStocks(dataone);
    setAddStocks(datatwo);
    setSelecting({ ...selecting, typeOfTabacco: null, typeOfShop: null });
  };

  const handleTabacco = (tabaccoId: number) => {
    const dataone = concernStock.filter(
      (item) => item.typeOfTabaccoId === tabaccoId
    );
    const tabaccoSeq = dataone.map((item) => item.stockSeq);
    const datatwo = tabaccoAddStockConcern
      .filter((item) => tabaccoSeq.includes(item.stockSeq))
      .sort((a, b) => a.id - b.id);
    setTabaaccoStocks(dataone);
    setAddStocks(datatwo);
    console.log("leaf", addstocks);
    setSelecting({ ...selecting, typeOfTabacco: tabaccoId, typeOfShop: null });
  };

  const handleshop = (shopid: number) => {
    const dataone = concernStock.filter((item) => item.shopId === shopid);
    const shopSeq = dataone.map((item) => item.stockSeq);
    const datatwo = tabaccoAddStockConcern
      .filter((item) => shopSeq.includes(item.stockSeq))
      .sort((a, b) => a.id - b.id);
    setTabaaccoStocks(dataone);
    setAddStocks(datatwo);
    setSelecting({ ...selecting, typeOfShop: shopid, typeOfTabacco: null });
  };

  useEffect(() => {
    if (tabaccoAddStockConcern.length) {
      const data = tabaccoAddStockConcern
        .filter((item) => {
          const itemDate = new Date(item.date);
          return (
            itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
          );
        })
        .sort((a, b) => a.id - b.id);
      console.log("date", data);
      setAddStocks(data);
      setTabaaccoStocks(concernStock);
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
          ဆေးစပ် (တင်း/ပြည်)
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
                ဆေးစပ်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={selecting.typeOfTabacco}
                  onChange={(evt) => {
                    handleTabacco(Number(evt.target.value));
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernTabacco.map((item) => (
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

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
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
            <th style={{ width: 150 }}>ဆေးစပ်အမျိုးအစား</th>
            <th style={{ width: 150 }}>တင်း</th>
            <th style={{ width: 150 }}>ပြည်</th>
            <th style={{ width: 150 }}>အိတ်</th>
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
                {tabaccostocks.map((i) => {
                  const iDate = new Date(i.date);
                  if (
                    itemDate.toLocaleDateString() ===
                      iDate.toLocaleDateString() &&
                    item.typeOfTabaccoId === i.typeOfTabaccoId &&
                    item.stockSeq === i.stockSeq
                  ) {
                    return (
                      <>
                        <td style={{ textAlign: "center" }}>
                          {
                            tabaccos.find((l) => l.id === i.typeOfTabaccoId)
                              ?.name
                          }
                        </td>
                        <td style={{ textAlign: "center" }}>{i.tin}</td>
                        <td style={{ textAlign: "center" }}>{i.pyi}</td>
                        <td style={{ textAlign: "center" }}>{i.bag}</td>
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
        <AddTabacco open={open} setOpen={setOpen} />
        <UpdateAddTabacco
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedStockSeq={selectStockSeq}
        />
        <DeleteAddTabacco
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedStockSeq={selectStockSeq}
        />
      </AdminLayout>
    </>
  );
};
export default TabaccoAdd;
