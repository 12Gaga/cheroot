import { Box, Button } from "@mui/material";
import AdminButton3 from "./adminButtonThree";
import { useRouter } from "next/router";
const btns = [
  {
    id: 1,
    title: "ကုန်ကြမ်းအမည်နှင့်ဈေးသတ်မှတ်ခြင်း",
    url: "/admin/asignNamePrice",
  },
  {
    id: 2,
    title: "ဂိုထောင်အဖွင့်ကုန်ကြမ်းစာရင်း",
    url: "/admin/openingStock",
  },
  {
    id: 3,
    title: "ကုန်ကြမ်းထပ်ဖြည့်ခြင်း",
    url: "/admin/addStock",
  },
  {
    id: 4,
    title: "သုံးငွေစာရင်း",
    url: "/admin/moneyData",
  },
  {
    id: 5,
    title: "Formulaထည့်ခြင်း",
    url: "/admin/formula",
  },
  {
    id: 6,
    title: "ပဲခူးပစ္စည်းစာရင်း",
    url: "/admin/bago",
  },
  {
    id: 7,
    title: "တောင်ကြီးစာရင်း",
    url: "/admin/taungyi",
  },
  {
    id: 8,
    title: " ကိုယ်စားလှယ်အမည်စာရင်း",
    url: "/admin/name",
  },
  {
    id: 9,
    title: "  ဖက်ထုပ်ပေးခြင်း",
    url: "/admin/payLeaf",
  },
  {
    id: 10,
    title: "  ဆေးလိပ်အဝင်စာရင်း",
    url: "/admin/returnCheroot",
  },
  {
    id: 11,
    title: "ထပ်ဝယ်စာရင်း",
    url: "/admin/extraPurchase",
  },
  {
    id: 12,
    title: "ပစ္စည်းထုပ်ပေးစာရင်း",
    url: "/admin/payLeaf/payStock",
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
                    width: 235,
                    height: 65,
                    fontSize: 16,
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
