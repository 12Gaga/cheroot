import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Button variant="contained" onClick={() => router.push("/admin")}>
        ဝင်ရောက်သည်
      </Button>
    </>
  );
}
