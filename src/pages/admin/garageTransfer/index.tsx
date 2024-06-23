import AdminLayout from "@/components/adminLayout";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NewTransferLeaf from "@/components/garageTrans/newTransferLeaf";
import { useAppSelector } from "@/store/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteLeafTransfer from "@/components/garageTrans/deleteLeafTransfer";
import { LeafTransferGarage } from "@prisma/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const GarageTransfer = () => {
  const [open, setOpen] = useState<boolean>(false);
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const leafTransfers = useAppSelector((store) => store.leafTransfer.item);
  const concernLeafTransfer = leafTransfers
    .filter((item) => item.workShopId === workShop?.id)
    .sort((a, b) => a.id - b.id);
  const garage = useAppSelector((store) => store.garage.item);
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectSeq, setSelectSeq] = useState<string>("");
  const [seqs, setSeqs] = useState<string[]>([]);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [leafTransfer, setLeafTransfer] = useState<LeafTransferGarage[]>([]);

  const handleDate = (date: Date) => {
    const data = concernLeafTransfer
      .filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate.toLocaleDateString() === date.toLocaleDateString();
      })
      .sort((a, b) => a.id - b.id);
    setLeafTransfer(data);
    handelSeqs(data);
  };
  useEffect(() => {
    if (concernLeafTransfer.length) {
      const concern = concernLeafTransfer
        .filter((item) => {
          const itemDate = new Date(item.date);
          console.log("date", itemDate);
          return (
            itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
          );
        })
        .sort((a, b) => a.id - b.id);
      setLeafTransfer(concern);
      handelSeqs(concern);
    }
  }, [leafTransfers]);

  const handelSeqs = (seq: LeafTransferGarage[]) => {
    seq.forEach((item) => {
      const seq = item.transferSeq;
      const exit = seqs.find((item) => item === seq);
      if (!exit) {
        seqs.push(seq);
        console.log("seq2", seqs);
      }
    });
  };
  let no = 0;
  console.log("leaf", leafTransfer);
  console.log("seqs", seqs);
  return (
    <>
      <AdminLayout>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          ပိုနံပါတ်
        </Typography>

        <Box sx={{ mr: 2, display: "flex", mt: 4, width: 300 }}>
          <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
          <DatePicker
            selected={selecteddate}
            onChange={(date) => {
              setSelectedDate(date as Date);
              handleDate(date as Date);
            }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <AddBoxIcon
            onClick={() => {
              setOpen(true);
            }}
            sx={{ fontSize: 50 }}
          />
        </Box>
        <table border={1}>
          <tr>
            <th style={{ width: 50 }}>စဉ်</th>
            <th style={{ width: 150 }}>နေ့စွဲ</th>
            <th style={{ width: 150 }}>အထွက်ဂိုထောင်</th>
            <th style={{ width: 150 }}>အဝင်ဂိုထောင်</th>
            <th style={{ width: 150 }}>ဖက်အမျိုးအစား</th>
            <th style={{ width: 150 }}>ပိုနံပါတ်</th>
            <th style={{ width: 150 }}>ပိသာ</th>
          </tr>
          {seqs.map((item) => {
            const exit = leafTransfer.find((c) => c.transferSeq == item);
            if (!exit) return null;
            const itemdate = new Date(
              leafTransfer.find((c) => c.transferSeq == item)?.date as Date
            );
            return (
              <>
                <tr key={leafTransfer.find((c) => c.transferSeq == item)?.id}>
                  <th>{(no += 1)}</th>
                  <td style={{ textAlign: "center" }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      garage.find(
                        (g) =>
                          g.id ===
                          leafTransfer.find((c) => c.transferSeq == item)
                            ?.exitGarageId
                      )?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      garage.find(
                        (g) =>
                          g.id ===
                          leafTransfer.find((c) => c.transferSeq == item)
                            ?.enterenceGarageId
                      )?.name
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      leaves.find(
                        (l) =>
                          l.id ===
                          leafTransfer.find((c) => c.transferSeq == item)
                            ?.typeOfLeafId
                      )?.name
                    }
                  </td>
                  <td style={{ fontSize: "18px" }}>
                    {leafTransfer
                      .filter((c) => c.transferSeq === item)
                      .map((m) => m.batchNo)
                      .join(",")}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {leafTransfer.find((c) => c.transferSeq == item)?.totalViss}
                  </td>
                  <td
                    style={{ textAlign: "center", width: 50 }}
                    onClick={() => {
                      setDeleteOpen(true),
                        setSelectSeq(
                          leafTransfer.find((c) => c.transferSeq == item)
                            ?.transferSeq as string
                        );
                    }}
                  >
                    {<DeleteIcon />}
                  </td>
                </tr>
              </>
            );
          })}
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
