import AgentButton from "@/components/agentName/agentButton";
import AgentOne from "@/components/agentName/agentOne";
import Agent from "@/components/agentName/agentOne";
import AgentThree from "@/components/agentName/agentThree";
import AgentTwo from "@/components/agentName/agentTwo";
import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const NamePage = () => {
  const { data: session } = useSession();
  if (!session) return;
  return (
    <>
      <Box
        sx={{
          bgcolor: "#FCB500",
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
          ကိုယ်စားလှယ်အမည်စာရင်း
        </Typography>
      </Box>

      <Box sx={{ display: "flex", mt: 2 }}>
        <Box
          sx={{
            width: "75%",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <AgentOne />
          <AgentTwo />
          <AgentThree />
        </Box>

        <Box
          sx={{
            width: "25%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <AgentButton />
        </Box>
      </Box>
    </>
  );
};
export default NamePage;
