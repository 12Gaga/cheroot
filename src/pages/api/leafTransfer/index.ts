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
      exitGarageId,
      enterenceGarageId,
      typeOfLeafId,
      batchNos,
      tolViss,
    } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      date &&
      exitGarageId &&
      enterenceGarageId &&
      typeOfLeafId &&
      batchNos &&
      tolViss != undefined;
    if (!isValid) return res.status(405).send("bad request");
    const realBatchNo = await prisma.leaf.findMany({
      where: { id: { in: batchNos } },
    });
    const transferSeq = nanoid(5);
    const newLeafTransfer = await prisma.$transaction(
      realBatchNo.map((item) =>
        prisma.leafTransferGarage.create({
          data: {
            date,
            exitGarageId,
            enterenceGarageId,
            typeOfLeafId,
            batchNo: item.batchNo,
            totalViss: tolViss,
            enterDate: item.date,
            workShopId,
            transferSeq,
          },
        })
      )
    );
    // await prisma.$transaction(
    //   realBatchNo.map((item) =>
    //     prisma.leafTransferGarage.updateMany({
    //       where: {
    //         batchNo: item.batchNo,
    //         exitGarageId: enterenceGarageId,
    //         typeOfLeafId,
    //       },
    //       data: {
    //         isArchived: true,
    //       },
    //     })
    //   )
    // );
    const concernLeaf = await prisma.leaf.findMany({
      where: { typeOfLeafId, garageId: enterenceGarageId, isArchived: false },
    });
    let lastBatchNo =
      concernLeaf.length && concernLeaf[concernLeaf.length - 1].batchNo;
    const batch = lastBatchNo === 1000 ? 1 : (lastBatchNo += 1);
    const newLeafStock = await prisma.$transaction(
      realBatchNo.map((item) =>
        prisma.leaf.create({
          data: {
            date,
            typeOfLeafId,
            batchNo: batch,
            viss: item.viss,
            garageId: enterenceGarageId,
            stockSeq: transferSeq,
            shopId: 1,
          },
        })
      )
    );
    return res.status(200).json({ newLeafTransfer, newLeafStock });
  } else if (method === "PUT") {
    const {
      date,
      exitGarageId,
      enterenceGarageId,
      typeOfLeafId,
      batchNos,
      tolViss,
      transferSeq,
    } = req.body;
    const isValid =
      date &&
      exitGarageId &&
      enterenceGarageId &&
      typeOfLeafId &&
      batchNos &&
      tolViss != undefined &&
      transferSeq;
    const workShopId = Number(req.query.workShopId);
    if (!isValid) return res.status(405).send("bad request");
    await prisma.leaf.deleteMany({ where: { stockSeq: transferSeq } });
    await prisma.leafTransferGarage.deleteMany({ where: { transferSeq } });
    const realBatchNo = await prisma.leaf.findMany({
      where: { id: { in: batchNos } },
    });
    const updateLeafTransfer = await prisma.$transaction(
      realBatchNo.map((item) =>
        prisma.leafTransferGarage.create({
          data: {
            date,
            exitGarageId,
            enterenceGarageId,
            typeOfLeafId,
            batchNo: item.batchNo,
            totalViss: tolViss,
            enterDate: item.date,
            workShopId,
            transferSeq,
          },
        })
      )
    );
    const updateLeafStock = await prisma.$transaction(
      realBatchNo.map((item) =>
        prisma.leaf.create({
          data: {
            date,
            typeOfLeafId,
            batchNo: item.batchNo,
            viss: item.viss,
            garageId: enterenceGarageId,
            stockSeq: transferSeq,
            shopId: 1,
          },
        })
      )
    );
    return res.status(200).json({ updateLeafTransfer, updateLeafStock });
  } else if (method === "DELETE") {
    const transferSeq = req.query.transferSeq as string;
    const isValid = transferSeq;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.leaf.updateMany({
      data: { isArchived: true },
      where: { stockSeq: transferSeq },
    });
    await prisma.leafTransferGarage.updateMany({
      where: { transferSeq },
      data: { isArchived: true },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
