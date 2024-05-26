import AdminLayout from "@/components/adminLayout";
import {
  Typography,
  Box,
  Button,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NewTransferCherootData from "@/components/cherootTransferring/newTransferCherootData";
import { useAppSelector } from "@/store/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateTransferCherootData from "@/components/cherootTransferring/updateTransferCherootData";
import DeleteTransferCherootData from "@/components/cherootTransferring/deleteCherootTransferData";
import { checkCherootItem } from "@/types/cherootType";
import { Conveying } from "@prisma/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const defaultValue: checkCherootItem = {
  typeOfCheroot: null,
  location: null,
};

const TransferCherootData = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workshop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const cherootTransfers = useAppSelector(
    (store) => store.cherootTransfer.item
  );
  const concernCherootTransfer = cherootTransfers.filter(
    (item) => item.workShopId === workshop?.id
  );
  const locations = useAppSelector((store) => store.conveyLocation.item);
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item);
  const concernCheroot = cheroots.filter((c) => c.workShopId === workshop?.id);
  const typeOfPacking = useAppSelector((store) => store.typeOfPacking.item);
  const formOfPacking = useAppSelector((store) => store.formOfPacking.item);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);

  const [cherootTransfer, setCherootTransfer] = useState<Conveying[]>([]);
  const [selecting, setSelecting] = useState<checkCherootItem>(defaultValue);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const concernLocation = locations.filter(
    (item) => item.workShopId === workshop?.id
  );
  const handleDate = (date: Date) => {
    const data = concernCherootTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return itemdate.toLocaleDateString() === date.toLocaleDateString();
    });
    setCherootTransfer(data);
    setSelecting({ ...selecting, typeOfCheroot: null, location: null });
  };

  const handleCheroot = (cherootId: number) => {
    const data = concernCherootTransfer.filter(
      (item) => item.typeOfCherootId === cherootId
    );
    setCherootTransfer(data);
    setSelecting({
      ...selecting,
      typeOfCheroot: cherootId,
      location: null,
    });
  };

  const handleLocation = (locationid: number) => {
    const data = concernCherootTransfer.filter(
      (item) => item.conveyLocationId === locationid
    );
    setCherootTransfer(data);
    setSelecting({ ...selecting, location: locationid, typeOfCheroot: null });
  };

  useEffect(() => {
    if (concernCherootTransfer.length) {
      const data = concernCherootTransfer.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
        );
      });
      setCherootTransfer(data);
    }
  }, [cherootTransfers]);

  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ဆေးလိပ်ပို့စာရင်းထည့်ခြင်း
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
                ဆေးလိပ်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={selecting.typeOfCheroot}
                  onChange={(evt) => {
                    handleCheroot(Number(evt.target.value));
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernCheroot.map((item) => (
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
                မြို့နာမည်
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={selecting.location}
                  onChange={(evt) => {
                    handleLocation(Number(evt.target.value));
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

        <Box sx={{ display: "flex", justifyContent: "flex-end", my: 3 }}>
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
              <th>မြို့နာမည်</th>
              <th>ဆေးလိပ်အမျိုးအစား</th>
              <th>ပါကင်အမျိုးအစား</th>
              <th>ထုပ်ပိုးမှုအမျိုးအစား</th>
              <th>အရေအတွက်</th>
              <th>တန်ဖိုး</th>
              <th>စုစုပေါင်းတန်ဖိုး</th>
            </tr>
          </thead>
          {cherootTransfer.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <>
                <thead key={item.id}>
                  <tr style={{ border: "1px solid" }}>
                    <td>{itemdate.toLocaleDateString()}</td>
                    <td>
                      {
                        locations.find((l) => l.id === item.conveyLocationId)
                          ?.name
                      }
                    </td>
                    <td>
                      {
                        cheroots.find((l) => l.id === item.typeOfCherootId)
                          ?.name
                      }
                    </td>
                    <td>
                      {
                        typeOfPacking.find((l) => l.id === item.typeOfPackingId)
                          ?.name
                      }
                    </td>
                    <td>
                      {
                        formOfPacking.find((l) => l.id === item.formOfPackingId)
                          ?.name
                      }
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.amount}</td>
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

        <NewTransferCherootData open={open} setOpen={setOpen} />
        <UpdateTransferCherootData
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteTransferCherootData
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default TransferCherootData;
