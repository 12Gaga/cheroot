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
import NewBagoFilterSize from "@/components/bago/newBagoFilterSize";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateBagoFilterSize from "@/components/bago/updateBagoFilterSize";
import DeleteBagoFilterSize from "@/components/bago/deleteBagoFilterSize";
import { BagoFilterSizePurchase } from "@prisma/client";
import { checkOnFilterItem } from "@/types/filterSizeStockType";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const defaultValue: checkOnFilterItem = {
  typeOfFilterSize: null,
  typeOfShop: null,
};

const BagoFilterSize = () => {
  const [bagoFilerSize, setBagoFilterSize] = useState<BagoFilterSizePurchase[]>(
    []
  );
  const [selecting, setSelecting] = useState<checkOnFilterItem>(defaultValue);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());

  const [open, setOpen] = useState<boolean>(false);
  const workshop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const bagoFilterSizes = useAppSelector((store) => store.bagoFilterSize.item);
  const concernBagoFilterSizes = bagoFilterSizes.filter(
    (item) => item.workShopId === workshop?.id
  );
  const shops = useAppSelector((store) => store.typeOfShop.item);
  const filterSizes = useAppSelector((store) => store.typeOfFilterSize.item);
  const concernFilterSizes = filterSizes.filter(
    (item) => item.workShopId === workshop?.id
  );
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);

  const concernShop = shops.filter((item) => item.workShopId === workshop?.id);
  const handleDate = (date: Date) => {
    const data = concernBagoFilterSizes.filter((item) => {
      const itemdate = new Date(item.date);
      return itemdate.toLocaleDateString() === date.toLocaleDateString();
    });
    setBagoFilterSize(data);
    setSelecting({ ...selecting, typeOfFilterSize: null, typeOfShop: null });
  };

  const handleFilter = (filterSizeId: number) => {
    const data = concernBagoFilterSizes.filter(
      (item) => item.typeOfFilterSizeId === filterSizeId
    );
    setBagoFilterSize(data);
    setSelecting({
      ...selecting,
      typeOfFilterSize: filterSizeId,
      typeOfShop: null,
    });
  };

  const handleshop = (shopid: number) => {
    const data = concernBagoFilterSizes.filter(
      (item) => item.shopId === shopid
    );
    setBagoFilterSize(data);
    setSelecting({ ...selecting, typeOfShop: shopid, typeOfFilterSize: null });
  };

  useEffect(() => {
    if (concernBagoFilterSizes.length) {
      const data = concernBagoFilterSizes.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
        );
      });
      setBagoFilterSize(data);
    }
  }, [bagoFilterSizes]);

  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          အစီခံဝယ်ယူခြင်း
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
                အဆီခံအမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={selecting.typeOfFilterSize}
                  onChange={(evt) => {
                    handleFilter(Number(evt.target.value));
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernFilterSizes.map((item) => (
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
              <th>အဆီခံအမျိုးအစား</th>
              <th>အရေအတွက်</th>
              <th>အိတ်</th>
              <th>စုစုပေါင်းငွေ</th>
            </tr>
          </thead>
          {bagoFilerSize.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <>
                <thead key={item.id}>
                  <tr style={{ border: "1px solid" }}>
                    <td>{itemdate.toLocaleDateString()}</td>
                    <td>{shops.find((s) => s.id === item.shopId)?.name}</td>
                    <td>
                      {
                        filterSizes.find(
                          (f) => f.id === item.typeOfFilterSizeId
                        )?.name
                      }
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
        <NewBagoFilterSize open={open} setOpen={setOpen} />
        <UpdateBagoFilterSize
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteBagoFilterSize
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default BagoFilterSize;
