import AdminLayout from "@/components/adminLayout";
import NewTaungyiLeaf from "@/components/taungyi/newTaungyiLeaf";
import { useAppSelector } from "@/store/hooks";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateTaungyiLeaf from "@/components/taungyi/updateTaungyiLeaf";
import DeleteTaungyiEnterStock from "@/components/taungyi/deleteTaungyiEnterStock";
import { TaungyiEnterStock } from "@prisma/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const TaungyiAddStock = () => {
  const [open, setOpen] = useState<boolean>(false);
  const cigratteIndustryId = useAppSelector((store) => store.industry.item)?.id;
  const taungyiEnterStock = useAppSelector(
    (store) => store.taungyiEnterStock.item
  );
  const concernTaungyiEnterStock = taungyiEnterStock.filter(
    (item) => item.cigratteIndustryId === cigratteIndustryId
  );
  const stores = useAppSelector((store) => store.typeOfStore.item);
  const banquets = useAppSelector((store) => store.typeOfBanquet.item);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);

  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const concernBanquets = banquets.filter(
    (s) => s.cigratteIndustryId === cigratteIndustryId
  );
  const [banquet, setBanquet] = useState<number | null>(null);
  const [addstock, setAddStock] = useState<TaungyiEnterStock[]>([]);

  const handleDate = (date: Date) => {
    const data = concernTaungyiEnterStock.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate.toLocaleDateString() === date.toLocaleDateString();
    });
    setAddStock(data);
    setBanquet(null);
  };

  const handleBanquet = (banquetId: number) => {
    const data = concernTaungyiEnterStock.filter((item) => {
      return item.banquetId === banquetId;
    });
    setAddStock(data);
    setBanquet(banquetId);
  };

  useEffect(() => {
    if (concernTaungyiEnterStock.length) {
      const data = concernTaungyiEnterStock.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
        );
      });
      setAddStock(data);
    }
  }, [taungyiEnterStock]);

  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          သိုလှောင်ရုံပစ္စည်းစာရင်းထည့်ခြင်း
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
                ပွဲရုံအမည်
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={banquet}
                  onChange={(evt) => {
                    handleBanquet(Number(evt.target.value));
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernBanquets.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", my: 3 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#E55252",
              mt: 3,
              width: 320,
              height: 50,
              fontSize: 18,
              borderRadius: 20,
              "&:hover": {
                bgcolor: "#FCB500",
                color: "white",
                fontWeight: "bold",
              },
            }}
            onClick={() => setOpen(true)}
          >
            သိုလှောင်ရုံပစ္စည်းထည့်ခြင်း
          </Button>
        </Box>

        <table border={1}>
          <thead>
            <tr style={{ border: "1px solid" }}>
              <th>နေ့စွဲ</th>
              <th>ထည့်သွင်းသိုလှောင်ရုံ</th>
              <th>ပွဲရုံအမည်</th>
              <th>လုံးရေ</th>
              <th>ကုန်ချိန်</th>
              <th>နှုန်း</th>
              <th>ကုန်ချိန်သင့်ငွေ</th>
              <th>ထုတ်ပိုးခ</th>
              <th>ထုတ်ပိုးသင့်ငွေ</th>
              <th>စုစုပေါင်းသင့်ငွေ</th>
            </tr>
          </thead>
          {addstock.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <>
                <thead key={item.id}>
                  <tr style={{ border: "1px solid" }}>
                    <td>{itemdate.toLocaleDateString()}</td>
                    <td>{stores.find((s) => s.id === item.storeId)?.name}</td>
                    <td>
                      {banquets.find((f) => f.id === item.banquetId)?.name}
                    </td>
                    <td>{item.tolBatchNo}</td>
                    <td>{item.netWeight}</td>
                    <td>{item.netPrice}</td>
                    <td>{item.tolNetPrice}</td>
                    <td>{item.packingFees}</td>
                    <td>{item.tolPackingFees}</td>
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

        <NewTaungyiLeaf open={open} setOpen={setOpen} />
        <UpdateTaungyiLeaf
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteTaungyiEnterStock
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default TaungyiAddStock;
