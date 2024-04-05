import { Box, Button } from "@mui/material";
import AdminButton3 from "./adminButtonThree";
import { useRouter } from "next/router";
const btns = [
  {
    id: 1,
    title: " အဖွင့်ငွေစာရင်း",
    url: "",
  },
  {
    id: 2,
    title: "အဖွင့်ကုန်ကြမ်းစာရင်း",
    url: "/adminPage/openingStock",
  },
  {
    id: 3,
    title: "သုံးငွေစာရင်း",
    url: "",
  },
  {
    id: 4,
    title: "ဝင်ငွေစာရင်း",
    url: "",
  },
  {
    id: 5,
    title: "ကုန်ကြမ်းစာရင်း",
    url: "",
  },
  {
    id: 6,
    title: "ကုန်ချောစာရင်း",
    url: "",
  },
  {
    id: 7,
    title: " အမည်စာရင်း",
    url: "/adminPage/name",
  },
  {
    id: 8,
    title: " ထပ်ဝယ်စာရင်း",
    url: "",
  },
  {
    id: 9,
    title: "  ဖက်ထုပ်ပေးစာရင်း",
    url: "",
  },
  {
    id: 10,
    title: "  ဆေးလိပ်အဝင်စာရင်း",
    url: "",
  },
  {
    id: 11,
    title: " ပစ္စည်းထပ်ဖြည့်စာရင်း",
    url: "/adminPage/addStock",
  },
  {
    id: 12,
    title: " စာရင်း",
    url: "",
  },
];

const Admin = () => {
  const router = useRouter();
  return (
    <>
      <Box sx={{ display: "flex", mt: 3 }}>
        <Box sx={{ width: "42%" }}>
          <img
            src="/cheroot5 copy.png"
            alt={"cheroot pic"}
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",

              justifyContent: "center",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
              }}
            >
              {btns.map((item) => (
                <Button
                  key={item.id}
                  variant="contained"
                  sx={{
                    bgcolor: "#E55252",
                    mt: 3,
                    width: 220,
                    height: 50,
                    fontSize: 18,
                    borderRadius: 20,
                    "&:hover": {
                      bgcolor: "#FCB500",
                      color: "white",
                      fontWeight: "bold",
                    },
                  }}
                  onClick={() => router.push(item.url)}
                >
                  {item.title}
                </Button>
              ))}
            </Box>
            <AdminButton3 />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Admin;
