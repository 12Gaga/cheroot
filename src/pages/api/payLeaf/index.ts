import { prisma } from "@/utils/db";
import { nanoid } from "@reduxjs/toolkit";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(400).send("Unsythorized");
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
    const seq = nanoid(5);
    //creat payLeaf
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
            seq,
            workShopId,
          },
        })
      )
    );
    //remian leaf
    const leftViss = await prisma.agentLeafViss.findFirst({
      where: { typeOfLeafId, agentId },
    });
    let newRemainLeaf;
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
    return res.status(200).json({ newPayLeaf, newRemainLeaf });
  } else if (method === "DELETE") {
    const seq = req.query.seq as string;
    const isValid = seq;
    if (!isValid) return res.status(405).send("bad request");
    const find = await prisma.payLeaf.findFirst({ where: { seq } });
    const newSeq = nanoid(5);
    //remain leaf
    if (find) {
      const leftViss = await prisma.agentLeafViss.findFirst({
        where: { typeOfLeafId: find.typeOfLeafId, agentId: find.agentId },
      });
      if (leftViss) {
        const totalViss = leftViss.viss - find.netViss;

        await prisma.agentLeafViss.updateMany({
          data: { viss: totalViss },
          where: { typeOfLeafId: find.typeOfLeafId, agentId: find.agentId },
        });

        await prisma.agentRemineLeaf.create({
          data: {
            agentId: find.agentId,
            leafId: find.typeOfLeafId,
            workShopId: find.workShopId,
            Viss: totalViss,
            seq: newSeq,
          },
        });
      }
    }
    //delete payLeaf & reaminLeaf
    await prisma.payLeaf.updateMany({
      where: { seq },
      data: { isArchived: true },
    });
    await prisma.agentRemineLeaf.updateMany({
      where: { seq },
      data: { isArchived: true },
    });
    return res.status(400).send("ok");
  }
  res.status(200).json("bad request");
}
