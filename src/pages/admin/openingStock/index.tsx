import { Box, Typography } from "@mui/material";
import AdminLayout from "@/components/adminLayout";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LeafOpen from "@/components/openingSt/leaf";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/store/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateLeafOpen from "@/components/openingSt/updateLeaf";
import DeleteLeafOpen from "@/components/openingSt/deleteLeaf";
const OpeningStock = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const leaves = useAppSelector((store) => store.typeOfLeaf.item);
  const garage = useAppSelector((store) => store.garage.selectedGarage);
  const shop = useAppSelector((store) => store.typeOfShop.item);
  const leafStocks = useAppSelector((store) => store.leafStock.item);
  const concernLeafStocks = leafStocks.filter(
    (item) => item.garageId === garage?.id
  );
  const addStocks = useAppSelector((store) => store.addStock.item);
  const concernAddStocks = addStocks.filter(
    (item) => item.garageId === garage?.id
  );
  const addStockStockSeq = concernAddStocks.map((item) => item.stockSeq);
  const concernLeaf = concernLeafStocks
    .filter((item) => !addStockStockSeq.includes(item.stockSeq))
    .sort((a, b) => a.id - b.id);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);
  let no = 0;
  if (!session) return null;
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

        <Box>
          <table border={1}>
            <tr>
              <th style={{ width: 50 }}>စဉ်</th>
              <th style={{ width: 150 }}>နေ့စွဲ</th>
              <th style={{ width: 150 }}>ဖက်အမျိုးအစား</th>
              <th style={{ width: 150 }}>ပိုနံပါတ်</th>
              <th style={{ width: 150 }}>ပိဿာ</th>
              <th style={{ width: 200 }}>ဝယ်ယူခဲ့သည့်ဆိုင်အမည်</th>
            </tr>

            {}
            {concernLeaf.map((item) => {
              const itemdate = new Date(item.date);
              return (
                <tr key={item.id}>
                  <th>{(no += 1)}</th>
                  <td style={{ textAlign: "center" }}>
                    {itemdate.toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {leaves.find((l) => l.id === item.typeOfLeafId)?.name}
                  </td>

                  <td style={{ textAlign: "center" }}>{item.batchNo}</td>
                  <td style={{ textAlign: "center" }}>{item.viss}</td>
                  <td style={{ textAlign: "center" }}>
                    {shop.find((s) => s.id === item.shopId)?.name}
                  </td>
                  <td
                    style={{ width: 50, textAlign: "center" }}
                    onClick={() => {
                      setUpdateOpen(true), setSelectId(item.id);
                    }}
                  >
                    {<EditIcon />}
                  </td>
                  <td
                    style={{ width: 50, textAlign: "center" }}
                    onClick={() => {
                      setDeleteOpen(true), setSelectId(item.id);
                    }}
                  >
                    {<DeleteIcon />}
                  </td>
                </tr>
              );
            })}
          </table>
        </Box>
        <LeafOpen open={open} setOpen={setOpen} />
        <UpdateLeafOpen
          updateOpen={updateOpen}
          setUpdateOpen={setUpdateOpen}
          selectedId={selectId}
        />
        <DeleteLeafOpen
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          selectedId={selectId}
        />
      </AdminLayout>
    </>
  );
};
export default OpeningStock;
