import ReturnCherootButton from "@/components/returnCheroot/returnCherootButton";
import ReturnCherootFive from "@/components/returnCheroot/returnCherootFive";
import ReturnCherootFour from "@/components/returnCheroot/returnCherootFour";
import ReturnCherootOne from "@/components/returnCheroot/returnCherootOne";
import ReturnCherootSix from "@/components/returnCheroot/returnCherootSix";
import ReturnCherootThree from "@/components/returnCheroot/returnCherootThree";
import ReturnCherootTwo from "@/components/returnCheroot/returnCherootTwo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createNewLeafDeduction } from "@/types/leafDeductionType";
import { createNewOtherDeduction } from "@/types/otherDeductionType";
import { createNewReturnCheroot } from "@/types/returnCherootType";
import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField, Typography } from "@mui/material";
import { OtherDeduction } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const defaultReturnCheroot: createNewReturnCheroot = {
  date: null,
  agentId: undefined,
  typeOfCherootId: undefined,
  goodQty: 0,
  damage: 0,
  totalCherootQty: 0,
  goodPrice: 0,
  amount: 0,
  reduceBandle: undefined,
};

const defaultLeafDeduction: createNewLeafDeduction = {
  date: null,
  agentId: undefined,
  typeOfLeafId: undefined,
  deductViss: 0,
  price: 0,
  deductionAmount: 0,
};

const defaultOtherDeduction: createNewOtherDeduction = {
  cheroots: [],
  leaf: [],
  date: null,
  deductDate: null,
  agentId: undefined,
  cashAdvanceBigDeduction: 0,
  cashAdvanceSmallDeduction: 0,
  otherDeduction: 0,
  cashAdvanceBig: 0,
  cashAdvanceSmall: 0,
  netAgentPayment: 0,
  bonusPayment: 0,
  totalNetAgentPayment: 0,
  purchaseSeq: "",
};

const ReturnCheroot = () => {
  const workShop = useAppSelector((store) => store.workShop.selectedWorkShop);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const cherootLoading = useAppSelector(
    (store) => store.returnCheroot.isLoading
  );
  const leafDeductionLoading = useAppSelector(
    (store) => store.leafDeduction.isLoading
  );
  const otherDeductionLoading = useAppSelector(
    (store) => store.otherDeduction.isLoading
  );
  const [selecteddate, setSelectedDate] = useState<Date>(new Date());
  const [no, setNo] = useState<number>(1);
  const [newReturnCheroot, setNewReturnCheroot] =
    useState<createNewReturnCheroot>(defaultReturnCheroot);
  const [newLeafDeduction, setNewLeafDeduction] =
    useState<createNewLeafDeduction>(defaultLeafDeduction);
  const [newOtherDeduction, setNewOtherDeduction] =
    useState<createNewOtherDeduction>(defaultOtherDeduction);
  const [totalCherootAmount, setTotalCherootAmount] = useState<number>(0);
  const [totalLeafAmount, setTotalLeafAmount] = useState<number>(0);
  const [collectCheroot, setCollectCheroot] = useState<
    createNewReturnCheroot[]
  >([]);
  const [collectLeaf, setCollectLeaf] = useState<createNewLeafDeduction[]>([]);

  useEffect(() => {
    setNewReturnCheroot({ ...newReturnCheroot, date: selecteddate });
    setNewLeafDeduction({ ...newLeafDeduction, date: selecteddate });
    setNewOtherDeduction({
      ...newOtherDeduction,
      date: selecteddate,
      deductDate: selecteddate,
    });
  }, [selecteddate]);
  console.log("cheroot", collectCheroot);
  console.log("leaf", collectLeaf);
  console.log("deduction", newOtherDeduction);
  if (!session) return;
  return (
    <>
      <Box
        sx={{
          bgcolor: "#FCB500",
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
          နေ့စဉ်ကိုယ်စားလှယ်ဆေးလိပ်အဝင်စာရင်း
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 5, mt: 2 }}>
        <Typography sx={{ mr: 2 }}>ရက်စွဲ</Typography>
        <DatePicker
          selected={selecteddate}
          onChange={(date) => setSelectedDate(date as Date)}
        />
      </Box>

      <Box sx={{ display: "flex", my: 2.5 }}>
        <Box
          sx={{
            width: "75%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <ReturnCherootOne
            newReturnCheroot={newReturnCheroot}
            setNewReturnCheroot={setNewReturnCheroot}
            no={no}
          />
          <ReturnCherootTwo
            newReturnCheroot={newReturnCheroot}
            setNewReturnCheroot={setNewReturnCheroot}
            totalAmount={totalCherootAmount}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ ml: 4 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                နှုတ်မည့်တံဆိပ်လိပ်
              </Typography>
              <TextField
                placeholder="နှုတ်မည့်တံဆိပ်လိပ်"
                sx={{ bgcolor: "#EEE8CF", width: 220 }}
                onChange={(evt) =>
                  setNewReturnCheroot({
                    ...newReturnCheroot,
                    reduceBandle: Number(evt.target.value),
                  })
                }
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}>
              <LoadingButton
                variant="contained"
                disabled={
                  !newReturnCheroot.agentId ||
                  !newReturnCheroot.damage ||
                  !newReturnCheroot.goodQty ||
                  !newReturnCheroot.typeOfCherootId ||
                  newReturnCheroot.reduceBandle === undefined
                }
                onClick={() => {
                  setNewOtherDeduction({
                    ...newOtherDeduction,
                    cheroots: [...newOtherDeduction.cheroots, newReturnCheroot],
                  });
                  setNo(no + 1);
                  setTotalCherootAmount(
                    totalCherootAmount + newReturnCheroot.amount
                  );
                  setNewReturnCheroot({
                    ...newReturnCheroot,
                    typeOfCherootId: undefined,
                    goodQty: 0,
                    damage: 0,
                    reduceBandle: undefined,
                  });
                }}
                loading={cherootLoading}
              >
                သိမ်းမည်
              </LoadingButton>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: "25%",
            bgcolor: "#FFD0C7",
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            py: 2,
          }}
        >
          <ReturnCherootThree
            newReturnCheroot={newReturnCheroot}
            setNewReturnCheroot={setNewReturnCheroot}
            newLeafDeduction={newLeafDeduction}
            setNewLeafDeduction={setNewLeafDeduction}
            newOtherDeduction={newOtherDeduction}
            setNewOtherDeduction={setNewOtherDeduction}
          />
        </Box>
      </Box>

      <Typography
        variant="h6"
        sx={{
          bgcolor: "#FCB500",
          color: "white",
          fontWeight: "bold",
          width: 200,
          p: 1,
          borderRadius: 3,
        }}
      >
        ဖက်ဖိုးခုနှိမ်ခြင်း
      </Typography>

      <ReturnCherootFour
        newLeafDeduction={newLeafDeduction}
        setNewLeafDeduction={setNewLeafDeduction}
        totalAmount={totalLeafAmount}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <LoadingButton
          variant="contained"
          disabled={
            !newLeafDeduction.typeOfLeafId ||
            !newLeafDeduction.deductViss ||
            !newLeafDeduction.agentId
          }
          onClick={() => {
            setNewOtherDeduction({
              ...newOtherDeduction,
              leaf: [...newOtherDeduction.leaf, newLeafDeduction],
            });
            setTotalLeafAmount(
              totalLeafAmount + newLeafDeduction.deductionAmount
            );
            setNewLeafDeduction({
              ...newLeafDeduction,
              typeOfLeafId: undefined,
              deductViss: 0,
            });
          }}
          loading={leafDeductionLoading}
        >
          သိမ်းမည်
        </LoadingButton>
      </Box>
      <Typography
        variant="h6"
        sx={{
          bgcolor: "#FCB500",
          color: "white",
          fontWeight: "bold",
          width: 200,
          p: 1,
          borderRadius: 3,
          mt: 3,
        }}
      >
        ခုနှိမ်ခြင်း
      </Typography>
      <ReturnCherootFive
        newOtherDeduction={newOtherDeduction}
        setNewOtherDeduction={setNewOtherDeduction}
        totalCherootAmount={totalCherootAmount}
        totalLeafAmount={totalLeafAmount}
        selectedDate={selecteddate}
      />

      <ReturnCherootSix
        newOtherDeduction={newOtherDeduction}
        setNewOtherDeduction={setNewOtherDeduction}
      />

      <ReturnCherootButton newOtherDeduction={newOtherDeduction} />
    </>
  );
};
export default ReturnCheroot;
