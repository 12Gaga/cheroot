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
      viss,
      discountViss,
      netViss,
      price,
      amount,
      garageId,
    } = req.body;
    const BatchNos = req.body.batchNo as number[];
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      date &&
      agentId &&
      typeOfLeafId &&
      BatchNos.length &&
      viss != undefined &&
      discountViss != undefined &&
      netViss != undefined &&
      price != undefined &&
      amount != undefined &&
      garageId;
    if (!isValid) return res.status(405).send("bad request");

    const realBatchNo = await prisma.leaf.findMany({
      where: { id: { in: BatchNos } },
    });

    const newPayLeaf = await prisma.$transaction(
      realBatchNo.map((item) =>
        prisma.payLeaf.create({
          data: {
            date,
            agentId,
            typeOfLeafId,
            batchNo: item.batchNo,
            viss: item.viss,
            netViss,
            discountViss,
            price,
            amount,
            enterDate: item.date,
            garageId,
            workShopId,
          },
        })
      )
    );
    // const addViss = realBatchNo.reduce(
    //   (totalViss, viss) => (totalViss += viss.viss),
    //   0
    // );
    const leftViss = await prisma.agentLeafViss.findFirst({
      where: { typeOfLeafId, agentId },
    });
    let newRemainLeaf;
    const seq = nanoid(5);
    if (leftViss) {
      const totalViss = netViss + leftViss.viss;

      await prisma.agentLeafViss.updateMany({
        data: { viss: totalViss },
        where: { typeOfLeafId, agentId },
      });

      newRemainLeaf = await prisma.agentRemineLeaf.create({
        data: {
          agentId,
          leafId: typeOfLeafId,
          workShopId,
          Viss: totalViss,
          seq,
          date,
        },
      });
    } else {
      await prisma.agentLeafViss.create({
        data: { agentId, typeOfLeafId, viss: netViss, workShopId },
      });
      newRemainLeaf = await prisma.agentRemineLeaf.create({
        data: {
          agentId,
          leafId: typeOfLeafId,
          workShopId,
          Viss: netViss,
          date,
          seq,
        },
      });
    }

    // await prisma.leaf.updateMany({
    //   data: { isArchived: true },
    //   where: { id: { in: BatchNos } },
    // });

    return res.status(200).json({ newPayLeaf, newRemainLeaf });
  }
  res.status(200).json("bad request");
}
