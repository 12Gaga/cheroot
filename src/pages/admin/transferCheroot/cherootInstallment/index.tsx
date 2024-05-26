import AdminLayout from "@/components/adminLayout";
import NewCherootInstallment from "@/components/cherootTransferring/newcherootInstallment";
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
import UpdateCherootInstallment from "@/components/cherootTransferring/updateCherootInstallment";
import DeleteCherootInstallment from "@/components/cherootTransferring/deleteCherootInstallment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ConverycherootInstallment } from "@prisma/client";
const CherootInstallment = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workshop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const cherootInstallment = useAppSelector(
    (store) => store.cherootInstallment.item
  );
  const locations = useAppSelector((store) => store.conveyLocation.item);
  const concernCherootInstallment = cherootInstallment.filter(
    (item) => item.workShopId === workshop?.id
  );
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);

  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const concernLocation = locations.filter(
    (s) => s.workShopId === workshop?.id
  );
  const [location, setLocation] = useState<number | null>(null);
  const [cherootInstall, setCherootInstall] = useState<
    ConverycherootInstallment[]
  >([]);

  const handleDate = (date: Date) => {
    const data = concernCherootInstallment.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate.toLocaleDateString() === date.toLocaleDateString();
    });
    setCherootInstall(data);
    setLocation(null);
  };

  const handleLocation = (locationid: number) => {
    const data = concernCherootInstallment.filter((item) => {
      return item.conveyLocationId === locationid;
    });
    setCherootInstall(data);
    setLocation(locationid);
  };

  useEffect(() => {
    setCherootInstall(concernCherootInstallment);
  }, [cherootInstallment]);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ဆေးလိပ်တန်ဖိုးအရစ်ကျစာရင်း
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
                ဆိုင်နာမည်
              </Typography>
              <FormControl variant="filled" sx={{ width: 225 }}>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={location}
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

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#E55252",
              mt: 3,
              width: 300,
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
            အရစ်ကျစာရင်း
          </Button>
        </Box>

        <table border={1}>
          <thead>
            <tr style={{ border: "1px solid" }}>
              <th>နေ့စွဲ</th>
              <th>မြို့နာမည်</th>
              <th>ရရန်ကျန်ငွေ</th>
              <th>သွင်းငွေ</th>
              <th>ကျန်ငွေ</th>
            </tr>
          </thead>
          {cherootInstall.map((item) => {
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
                    <td>{item.cashBalance}</td>
                    <td>{item.payBalance}</td>
                    <td>{item.cashBalance - item.payBalance}</td>
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

        <NewCherootInstallment open={open} setOpen={setOpen} />
        <UpdateCherootInstallment
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteCherootInstallment
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default CherootInstallment;
