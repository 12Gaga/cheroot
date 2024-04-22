import Admin from "@/components/admin/adminHome";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
const AdminPage = () => {
  const { data: session } = useSession();
  if (!session) return null;

  return (
    <>
      <Box
        sx={{
          bgcolor: "#F6D201",
          p: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image
          src="/cigaretteLogo.png"
          alt={"Logo"}
          width={130}
          height={70}
          style={{ borderRadius: "20%", border: "3px solid white" }}
        />
        <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
          Admin Page
        </Typography>
        <Button
          variant="contained"
          onClick={() => signOut({ callbackUrl: "/admin" })}
        >
          Sign out
        </Button>
      </Box>

      <Admin />
    </>
  );
};

export default AdminPage;
