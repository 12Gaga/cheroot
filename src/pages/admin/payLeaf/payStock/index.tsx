import PayLeafFive from "@/components/payleaf/payLeafFive";
import PayLeafFour from "@/components/payleaf/payLeafFour";
import {
  Box,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import PayStockButton from "@/components/payleaf/payStockButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { payStock, createNewPayStock } from "@/types/payStockType";
import { useAppSelector } from "@/store/hooks";
import { WorkShop } from "@prisma/client";

const defaultValue: createNewPayStock = {
  date: null,
  agentId: undefined,
  typeOfCherootId: undefined,
  cherootQty: 0,
  typeOfFilterSizeId: undefined,
  filterSizeQty: 0,
  filterSizeBag: 0,
  typeOfTabaccoId: undefined,
  tabaccoQty: 0,
  tabaccoTin: 0,
  tabaccoPyi: 0,
  tabaccoBag: 0,
  typeOfLabelId: undefined,
  labelBandle: 0,
  totalPrice: 0,
  garageId: undefined,
};

const defaultPayStock: payStock = {
  cherootQty: 0,
  filterSizeQty: 0,
  filterSizeBag: 0,
  tabaccoQty: 0,
  tabaccoTin: 0,
  tabaccoPyi: 0,
  tabaccoBag: 0,
};

const PayStock = () => {
  const { data: session } = useSession();
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [newPayStock, setNewPayStock] =
    useState<createNewPayStock>(defaultValue);
  const [payStock, setPayStock] = useState<payStock>(defaultPayStock);
  const workShop = useAppSelector(
    (store) => store.workShop.selectedWorkShop
  ) as WorkShop;
  const agents = useAppSelector((store) => store.agent.item);
  const concernAgent = agents.filter(
    (item) => item.workShopId === workShop?.id
  );
  const garage = useAppSelector((store) => store.garage.item);
  const concernGarage = garage.filter(
    (item) => item.workShopId === workShop?.id
  );
  useEffect(() => {
    setNewPayStock({ ...newPayStock, date: selecteddate });
  }, [selecteddate]);

  console.log("newPayStock", newPayStock);
  console.log("PayStock", payStock);

  if (!session) return;
  return (
    <>
      <Box
        sx={{
          bgcolor: "#FCB500",
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
          ပစ္စည်းထုပ်ပေးစာရင်း
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 5, mt: 2 }}>
        <Typography sx={{ mr: 2 }}>ရက်စွဲ</Typography>
        <DatePicker
          selected={selecteddate}
          onChange={(date) => setSelectedDate(date as Date)}
        />
      </Box>

      <Box sx={{ display: "flex", width: "100%", my: 3, ml: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
          <Typography sx={{ fontWeight: "bold", width: 150 }}>
            ကိုယ်စားလှယ်အမည်
          </Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={newPayStock.agentId}
              onChange={(evt) => {
                setNewPayStock({
                  ...newPayStock,
                  agentId: Number(evt.target.value),
                });
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              {concernAgent.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontWeight: "bold", width: 120 }}>
            ဂိုထောင်အမည်
          </Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={newPayStock.garageId}
              onChange={(evt) => {
                setNewPayStock({
                  ...newPayStock,
                  garageId: Number(evt.target.value),
                });
              }}
              sx={{ bgcolor: "#EEE8CF" }}
            >
              {concernGarage.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box sx={{ display: "flex" }}>
        <PayLeafFour
          newPayStock={newPayStock}
          setNewPayStock={setNewPayStock}
          workShopId={workShop?.id}
          payStock={payStock}
          setPayStock={setPayStock}
        />
      </Box>
      <Box sx={{ display: "flex" }}>
        <PayLeafFive
          newPayStock={newPayStock}
          setNewPayStock={setNewPayStock}
          workShopId={workShop?.id}
        />
      </Box>
      <PayStockButton
        newPayStock={newPayStock}
        setNewPayStock={setNewPayStock}
        workShopId={workShop?.id}
        defaultValue={defaultValue}
      />
    </>
  );
};
export default PayStock;
