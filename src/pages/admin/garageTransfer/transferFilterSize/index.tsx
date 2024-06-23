import AdminLayout from "@/components/adminLayout";
import {
  Box,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NewTransferFilterSize from "@/components/garageTrans/newTransferFilterSize";
import { useAppSelector } from "@/store/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteFilterSizeTransfer from "@/components/garageTrans/deleteFilterSizeTransfer";
import UpdateTransferFilterSize from "@/components/garageTrans/updateTransferFilterSize";
import { FilterSizeTransferGarage } from "@prisma/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import shop from "../../asignNamePrice/shop";
const TransferFilterSize = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workshop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const filterSizeTransfer = useAppSelector(
    (store) => store.filterSizeTransfer.item
  );
  const concernFilterSizeTransfer = filterSizeTransfer.filter(
    (item) => item.workShopId === workshop?.id
  );
  const garage = useAppSelector((store) => store.garage.item);
  const filterSizes = useAppSelector((store) => store.typeOfFilterSize.item);
  const concernFilter = filterSizes.filter(
    (item) => item.workShopId === workshop?.id
  );
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);

  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [filter, setFilter] = useState<number | null>(null);
  const [filterTransfer, setFilterTransfer] = useState<
    FilterSizeTransferGarage[]
  >([]);

  const handleDate = (date: Date) => {
    const data = concernFilterSizeTransfer
      .filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate.toLocaleDateString() === date.toLocaleDateString();
      })
      .sort((a, b) => a.id - b.id);
    setFilterTransfer(data);
    setFilter(null);
  };

  const handelFilter = (filterId: number) => {
    const data = concernFilterSizeTransfer
      .filter((item) => item.typeOfFilterSizeId === filterId)
      .sort((a, b) => a.id - b.id);
    setFilterTransfer(data);
    setFilter(filterId);
  };

  useEffect(() => {
    if (concernFilterSizeTransfer.length) {
      const data = concernFilterSizeTransfer
        .filter((item) => {
          const itemDate = new Date(item.date);
          return (
            itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
          );
        })
        .sort((a, b) => a.id - b.id);
      setFilterTransfer(data);
    }
  }, [filterSizeTransfer]);
  let no = 0;
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          အဆီခံ
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
          <Box sx={{}}>
            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                အဆီခံအမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={filter}
                  onChange={(evt) => {
                    handelFilter(Number(evt.target.value));
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernFilter.map((item) => (
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
            <th style={{ width: 150 }}>အထွက်ဂိုထောင်</th>
            <th style={{ width: 150 }}>အဝင်ဂိုထောင်</th>
            <th style={{ width: 150 }}>အဆီခံအမျိုးအစား</th>
            <th style={{ width: 150 }}>အရေအတွက်</th>
            <th style={{ width: 150 }}>အိတ်</th>
          </tr>
          {filterTransfer.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <>
                <tr key={item.id}>
                  <th>{(no += 1)}</th>
                  <td style={{ textAlign: "center" }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {garage.find((g) => g.id === item.exitGarageId)?.name}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {garage.find((g) => g.id === item.enterenceGarageId)?.name}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      filterSizes.find((f) => f.id === item.typeOfFilterSizeId)
                        ?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>{item.quantity}</td>
                  <td style={{ textAlign: "center" }}>{item.bag}</td>
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

        <NewTransferFilterSize open={open} setOpen={setOpen} />
        <UpdateTransferFilterSize
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteFilterSizeTransfer
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default TransferFilterSize;
