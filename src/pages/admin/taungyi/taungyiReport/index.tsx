import AdminLayout from "@/components/adminLayout";
import { useAppSelector } from "@/store/hooks";
import {
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { useState } from "react";

const TaungyiReport = () => {
  const industryId = useAppSelector((store) => store.industry.item)?.id;
  const enterTaungyi = useAppSelector((store) => store.taungyiEnterStock.item);
  const exitTaungyi = useAppSelector((store) => store.taungyiExitStock.item);
  const stores = useAppSelector((store) => store.typeOfStore.item);
  const concernStores = stores.filter(
    (item) => item.cigratteIndustryId === industryId
  );
  const [store, setStore] = useState<number | null>(null);
  const [tolBatch, setTolBatch] = useState<number>(0);
  const handleStore = (storeId: number) => {
    const findEnterData = enterTaungyi.filter((et) => et.storeId === storeId);
    const enterData = findEnterData.reduce((total, data) => {
      return (total += data.tolBatchNo);
    }, 0);

    const findExitData = exitTaungyi.filter((et) => et.storeId === storeId);
    const exitData = findExitData.reduce((total, data) => {
      return (total += data.tolBatchNo);
    }, 0);
    console.log("dhfidlh", exitData);
    console.log("dhfidlh2", enterData);
    setTolBatch(enterData - exitData);
    setStore(storeId);
  };
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          သိုလှောင်ရုံလက်ကျန်ပစ္စည်းစာရင်းစစ်ခြင်း
        </Typography>
        <Box sx={{ my: 3, display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", width: 100 }}>
            သိုလှောင်ရုံ
          </Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={store}
              onChange={(evt) => {
                handleStore(Number(evt.target.value));
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              {concernStores.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: "50%", margin: "0 auto" }}>
          <table border={1} className="table">
            <tr>
              <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>ဖက်</th>
              <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                ကျန်ရှိလုံးရေ
              </th>
              <th style={{ width: 200, backgroundColor: "#DBB5B5" }}>
                ကျန်ရှိကုန်ချိန်
              </th>
            </tr>
            {store && (
              <tr>
                <td style={{ textAlign: "center", height: 30 }}>ငါးတမတ်</td>
                <td style={{ textAlign: "center" }}>{tolBatch}</td>
                <td style={{ textAlign: "center" }}>{tolBatch * 20}</td>
              </tr>
            )}
          </table>
        </Box>
      </AdminLayout>
    </>
  );
};
export default TaungyiReport;
