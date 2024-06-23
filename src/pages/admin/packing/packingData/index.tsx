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
import NewPackingData from "@/components/pack/newPackingData";
import { useAppSelector } from "@/store/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdatePackingData from "@/components/pack/updatePackingData";
import DeletePackingData from "@/components/pack/deletePackingData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { checkPackingOnItem } from "@/types/pacingDataType";
import { Packing } from "@prisma/client";

const defaultValue: checkPackingOnItem = {
  typeOfCheroot: null,
  typeOfPacking: null,
  formOfPacking: null,
};

const PackingData = () => {
  const [packing, setPacking] = useState<Packing[]>([]);
  const [selecting, setSelecting] = useState<checkPackingOnItem>(defaultValue);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());

  const [open, setOpen] = useState<boolean>(false);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const packingDate = useAppSelector((store) => store.packingData.item);
  const concernPackingData = packingDate.filter(
    (i) => i.workShopId === workShop?.id
  );
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item);
  const concernCheroot = cheroots.filter(
    (item) => item.workShopId === workShop?.id
  );
  const typeOfPacking = useAppSelector((store) => store.typeOfPacking.item);
  const concernPackingType = typeOfPacking.filter(
    (item) => item.workShopId === workShop?.id
  );
  const formOfPacking = useAppSelector((store) => store.formOfPacking.item);
  const concernPackingForm = formOfPacking.filter(
    (item) => item.workShopId === workShop?.id
  );
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);

  const handleDate = (date: Date) => {
    const data = concernPackingData
      .filter((item) => {
        const itemdate = new Date(item.date);
        return itemdate.toLocaleDateString() === date.toLocaleDateString();
      })
      .sort((a, b) => a.id - b.id);
    setPacking(data);
    setSelecting({
      ...selecting,
      typeOfCheroot: null,
      typeOfPacking: null,
      formOfPacking: null,
    });
  };

  const handleCheroot = (cherootId: number) => {
    const data = concernPackingData
      .filter((item) => item.typeOfCherootId === cherootId)
      .sort((a, b) => a.id - b.id);
    setPacking(data);
    setSelecting({
      ...selecting,
      typeOfCheroot: cherootId,
      typeOfPacking: null,
      formOfPacking: null,
    });
  };

  const handlePack = (packId: number) => {
    const data = concernPackingData
      .filter((item) => item.typeOfPackingId === packId)
      .sort((a, b) => a.id - b.id);
    setPacking(data);
    setSelecting({
      ...selecting,
      typeOfPacking: packId,
      typeOfCheroot: null,
      formOfPacking: null,
    });
  };

  const handleForm = (formId: number) => {
    const data = concernPackingData
      .filter((item) => item.formOfPackingId === formId)
      .sort((a, b) => a.id - b.id);
    setPacking(data);
    setSelecting({
      ...selecting,
      formOfPacking: formId,
      typeOfPacking: null,
      typeOfCheroot: null,
    });
  };

  useEffect(() => {
    if (concernPackingData.length) {
      const data = concernPackingData
        .filter((item) => {
          const itemDate = new Date(item.date);
          return (
            itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
          );
        })
        .sort((a, b) => a.id - b.id);
      setPacking(data);
    }
  }, [packingDate]);
  let no = 0;
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ပါကင်စာရင်းထည့်ခြင်း
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
            mt: 2,
          }}
        >
          <Box sx={{ mr: 2, display: "flex", mt: 4, width: 220 }}>
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
          <Box sx={{}}>
            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 130 }}>
                ပါကင်အမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={selecting.typeOfPacking}
                  onChange={(evt) => {
                    handlePack(Number(evt.target.value));
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernPackingType.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box sx={{}}>
            <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", width: 150 }}>
                ထုပ်ပိုးမှုအမျိုးအစား
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={selecting.formOfPacking}
                  onChange={(evt) => {
                    handleForm(Number(evt.target.value));
                  }}
                  sx={{ bgcolor: "#EEE8CF" }}
                >
                  {concernPackingForm.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}>
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
            <th style={{ width: 150 }}>ဆေးလိပ်အမျိုးအစား</th>
            <th style={{ width: 150 }}>ပါကင်အမျိုးအစား</th>
            <th style={{ width: 150 }}>ထုပ်ပိုးမှုအမျိုးအစား</th>
            <th style={{ width: 150 }}>အရေအတွက်</th>
          </tr>
          {packing.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <>
                <tr key={item.id}>
                  <th>{(no += 1)}</th>
                  <td style={{ textAlign: "center" }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {cheroots.find((c) => c.id === item.typeOfCherootId)?.name}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      typeOfPacking.find((p) => p.id === item.typeOfPackingId)
                        ?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      formOfPacking.find((f) => f.id === item.formOfPackingId)
                        ?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>{item.quantity}</td>
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
        <NewPackingData open={open} setOpen={setOpen} />
        <UpdatePackingData
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeletePackingData
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default PackingData;
