import AdminLayout from "@/components/adminLayout";
import { useAppSelector } from "@/store/hooks";
import {
  ExtraPurchase,
  PayOtherItem,
  Tabacco,
  TabaccoTransferGarage,
} from "@prisma/client";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import TabaccoDateOne from "@/components/garageReport/tabaccoDateOne";
import TabaccoDateTwo from "@/components/garageReport/tabaccoDateTwo";
import TabaccoDateThree from "@/components/garageReport/tabaccoDateThree";
import TabaccoDateFour from "@/components/garageReport/tabaccoDateFour";
const TabaccoDateReport = () => {
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const tabacco = useAppSelector((store) => store.typeOfTabacco.item);
  const concernTabacco = tabacco.filter((l) => l.workShopId === workShopId);
  const garages = useAppSelector((store) => store.garage.item);
  const concernGarages = garages.filter((g) => g.workShopId === workShopId);
  const tabaccoStocks = useAppSelector((store) => store.tabaccoStock.item);
  const tabaccoGarageTransfer = useAppSelector(
    (store) => store.tabaccoTransfer.item
  );
  const payOther = useAppSelector((store) => store.payStock.item);
  const extraPurchase = useAppSelector((store) => store.extraPurchase.item);
  const [garage, setGarage] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [concernTabaccoStock, setTabaccoStock] = useState<Tabacco[]>([]);
  const [concernTabaccoTransferExit, setTabaccoTransferExit] = useState<
    TabaccoTransferGarage[]
  >([]);
  const [concernTabaccoTransferEnter, setTabaccoTransferEnter] = useState<
    TabaccoTransferGarage[]
  >([]);
  const [concernExtraPurchase, setExtraPurchase] = useState<ExtraPurchase[]>(
    []
  );
  const [concernPayOther, setPayOther] = useState<PayOtherItem[]>([]);

  const handleGarage = (garageId: number) => {
    const dataone = tabaccoStocks.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garageId &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    const datatwo = tabaccoGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.exitGarageId === garageId &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    const datathree = payOther.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garageId &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    const datafour = extraPurchase.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garageId &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    const datafive = tabaccoGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.enterenceGarageId === garageId &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    setTabaccoStock(dataone);
    setPayOther(datathree);
    setExtraPurchase(datafour);
    setTabaccoTransferExit(datatwo);
    setTabaccoTransferEnter(datafive);
    setGarage(garageId);
  };

  const handleStartDate = (start: Date) => {
    const dataone = tabaccoStocks.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getDate() >= start.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === start.getMonth()
      );
    });
    const datatwo = tabaccoGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.exitGarageId === garage &&
        itemdate.getDate() >= start.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === start.getMonth()
      );
    });
    const datathree = payOther.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getDate() >= start.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === start.getMonth()
      );
    });
    const datafour = extraPurchase.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getDate() >= start.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === start.getMonth()
      );
    });
    const datafive = tabaccoGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.enterenceGarageId === garage &&
        itemdate.getDate() >= start.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === start.getMonth()
      );
    });
    setTabaccoStock(dataone);
    setTabaccoTransferExit(datatwo);
    setTabaccoTransferEnter(datafive);
    setPayOther(datathree);
    setExtraPurchase(datafour);
    setStartDate(start);
  };

  const handleEndDate = (end: Date) => {
    const dataone = tabaccoStocks.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= end.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    const datatwo = tabaccoGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.exitGarageId === garage &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= end.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    const datathree = payOther.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= end.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    const datafour = extraPurchase.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= end.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    const datafive = tabaccoGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.enterenceGarageId === garage &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= end.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    setTabaccoStock(dataone);
    setTabaccoTransferExit(datatwo);
    setTabaccoTransferEnter(datafive);
    setPayOther(datathree);
    setExtraPurchase(datafour);
    setEndDate(end);
  };

  console.log("tabaccoStock", concernTabaccoStock);
  console.log("tabaccoTransferexit", concernTabaccoTransferExit);
  console.log("tabaccoTransferenter", concernTabaccoTransferEnter);
  console.log("payOther", concernPayOther);
  console.log("extraPurchase", concernExtraPurchase);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ရက်အလိုက်ဆေးစပ်လက်ကျန်စာရင်းစစ်ခြင်း
        </Typography>
        <Box
          sx={{
            width: "60%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Box>
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>
              စသောရက်စွဲ
            </Typography>
            <DatePicker
              selected={startDate}
              onChange={(date) => handleStartDate(date as Date)}
            />
          </Box>
          <Box>
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>
              ဆုံးသောရက်စွဲ
            </Typography>
            <DatePicker
              selected={endDate}
              onChange={(date) => handleEndDate(date as Date)}
            />
          </Box>
        </Box>

        <Box sx={{ my: 3, display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", width: 100 }}>
            ဂိုထောင်
          </Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={garage}
              onChange={(evt) => {
                handleGarage(Number(evt.target.value));
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              {concernGarages.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-around", mb: 4 }}>
          {/* Enter Tabacco */}
          <TabaccoDateOne
            concernTabacco={concernTabacco}
            concernTabaccoStock={concernTabaccoStock}
            concernTabaccoTransferEnter={concernTabaccoTransferEnter}
            garage={garage}
          />
          {/* Left Tabacco */}
          <TabaccoDateTwo
            concernExtraPurchase={concernExtraPurchase}
            concernPayOther={concernPayOther}
            concernTabacco={concernTabacco}
            garage={garage}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          {/* Transfer Tabacco */}
          <TabaccoDateThree
            concernGarages={concernGarages}
            concernTabacco={concernTabacco}
            concernTabaccoTransferExit={concernTabaccoTransferExit}
            garage={garage}
          />
          {/* Remind Tabacco */}
          <TabaccoDateFour
            garage={garage}
            concernTabacco={concernTabacco}
            endDate={endDate}
          />
        </Box>
      </AdminLayout>
    </>
  );
};
export default TabaccoDateReport;
