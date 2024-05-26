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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPlastic from "@/components/addSt/addPlastic";
import UpdateAddPlastic from "@/components/addSt/updateAddPlastic";
import DeleteAddPlastic from "@/components/addSt/deleteAddPlastic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { checkOnPlasticItem } from "@/types/plasticStockType";
import { AddStock, Plastic } from "@prisma/client";

const defaultValue: checkOnPlasticItem = {
  typeOfPlastic: null,
  typeOfShop: null,
};

const PlasticAdd = () => {
  const [addstocks, setAddStocks] = useState<AddStock[]>([]);
  const [plasticstocks, setPlasticStocks] = useState<Plastic[]>([]);
  const [selecting, setSelecting] = useState<checkOnPlasticItem>(defaultValue);

  const [selecteddate, setSelectedDate] = useState<Date>(new Date());

  const [open, setOpen] = useState<boolean>(false);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const plastics = useAppSelector((store) => store.typeOfPlastic.item);
  const concernPlastic = plastics.filter(
    (item) => item.workShopId === workShop?.id
  );
  const plasticStocks = useAppSelector((store) => store.plasticStock.item);
  const garage = useAppSelector((store) => store.garage.selectedGarage);
  const concernPlasticStock = plasticStocks.filter(
    (item) => item.garageId === garage?.id
  );
  const concernPlasticStockIds = concernPlasticStock.map(
    (item) => item.plasticId
  );

  const addStock = useAppSelector((store) => store.addStock.item);
  const concernAddStocks = addStock.filter(
    (item) => item.garageId === garage?.id
  );

  const plasticAddStockConcern = concernAddStocks.filter((item) =>
    concernPlasticStockIds.includes(item.typeOfPlasticId as number)
  );
  const plasticAddStockConcernStockSeq = plasticAddStockConcern.map(
    (item) => item.stockSeq
  );

  const concernStock = concernPlasticStock.filter((item) =>
    plasticAddStockConcernStockSeq.includes(item.stockSeq)
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
    const datatwo = plasticAddStockConcern.filter((item) =>
      leafSeq.includes(item.stockSeq)
    );
    setPlasticStocks(dataone);
    setAddStocks(datatwo);
    setSelecting({ ...selecting, typeOfPlastic: null, typeOfShop: null });
  };

  const handlePlastic = (plasticid: number) => {
    const dataone = concernStock.filter((item) => item.plasticId === plasticid);
    const plasticSeq = dataone.map((item) => item.stockSeq);
    const datatwo = plasticAddStockConcern.filter((item) =>
      plasticSeq.includes(item.stockSeq)
    );
    setPlasticStocks(dataone);
    setAddStocks(datatwo);
    console.log("leaf", addstocks);
    setSelecting({ ...selecting, typeOfPlastic: plasticid, typeOfShop: null });
  };

  const handleshop = (shopid: number) => {
    const dataone = concernStock.filter((item) => item.shopId === shopid);
    const shopSeq = dataone.map((item) => item.stockSeq);
    const datatwo = plasticAddStockConcern.filter((item) =>
      shopSeq.includes(item.stockSeq)
    );
    setPlasticStocks(dataone);
    setAddStocks(datatwo);
    setSelecting({ ...selecting, typeOfShop: shopid, typeOfPlastic: null });
  };

  useEffect(() => {
    if (plasticAddStockConcern.length) {
      const data = plasticAddStockConcern.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
        );
      });
      console.log("date", data);
      setAddStocks(data);
      setPlasticStocks(concernStock);
    }
  }, [addStock]);

  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ပလပ်စတစ်
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
                ပလပ်စတစ်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={selecting.typeOfPlastic}
                  onChange={(evt) => {
                    handlePlastic(Number(evt.target.value));
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernPlastic.map((item) => (
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
          {addstocks.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <thead key={item.id}>
                <tr style={{ border: "1px solid" }}>
                  <td>{itemdate.toLocaleDateString()}</td>
                  <td>{item.invNo}</td>
                  <td>{item.carNo}</td>
                  {plasticstocks.map((i) => {
                    const iDate = new Date(item.date);
                    if (
                      itemdate.toLocaleDateString() ===
                        iDate.toLocaleDateString() &&
                      item.typeOfPlasticId === i.plasticId &&
                      item.stockSeq === i.stockSeq
                    ) {
                      return (
                        <>
                          <td>
                            {plastics.find((l) => l.id === i.plasticId)?.name}
                          </td>
                          <td>{i.quantity}</td>
                          <td>{i.bag}</td>
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
                      );
                    }
                  })}
                </tr>
              </thead>
            );
          })}
        </table>
        <AddPlastic open={open} setOpen={setOpen} />
        <UpdateAddPlastic
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedStockSeq={selectStockSeq}
        />
        <DeleteAddPlastic
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedStockSeq={selectStockSeq}
        />
      </AdminLayout>
    </>
  );
};
export default PlasticAdd;
