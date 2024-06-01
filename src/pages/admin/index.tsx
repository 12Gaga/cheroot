import { Box, Button } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Admin = () => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);
  // const { data: session } = useSession();
  // const { init } = useAppSelector((store) => store.app);
  // const dispatch = useAppDispatch();
  // console.log("session", session);
  // useEffect(() => {
  //   if (session && !init) {
  //     dispatch(fetchApp({}));
  //   }
  // }, [session]);
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
