import Image from "next/image";
import { Inter } from "next/font/google";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { Login } from "@mui/icons-material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
            onClick={() => signIn("google", { callbackUrl: "/admin" })}
          >
            Sign in
          </Button>
        </Box>
      </>
    );
  } else {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="contained" onClick={() => router.push("/admin")}>
          Log in
        </Button>
      </Box>
    );
  }
}
