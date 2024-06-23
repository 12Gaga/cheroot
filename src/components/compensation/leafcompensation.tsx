import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createCompensationLeaf } from "@/types/compensationLeafType";
import { LoadingButton } from "@mui/lab";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
  TextField,
  Dialog,
  DialogContent,
  Button,
  DialogActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { TypeOfLeaf } from "@prisma/client";
import {
  CreatedCompensationLeaf,
  setIsLoading,
} from "@/store/slices/compensationLeaf";
import { setOpenSnackbar } from "@/store/slices/snackBar";
import { fetchApp } from "@/store/slices/app";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const defaultValue: createCompensationLeaf = {
  date: null,
  agentId: undefined,
  typeOfLeafId: undefined,
  remainViss: 0,
  compensationViss: 0,
  takeMoneyViss: 0,
  leafPrice: 0,
  tolAmount: 0,
  addCashBig: 0,
  addCashsmall: 0,
  inCash: 0,
};

const LeafCompensation = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.compensationLeaf);
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const workShopId = useAppSelector((store) => store.workShop.selectedWorkShop)
    ?.id as number;
  const cheroots = useAppSelector((store) => store.typeOfCheroot.item).filter(
    (a) => a.workShopId === workShopId
  );
  const agents = useAppSelector((store) => store.agent.item).filter(
    (a) => a.workShopId === workShopId
  );
  const leaves = useAppSelector((store) => store.typeOfLeaf.item).filter(
    (a) => a.workShopId === workShopId
  );
  const remainLeaf = useAppSelector((store) => store.agentLeafViss.item).filter(
    (a) => a.workShopId === workShopId
  );
  const [newCompensationLeaf, setNewCompensationLeaf] =
    useState<createCompensationLeaf>(defaultValue);

  const handelAgent = (agentId: number) => {
    const find = remainLeaf.find(
      (l) =>
        l.agentId === agentId &&
        l.typeOfLeafId === newCompensationLeaf.typeOfLeafId
    );
    const leaf = leaves.find((l) => l.id === newCompensationLeaf.typeOfLeafId);
    const tolPrice = leaf ? newCompensationLeaf.takeMoneyViss * leaf.price : 0;
    setNewCompensationLeaf({
      ...newCompensationLeaf,
      agentId,
      remainViss: find ? find.viss : 0,
      leafPrice: leaf ? leaf.price : 0,
      tolAmount: tolPrice,
    });
  };

  const handleLeaf = (leafId: number) => {
    const find = remainLeaf.find(
      (l) =>
        l.agentId === newCompensationLeaf.agentId && l.typeOfLeafId === leafId
    );
    const leaf = leaves.find((l) => l.id === leafId);
    const tolPrice = leaf ? newCompensationLeaf.takeMoneyViss * leaf.price : 0;
    setNewCompensationLeaf({
      ...newCompensationLeaf,
      typeOfLeafId: leafId,
      remainViss: find ? find.viss : 0,
      leafPrice: leaf ? leaf.price : 0,
      tolAmount: tolPrice,
    });
  };

  const handleTake = (qty: number) => {
    const tolPrice = qty * newCompensationLeaf.leafPrice;
    setNewCompensationLeaf({
      ...newCompensationLeaf,
      takeMoneyViss: qty,
      tolAmount: tolPrice,
    });
  };
  const handleClick = () => {
    dispatch(setIsLoading(true));
    dispatch(
      CreatedCompensationLeaf({
        ...newCompensationLeaf,
        onSuccess: () => {
          setOpen(false);
          setNewCompensationLeaf(defaultValue);
          dispatch(fetchApp({}));
          dispatch(
            setOpenSnackbar({ message: "Add Leaf Compensation success" })
          );
          dispatch(setIsLoading(false));
        },
      })
    );
  };
  useEffect(() => {
    setNewCompensationLeaf({ ...newCompensationLeaf, date: selecteddate });
  }, [selecteddate, open]);
  console.log("leaf", newCompensationLeaf);
  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setNewCompensationLeaf(defaultValue);
        }}
      >
        <DialogContent>
          <Box
            sx={{ mr: 3, display: "flex", justifyContent: "flex-end", mt: 2 }}
          >
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>ရက်စွဲ</Typography>
            <DatePicker
              selected={selecteddate}
              onChange={(date) => {
                setSelectedDate(date as Date);
              }}
            />
          </Box>

          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ကိုယ်စားလှယ်အမည်
            </Typography>
            <FormControl variant="filled" sx={{ width: 225 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={newCompensationLeaf.agentId}
                onChange={(evt) => {
                  handelAgent(Number(evt.target.value));
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {agents.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ဖက်အမျိုးအစား
            </Typography>
            <FormControl variant="filled" sx={{ width: 225 }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={newCompensationLeaf.typeOfLeafId}
                onChange={(evt) => {
                  handleLeaf(Number(evt.target.value));
                }}
                sx={{ bgcolor: "#EEE8CF" }}
              >
                {leaves.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ကျန်ပိဿာ
            </Typography>
            <TextField
              value={newCompensationLeaf.remainViss}
              placeholder="ကျန်အရေအတွက်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {}}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              လျော်ပေးပိဿာ
            </Typography>
            <TextField
              placeholder="လျော်ပေးအရေအတွက်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setNewCompensationLeaf({
                  ...newCompensationLeaf,
                  compensationViss: Number(evt.target.value),
                });
              }}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ပေးချေရမည့်ပိဿာ
            </Typography>
            <TextField
              placeholder="ပေးချေရမည့်အရေအတွက်"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                handleTake(Number(evt.target.value));
              }}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ဈေးနှုန်း
            </Typography>
            <TextField
              value={newCompensationLeaf.leafPrice}
              placeholder="ဈေးနှုန်း"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {}}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              စုစုပေါင်းဈေးနှုန်း
            </Typography>
            <TextField
              value={newCompensationLeaf.tolAmount}
              placeholder="ဈေးနှုန်း"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {}}
            />
          </Box>

          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ငွေ(အကြီး)
            </Typography>
            <TextField
              placeholder=" ငွေ(အကြီး)"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setNewCompensationLeaf({
                  ...newCompensationLeaf,
                  addCashBig: Number(evt.target.value),
                });
              }}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              ငွေ(အသေး)
            </Typography>
            <TextField
              placeholder="ငွေ(အသေး)"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setNewCompensationLeaf({
                  ...newCompensationLeaf,
                  addCashsmall: Number(evt.target.value),
                });
              }}
            />
          </Box>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bold", width: 150 }}>
              တန်းရှင်း
            </Typography>
            <TextField
              placeholder=" တန်းရှင်း"
              sx={{ bgcolor: "#EEE8CF" }}
              onChange={(evt) => {
                setNewCompensationLeaf({
                  ...newCompensationLeaf,
                  inCash: Number(evt.target.value),
                });
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
              setNewCompensationLeaf(defaultValue);
            }}
          >
            မလုပ်တော့ပါ
          </Button>
          <LoadingButton
            variant="contained"
            onClick={handleClick}
            loading={isLoading}
            disabled={
              !newCompensationLeaf.date ||
              !newCompensationLeaf.agentId ||
              !newCompensationLeaf.typeOfLeafId ||
              !newCompensationLeaf.compensationViss === undefined ||
              !newCompensationLeaf.takeMoneyViss === undefined ||
              !newCompensationLeaf.addCashBig === undefined ||
              !newCompensationLeaf.addCashsmall === undefined ||
              !newCompensationLeaf.inCash === undefined
            }
          >
            သိမ်းမည်
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LeafCompensation;
