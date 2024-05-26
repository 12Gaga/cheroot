import { prisma } from "@/utils/db";
import { nanoid } from "@reduxjs/toolkit";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const invNo = Number(req.query.invNo);
    const loop = Number(req.query.loop);
    if (loop) {
      const {
        date,
        invNo,
        carNo,
        typeOfLeafId,
        batchNo,
        viss,
        garageId,
        shopId,
      } = req.body;
      const isValid =
        date &&
        invNo != undefined &&
        carNo &&
        typeOfLeafId &&
        batchNo != undefined &&
        viss != undefined &&
        garageId &&
        shopId;
      if (!isValid) return res.status(405).send("bad request");
      const leafAddStocks = await prisma.leaf.findMany({
        where: { typeOfLeafId: typeOfLeafId },
      });
      let lastbatchno = leafAddStocks[leafAddStocks.length - 1].batchNo;

      for (let i = 0; i < batchNo; i++) {
        lastbatchno += 1;
        const stockSeq = nanoid(5);
        await prisma.leaf.create({
          data: {
            date,
            typeOfLeafId,
            batchNo: lastbatchno,
            viss,
            garageId,
            shopId,
            stockSeq,
          },
        });
        await prisma.addStock.create({
          data: { date, invNo, carNo, typeOfLeafId, garageId, stockSeq },
        });
      }
      const newleafLoopAddStock = await prisma.leaf.findMany({
        where: { isArchived: false },
      });
      const newLoopAddStock = await prisma.addStock.findMany({
        where: { isArchived: false },
      });
      return res.status(200).json({ newleafLoopAddStock, newLoopAddStock });
    } else if (!invNo) {
      const { date, typeOfLeafId, batchNo, viss, garageId, shopId } = req.body;
      const isValid =
        date &&
        typeOfLeafId &&
        batchNo != undefined &&
        viss != undefined &&
        garageId &&
        shopId;
      if (!isValid) return res.status(405).send("bad request");
      const stockSeq = nanoid(5);
      const newleafStock = await prisma.leaf.create({
        data: { date, typeOfLeafId, batchNo, viss, garageId, shopId, stockSeq },
      });
      return res.status(200).json({ newleafStock });
    } else {
      const {
        date,
        invNo,
        carNo,
        typeOfLeafId,
        batchNo,
        viss,
        garageId,
        shopId,
      } = req.body;
      const isValid =
        date &&
        invNo != undefined &&
        carNo &&
        typeOfLeafId &&
        batchNo != undefined &&
        viss != undefined &&
        garageId &&
        shopId;
      if (!isValid) return res.status(405).send("bad request");
      const stockSeq = nanoid(5);
      const newleafAddStock = await prisma.leaf.create({
        data: { date, typeOfLeafId, batchNo, viss, garageId, shopId, stockSeq },
      });
      const newAddStock = await prisma.addStock.create({
        data: { date, invNo, carNo, typeOfLeafId, garageId, stockSeq },
      });
      return res.status(200).json({ newleafAddStock, newAddStock });
    }
  } else if (method === "PUT") {
    const invNo = Number(req.query.invNo);
    if (!invNo) {
      const { date, typeOfLeafId, batchNo, viss, garageId, shopId, id } =
        req.body;
      const isValid =
        date &&
        typeOfLeafId &&
        batchNo != undefined &&
        viss != undefined &&
        garageId &&
        shopId &&
        id;
      if (!isValid) return res.status(405).send("bad request");
      const updateleafStock = await prisma.leaf.update({
        where: { id },
        data: {
          date,
          typeOfLeafId,
          batchNo,
          viss,
          garageId,
          shopId,
        },
      });
      return res.status(200).json({ updateleafStock });
    } else {
      const {
        stockSeq,
        date,
        invNo,
        carNo,
        typeOfLeafId,
        batchNo,
        viss,
        garageId,
        shopId,
      } = req.body;
      const isValid =
        stockSeq &&
        date &&
        invNo != undefined &&
        carNo &&
        typeOfLeafId &&
        batchNo != undefined &&
        viss != undefined &&
        garageId &&
        shopId;
      if (!isValid) return res.status(405).send("bad request");
      await prisma.leaf.updateMany({
        where: { stockSeq },
        data: { date, typeOfLeafId, batchNo, viss, garageId, shopId },
      });
      await prisma.addStock.updateMany({
        where: { stockSeq },
        data: { date, invNo, carNo, typeOfLeafId, garageId },
      });
      const updateLeafAddStock = await prisma.leaf.findFirst({
        where: { stockSeq },
      });
      const updateAddStock = await prisma.addStock.findFirst({
        where: { stockSeq },
      });
      return res.status(200).json({ updateLeafAddStock, updateAddStock });
    }
  } else if (method === "DELETE") {
    const stockSeq = req.query.stockSeq as string;
    if (!stockSeq) {
      const id = Number(req.query.id);
      const isValid = id;
      if (!isValid) return res.status(405).send("bad request");
      await prisma.leaf.update({
        data: { isArchived: true },
        where: { id },
      });
      return res.status(200).send("ok");
    } else {
      const isValid = stockSeq;
      if (!isValid) return res.status(405).send("bad request");
      await prisma.leaf.updateMany({
        data: { isArchived: true },
        where: { stockSeq },
      });
      await prisma.addStock.updateMany({
        where: { stockSeq },
        data: { isArchived: true },
      });
      return res.status(200).send("ok");
    }
  }
  res.status(400).json("bad request");
}
