import { Box, Button, Typography } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
const Admin = () => {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session) return null;
  return (
    <>
      <Image
        src="/adminTopWave.svg"
        alt={"header-image"}
        width={0}
        height={0}
        style={{
          width: "100%",
          height: "auto",
        }}
      />

      <Box
        sx={{
          display: "flex",
          height: "100%",
          position: "relative",
          top: -180,
        }}
      >
        <Box
          sx={{
            width: "50%",
          }}
        >
          <Image
            src="/cheroot.png"
            alt={"middle-image"}
            width={700}
            height={500}
          />
        </Box>

        <Box
          sx={{
            width: "50%",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#D83E3E",
              fontWeight: "bold",
              mt: 25,
              textAlign: "center",
              fontSize: 50,
            }}
          >
            Shwe Bo Daw Ma
          </Typography>

          <Box
            sx={{ display: "flex", justifyContent: "center", mt: 5, gap: 3 }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: "#E55252",
                width: 200,
                height: 65,
                fontSize: 20,
                borderRadius: 10,
                "&:hover": {
                  bgcolor: "#FCB500",
                  color: "white",
                  fontWeight: "bold",
                },
              }}
            >
              Shwe Bo
            </Button>

            <Button
              variant="contained"
              sx={{
                bgcolor: "#E55252",
                width: 200,
                height: 65,
                fontSize: 20,
                borderRadius: 10,
                "&:hover": {
                  bgcolor: "#FCB500",
                  color: "white",
                  fontWeight: "bold",
                },
              }}
              onClick={() => router.push("/admin/home")}
            >
              Bago
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Admin;
