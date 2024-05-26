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
import NewBagoLabel from "@/components/bago/newBagoLabel";
import UpdateBagoLabel from "@/components/bago/updateBagoLabel";
import DeleteBagoLabel from "@/components/bago/deleteBagoLabel";
import { BagoLabelPurchase } from "@prisma/client";
import { checkOnLabelItem } from "@/types/labelStockType";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const defaultValue: checkOnLabelItem = {
  typeOfLabel: null,
  typeOfShop: null,
};

const BagoLabel = () => {
  const [bagoLabel, setBagoLabel] = useState<BagoLabelPurchase[]>([]);
  const [selecting, setSelecting] = useState<checkOnLabelItem>(defaultValue);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());

  const [open, setOpen] = useState<boolean>(false);
  const workshop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const bagoLabels = useAppSelector((store) => store.bagoLabel.item);
  const concernBagoLabel = bagoLabels.filter(
    (item) => item.workShopId === workshop?.id
  );
  const shops = useAppSelector((store) => store.typeOfShop.item);
  const labels = useAppSelector((store) => store.typeOfLabel.item);
  const concernlabel = labels.filter((l) => l.workShopId === workshop?.id);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);

  const concernShop = shops.filter((item) => item.workShopId === workshop?.id);
  const handleDate = (date: Date) => {
    const data = concernBagoLabel.filter((item) => {
      const itemdate = new Date(item.date);
      return itemdate.toLocaleDateString() === date.toLocaleDateString();
    });
    setBagoLabel(data);
    setSelecting({ ...selecting, typeOfLabel: null, typeOfShop: null });
  };

  const handleLabel = (labelId: number) => {
    const data = concernBagoLabel.filter(
      (item) => item.typeOfLabelId === labelId
    );
    setBagoLabel(data);
    setSelecting({
      ...selecting,
      typeOfLabel: labelId,
      typeOfShop: null,
    });
  };

  const handleshop = (shopid: number) => {
    const data = concernBagoLabel.filter((item) => item.shopId === shopid);
    setBagoLabel(data);
    setSelecting({ ...selecting, typeOfShop: shopid, typeOfLabel: null });
  };

  useEffect(() => {
    if (concernBagoLabel.length) {
      const data = concernBagoLabel.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
        );
      });
      setBagoLabel(data);
    }
  }, [bagoLabels]);

  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          တံဆိပ်ဝယ်ယူခြင်း
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
                  value={selecting.typeOfLabel}
                  onChange={(evt) => {
                    handleLabel(Number(evt.target.value));
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernlabel.map((item) => (
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
              <th>တံဆိပ်အမျိုးအစား</th>
              <th>လိပ်</th>
              <th>စုစုပေါင်းငွေ</th>
            </tr>
          </thead>
          {bagoLabel.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <>
                <thead key={item.id}>
                  <tr style={{ border: "1px solid" }}>
                    <td>{itemdate.toLocaleDateString()}</td>
                    <td>{shops.find((s) => s.id === item.shopId)?.name}</td>
                    <td>
                      {labels.find((l) => l.id === item.typeOfLabelId)?.name}
                    </td>
                    <td>{item.bandle}</td>
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
        <NewBagoLabel open={open} setOpen={setOpen} />
        <UpdateBagoLabel
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteBagoLabel
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default BagoLabel;
