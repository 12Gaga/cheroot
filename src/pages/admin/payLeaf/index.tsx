import PayLeafOne from "@/components/payleaf/payLeafOne";
import PayLeafThree from "@/components/payleaf/payLeafThree";
import PayLeafTwo from "@/components/payleaf/payLeafTwo";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
import { useEffect, useState } from "react";
import PayLeafButton from "@/components/payleaf/payLeafButton";
import { useSession } from "next-auth/react";
import { setSelectedGarage } from "@/store/slices/garage";
import { createNewPayLeaf } from "@/types/payLeafType";
import { useAppSelector } from "@/store/hooks";
import { WorkShop } from "@prisma/client";

const defaultValue: createNewPayLeaf = {
  date: undefined,
  agentId: undefined,
  typeOfLeafId: undefined,
  batchNo: [],
  viss: 0,
  discountViss: 0,
  netViss: 0,
  price: 0,
  amount: 0,
  garageId: undefined,
};

const PayLeaf = () => {
  const { data: session } = useSession();
  const [selecteddate, setSelectedDate] = useState<any>(new Date());
  const [newPayLeaf, setNewPayLeaf] = useState<createNewPayLeaf>(defaultValue);
  const garages = useAppSelector((store) => store.garage.item);
  const workShop = useAppSelector(
    (store) => store.workShop.selectedWorkShop
  ) as WorkShop;
  const concernGarage = garages.filter(
    (item) => item.workShopId === workShop?.id
  );
  useEffect(() => {
    setNewPayLeaf({ ...newPayLeaf, date: selecteddate });
  }, [selecteddate]);

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
          ဆေးလိပ်ကိုယ်စားလှယ်ဖက်ထုတ်ပေးစာရင်း
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 5, mt: 2 }}>
        <Typography sx={{ mr: 2 }}>ရက်စွဲ</Typography>
        <DatePicker
          selected={selecteddate}
          onChange={(date) => setSelectedDate(date)}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", ml: 3 }}>
        <Typography sx={{ fontWeight: "bold", width: 120 }}>
          ဂိုထောင်အမည်
        </Typography>
        <FormControl variant="filled" sx={{ width: 225 }}>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={newPayLeaf.garageId}
            onChange={(evt) => {
              setNewPayLeaf({
                ...newPayLeaf,
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

      <Box sx={{ display: "flex", mt: 2 }}>
        <Box
          sx={{
            width: "75%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <PayLeafOne
            newPayLeaf={newPayLeaf}
            setNewPayLeaf={setNewPayLeaf}
            workShopId={workShop?.id}
          />
          <PayLeafTwo newPayLeaf={newPayLeaf} setNewPayLeaf={setNewPayLeaf} />
        </Box>

        <Box
          sx={{
            width: "25%",
            bgcolor: "#FFD0C7",
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            py: 2,
          }}
        >
          <PayLeafThree newPayLeaf={newPayLeaf} setNewPayLeaf={setNewPayLeaf} />
        </Box>
      </Box>

      <PayLeafButton
        newPayLeaf={newPayLeaf}
        setNewPayLeaf={setNewPayLeaf}
        defaultValue={defaultValue}
      />
    </>
  );
};
export default PayLeaf;
