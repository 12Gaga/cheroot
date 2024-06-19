import NewAgent from "@/components/agentName/newAgent";
import { useAppSelector } from "@/store/hooks";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Box, Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import UpdateAgent from "@/components/agentName/updateAgent";
import DeleteAgent from "@/components/agentName/deleteAgent";
import AdminLayout from "@/components/adminLayout";
const NamePage = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const agents = useAppSelector((store) => store.agent.item);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const concetnAgent = agents.filter(
    (item) => item.workShopId === workShop?.id
  );
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);
  let no = 0;
  if (!session) return null;
  return (
    <>
      <AdminLayout>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          ကိုယ်စားလှယ်အမည်စာရင်း
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <AddBoxIcon
            onClick={() => {
              setOpen(true);
            }}
            sx={{ fontSize: 50 }}
          />
        </Box>

        <Box>
          <table border={1}>
            <thead>
              <tr style={{ border: "1px solid" }}>
                <th>စဉ်</th>
                <th>အမည်</th>
                <th>နေရပ်လိပ်စာ</th>
                <th>ဖုန်းနံပါတ်</th>
                <th>လက်ကျန်ငွေ(အကြီး)</th>
                <th>လက်ကျန်ငွေ(အသေး)</th>
              </tr>
            </thead>
            {concetnAgent.map((item) => (
              <thead key={item.name}>
                <tr style={{ border: "1px solid" }}>
                  <td>{(no += 1)}</td>
                  <td>{item.name}</td>
                  <td>{item.adderess}</td>
                  <td>{item.phoneNo}</td>
                  <td>{item.cashBalcanceBig}</td>
                  <td>{item.cashBalcanceSmall}</td>
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

        <NewAgent open={open} setOpen={setOpen} />
        <UpdateAgent
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteAgent
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default NamePage;
