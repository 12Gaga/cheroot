import AdminLayout from "@/components/adminLayout";
import NewTaungyiInstallment from "@/components/taungyi/newTaungyiInstallment";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateTaungyiInstallment from "@/components/taungyi/updateTaungyiInstallment";
import DeleteTaungyiInstallment from "@/components/taungyi/deleteTaungyiInstallment";
const TaungyiInstallment = () => {
  const [open, setOpen] = useState<boolean>(false);
  const industryId = useAppSelector((store) => store.industry.item)?.id;
  const installment = useAppSelector((store) => store.taungyiInstallment.item);
  const concernInstallment = installment.filter(
    (item) => item.cigratteIndustryId === industryId
  );
  const banquets = useAppSelector((store) => store.typeOfBanquet.item);
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
          ပစ္စည်းတန်ဖိုးအရစ်ကျစာရင်း
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#E55252",
              mt: 3,
              width: 320,
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
              <th>ပွဲရုံနာမည်</th>
              <th>ပေးရန်ကျန်ငွေ</th>
              <th>သွင်းငွေ</th>
            </tr>
          </thead>
          {concernInstallment.map((item) => {
            return (
              <>
                <thead key={item.id}>
                  <tr style={{ border: "1px solid" }}>
                    <td>{item.date}</td>
                    <td>
                      {banquets.find((b) => b.id === item.banquetId)?.name}
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

        <NewTaungyiInstallment open={open} setOpen={setOpen} />
        <UpdateTaungyiInstallment
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteTaungyiInstallment
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default TaungyiInstallment;
