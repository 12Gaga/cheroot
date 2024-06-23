import { createNewLeafDeduction } from "@/types/leafDeductionType";
import { createNewReturnCheroot } from "@/types/returnCherootType";
import { prisma } from "@/utils/db";
import { Agent } from "@prisma/client";
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
        deductSeq: purchaseSeq,
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
            reduceBandle: ch.reduceBandle ? ch.reduceBandle : 0,
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
    leaf.forEach(async (l) => {
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

    //remain filterSize
    cheroot.forEach(async (c) => {
      const leftQuantity = await prisma.agentLeftFilterSize.findFirst({
        where: { agentId, typeOfCherootId: c.typeOfCherootId },
      });

      if (!leftQuantity) return;
      const formula = await prisma.formula.findFirst({
        where: { typeOfCherootId: c.typeOfCherootId },
      });
      if (!formula) return;
      const qty =
        (formula.filterSizeQty * c.totalCherootQty) / formula.cherootQty;

      const remainQty = leftQuantity.quantity - qty;
      await prisma.agentLeftFilterSize.updateMany({
        data: { quantity: remainQty },
        where: { agentId, typeOfCherootId: c.typeOfCherootId },
      });
    });

    //remain Tabacco
    cheroot.forEach(async (c) => {
      const leftTabacco = await prisma.agentLeftTabacco.findFirst({
        where: { agentId, typeOfCherootId: c.typeOfCherootId },
      });

      if (!leftTabacco) return;
      const formula = await prisma.formula.findFirst({
        where: { typeOfCherootId: c.typeOfCherootId },
      });
      if (!formula) return;
      const tin = (formula.tabaccoTin * c.totalCherootQty) / formula.cherootQty;
      const pyi = (formula.tabaccoPyi * c.totalCherootQty) / formula.cherootQty;
      const tolPyi = tin * 16 + pyi;
      const leftTolPyi = leftTabacco.tin * 16 + leftTabacco.pyi;
      const Pyi = leftTolPyi - tolPyi;
      const remainTin = Math.floor(Pyi / 16);
      const remainPyi = Pyi % 16;
      await prisma.agentLeftTabacco.updateMany({
        data: { tin: remainTin, pyi: remainPyi },
        where: { agentId, typeOfCherootId: c.typeOfCherootId },
      });
    });

    //remain Label
    cheroot.forEach(async (c) => {
      const leftBandle = await prisma.agentLeftLabel.findFirst({
        where: { agentId, typeOfCherootId: c.typeOfCherootId },
      });

      if (!leftBandle) return;
      if (c.reduceBandle === undefined) return;
      const remainBandle = leftBandle.bandle - c.reduceBandle;

      await prisma.agentLeftLabel.updateMany({
        data: { bandle: remainBandle },
        where: { agentId, typeOfCherootId: c.typeOfCherootId },
      });
    });

    return res.status(200).json({
      newOtherDeduction,
      newRemainCash,
      newReturnCheroot,
      newLeafDeduction,
      seq,
    });
  } else if (method === "DELETE") {
    const seq = req.query.seq as string;
    const isValid = seq;
    if (!isValid) return res.status(405).send("bad request");
    const findOtherDeduction = await prisma.otherDeduction.findFirst({
      where: { seq },
    });
    const findRetrunCheroot = await prisma.returnReadyCheroot.findMany({
      where: { seq },
    });
    const findLeafDeduction = await prisma.leafDeduction.findMany({
      where: { seq },
    });
    const newSeq = nanoid(5);
    // remain Cash
    if (findOtherDeduction) {
      const agent = (await prisma.agent.findFirst({
        where: { id: findOtherDeduction.agentId },
      })) as Agent;
      const bigCash =
        findOtherDeduction.cashAdvanceBigDeduction +
        (agent.cashBalcanceBig - findOtherDeduction.cashAdvanceBig);
      const smallCash =
        findOtherDeduction.cashAdvanceSmallDeduction +
        (agent.cashBalcanceSmall - findOtherDeduction.cashAdvanceSmall);
      await prisma.agent.updateMany({
        data: { cashBalcanceBig: bigCash, cashBalcanceSmall: smallCash },
        where: { id: findOtherDeduction.agentId },
      });

      const newRemainCash = await prisma.agentRemainCash.create({
        data: {
          agentId: findOtherDeduction.agentId,
          remainCashBig: bigCash,
          remainCashSmall: smallCash,
          seq: newSeq,
          workShopId: findOtherDeduction.agentId,
        },
      });
      //undo extrapurchaseSummary
      if (findOtherDeduction.deductSeq) {
        await prisma.extraPurchaseSummery.updateMany({
          where: { purchaseSeq: findOtherDeduction.deductSeq },
          data: { isArchived: false },
        });
      }
    }

    //remain leaf
    findLeafDeduction.forEach(async (l) => {
      const leftViss = await prisma.agentLeafViss.findFirst({
        where: { typeOfLeafId: l.typeOfLeafId, agentId: l.agentId },
      });
      if (!leftViss) return;

      const reduceViss = leftViss.viss + l.deductViss;

      await prisma.agentLeafViss.updateMany({
        data: { viss: reduceViss },
        where: { typeOfLeafId: l.typeOfLeafId, agentId: l.agentId },
      });

      await prisma.agentRemineLeaf.create({
        data: {
          agentId: l.agentId,
          leafId: Number(l.typeOfLeafId),
          workShopId: l.workShopId,
          Viss: reduceViss,
          seq: newSeq,
        },
      });
    });

    //remain filterSize
    findRetrunCheroot.forEach(async (c) => {
      const leftQuantity = await prisma.agentLeftFilterSize.findFirst({
        where: { agentId: c.agentId, typeOfCherootId: c.typeOfCherootId },
      });

      if (!leftQuantity) return;
      const formula = await prisma.formula.findFirst({
        where: { typeOfCherootId: c.typeOfCherootId },
      });
      if (!formula) return;
      const qty =
        (formula.filterSizeQty * c.totalCherootQty) / formula.cherootQty;

      const remainQty = leftQuantity.quantity + qty;
      await prisma.agentLeftFilterSize.updateMany({
        data: { quantity: remainQty },
        where: { agentId: c.agentId, typeOfCherootId: c.typeOfCherootId },
      });
    });

    //remain Tabacco
    findRetrunCheroot.forEach(async (c) => {
      const leftTabacco = await prisma.agentLeftTabacco.findFirst({
        where: { agentId: c.agentId, typeOfCherootId: c.typeOfCherootId },
      });

      if (!leftTabacco) return;
      const formula = await prisma.formula.findFirst({
        where: { typeOfCherootId: c.typeOfCherootId },
      });
      if (!formula) return;
      const tin = (formula.tabaccoTin * c.totalCherootQty) / formula.cherootQty;
      const pyi = (formula.tabaccoPyi * c.totalCherootQty) / formula.cherootQty;
      const tolPyi = tin * 16 + pyi;
      const leftTolPyi = leftTabacco.tin * 16 + leftTabacco.pyi;
      const Pyi = leftTolPyi + tolPyi;
      const remainTin = Math.floor(Pyi / 16);
      const remainPyi = Pyi % 16;
      await prisma.agentLeftTabacco.updateMany({
        data: { tin: remainTin, pyi: remainPyi },
        where: { agentId: c.agentId, typeOfCherootId: c.typeOfCherootId },
      });
    });

    //remain Label
    findRetrunCheroot.forEach(async (c) => {
      const leftBandle = await prisma.agentLeftLabel.findFirst({
        where: { agentId: c.agentId, typeOfCherootId: c.typeOfCherootId },
      });

      if (!leftBandle) return;
      if (c.reduceBandle === undefined) return;
      const remainBandle = leftBandle.bandle + c.reduceBandle;

      await prisma.agentLeftLabel.updateMany({
        data: { bandle: remainBandle },
        where: { agentId: c.agentId, typeOfCherootId: c.typeOfCherootId },
      });
    });
    //delete otherdeduction & returnCheroot & leafDeduction
    await prisma.otherDeduction.updateMany({
      where: { seq },
      data: { isArchived: true },
    });
    await prisma.returnReadyCheroot.updateMany({
      where: { seq },
      data: { isArchived: true },
    });
    await prisma.leafDeduction.updateMany({
      where: { seq },
      data: { isArchived: true },
    });
    //delete remainLeaf & remainCash
    await prisma.agentRemineLeaf.updateMany({
      where: { seq },
      data: { isArchived: true },
    });
    await prisma.agentRemainCash.updateMany({
      where: { seq },
      data: { isArchived: true },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
