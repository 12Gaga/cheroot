import Image from "next/image";
import { Inter } from "next/font/google";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
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
          zIndex: -1,
        }}
      />
      <Box sx={{}}>
        <Box sx={{ display: "flex", height: "100%" }}>
          <Box
            sx={{
              width: "50%",
              height: "100%",
              position: "absolute",
              top: 50,
              zIndex: -1,
              bgcolor: "#E7E7E7",
            }}
          >
            <Image
              src="/cheroot6.jpg"
              alt={"middle-image"}
              width={600}
              height={500}
            />
          </Box>

          <Box
            sx={{
              width: "50%",
              height: "100%",
              position: "absolute",
              right: 0,
              bgcolor: "#E7E7E7",
              top: 50,
              zIndex: -1,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#D83E3E",
                fontWeight: "bold",
                mt: 35,
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
                onClick={() => router.push("/admin")}
              >
                Bago
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Image
        src="/adminBottomWave.svg"
        alt={"header-image"}
        width={0}
        height={0}
        style={{
          width: "100%",
          height: "auto",
          zIndex: -1,
        }}
      />
    </>
  );
}
