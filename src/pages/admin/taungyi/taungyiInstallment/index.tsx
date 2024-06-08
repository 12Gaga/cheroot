import AdminLayout from "@/components/adminLayout";
import NewTaungyiInstallment from "@/components/taungyi/newTaungyiInstallment";
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
import UpdateTaungyiInstallment from "@/components/taungyi/updateTaungyiInstallment";
import DeleteTaungyiInstallment from "@/components/taungyi/deleteTaungyiInstallment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TaungyiInstallment } from "@prisma/client";
import { useRouter } from "next/router";
const TaungyiInstallments = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const industryId = useAppSelector((store) => store.industry.item)?.id;
  const installments = useAppSelector((store) => store.taungyiInstallment.item);
  const concernInstallment = installments.filter(
    (item) => item.cigratteIndustryId === industryId
  );
  const banquets = useAppSelector((store) => store.typeOfBanquet.item);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);

  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const concernBanquets = banquets.filter(
    (s) => s.cigratteIndustryId === industryId
  );
  const [banquet, setBanquet] = useState<number | null>(null);
  const [installment, setInstallment] = useState<TaungyiInstallment[]>([]);

  const handleDate = (date: Date) => {
    const data = concernInstallment.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate.toLocaleDateString() === date.toLocaleDateString();
    });
    setInstallment(data);
    setBanquet(null);
  };

  const handleBanquet = (banquetId: number) => {
    const data = concernInstallment.filter((item) => {
      return item.banquetId === banquetId;
    });
    setInstallment(data);
    setBanquet(banquetId);
  };

  useEffect(() => {
    setInstallment(concernInstallment);
  }, [installments]);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ပစ္စည်းတန်ဖိုးအရစ်ကျစာရင်း
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
            အရစ်ကျစာရင်း
          </Button>
        </Box>

        <table border={1}>
          <thead>
            <tr style={{ border: "1px solid" }}>
              <th>နေ့စွဲ</th>
              <th>ပွဲရုံနာမည်</th>
              <th>ပေးရန်ကျန်ငွေ</th>
              <th>သွင်းငွေ</th>
              <th>လက်ကျန်ငွေ</th>
            </tr>
          </thead>
          {installment.map((item) => {
            const itemdate = new Date(item.date);
            return (
              <>
                <thead key={item.id}>
                  <tr style={{ border: "1px solid" }}>
                    <td>{itemdate.toLocaleDateString()}</td>
                    <td>
                      {banquets.find((b) => b.id === item.banquetId)?.name}
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

        <NewTaungyiInstallment open={open} setOpen={setOpen} />
        <UpdateTaungyiInstallment
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteTaungyiInstallment
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default TaungyiInstallments;
