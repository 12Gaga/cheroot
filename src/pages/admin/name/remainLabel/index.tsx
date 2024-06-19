import NewAgentLeafViss from "@/components/agentName/newAgentLeafViss";
import { useAppSelector } from "@/store/hooks";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminLayout from "@/components/adminLayout";
import NewAgentRemainFilterSize from "@/components/agentName/newAgentRemainFilter";
import NewAgentRemainLabel from "@/components/agentName/newAgentRemainLabel";
const AgentRemainLabelPage = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const agent = useAppSelector((store) => store.agent.item);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const concetnAgent = agent.filter((item) => item.workShopId === workShop?.id);
  const labels = useAppSelector((store) => store.typeOfLabel.item);
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item);
  const leftLabel = useAppSelector((store) => store.agentRemainLabel.item);
  const concernLeftLabel = leftLabel.filter(
    (item) => item.workShopId === workShop?.id
  );
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);
  let no = 0;
  if (!session) return;
  return (
    <>
      <AdminLayout>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          တံဆိပ်လက်ကျန်ထည့်ခြင်း
        </Typography>

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
                <th>စဉ်</th>
                <th>အမည်</th>
                <th>ဆေးလိပ်အမျိုးအစား</th>
                <th>တံဆိပ်အမျိုးအစား</th>
                <th>လက်ကျန်လိပ်</th>
              </tr>
            </thead>
            {concernLeftLabel.map((item) => (
              <thead key={item.id}>
                <tr style={{ border: "1px solid" }}>
                  <td>{(no += 1)}</td>
                  <td>
                    {concetnAgent.find((a) => a.id === item.agentId)?.name}
                  </td>
                  <td>
                    {cheroots.find((a) => a.id === item.typeOfCherootId)?.name}
                  </td>
                  <td>
                    {labels.find((f) => f.id === item.typeOfLabelId)?.name}
                  </td>
                  <td>{item.bandle}</td>
                  {/* <td
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
                  </td> */}
                </tr>
              </thead>
            ))}
          </table>
        </Box>
        <NewAgentRemainLabel open={open} setOpen={setOpen} />
      </AdminLayout>
    </>
  );
};
export default AgentRemainLabelPage;
