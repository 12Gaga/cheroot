import AdminLayout from "@/components/adminLayout";
import NewTaungyiQuitStock from "@/components/taungyi/newTaungyiQuit";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateTaungyiQuitStock from "@/components/taungyi/updateTaungyiQuit";
import DeleteTaungyiExitStock from "@/components/taungyi/deleteTaungyiExitStock";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TaungyiQuitStock } from "@prisma/client";
const TaungyiQuitStocks = () => {
  const [open, setOpen] = useState<boolean>(false);
  const cigratteIndustryId = useAppSelector((store) => store.industry.item)?.id;
  const taungyiExitStock = useAppSelector(
    (store) => store.taungyiExitStock.item
  );
  const concernTaungyiExitStock = taungyiExitStock.filter(
    (item) => item.cigratteIndustryId === cigratteIndustryId
  );
  const stores = useAppSelector((store) => store.typeOfStore.item);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);

  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [exitStock, setExitStock] = useState<TaungyiQuitStock[]>([]);

  const handleDate = (date: Date) => {
    const data = concernTaungyiExitStock.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate.toLocaleDateString() === date.toLocaleDateString();
    });
    setExitStock(data);
  };

  useEffect(() => {
    if (concernTaungyiExitStock.length) {
      const data = concernTaungyiExitStock.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
        );
      });
      setExitStock(data);
    }
  }, [taungyiExitStock]);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          သိုလှောင်ရုံပစ္စည်းထုတ်စာရင်း
        </Typography>

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

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
            သိုလှောင်ရုံပစ္စည်းထုတ်ခြင်း
          </Button>
        </Box>

        <table border={1}>
          <thead>
            <tr style={{ border: "1px solid" }}>
              <th>နေ့စွဲ</th>
              <th>ထုတ်ပေးသောသိုလှောင်ရုံ</th>
              <th>လုံးရေ</th>
              <th>ကုန်ချိန်</th>
            </tr>
          </thead>
          {exitStock.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <>
                <thead key={item.id}>
                  <tr style={{ border: "1px solid" }}>
                    <td>{itemdate.toLocaleDateString()}</td>
                    <td>{stores.find((s) => s.id === item.storeId)?.name}</td>
                    <td>{item.tolBatchNo}</td>
                    <td>{item.netWeight}</td>
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

        <NewTaungyiQuitStock open={open} setOpen={setOpen} />
        <UpdateTaungyiQuitStock
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteTaungyiExitStock
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default TaungyiQuitStocks;
