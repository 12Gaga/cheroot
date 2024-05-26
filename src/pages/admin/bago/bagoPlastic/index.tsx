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
import NewBagoPlastic from "@/components/bago/newBagoPlastic";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateBagoPlastic from "@/components/bago/updateBagoPlastic";
import DeleteBagoPlastic from "@/components/bago/deleteBagoPlastic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { checkOnPlasticItem } from "@/types/plasticStockType";
import { BagoPlasticPurchase } from "@prisma/client";

const defaultValue: checkOnPlasticItem = {
  typeOfPlastic: null,
  typeOfShop: null,
};

const BagoPlastic = () => {
  const [bagoPlastic, setBagoPlastic] = useState<BagoPlasticPurchase[]>([]);
  const [selecting, setSelecting] = useState<checkOnPlasticItem>(defaultValue);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());

  const [open, setOpen] = useState<boolean>(false);
  const workshop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const bagoPlastics = useAppSelector((store) => store.bagoPlastic.item);
  const concernBagoPlastic = bagoPlastics.filter(
    (item) => item.workShopId === workshop?.id
  );
  const shops = useAppSelector((store) => store.typeOfShop.item);
  const plastics = useAppSelector((store) => store.typeOfPlastic.item);
  const conernPlastic = plastics.filter((p) => p.workShopId === workshop?.id);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);

  const concernShop = shops.filter((item) => item.workShopId === workshop?.id);
  const handleDate = (date: Date) => {
    const data = concernBagoPlastic.filter((item) => {
      const itemdate = new Date(item.date);
      return itemdate.toLocaleDateString() === date.toLocaleDateString();
    });
    setBagoPlastic(data);
    setSelecting({ ...selecting, typeOfPlastic: null, typeOfShop: null });
  };

  const handlePlastic = (plasticid: number) => {
    const data = concernBagoPlastic.filter(
      (item) => item.plasticId === plasticid
    );
    setBagoPlastic(data);
    setSelecting({
      ...selecting,
      typeOfPlastic: plasticid,
      typeOfShop: null,
    });
  };

  const handleshop = (shopid: number) => {
    const data = concernBagoPlastic.filter((item) => item.shopId === shopid);
    setBagoPlastic(data);
    setSelecting({ ...selecting, typeOfShop: shopid, typeOfPlastic: null });
  };

  useEffect(() => {
    if (concernBagoPlastic.length) {
      const data = concernBagoPlastic.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
        );
      });
      setBagoPlastic(data);
    }
  }, [bagoPlastics]);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ပလပ်စတစ်ဝယ်ယူခြင်း
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
                တံဆိပ်အမျိုးအစား
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
                  {conernPlastic.map((item) => (
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
              <th>ဆိုင်နာမည်</th>
              <th>ပလပ်စတစ်အမျိုးအစား</th>
              <th>အရေအတွက်</th>
              <th>အိတ်</th>
              <th>စုစုပေါင်းငွေ</th>
            </tr>
          </thead>
          {bagoPlastic.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <>
                <thead key={item.id}>
                  <tr style={{ border: "1px solid" }}>
                    <td>{itemdate.toLocaleDateString()}</td>
                    <td>{shops.find((s) => s.id === item.shopId)?.name}</td>
                    <td>
                      {plastics.find((p) => p.id === item.plasticId)?.name}
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.bag}</td>
                    <td>{item.totalPrice}</td>
                    <td
                      onClick={() => {
                        setUpdateOpen(true), setSelectId(item.id);
                      }}
                    >
                      {<EditIcon />}
                    </td>
                    <td
                      onClick={() => {
                        setDeleteOpen(true), setSelectId(item.id);
                      }}
                    >
                      {<DeleteIcon />}
                    </td>
                  </tr>
                </thead>
              </>
            );
          })}
        </table>
        <NewBagoPlastic open={open} setOpen={setOpen} />
        <UpdateBagoPlastic
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteBagoPlastic
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default BagoPlastic;
