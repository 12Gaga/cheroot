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
import AddFilterSize from "@/components/addSt/addFilterSize";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateAddFilterSize from "@/components/addSt/updateFilterSize";
import DeleteAddFilterSize from "@/components/addSt/deleteAddFilterSize";
import { AddStock, FilterSize } from "@prisma/client";
import { checkOnFilterItem } from "@/types/filterSizeStockType";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const defaultValue: checkOnFilterItem = {
  typeOfFilterSize: null,
  typeOfShop: null,
};

const FilterSizeAdd = () => {
  const [addstocks, setAddStocks] = useState<AddStock[]>([]);
  const [filterStocks, setFilterStocks] = useState<FilterSize[]>([]);
  const [selecting, setSelecting] = useState<checkOnFilterItem>(defaultValue);

  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const filterSizes = useAppSelector((store) => store.typeOfFilterSize.item);
  const concernFilterSize = filterSizes.filter(
    (item) => item.workShopId === workShop?.id
  );
  const filterSizeStocks = useAppSelector(
    (store) => store.filterSizeStock.item
  );
  const garage = useAppSelector((store) => store.garage.selectedGarage);
  const concernFilterSizeStock = filterSizeStocks.filter(
    (item) => item.garageId === garage?.id
  );
  const concernFilterSizeStockIds = concernFilterSizeStock.map(
    (item) => item.typeOfFilterSizeId
  );

  const addStock = useAppSelector((store) => store.addStock.item);
  const concernAddStocks = addStock.filter(
    (item) => item.garageId === garage?.id
  );

  const filterSizeAddStockConcern = concernAddStocks.filter((item) =>
    concernFilterSizeStockIds.includes(item.typeOfFilterSizeId as number)
  );
  const filterSizeAddStockConcernStockSeq = filterSizeAddStockConcern.map(
    (item) => item.stockSeq
  );

  const concernStock = concernFilterSizeStock.filter((item) =>
    filterSizeAddStockConcernStockSeq.includes(item.stockSeq)
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
    const datatwo = filterSizeAddStockConcern
      .filter((item) => leafSeq.includes(item.stockSeq))
      .sort((a, b) => a.id - b.id);
    setFilterStocks(dataone);
    setAddStocks(datatwo);
    setSelecting({ ...selecting, typeOfFilterSize: null, typeOfShop: null });
  };

  const handleFilterSize = (filterId: number) => {
    const dataone = concernStock.filter(
      (item) => item.typeOfFilterSizeId === filterId
    );
    const filterSeq = dataone.map((item) => item.stockSeq);
    const datatwo = filterSizeAddStockConcern
      .filter((item) => filterSeq.includes(item.stockSeq))
      .sort((a, b) => a.id - b.id);
    setFilterStocks(dataone);
    setAddStocks(datatwo);
    console.log("leaf", addstocks);
    setSelecting({
      ...selecting,
      typeOfFilterSize: filterId,
      typeOfShop: null,
    });
  };

  const handleshop = (shopid: number) => {
    const dataone = concernStock.filter((item) => item.shopId === shopid);
    const shopSeq = dataone.map((item) => item.stockSeq);
    const datatwo = filterSizeAddStockConcern
      .filter((item) => shopSeq.includes(item.stockSeq))
      .sort((a, b) => a.id - b.id);
    setFilterStocks(dataone);
    setAddStocks(datatwo);
    setSelecting({ ...selecting, typeOfShop: shopid, typeOfFilterSize: null });
  };

  useEffect(() => {
    if (filterSizeAddStockConcern.length) {
      const data = filterSizeAddStockConcern
        .filter((item) => {
          const itemDate = new Date(item.date);
          return (
            itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
          );
        })
        .sort((a, b) => a.id - b.id);
      console.log("date", data);
      setAddStocks(data);
      setFilterStocks(concernStock);
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
          အဆီခံ (အရေအတွက်/အိတ်)
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
                အဆီခံအမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={selecting.typeOfFilterSize}
                  onChange={(evt) => {
                    handleFilterSize(Number(evt.target.value));
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernFilterSize.map((item) => (
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
            <th style={{ width: 150 }}>အဆီခံအမျိုးအစား</th>
            <th style={{ width: 150 }}>အရေအတွက်</th>
            <th style={{ width: 150 }}>အိတ်</th>
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
                {filterStocks.map((i) => {
                  const idate = new Date(i.date);
                  if (
                    itemdate.toLocaleDateString() ===
                      idate.toLocaleDateString() &&
                    item.typeOfFilterSizeId === i.typeOfFilterSizeId &&
                    item.stockSeq === i.stockSeq
                  ) {
                    return (
                      <>
                        <td style={{ textAlign: "center" }}>
                          {
                            filterSizes.find(
                              (f) => f.id === i.typeOfFilterSizeId
                            )?.name
                          }
                        </td>
                        <td style={{ textAlign: "center" }}>{i.quantity}</td>
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
        <AddFilterSize open={open} setOpen={setOpen} />
        <UpdateAddFilterSize
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedStockSeq={selectStockSeq}
        />
        <DeleteAddFilterSize
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedStockSeq={selectStockSeq}
        />
      </AdminLayout>
    </>
  );
};
export default FilterSizeAdd;
