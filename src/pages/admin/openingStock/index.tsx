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
  const concernLeaf = concernLeafStocks.filter(
    (item) => !addStockStockSeq.includes(item.stockSeq)
  );
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);

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
            <thead>
              <tr style={{ border: "1px solid" }}>
                <th>နေ့စွဲ</th>
                <th>ဖက်အမျိုးအစား</th>
                <th>ပိုနံပါတ်</th>
                <th>ပိဿာ</th>
                <th>ဝယ်ယူခဲ့သည့်ဆိုင်အမည်</th>
              </tr>
            </thead>
            {}
            {concernLeaf.map((item) => {
              const itemdate = new Date(item.date);
              return (
                <thead key={item.id}>
                  <tr style={{ border: "1px solid" }}>
                    <td>{itemdate.toLocaleDateString()}</td>
                    <td>
                      {leaves.find((l) => l.id === item.typeOfLeafId)?.name}
                    </td>

                    <td>{item.batchNo}</td>
                    <td>{item.viss}</td>
                    <td>{shop.find((s) => s.id === item.shopId)?.name}</td>
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
