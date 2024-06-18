import { createNewLeafDeduction } from "@/types/leafDeductionType";
import { createNewReturnCheroot } from "@/types/returnCherootType";
import { prisma } from "@/utils/db";
import {
  Agent,
  AgentLeafViss,
  AgentRemineLeaf,
  WorkShop,
} from "@prisma/client";
import { nanoid } from "@reduxjs/toolkit";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const {
      date,
      agentId,
      cashAdvanceBigDeduction,
      cashAdvanceSmallDeduction,
      otherDeduction,
      cashAdvanceBig,
      cashAdvanceSmall,
      netAgentPayment,
      bonusPayment,
      totalNetAgentPayment,
      purchaseSeq,
    } = req.body;
    const cheroot = req.body.cheroots as createNewReturnCheroot[];
    const leaf = req.body.leaf as createNewLeafDeduction[];
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      cheroot.length &&
      leaf.length &&
      date &&
      agentId &&
      cashAdvanceBigDeduction != undefined &&
      cashAdvanceSmallDeduction != undefined &&
      otherDeduction != undefined &&
      cashAdvanceBig != undefined &&
      cashAdvanceSmall != undefined &&
      netAgentPayment != undefined &&
      bonusPayment != undefined &&
      totalNetAgentPayment != undefined;

    if (!isValid) return res.status(405).send("bad request");

    if (purchaseSeq) {
      await prisma.extraPurchaseSummery.updateMany({
        where: { purchaseSeq },
        data: { isArchived: true },
      });
    }
    const seq = nanoid(5);
    //other deduction
    const agent = (await prisma.agent.findFirst({
      where: { id: agentId },
    })) as Agent;
    const bigCash =
      cashAdvanceBig + (agent.cashBalcanceBig - cashAdvanceBigDeduction);
    const smallCash =
      cashAdvanceSmall + (agent.cashBalcanceSmall - cashAdvanceSmallDeduction);

    const newOtherDeduction = await prisma.otherDeduction.create({
      data: {
        date,
        agentId,
        cashAdvanceBigDeduction,
        cashAdvanceSmallDeduction,
        otherDeduction,
        cashAdvanceBig,
        cashAdvanceSmall,
        netAgentPayment,
        bonusPayment,
        totalNetAgentPayment,
        remainCashBig: bigCash,
        remainCashSmall: smallCash,
        seq,
        workShopId,
      },
    });

    await prisma.agent.updateMany({
      data: { cashBalcanceBig: bigCash, cashBalcanceSmall: smallCash },
      where: { id: agentId },
    });

    const newRemainCash = await prisma.agentRemainCash.create({
      data: {
        agentId,
        remainCashBig: bigCash,
        remainCashSmall: smallCash,
        seq,
        workShopId,
        date,
      },
    });

    //return cheroot
    const newReturnCheroot = await prisma.$transaction(
      cheroot.map((ch) =>
        prisma.returnReadyCheroot.create({
          data: {
            date,
            agentId,
            typeOfCherootId: Number(ch.typeOfCherootId),
            goodPrice: ch.goodPrice,
            goodQty: ch.goodQty,
            totalCherootQty: ch.totalCherootQty,
            damage: ch.damage,
            amount: ch.amount,
            seq,
            workShopId,
          },
        })
      )
    );

    //leaf deduction

    const newLeafDeduction = await prisma.$transaction(
      leaf.map((l) =>
        prisma.leafDeduction.create({
          data: {
            date,
            agentId,
            typeOfLeafId: Number(l.typeOfLeafId),
            deductViss: l.deductViss,
            deductionAmount: l.deductionAmount,
            price: l.price,
            seq,
            workShopId,
          },
        })
      )
    );
    //remain leaf
    leaf.map(async (l) => {
      const leftViss = await prisma.agentLeafViss.findFirst({
        where: { typeOfLeafId: l.typeOfLeafId, agentId },
      });
      if (!leftViss) return;

      const reduceViss = leftViss.viss - l.deductViss;

      await prisma.agentLeafViss.updateMany({
        data: { viss: reduceViss },
        where: { typeOfLeafId: l.typeOfLeafId, agentId },
      });

      await prisma.agentRemineLeaf.create({
        data: {
          agentId,
          leafId: Number(l.typeOfLeafId),
          workShopId,
          Viss: reduceViss,
          seq,
          date,
        },
      });
    });

    const workshop = (await prisma.workShop.findFirst({
      where: { id: workShopId },
    })) as WorkShop;
    const concernWorkshops = await prisma.workShop.findMany({
      where: {
        cigratteIndustryId: workshop.cigratteIndustryId,
        isArchived: false,
      },
    });
    const concernWorkShopIds = concernWorkshops.map((w) => w.id);
    const newRemainLeaf = await prisma.agentRemineLeaf.findMany({
      where: { workShopId: { in: concernWorkShopIds }, isArchived: false },
    });

    return res.status(200).json({
      newOtherDeduction,
      newRemainCash,
      newReturnCheroot,
      newLeafDeduction,
      newRemainLeaf,
    });
  }
  res.status(400).json("bad request");
}
