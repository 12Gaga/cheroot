import AdminLayout from "@/components/adminLayout";
import { useAppSelector } from "@/store/hooks";
import {
  ExtraPurchase,
  FilterSize,
  FilterSizeTransferGarage,
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
import FilterDateOne from "@/components/garageReport/filterDateOne";
import FilterDateTwo from "@/components/garageReport/filterDateTwo";
import FilterDateThree from "@/components/garageReport/filterSizeThree";
import FilterDateFour from "@/components/garageReport/filterDateFour";
const FilterSizeDateReport = () => {
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const filterSizes = useAppSelector((store) => store.typeOfFilterSize.item);
  const concernFilterSizes = filterSizes.filter(
    (l) => l.workShopId === workShopId
  );
  const garages = useAppSelector((store) => store.garage.item);
  const concernGarages = garages.filter((g) => g.workShopId === workShopId);
  const filterSizeStocks = useAppSelector(
    (store) => store.filterSizeStock.item
  );
  const filterGarageTransfer = useAppSelector(
    (store) => store.filterSizeTransfer.item
  );
  const payOther = useAppSelector((store) => store.payStock.item);
  const extraPurchase = useAppSelector((store) => store.extraPurchase.item);
  const [garage, setGarage] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [concernFilterSizeStock, setFilterSizeStock] = useState<FilterSize[]>(
    []
  );
  const [concernFilterTransferExit, setFilterTransferExit] = useState<
    FilterSizeTransferGarage[]
  >([]);
  const [concernFilterTransferEnter, setFilterTransferEnter] = useState<
    FilterSizeTransferGarage[]
  >([]);
  const [concernExtraPurchase, setExtraPurchase] = useState<ExtraPurchase[]>(
    []
  );
  const [concernPayOther, setPayOther] = useState<PayOtherItem[]>([]);

  const handleGarage = (garageId: number) => {
    const dataone = filterSizeStocks.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garageId &&
        itemdate.getTime() >= startDate.getTime() &&
        itemdate.getTime() <= endDate.getTime()
      );
    });
    const datatwo = filterGarageTransfer.filter((item) => {
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
    const datafive = filterGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.enterenceGarageId === garageId &&
        itemdate.getTime() >= startDate.getTime() &&
        itemdate.getTime() <= endDate.getTime()
      );
    });
    setFilterSizeStock(dataone);
    setPayOther(datathree);
    setExtraPurchase(datafour);
    setFilterTransferExit(datatwo);
    setFilterTransferEnter(datafive);
    setGarage(garageId);
  };

  const handleStartDate = (start: Date) => {
    const dataone = filterSizeStocks.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getTime() >= start.getTime() &&
        itemdate.getTime() <= endDate.getTime()
      );
    });
    const datatwo = filterGarageTransfer.filter((item) => {
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
    const datafive = filterGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.enterenceGarageId === garage &&
        itemdate.getTime() >= start.getTime() &&
        itemdate.getTime() <= endDate.getTime()
      );
    });
    setFilterSizeStock(dataone);
    setFilterTransferExit(datatwo);
    setFilterTransferEnter(datafive);
    setPayOther(datathree);
    setExtraPurchase(datafour);
    setStartDate(start);
  };

  const handleEndDate = (end: Date) => {
    const dataone = filterSizeStocks.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getTime() >= startDate.getTime() &&
        itemdate.getTime() <= end.getTime()
      );
    });
    const datatwo = filterGarageTransfer.filter((item) => {
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
    const datafive = filterGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.enterenceGarageId === garage &&
        itemdate.getTime() >= startDate.getTime() &&
        itemdate.getTime() <= end.getTime()
      );
    });
    setFilterSizeStock(dataone);
    setFilterTransferExit(datatwo);
    setFilterTransferEnter(datafive);
    setPayOther(datathree);
    setExtraPurchase(datafour);
    setEndDate(end);
  };

  console.log("filterStock", concernFilterSizeStock);
  console.log("filterTransferexit", concernFilterTransferExit);
  console.log("filterTransferenter", concernFilterTransferEnter);
  console.log("payOther", concernPayOther);
  console.log("extraPurchase", concernExtraPurchase);

  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ရက်အလိုက်အဆီခံလက်ကျန်စာရင်းစစ်ခြင်း
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
          {/* Enter FilterSize */}
          <FilterDateOne
            concernFilterSizeStock={concernFilterSizeStock}
            concernFilterSizes={concernFilterSizes}
            concernFilterTransferEnter={concernFilterTransferEnter}
            garage={garage}
            startDate={startDate}
            endDate={endDate}
          />

          {/* Left FiterSize */}
          <FilterDateTwo
            concernExtraPurchase={concernExtraPurchase}
            concernFilterSizes={concernFilterSizes}
            concernPayOther={concernPayOther}
            garage={garage}
            startDate={startDate}
            endDate={endDate}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          {/* Transfer FilterSize */}
          <FilterDateThree
            concernFilterSizes={concernFilterSizes}
            concernFilterTransferExit={concernFilterTransferExit}
            garage={garage}
            concernGarages={concernGarages}
            startDate={startDate}
            endDate={endDate}
          />
          {/* Remine FilterSize */}
          <FilterDateFour
            concernFilterSizes={concernFilterSizes}
            garage={garage}
            endDate={endDate}
          />
        </Box>
      </AdminLayout>
    </>
  );
};
export default FilterSizeDateReport;
