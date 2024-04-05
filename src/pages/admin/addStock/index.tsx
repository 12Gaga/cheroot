import { Box, Typography } from "@mui/material";
import DatePicker from "react-datepicker";
import { useState } from "react";
import AdminLayout from "@/components/adminLayout";
import "react-datepicker/dist/react-datepicker.css";
import GeneralExpensive from "@/components/addSt/generalExpensive";
import AddLeaf from "@/components/addSt/addLeaf";

const AddStock = () => {
  const [selecteddate, setSelectedDate] = useState<any>(new Date());

  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ပိုနံပါတ်
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
          <DatePicker
            selected={selecteddate}
            onChange={(date) => setSelectedDate(date)}
          />
        </Box>

        <GeneralExpensive />

        <AddLeaf />
      </AdminLayout>
    </>
  );
};
export default AddStock;
