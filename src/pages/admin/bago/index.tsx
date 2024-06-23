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
import NewBagoLeaf from "@/components/bago/newBagoLeaf";
import UpdateBagoLeaf from "@/components/bago/updateBagoLeaf";
import DeleteBagoLeaf from "@/components/bago/deleteBagoLeaf";
import { checkOnItem } from "@/types/leafStockType";
import { BagoLeafPurchase, Leaf } from "@prisma/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const defaultValue: checkOnItem = {
  typeOfLeaf: null,
  typeOfShop: null,
};

const Bago = () => {
  const [bagoLeaf, setBagoLeaf] = useState<BagoLeafPurchase[]>([]);
  const [selecting, setSelecting] = useState<checkOnItem>(defaultValue);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());

  const [open, setOpen] = useState<boolean>(false);
  const workshop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const bagoLeaves = useAppSelector((store) => store.bagoLeaf.item);
  const concernBagoLeaf = bagoLeaves.filter(
    (item) => item.workShopId === workshop?.id
  );
  const shops = useAppSelector((store) => store.typeOfShop.item);
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const concernLeaf = leaves.filter((l) => l.workShopId === workshop?.id);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);

  const concernShop = shops.filter((item) => item.workShopId === workshop?.id);
  const handleDate = (date: Date) => {
    const data = concernBagoLeaf
      .filter((item) => {
        const itemdate = new Date(item.date);
        return itemdate.toLocaleDateString() === date.toLocaleDateString();
      })
      .sort((a, b) => a.id - b.id);
    setBagoLeaf(data);
    setSelecting({ ...selecting, typeOfLeaf: null, typeOfShop: null });
  };

  const handleLeaf = (leafId: number) => {
    const data = concernBagoLeaf
      .filter((item) => item.typeOfLeafId === leafId)
      .sort((a, b) => a.id - b.id);
    setBagoLeaf(data);
    setSelecting({ ...selecting, typeOfLeaf: leafId, typeOfShop: null });
  };

  const handleshop = (shopid: number) => {
    const data = concernBagoLeaf
      .filter((item) => item.shopId === shopid)
      .sort((a, b) => a.id - b.id);
    setBagoLeaf(data);
    setSelecting({ ...selecting, typeOfShop: shopid, typeOfLeaf: null });
  };

  useEffect(() => {
    if (concernBagoLeaf.length) {
      const data = concernBagoLeaf
        .filter((item) => {
          const itemDate = new Date(item.date);
          return (
            itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
          );
        })
        .sort((a, b) => a.id - b.id);
      setBagoLeaf(data);
    }
  }, [bagoLeaves]);
  let no = 0;
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ဖက်ဝယ်ယူခြင်း
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
            <th style={{ width: 150 }}>ဆိုင်နာမည်</th>
            <th style={{ width: 150 }}>ဖက်အမျိုးအစား</th>
            <th style={{ width: 150 }}>ကုန်ချိန်</th>
            <th style={{ width: 150 }}>နှုန်း</th>
            <th style={{ width: 150 }}>စုစုပေါင်းငွေ</th>
          </tr>
          {bagoLeaf.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <>
                <tr key={item.id}>
                  <th style={{ height: 25 }}>{(no += 1)}</th>
                  <td style={{ textAlign: "center" }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {shops.find((s) => s.id === item.shopId)?.name}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {leaves.find((l) => l.id === item.typeOfLeafId)?.name}
                  </td>
                  <td style={{ textAlign: "center" }}>{item.netWeight}</td>
                  <td style={{ textAlign: "center" }}>{item.netPrice}</td>
                  <td style={{ textAlign: "center" }}>{item.totalPrice}</td>
                  <td
                    style={{ textAlign: "center", width: 50 }}
                    onClick={() => {
                      setUpdateOpen(true), setSelectId(item.id);
                    }}
                  >
                    {<EditIcon />}
                  </td>
                  <td
                    style={{ textAlign: "center", width: 50 }}
                    onClick={() => {
                      setDeleteOpen(true), setSelectId(item.id);
                    }}
                  >
                    {<DeleteIcon />}
                  </td>
                </tr>
              </>
            );
          })}
        </table>
        <NewBagoLeaf open={open} setOpen={setOpen} />
        <UpdateBagoLeaf
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteBagoLeaf
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default Bago;
