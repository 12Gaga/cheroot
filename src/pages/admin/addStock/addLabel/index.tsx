import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import DatePicker from "react-datepicker";
import { useState } from "react";
import AdminLayout from "@/components/adminLayout";
import "react-datepicker/dist/react-datepicker.css";
import GeneralExpensive from "@/components/addSt/generalExpensive";
import AddLabel from "@/components/addSt/addLabel";
import AddBoxIcon from "@mui/icons-material/AddBox";
const AddStock = () => {
  const [selecteddate, setSelectedDate] = useState<any>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          တံဆိပ် (လိပ်)
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <AddBoxIcon
            onClick={() => {
              setOpen(true);
            }}
            sx={{ fontSize: 50 }}
          />
        </Box>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogContent>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}>
              <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
              <DatePicker
                selected={selecteddate}
                onChange={(date) => setSelectedDate(date)}
              />
            </Box>
            <GeneralExpensive />
            <AddLabel />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setOpen(false)}>
              မလုပ်တော့ပါ
            </Button>
            <Button variant="contained">သိမ်းမည်</Button>
          </DialogActions>
        </Dialog>
      </AdminLayout>
    </>
  );
};
export default AddStock;
