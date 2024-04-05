import { Box, Button } from "@mui/material";

const AdminButton3 = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: "#E55252",
            mt: 3,
            width: 320,
            height: 50,
            fontSize: 18,
            borderRadius: 20,
            "&:hover": {
              bgcolor: "#FCB500",
              color: "white",
              fontWeight: "bold",
            },
          }}
        >
          ထပ်ဖြည့်ပစ္စည်းစာရင်းစစ်ခြင်း
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#E55252",
            mt: 3,
            width: 320,
            height: 50,
            fontSize: 18,
            borderRadius: 20,
            "&:hover": {
              bgcolor: "#FCB500",
              color: "white",
              fontWeight: "bold",
            },
          }}
        >
          ဂိုထောင်ရှိပစ္စည်းစာရင်းစစ်ခြင်း
        </Button>
      </Box>
    </>
  );
};
export default AdminButton3;
