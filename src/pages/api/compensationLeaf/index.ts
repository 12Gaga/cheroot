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
      typeOfLeafId,
      remainViss,
      compensationViss,
      takeMoneyViss,
      leafPrice,
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
      typeOfLeafId &&
      remainViss != undefined &&
      compensationViss != undefined &&
      takeMoneyViss != undefined &&
      leafPrice != undefined &&
      tolAmount != undefined &&
      addCashBig != undefined &&
      addCashsmall != undefined &&
      inCash != undefined;
    if (!isValid) return res.status(405).send("bad request");
    //creat leaf compensation
    const newCompensationLeaf = await prisma.compensationLeaf.create({
      data: {
        date,
        agentId,
        typeOfLeafId,
        remainViss,
        compensationViss,
        takeMoneyViss,
        leafPrice,
        tolAmount,
        addCashBig,
        addCashsmall,
        inCash,
        workShopId,
      },
    });
    // remainLeaf
    const seq = nanoid(5);
    const leftViss = await prisma.agentLeafViss.findFirst({
      where: { typeOfLeafId, agentId },
    });
    if (leftViss) {
      const reduceViss = leftViss.viss - (compensationViss + takeMoneyViss);

      await prisma.agentLeafViss.updateMany({
        data: { viss: reduceViss },
        where: { typeOfLeafId, agentId },
      });
      await prisma.agentRemineLeaf.create({
        data: {
          agentId,
          leafId: typeOfLeafId,
          workShopId,
          Viss: reduceViss,
          seq,
          date,
        },
      });
    }

    //remainCash
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
      newCompensationLeaf,
    });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    const find = await prisma.compensationLeaf.findFirst({ where: { id } });
    const seq = nanoid(5);
    if (find) {
      // remainLeaf
      const leftViss = await prisma.agentLeafViss.findFirst({
        where: { typeOfLeafId: find.typeOfLeafId, agentId: find.agentId },
      });
      if (leftViss) {
        const reduceViss =
          leftViss.viss + (find.compensationViss + find.takeMoneyViss);

        await prisma.agentLeafViss.updateMany({
          data: { viss: reduceViss },
          where: { typeOfLeafId: find.typeOfLeafId, agentId: find.agentId },
        });

        await prisma.agentRemineLeaf.create({
          data: {
            agentId: find.agentId,
            leafId: find.typeOfLeafId,
            workShopId: find.workShopId,
            Viss: reduceViss,
            seq,
          },
        });
      }
      //remainCash
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
    //delete compensationLeaf
    await prisma.compensationLeaf.update({
      where: { id },
      data: { isArchived: true },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
