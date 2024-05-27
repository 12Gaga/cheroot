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
  const concernLeafTransfer = leafTransfers.filter(
    (item) => item.workShopId === workShop?.id
  );
  const garage = useAppSelector((store) => store.garage.item);
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectSeq, setSelectSeq] = useState<string>("");
  const [seqs, setSeqs] = useState<string[]>([]);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [leafTransfer, setLeafTransfer] = useState<LeafTransferGarage[]>([]);

  const handleDate = (date: Date) => {
    const data = concernLeafTransfer.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate.toLocaleDateString() === date.toLocaleDateString();
    });
    setLeafTransfer(data);
    handelSeqs(data);
  };
  useEffect(() => {
    if (concernLeafTransfer.length) {
      const concern = concernLeafTransfer.filter((item) => {
        const itemDate = new Date(item.date);
        console.log("date", itemDate);
        return (
          itemDate.toLocaleDateString() === selecteddate.toLocaleDateString()
        );
      });
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
          {seqs.map((item) => {
            const exit = leafTransfer.find((c) => c.transferSeq == item);
            if (!exit) return null;
            const itemdate = new Date(
              leafTransfer.find((c) => c.transferSeq == item)?.date as Date
            );
            return (
              <>
                <thead
                  key={leafTransfer.find((c) => c.transferSeq == item)?.id}
                ></thead>
                <tr style={{ border: "1px solid" }}>
                  <td>{itemdate.toLocaleDateString()}</td>
                  <td>
                    {
                      garage.find(
                        (g) =>
                          g.id ===
                          leafTransfer.find((c) => c.transferSeq == item)
                            ?.exitGarageId
                      )?.name
                    }
                  </td>
                  <td>
                    {
                      garage.find(
                        (g) =>
                          g.id ===
                          leafTransfer.find((c) => c.transferSeq == item)
                            ?.enterenceGarageId
                      )?.name
                    }
                  </td>
                  <td>
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
                  <td>
                    {leafTransfer.find((c) => c.transferSeq == item)?.totalViss}
                  </td>
                  <td
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
