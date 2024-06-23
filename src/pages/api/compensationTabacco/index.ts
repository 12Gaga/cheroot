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
      typeOfTabaccoId,
      remainPyi,
      compensationPyi,
      takeMoneyPyi,
      tabaccoPrice,
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
      typeOfTabaccoId &&
      remainPyi != undefined &&
      compensationPyi != undefined &&
      takeMoneyPyi != undefined &&
      tabaccoPrice != undefined &&
      tolAmount != undefined &&
      addCashBig != undefined &&
      addCashsmall != undefined &&
      inCash != undefined;
    if (!isValid) return res.status(405).send("bad request");
    //create tabacco compensation
    const newCompensationTabacco = await prisma.compensationTabacco.create({
      data: {
        date,
        agentId,
        typeOfCherootId,
        remainPyi,
        compensationPyi,
        takeMoneyPyi,
        tabaccoPrice,
        tolAmount,
        addCashBig,
        addCashsmall,
        inCash,
        workShopId,
      },
    });
    //remain Tabacco
    const leftTabacco = await prisma.agentLeftTabacco.findFirst({
      where: { agentId, typeOfCherootId, typeOfTabaccoId },
    });
    if (leftTabacco) {
      const tolPyi = leftTabacco.tin * 16 + leftTabacco.pyi;
      const reduceTabacco = tolPyi - (compensationPyi + takeMoneyPyi);
      const reduceTin = Math.floor(reduceTabacco / 16);
      const reducePyi = reduceTabacco % 16;
      await prisma.agentLeftTabacco.updateMany({
        where: { agentId, typeOfCherootId, typeOfTabaccoId },
        data: { tin: reduceTin, pyi: reducePyi },
      });
    }
    //remain Cash
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
      newCompensationTabacco,
    });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    const find = await prisma.compensationTabacco.findFirst({ where: { id } });
    const seq = nanoid(5);
    if (find) {
      //remain tabacco
      const leftTabacco = await prisma.agentLeftTabacco.findFirst({
        where: { agentId: find.agentId, typeOfCherootId: find.typeOfCherootId },
      });
      if (leftTabacco) {
        const tolPyi = leftTabacco.tin * 16 + leftTabacco.pyi;
        const reduceTabacco =
          tolPyi + (find.compensationPyi + find.takeMoneyPyi);
        const reduceTin = Math.floor(reduceTabacco / 16);
        const reducePyi = reduceTabacco % 16;
        await prisma.agentLeftTabacco.updateMany({
          where: {
            agentId: find.agentId,
            typeOfCherootId: find.typeOfCherootId,
          },
          data: { tin: reduceTin, pyi: reducePyi },
        });
      }
      //remain cash
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
    //delete Tabacco compensation
    await prisma.compensationTabacco.update({
      where: { id },
      data: { isArchived: true },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
