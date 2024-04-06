import {
  Box,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const opening = [
  { label: "ပိုနံပါတ်", url: "/admin/openingStock" },
  { label: "အဆီခံ (အရေအတွက်/အိတ်)", url: "/admin/openingStock/filterSize" },
  { label: "ဆေးစပ် (တင်း/ပြည်)", url: "/admin/openingStock/tabacco" },
  { label: "တံဆိပ် (လိပ်) ", url: "/admin/openingStock/label" },
];

const adding = [
  { label: "ပိုနံပါတ်", url: "/admin/addStock" },
  { label: "အဆီခံ (အရေအတွက်/အိတ်)", url: "/admin/addStock/addFilterSize" },
  { label: "ဆေးစပ် (တင်း/ပြည်)", url: "/admin/addStock/addTabacco" },
  { label: "တံဆိပ် (လိပ်) ", url: "/admin/addStock/addLabel" },
];

const asigning = [
  { label: "ဖက်အမျိုးအစား", url: "/admin/asignNamePrice" },
  { label: "အဆီခံအမျိုးအစား", url: "/admin/asignNamePrice/typeFilterSize" },
  { label: "ဆေးစပ်အမျိုးအစား", url: "/admin/asignNamePrice/typeTabacco" },
  { label: "တံဆိပ်အမျိုးအစား", url: "/admin/asignNamePrice/typeLabel" },
  { label: "ဆေးလိပ်အမျိုးအစား", url: "/admin/asignNamePrice/typeCheroot" },
  { label: "ဂိုထောင်", url: "/admin/asignNamePrice/garage" },
];

const AdminLayout = ({ children }: Props) => {
  const router = useRouter();
  const open = router.pathname.includes("openingStock");
  const add = router.pathname.includes("addStock");
  const asign = router.pathname.includes("asignNamePrice");
  let data;
  if (open) {
    data = [...opening];
  } else if (add) {
    data = [...adding];
  } else if (asign) {
    data = [...asigning];
  }

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
        {open && (
          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
            ဂိုထောင်အဖွင့်ကုန်ကြမ်းစာရင်း
          </Typography>
        )}
        {add && (
          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
            ကုန်ကြမ်းထပ်ဖြည့်ခြင်း
          </Typography>
        )}
        {asign && (
          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
            ကုန်ကြမ်းအမည်သတ်မှတ်ခြင်းနှင့်ဈေးနှုန်းသတ်မှတ်ခြင်း
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", position: "relative", zIndex: 5, flex: 1 }}>
        <Box
          sx={{
            minWidth: 250,
            bgcolor: "#F7F79A",
            borderTopRightRadius: "20px",
            minHeight: "100vh",
          }}
        >
          <List sx={{ p: 0 }}>
            {data &&
              data.map((item) => (
                <Link
                  href={item.url}
                  key={item.label}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem
                    disablePadding
                    sx={{ "&:hover": { backgroundColor: "yellow" } }}
                  >
                    <ListItemButton>
                      <ListItemText
                        primary={item.label}
                        sx={{
                          color: "black",
                          fontWeight: "bold",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
          </List>
        </Box>
        <Box sx={{ px: 3, py: 2, width: "100%", height: "100%" }}>
          {children}
        </Box>
      </Box>
    </>
  );
};
export default AdminLayout;
