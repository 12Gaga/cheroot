import { useAppSelector } from "@/store/hooks";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import AdminLayout from "@/components/adminLayout";
import {
  Box,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Leaf, LeafTransferGarage, PayLeaf } from "@prisma/client";
import LeafDateOne from "@/components/garageReport/leafDateOne";
import LeafDateTwo from "@/components/garageReport/leafDateTwo";
import LeafDateThree from "@/components/garageReport/leafDateThree";
import LeafDateFour from "@/components/garageReport/leafDateFour";
const LeafDateReport = () => {
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const concernLeaves = leaves.filter((l) => l.workShopId === workShopId);
  const garages = useAppSelector((store) => store.garage.item);
  const concernGarages = garages.filter((g) => g.workShopId === workShopId);
  const leafStock = useAppSelector((store) => store.leafStock.item);
  const leafGarageTransfer = useAppSelector((store) => store.leafTransfer.item);
  const payLeaf = useAppSelector((store) => store.payLeaf.item);
  const [garage, setGarage] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [concernLeafStock, setLeafStock] = useState<Leaf[]>([]);
  const [concernPayLeaf, setPayLeaf] = useState<PayLeaf[]>([]);
  const [concernLeafTransfer, setLeafTransfer] = useState<LeafTransferGarage[]>(
    []
  );
  const [concernLeafTransferEnter, setLeafTransferEnter] = useState<
    LeafTransferGarage[]
  >([]);
  const handleGarage = (garageId: number) => {
    const dataone = leafStock.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garageId &&
        itemdate.getTime() >= startDate.getTime() &&
        itemdate.getTime() <= endDate.getTime()
      );
    });
    const datatwo = leafGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.exitGarageId === garageId &&
        itemdate.getTime() >= startDate.getTime() &&
        itemdate.getTime() <= endDate.getTime()
      );
    });
    const datathree = payLeaf.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garageId &&
        itemdate.getTime() >= startDate.getTime() &&
        itemdate.getTime() <= endDate.getTime()
      );
    });
    const datafour = leafGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.enterenceGarageId === garageId &&
        itemdate.getTime() >= startDate.getTime() &&
        itemdate.getTime() <= endDate.getTime()
      );
    });
    setLeafStock(dataone);
    setLeafTransfer(datatwo);
    setPayLeaf(datathree);
    setGarage(garageId);
    setLeafTransferEnter(datafour);
  };

  const handleStartDate = (start: Date) => {
    const dataone = leafStock.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getTime() >= start.getTime() &&
        itemdate.getTime() <= endDate.getTime()
      );
    });
    const datatwo = leafGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.exitGarageId === garage &&
        itemdate.getTime() >= start.getTime() &&
        itemdate.getTime() <= endDate.getTime()
      );
    });
    const datathree = payLeaf.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getTime() >= start.getTime() &&
        itemdate.getTime() <= endDate.getTime()
      );
    });
    const datafour = leafGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.enterenceGarageId === garage &&
        itemdate.getTime() >= start.getTime() &&
        itemdate.getTime() <= endDate.getTime()
      );
    });
    setLeafStock(dataone);
    setLeafTransfer(datatwo);
    setPayLeaf(datathree);
    setStartDate(start);
    setLeafTransferEnter(datafour);
  };

  const handleEndDate = (end: Date) => {
    const dataone = leafStock.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getTime() >= startDate.getTime() &&
        itemdate.getTime() <= end.getTime()
      );
    });
    const datatwo = leafGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.exitGarageId === garage &&
        itemdate.getTime() >= startDate.getTime() &&
        itemdate.getTime() <= end.getTime()
      );
    });
    const datathree = payLeaf.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.garageId === garage &&
        itemdate.getTime() >= startDate.getTime() &&
        itemdate.getTime() <= end.getTime()
      );
    });
    const datafour = leafGarageTransfer.filter((item) => {
      const itemdate = new Date(item.date);
      return (
        item.enterenceGarageId === garage &&
        itemdate.getTime() >= startDate.getTime() &&
        itemdate.getTime() <= end.getTime()
      );
    });
    setLeafStock(dataone);
    setLeafTransfer(datatwo);
    setPayLeaf(datathree);
    setEndDate(end);
    setLeafTransferEnter(datafour);
  };

  console.log("leafStock", concernLeafStock);
  console.log("leafTransfer", concernLeafTransfer);
  console.log("payLeaf", concernPayLeaf);
  console.log("leafTransferEnter", concernLeafTransferEnter);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ရက်အလိုက်ဖက်လက်ကျန်စာရင်းစစ်ခြင်း
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
          {/* Enter Leaf */}
          <LeafDateOne
            concernLeafStock={concernLeafStock}
            concernLeaves={concernLeaves}
            concernLeafTransferEnter={concernLeafTransferEnter}
            garage={garage}
            startDate={startDate}
            endDate={endDate}
          />
          {/* Left Leaf */}
          <LeafDateTwo
            concernLeaves={concernLeaves}
            concernPayLeaf={concernPayLeaf}
            garage={garage}
            startDate={startDate}
            endDate={endDate}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          {/* Transfer Leaf */}
          <LeafDateThree
            concernGarages={concernGarages}
            concernLeafTransfer={concernLeafTransfer}
            concernLeaves={concernLeaves}
            garage={garage}
            startDate={startDate}
            endDate={endDate}
          />
          {/* Remind Leaf */}
          <LeafDateFour
            garage={garage}
            concernLeaves={concernLeaves}
            endDate={endDate}
          />
        </Box>
      </AdminLayout>
    </>
  );
};
export default LeafDateReport;
