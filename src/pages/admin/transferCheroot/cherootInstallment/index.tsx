import AdminLayout from "@/components/adminLayout";
import NewCherootInstallment from "@/components/cherootTransferring/newcherootInstallment";
import NewTaungyiInstallment from "@/components/taungyi/newTaungyiInstallment";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateCherootInstallment from "@/components/cherootTransferring/updateCherootInstallment";
import DeleteCherootInstallment from "@/components/cherootTransferring/deleteCherootInstallment";
const CherootInstallment = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workshop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const cherootInstallment = useAppSelector(
    (store) => store.cherootInstallment.item
  );
  const locations = useAppSelector((store) => store.conveyLocation.item);
  const concernCherootInstallment = cherootInstallment.filter(
    (item) => item.workShopId === workshop?.id
  );
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ဆေးလိပ်တန်ဖိုးအရစ်ကျစာရင်း
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#E55252",
              mt: 3,
              width: 300,
              height: 50,
              fontSize: 18,
              borderRadius: 20,
              "&:hover": {
                bgcolor: "#FCB500",
                color: "white",
                fontWeight: "bold",
              },
            }}
            onClick={() => setOpen(true)}
          >
            အရစ်ကျစာရင်း
          </Button>
        </Box>

        <table border={1}>
          <thead>
            <tr style={{ border: "1px solid" }}>
              <th>နေ့စွဲ</th>
              <th>မြို့နာမည်</th>
              <th>ရရန်ကျန်ငွေ</th>
              <th>သွင်းငွေ</th>
            </tr>
          </thead>
          {concernCherootInstallment.map((item) => {
            return (
              <>
                <thead key={item.id}>
                  <tr style={{ border: "1px solid" }}>
                    <td>{item.date}</td>
                    <td>
                      {
                        locations.find((l) => l.id === item.conveyLocationId)
                          ?.name
                      }
                    </td>
                    <td>{item.cashBalance}</td>
                    <td>{item.payBalance}</td>
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
              </>
            );
          })}
        </table>

        <NewCherootInstallment open={open} setOpen={setOpen} />
        <UpdateCherootInstallment
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteCherootInstallment
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default CherootInstallment;
