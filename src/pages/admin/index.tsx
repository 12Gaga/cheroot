import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchApp } from "@/store/slices/app";
import { Box, Button } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Admin = () => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);
  if (!session) {
    return (
      <>
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={() => signIn("google", { callbackUrl: "/admin/home" })}
          >
            Sign in
          </Button>
        </Box>
      </>
    );
  } else {
    return router.push("/admin/home");
  }
};

export default Admin;
