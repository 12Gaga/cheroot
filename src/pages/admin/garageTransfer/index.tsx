import AdminLayout from "@/components/adminLayout";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NewTransferLeaf from "@/components/garageTrans/newTransferLeaf";
import { useAppSelector } from "@/store/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteLeafTransfer from "@/components/garageTrans/deleteLeafTransfer";
const GarageTransfer = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const concernLeafTransfer = useAppSelector(
    (store) => store.leafTransfer.item
  ).filter((item) => item.workShopId === workShop?.id);
  const garage = useAppSelector((store) => store.garage.item);
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectSeq, setSelectSeq] = useState<string>("");
  let seqs: string[] = [];
  concernLeafTransfer.forEach((item) => {
    const seq = item.transferSeq;
    const exit = seqs.find((item) => item === seq);
    if (!exit) {
      seqs.push(seq);
    }
  });
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ပိုနံပါတ်
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <AddBoxIcon
            onClick={() => {
              setOpen(true);
            }}
            sx={{ fontSize: 50 }}
          />
        </Box>
        <table border={1}>
          <thead>
            <tr style={{ border: "1px solid" }}>
              <th>နေ့စွဲ</th>
              <th>အထွက်ဂိုထောင်</th>
              <th>အဝင်ဂိုထောင်</th>
              <th>ဖက်အမျိုးအစား</th>
              <th>ပိုနံပါတ်</th>
              <th>ပိသာ</th>
            </tr>
          </thead>
          {seqs.map((item) => (
            <>
              <thead
                key={concernLeafTransfer.find((c) => c.transferSeq == item)?.id}
              ></thead>
              <tr style={{ border: "1px solid" }}>
                <td>
                  {concernLeafTransfer.find((c) => c.transferSeq == item)?.date}
                </td>
                <td>
                  {
                    garage.find(
                      (g) =>
                        g.id ===
                        concernLeafTransfer.find((c) => c.transferSeq == item)
                          ?.exitGarageId
                    )?.name
                  }
                </td>
                <td>
                  {
                    garage.find(
                      (g) =>
                        g.id ===
                        concernLeafTransfer.find((c) => c.transferSeq == item)
                          ?.enterenceGarageId
                    )?.name
                  }
                </td>
                <td>
                  {
                    leaves.find(
                      (l) =>
                        l.id ===
                        concernLeafTransfer.find((c) => c.transferSeq == item)
                          ?.typeOfLeafId
                    )?.name
                  }
                </td>
                <td style={{ fontSize: "18px" }}>
                  {concernLeafTransfer
                    .filter((c) => c.transferSeq === item)
                    .map((m) => m.batchNo)
                    .join(",")}
                </td>
                <td>
                  {
                    concernLeafTransfer.find((c) => c.transferSeq == item)
                      ?.totalViss
                  }
                </td>
                <td
                  onClick={() => {
                    setDeleteOpen(true),
                      setSelectSeq(
                        concernLeafTransfer.find((c) => c.transferSeq == item)
                          ?.transferSeq as string
                      );
                  }}
                >
                  {<DeleteIcon />}
                </td>
              </tr>
            </>
          ))}
        </table>
        <NewTransferLeaf open={open} setOpen={setOpen} />
        <DeleteLeafTransfer
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedSeq={selectSeq}
        />
      </AdminLayout>
    </>
  );
};
export default GarageTransfer;
