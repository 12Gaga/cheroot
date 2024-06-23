import AdminLayout from "@/components/adminLayout";
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
import AddBoxIcon from "@mui/icons-material/AddBox";
import NewMainMoney from "@/components/money/newMainMoney";
import { useAppSelector } from "@/store/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateMainMoney from "@/components/money/updateMainMoney";
import DeleteMainMoney from "@/components/money/deleteMainMoney";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MainMoney } from "@prisma/client";
const MainMoneys = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const mainMoney = useAppSelector((store) => store.mainMoney.item);
  const concernMainMoney = mainMoney.filter(
    (item) => item.workShopId === workShop?.id
  );
  const locations = useAppSelector((store) => store.conveyLocation.item);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);

  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const concernLocation = locations.filter(
    (s) => s.workShopId === workShop?.id
  );
  const [location, setLocation] = useState<number | null>(null);
  const [money, setMoney] = useState<MainMoney[]>([]);

  const handleDate = (date: Date) => {
    const data = concernMainMoney
      .filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate.toLocaleDateString() === date.toLocaleDateString();
      })
      .sort((a, b) => a.id - b.id);
    setMoney(data);
    setLocation(null);
  };

  const handleShop = (locationId: number) => {
    const data = concernMainMoney
      .filter((item) => {
        return item.locationId === locationId;
      })
      .sort((a, b) => a.id - b.id);
    setMoney(data);
    setLocation(locationId);
  };

  useEffect(() => {
    if (concernMainMoney.length) {
      const data = concernMainMoney
        .filter((item) => {
          const itemDate = new Date(item.date);
          return (
            itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
          );
        })
        .sort((a, b) => a.id - b.id);
      setMoney(data);
    }
  }, [mainMoney]);
  let no = 0;
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ပင်မငွေစာရင်း
        </Typography>

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
                မြို့နာမည်
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={location}
                  onChange={(evt) => {
                    handleShop(Number(evt.target.value));
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernLocation.map((item) => (
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
            <th style={{ width: 150 }}>မြို့နာမည်</th>
            <th style={{ width: 150 }}>ပမာဏ</th>
          </tr>
          {money.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <tr key={item.id}>
                <th style={{ height: 25 }}>{(no += 1)}</th>
                <td style={{ textAlign: "center" }}>
                  {itemdate.toLocaleDateString()}
                </td>
                <td style={{ textAlign: "center" }}>
                  {locations.find((l) => l.id === item.locationId)?.name}
                </td>
                <td style={{ textAlign: "center" }}>{item.amount}</td>
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
            );
          })}
        </table>

        <NewMainMoney open={open} setOpen={setOpen} />
        <UpdateMainMoney
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteMainMoney
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default MainMoneys;
