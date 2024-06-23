import { prisma } from "@/utils/db";
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
      typeOfCherootId,
      typeOfLabelId,
      remainBandel,
      compensationBandle,
      takeMoneyBandle,
      labelPrice,
      tolAmount,
      addCashBig,
      addCashsmall,
      inCash,
    } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      date &&
      agentId &&
      typeOfCherootId &&
      typeOfLabelId &&
      remainBandel != undefined &&
      compensationBandle != undefined &&
      takeMoneyBandle != undefined &&
      labelPrice != undefined &&
      tolAmount != undefined &&
      addCashBig != undefined &&
      addCashsmall != undefined &&
      inCash != undefined;
    if (!isValid) return res.status(405).send("bad request");
    //create label compensation
    const newCompensationLabel = await prisma.compensationLabel.create({
      data: {
        date,
        agentId,
        typeOfCherootId,
        remainBandel,
        compensationBandle,
        takeMoneyBandle,
        labelPrice,
        tolAmount,
        addCashBig,
        addCashsmall,
        inCash,
        workShopId,
      },
    });
    //remain label
    const leftLabel = await prisma.agentLeftLabel.findFirst({
      where: { agentId, typeOfCherootId, typeOfLabelId },
    });
    if (leftLabel) {
      const reduceBandle =
        leftLabel.bandle - (compensationBandle + takeMoneyBandle);
      await prisma.agentLeftLabel.updateMany({
        where: { agentId, typeOfCherootId, typeOfLabelId },
        data: { bandle: reduceBandle },
      });
    }
    //remain cash
    const seq = nanoid(5);
    const leftCash = await prisma.agent.findFirst({ where: { id: agentId } });
    if (leftCash) {
      const remainCashBig = leftCash.cashBalcanceBig + addCashBig;
      const remainCashSmall = leftCash.cashBalcanceSmall + addCashsmall;
      await prisma.agent.update({
        where: { id: agentId },
        data: {
          cashBalcanceBig: remainCashBig,
          cashBalcanceSmall: remainCashSmall,
        },
      });
      await prisma.agentRemainCash.create({
        data: {
          agentId,
          date,
          remainCashBig,
          remainCashSmall,
          workShopId,
          seq,
        },
      });
    }

    return res.status(200).json({
      newCompensationLabel,
    });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    const find = await prisma.compensationLabel.findFirst({ where: { id } });
    const seq = nanoid(5);
    if (find) {
      //remain label
      const leftLabel = await prisma.agentLeftLabel.findFirst({
        where: { agentId: find.agentId, typeOfCherootId: find.typeOfCherootId },
      });
      if (leftLabel) {
        const reduceBandle =
          leftLabel.bandle + (find.compensationBandle + find.takeMoneyBandle);
        await prisma.agentLeftLabel.updateMany({
          where: {
            agentId: find.agentId,
            typeOfCherootId: find.typeOfCherootId,
          },
          data: { bandle: reduceBandle },
        });
      }
      // remain Cash
      const leftCash = await prisma.agent.findFirst({
        where: { id: find.agentId },
      });
      if (leftCash) {
        const remainCashBig = leftCash.cashBalcanceBig - find.addCashBig;
        const remainCashSmall = leftCash.cashBalcanceSmall - find.addCashsmall;
        await prisma.agent.update({
          where: { id: find.agentId },
          data: {
            cashBalcanceBig: remainCashBig,
            cashBalcanceSmall: remainCashSmall,
          },
        });
        await prisma.agentRemainCash.create({
          data: {
            agentId: find.agentId,
            remainCashBig,
            remainCashSmall,
            workShopId: find.workShopId,
            seq,
          },
        });
      }
    }
    //delete label compensation
    await prisma.compensationLabel.update({
      where: { id },
      data: { isArchived: true },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
