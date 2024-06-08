import AdminLayout from "@/components/adminLayout";
import { useAppSelector } from "@/store/hooks";
import { Packing, Plastic } from "@prisma/client";
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
import PlasticDateOne from "@/components/garageReport/plasticDateOne";
import PlasticDateTwo from "@/components/garageReport/plasticDateTwo";
import PlasticDateThree from "@/components/garageReport/platicDateThree";
const PlasticDateReport = () => {
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const plastics = useAppSelector((store) => store.typeOfPlastic.item);
  const concernPlastic = plastics.filter((l) => l.workShopId === workShopId);
  const garages = useAppSelector((store) => store.garage.item);
  const concernGarages = garages.filter((g) => g.workShopId === workShopId);
  const plasticStocks = useAppSelector((store) => store.plasticStock.item);
  const packing = useAppSelector((store) => store.packingData.item);
  const [garage, setGarage] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [concernPlasticStock, setPlasticStock] = useState<Plastic[]>([]);
  const [concernPacking, setPacking] = useState<Packing[]>([]);

  const handleGarage = (garageId: number) => {
    const dataone = plasticStocks.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garageId &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    const datatwo = packing.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garageId &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });

    setPlasticStock(dataone);
    setPacking(datatwo);
    setGarage(garageId);
  };

  const handleStartDate = (start: Date) => {
    const dataone = plasticStocks.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getDate() >= start.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === start.getMonth()
      );
    });
    const datatwo = packing.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getDate() >= start.getDate() &&
        itemdate.getDate() <= endDate.getDate() &&
        itemdate.getMonth() === start.getMonth()
      );
    });
    setPlasticStock(dataone);
    setPacking(datatwo);
    setStartDate(start);
  };

  const handleEndDate = (end: Date) => {
    const dataone = plasticStocks.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= end.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });
    const datatwo = packing.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getDate() >= startDate.getDate() &&
        itemdate.getDate() <= end.getDate() &&
        itemdate.getMonth() === startDate.getMonth()
      );
    });

    setPlasticStock(dataone);
    setPacking(datatwo);
    setEndDate(end);
  };

  console.log("plasticStock", concernPlasticStock);
  console.log("packing", concernPacking);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ရက်အလိုက်ပလပ်စတစ်လက်ကျန်စာရင်းစစ်ခြင်း
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
          {/* Enter Plastic */}
          <PlasticDateOne
            concernPlastic={concernPlastic}
            concernPlasticStock={concernPlasticStock}
            garage={garage}
          />
          {/* Left Plastic */}
          <PlasticDateTwo
            concernPacking={concernPacking}
            concernPlastic={concernPlastic}
            garage={garage}
          />
        </Box>
        <PlasticDateThree
          concernPlastic={concernPlastic}
          garage={garage}
          endDate={endDate}
        />
      </AdminLayout>
    </>
  );
};
export default PlasticDateReport;
