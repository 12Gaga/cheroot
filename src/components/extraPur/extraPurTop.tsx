import { useAppSelector } from "@/store/hooks";
import { createNewExtraPurchase } from "@/types/extraPurchaseType";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  newExtraPurchase: createNewExtraPurchase;
  setNewExtraPurchase: (value: createNewExtraPurchase) => void;
  workshopId: number;
}

const ExtraPurTop = ({
  newExtraPurchase,
  setNewExtraPurchase,
  workshopId,
}: Props) => {
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const agent = useAppSelector((store) => store.agent.item);
  const concernAgent = agent.filter((item) => item.workShopId === workshopId);
  const garage = useAppSelector((store) => store.garage.item);
  const concernGarage = garage.filter((item) => item.workShopId === workshopId);
  useEffect(() => {
    console.log("datedfg", selecteddate);
    setNewExtraPurchase({ ...newExtraPurchase, date: selecteddate });
  }, [selecteddate]);
  console.log("data", newExtraPurchase);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 400,
            mt: 2,
            ml: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "bold", mr: 2 }}>
            ကိုယ်စားလှယ်အမည်
          </Typography>
          <FormControl variant="filled" sx={{ width: 225 }}>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={newExtraPurchase?.agentId}
              onChange={(evt) => {
                setNewExtraPurchase({
                  ...newExtraPurchase,
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
              value={newExtraPurchase.garageId}
              onChange={(evt) => {
                setNewExtraPurchase({
                  ...newExtraPurchase,
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

        <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 5, mt: 2 }}>
          <Typography sx={{ mr: 2 }}>ရက်စွဲ</Typography>
          <DatePicker
            selected={selecteddate}
            onChange={(date) => setSelectedDate(date as Date)}
          />
        </Box>
      </Box>
    </>
  );
};
export default ExtraPurTop;
