import AdminLayout from "@/components/adminLayout";
import { useAppSelector } from "@/store/hooks";
import {
  ExtraPurchase,
  Label,
  LabelTransferGarage,
  PayOtherItem,
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
import LabelDateOne from "@/components/garageReport/labelDateOne";
import LabelDateTwo from "@/components/garageReport/labelDateTwo";
import LabelDateThree from "@/components/garageReport/labelDateThree";
import LabelDateFour from "@/components/garageReport/labelDateFour";
const LabelDateReport = () => {
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const labels = useAppSelector((store) => store.typeOfLabel.item);
  const concernLabels = labels.filter((l) => l.workShopId === workShopId);
  const garages = useAppSelector((store) => store.garage.item);
  const concernGarages = garages.filter((g) => g.workShopId === workShopId);
  const labelStocks = useAppSelector((store) => store.labelStock.item);
  const labelGarageTransfer = useAppSelector(
    (store) => store.labelTransfer.item
  );
  const payOther = useAppSelector((store) => store.payStock.item);
  const extraPurchase = useAppSelector((store) => store.extraPurchase.item);
  const [garage, setGarage] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [concernLabelStock, setLabelStock] = useState<Label[]>([]);
  const [concernLabelTransferExit, setLabelTransferExit] = useState<
    LabelTransferGarage[]
  >([]);
  const [concernLabelTransferEnter, setLabelTransferEnter] = useState<
    LabelTransferGarage[]
  >([]);
  const [concernExtraPurchase, setExtraPurchase] = useState<ExtraPurchase[]>(
    []
  );
  const [concernPayOther, setPayOther] = useState<PayOtherItem[]>([]);

  const handleGarage = (garageId: number) => {
    const dataone = labelStocks.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garageId &&
        itemdate.getTime() >= startDate.getTime() &&
        itemdate.getTime() <= endDate.getTime()
      );
    });
    const datatwo = labelGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.exitGarageId === garageId &&
        itemdate.getTime() >= startDate.getTime() &&
        itemdate.getTime() <= endDate.getTime()
      );
    });
    const datathree = payOther.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garageId &&
        itemdate.getTime() >= startDate.getTime() &&
        itemdate.getTime() <= endDate.getTime()
      );
    });
    const datafour = extraPurchase.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garageId &&
        itemdate.getTime() >= startDate.getTime() &&
        itemdate.getTime() <= endDate.getTime()
      );
    });
    const datafive = labelGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.enterenceGarageId === garageId &&
        itemdate.getTime() >= startDate.getTime() &&
        itemdate.getTime() <= endDate.getTime()
      );
    });
    setLabelStock(dataone);
    setPayOther(datathree);
    setExtraPurchase(datafour);
    setLabelTransferExit(datatwo);
    setLabelTransferEnter(datafive);
    setGarage(garageId);
  };

  const handleStartDate = (start: Date) => {
    const dataone = labelStocks.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getTime() >= start.getTime() &&
        itemdate.getTime() <= endDate.getTime()
      );
    });
    const datatwo = labelGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.exitGarageId === garage &&
        itemdate.getTime() >= start.getTime() &&
        itemdate.getTime() <= endDate.getTime()
      );
    });
    const datathree = payOther.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getTime() >= start.getTime() &&
        itemdate.getTime() <= endDate.getTime()
      );
    });
    const datafour = extraPurchase.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getTime() >= start.getTime() &&
        itemdate.getTime() <= endDate.getTime()
      );
    });
    const datafive = labelGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.enterenceGarageId === garage &&
        itemdate.getTime() >= start.getTime() &&
        itemdate.getTime() <= endDate.getTime()
      );
    });
    setLabelStock(dataone);
    setLabelTransferExit(datatwo);
    setLabelTransferEnter(datafive);
    setPayOther(datathree);
    setExtraPurchase(datafour);
    setStartDate(start);
  };

  const handleEndDate = (end: Date) => {
    const dataone = labelStocks.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getTime() >= startDate.getTime() &&
        itemdate.getTime() <= end.getTime()
      );
    });
    const datatwo = labelGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.exitGarageId === garage &&
        itemdate.getTime() >= startDate.getTime() &&
        itemdate.getTime() <= end.getTime()
      );
    });
    const datathree = payOther.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getTime() >= startDate.getTime() &&
        itemdate.getTime() <= end.getTime()
      );
    });
    const datafour = extraPurchase.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getTime() >= startDate.getTime() &&
        itemdate.getTime() <= end.getTime()
      );
    });
    const datafive = labelGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.enterenceGarageId === garage &&
        itemdate.getTime() >= startDate.getTime() &&
        itemdate.getTime() <= end.getTime()
      );
    });
    setLabelStock(dataone);
    setLabelTransferExit(datatwo);
    setLabelTransferEnter(datafive);
    setPayOther(datathree);
    setExtraPurchase(datafour);
    setEndDate(end);
  };

  console.log("labelStock", concernLabelStock);
  console.log("labelTransferexit", concernLabelTransferExit);
  console.log("labelTransferenter", concernLabelTransferEnter);
  console.log("payOther", concernPayOther);
  console.log("extraPurchase", concernExtraPurchase);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ရက်အလိုက်တံဆိပ်လက်ကျန်စာရင်းစစ်ခြင်း
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
          {/* Enter Label */}
          <LabelDateOne
            concernLabelStock={concernLabelStock}
            concernLabelTransferEnter={concernLabelTransferEnter}
            concernLabels={concernLabels}
            garage={garage}
            startDate={startDate}
            endDate={endDate}
          />
          {/* Left Label */}
          <LabelDateTwo
            concernExtraPurchase={concernExtraPurchase}
            concernLabels={concernLabels}
            concernPayOther={concernPayOther}
            garage={garage}
            startDate={startDate}
            endDate={endDate}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          {/* Transfer Label */}
          <LabelDateThree
            concernGarages={concernGarages}
            concernLabelTransferExit={concernLabelTransferExit}
            concernLabels={concernLabels}
            garage={garage}
            startDate={startDate}
            endDate={endDate}
          />
          {/* Remind Label */}
          <LabelDateFour
            concernLabels={concernLabels}
            garage={garage}
            endDate={endDate}
          />
        </Box>
      </AdminLayout>
    </>
  );
};
export default LabelDateReport;
