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
      typeOfFilterId,
      remainQty,
      compensationQty,
      takeMoneyQty,
      filterPrice,
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
      typeOfFilterId &&
      remainQty != undefined &&
      compensationQty != undefined &&
      takeMoneyQty != undefined &&
      filterPrice != undefined &&
      tolAmount != undefined &&
      addCashBig != undefined &&
      addCashsmall != undefined &&
      inCash != undefined;
    if (!isValid) return res.status(405).send("bad request");
    //create filterSize compensation
    const newCompensationFilter = await prisma.compensationFilterSize.create({
      data: {
        date,
        agentId,
        typeOfCherootId,
        remainQty,
        compensationQty,
        takeMoneyQty,
        filterPrice,
        tolAmount,
        addCashBig,
        addCashsmall,
        inCash,
        workShopId,
      },
    });

    //remain FilterSize
    const leftFilter = await prisma.agentLeftFilterSize.findFirst({
      where: { agentId, typeOfCherootId, typeOfFilterSizeId: typeOfFilterId },
    });
    if (leftFilter) {
      const reduceQty = leftFilter.quantity - (compensationQty + takeMoneyQty);
      await prisma.agentLeftFilterSize.updateMany({
        where: { agentId, typeOfCherootId, typeOfFilterSizeId: typeOfFilterId },
        data: { quantity: reduceQty },
      });
    }
    // remain Cash
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
      newCompensationFilter,
    });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    const find = await prisma.compensationFilterSize.findFirst({
      where: { id },
    });
    const seq = nanoid(5);
    if (find) {
      //remain FilterSize
      const leftFilter = await prisma.agentLeftFilterSize.findFirst({
        where: { agentId: find.agentId, typeOfCherootId: find.typeOfCherootId },
      });
      if (leftFilter) {
        const reduceQty =
          leftFilter.quantity + (find.compensationQty + find.takeMoneyQty);
        await prisma.agentLeftFilterSize.updateMany({
          where: {
            agentId: find.agentId,
            typeOfCherootId: find.typeOfCherootId,
          },
          data: { quantity: reduceQty },
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
    //delete filterSize compensation
    await prisma.compensationFilterSize.update({
      where: { id },
      data: { isArchived: true },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
