import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchApp } from "@/store/slices/app";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

const LayoutAdmin = ({ children }: Props) => {
  const { data: session } = useSession();
  const { init } = useAppSelector((store) => store.app);
  const dispatch = useAppDispatch();
  console.log("session", session);
  useEffect(() => {
    if (session && !init) {
      dispatch(fetchApp({}));
    }
  }, [session]);

  return (
    <>
      <Box>{children}</Box>
    </>
  );
};

export default LayoutAdmin;
