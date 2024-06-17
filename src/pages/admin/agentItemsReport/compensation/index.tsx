import AdminLayout from "@/components/adminLayout";
import FilterCompensation from "@/components/compensation/filtercompensation";
import LabelCompensation from "@/components/compensation/labelCompensation";
import TabaccoCompensation from "@/components/compensation/tabaccoCompensation";
import { useAppSelector } from "@/store/hooks";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Compensation = () => {
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [agent, setAgent] = useState<number | null>(null);
  const agents = useAppSelector((store) => store.agent.item).filter(
    (a) => a.workShopId === workShopId
  );
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item).filter(
    (a) => a.workShopId === workShopId
  );
  const filterSizes = useAppSelector((store) => store.typeOfFilterSize.item);
  const tabaccos = useAppSelector((store) => store.typeOfTabacco.item);
  const labels = useAppSelector((store) => store.typeOfLabel.item);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ပစ္စည်းလက်ကျန်အလျော်အစားပြုလုပ်ခြင်း
        </Typography>
        <Box sx={{ mr: 3, display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
          <DatePicker
            selected={selecteddate}
            onChange={(date) => {
              setSelectedDate(date as Date);
            }}
          />
        </Box>
        <Box sx={{}}>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ကိုယ်စားလှယ်အမည်
            </Typography>
            <FormControl variant="filled" sx={{ width: 225 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={agent}
                onChange={(evt) => {
                  setAgent(Number(evt.target.value));
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {agents.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        {/* filterSize */}
        <FilterCompensation cheroots={cheroots} />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <LoadingButton variant="contained" loading={false}>
            သိမ်းမည်
          </LoadingButton>
        </Box>

        {/* tabacco */}
        <TabaccoCompensation cheroots={cheroots} />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <LoadingButton variant="contained" loading={false}>
            သိမ်းမည်
          </LoadingButton>
        </Box>

        {/* label */}
        <LabelCompensation cheroots={cheroots} />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <LoadingButton variant="contained" loading={false}>
            သိမ်းမည်
          </LoadingButton>
        </Box>
      </AdminLayout>
    </>
  );
};
export default Compensation;
