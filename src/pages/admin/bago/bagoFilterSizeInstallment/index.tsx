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
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useAppSelector } from "@/store/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateBagoFilerSizeInstallment from "@/components/bago/updateBagoFilterSizeInstallment";
import DeleteBagoFilterSizeInstallment from "@/components/bago/deleteBagoFilterSizeInstallment";
import NewBagoFilerSizeInstallment from "@/components/bago/newBagoFilterSizeInstallment";
import { BagoFilterSizeInstallment } from "@prisma/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";

const BagoFilterSizeInstallments = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const workshop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const bagoInstallment = useAppSelector(
    (store) => store.bagoFilterSizeInstallment.item
  );
  const shops = useAppSelector((store) => store.typeOfShop.item);
  const concernBagoInstallment = bagoInstallment
    .filter((item) => item.workShopId === workshop?.id)
    .sort((a, b) => a.id - b.id);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);

  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const concernShop = shops.filter((s) => s.workShopId === workshop?.id);
  const [shop, setShop] = useState<number | null>(null);
  const [filterInstall, setFilterInstall] = useState<
    BagoFilterSizeInstallment[]
  >([]);

  const handleDate = (date: Date) => {
    const data = concernBagoInstallment
      .filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate.toLocaleDateString() === date.toLocaleDateString();
      })
      .sort((a, b) => a.id - b.id);
    setFilterInstall(data);
    setShop(null);
  };

  const handleShop = (shopId: number) => {
    const data = concernBagoInstallment
      .filter((item) => {
        return item.shopId === shopId;
      })
      .sort((a, b) => a.id - b.id);
    setFilterInstall(data);
    setShop(shopId);
  };

  useEffect(() => {
    setFilterInstall(concernBagoInstallment);
  }, [bagoInstallment]);
  let no = 0;
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ပဲခူးအစီခံအရစ်ကျစာရင်း
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={() => {
              router.push("/admin/moneyData/directPayment");
            }}
          >
            ပေးငွေစာရင်းသွင်းခြင်း
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
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
                ဆိုင်နာမည်
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={shop}
                  onChange={(evt) => {
                    handleShop(Number(evt.target.value));
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
            <th style={{ width: 150 }}>ပေးရန်ကျန်ငွေ</th>
            <th style={{ width: 150 }}>သွင်းငွေ</th>
            <th style={{ width: 150 }}>လက်ကျန်ငွေ</th>
          </tr>
          {filterInstall.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <>
                <tr key={item.id}>
                  <th>{(no += 1)}</th>
                  <td style={{ textAlign: "center" }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {shops.find((s) => s.id === item.shopId)?.name}
                  </td>
                  <td style={{ textAlign: "center" }}>{item.cashBalance}</td>
                  <td style={{ textAlign: "center" }}>{item.payBalance}</td>
                  <td style={{ textAlign: "center" }}>
                    {item.cashBalance - item.payBalance}
                  </td>
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
        <NewBagoFilerSizeInstallment open={open} setOpen={setOpen} />
        <UpdateBagoFilerSizeInstallment
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteBagoFilterSizeInstallment
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default BagoFilterSizeInstallments;
