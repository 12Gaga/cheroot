import LabelExtra from "@/components/extraPur/extraLabel";
import FilterSizeExtra from "@/components/extraPur/extraPurFilterSize";
import ExtraPurTop from "@/components/extraPur/extraPurTop";
import TabaccoExtra from "@/components/extraPur/extraTabacco";
import { Box, Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

import "react-datepicker/dist/react-datepicker.css";
const ExtraPurchase = () => {
  const { data: session } = useSession();
  if (!session) return;
  return (
    <>
      <Box
        sx={{
          bgcolor: "#FCB500",
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
          ထပ်ဝယ်စာရင်း
        </Typography>
      </Box>

      <ExtraPurTop />

      <Typography
        variant="h6"
        sx={{
          color: "white",
          fontWeight: "bold",
          bgcolor: "#FCB500",
          mt: 2,
          width: 150,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        အဆီခံ
      </Typography>

      <FilterSizeExtra />

      <Typography
        variant="h6"
        sx={{
          color: "white",
          fontWeight: "bold",
          bgcolor: "#FCB500",
          mt: 2,
          width: 150,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        ဆေးစပ်
      </Typography>

      <TabaccoExtra />

      <Typography
        variant="h6"
        sx={{
          color: "white",
          fontWeight: "bold",
          bgcolor: "#FCB500",
          mt: 2,
          width: 150,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        တံဆိပ်
      </Typography>

      <LabelExtra />

      <Box sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#D83E3E",
            width: 220,
            height: 50,
            fontSize: 18,
            borderRadius: 10,
            "&:hover": {
              bgcolor: "#F7A71B",
              color: "white",
              fontWeight: "bold",
            },
          }}
        >
          သိမ်းမည်
        </Button>
      </Box>
    </>
  );
};
export default ExtraPurchase;
