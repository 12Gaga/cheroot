import { useRouter } from "next/router";
import { ReactNode } from "react";
import LayoutAdmin from "./layoutAdmin";
import { Box } from "@mui/material";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const adminPage = router.pathname.includes("/admin");
  if (adminPage) {
    return (
      <Box sx={{ height: "100%" }}>
        <LayoutAdmin>{children}</LayoutAdmin>
      </Box>
    );
  }
  return <Box sx={{ height: "100%" }}>{children}</Box>;
};

export default Layout;
