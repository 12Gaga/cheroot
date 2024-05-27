import NewAgentLeafViss from "@/components/agentName/newAgentLeafViss";
import { useAppSelector } from "@/store/hooks";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import HomeIcon from "@mui/icons-material/Home";
import UpdateAgentLeafViss from "@/components/agentName/updateAgentLeafViss";
import DeleteAgentLeafViss from "@/components/agentName/deleteAgentLeafViss";
const AgentLeafVissPage = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const agent = useAppSelector((store) => store.agent.item);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const concetnAgent = agent.filter((item) => item.workShopId === workShop?.id);
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const concernLeaves = leaves.filter(
    (item) => item.workShopId === workShop?.id
  );
  const leafViss = useAppSelector((store) => store.agentLeafViss.item);
  const concernLeafViss = leafViss.filter(
    (item) => item.workShopId === workShop?.id
  );

  const { selectedWorkShop, item: workShops } = useAppSelector(
    (store) => store.workShop
  );
  const work = workShops.find((item) => item.id === selectedWorkShop?.id);
  const { selectedGarage, item: garages } = useAppSelector(
    (store) => store.garage
  );
  const gar = garages.find((item) => item.id === selectedGarage?.id);
  const router = useRouter();
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);

  if (!session) return;
  return (
    <>
      <Box
        sx={{
          bgcolor: "#FCB500",
          p: 1.5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
          ကိုယ်စားလှယ်ဖက်လက်ကျန်ထည့်ခြင်း
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ color: "white", fontWeight: "bold", mt: 1 }}>
            {work?.name} /
          </Typography>
          <Typography sx={{ color: "white", fontWeight: "bold", mt: 1 }}>
            {gar?.name}
          </Typography>
        </Box>
        <Box sx={{ position: "absolute", right: 10, top: 25, color: "white" }}>
          <HomeIcon
            onClick={() => router.push("/admin/home")}
            sx={{ fontSize: 40 }}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <AddBoxIcon
          onClick={() => {
            setOpen(true);
          }}
          sx={{ fontSize: 50 }}
        />
      </Box>

      <Box sx={{}}>
        <table border={1}>
          <thead>
            <tr style={{ border: "1px solid" }}>
              <th>အမည်</th>
              <th>ဖက်အမျိုးအစား</th>
              <th>ပိဿာ</th>
            </tr>
          </thead>
          {concernLeafViss.map((item) => (
            <thead key={item.id}>
              <tr style={{ border: "1px solid" }}>
                <td>{concetnAgent.find((a) => a.id === item.agentId)?.name}</td>
                <td>
                  {concernLeaves.find((l) => l.id === item.typeOfLeafId)?.name}
                </td>
                <td>{item.viss}</td>
                <td
                  onClick={() => {
                    setUpdateOpen(true), setSelectId(item.id);
                  }}
                >
                  {<EditIcon />}
                </td>
                <td
                  onClick={() => {
                    setDeleteOpen(true), setSelectId(item.id);
                  }}
                >
                  {<DeleteIcon />}
                </td>
              </tr>
            </thead>
          ))}
        </table>
      </Box>
      <NewAgentLeafViss open={open} setOpen={setOpen} />
      <UpdateAgentLeafViss
        updateOpen={updateOpen}
        setUpdateOpen={setUpdateOpen}
        selectedId={selectId}
      />
      <DeleteAgentLeafViss
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        selectedId={selectId}
      />
    </>
  );
};
export default AgentLeafVissPage;
