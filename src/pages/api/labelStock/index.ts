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
    if (!invNo) {
      const { date, typeOfLabelId, bandle, garageId, shopId } = req.body;
      const isValid =
        date && typeOfLabelId && bandle != undefined && garageId && shopId;
      if (!isValid) return res.status(405).send("bad request");
      const stockSeq = nanoid(5);
      const newLabelStock = await prisma.label.create({
        data: { date, typeOfLabelId, bandle, garageId, shopId, stockSeq },
      });
      return res.status(200).json({ newLabelStock });
    } else {
      const { date, invNo, carNo, typeOfLabelId, bandle, garageId, shopId } =
        req.body;
      const isValid =
        date &&
        invNo != undefined &&
        carNo &&
        typeOfLabelId &&
        bandle != undefined &&
        garageId &&
        shopId;
      if (!isValid) return res.status(405).send("bad request");
      const stockSeq = nanoid(5);
      const newLabelAddStock = await prisma.label.create({
        data: { date, typeOfLabelId, bandle, garageId, shopId, stockSeq },
      });
      const newAddStock = await prisma.addStock.create({
        data: { date, invNo, carNo, typeOfLabelId, garageId, stockSeq },
      });
      return res.status(200).json({ newLabelAddStock, newAddStock });
    }
  } else if (method === "PUT") {
    const invNo = Number(req.query.invNo);
    if (!invNo) {
      const { date, typeOfLabelId, bandle, garageId, shopId, id } = req.body;
      const isValid =
        date &&
        typeOfLabelId &&
        bandle != undefined &&
        garageId &&
        shopId &&
        id;
      if (!isValid) return res.status(405).send("bad request");
      const updateLabelStock = await prisma.label.update({
        where: { id },
        data: {
          date,
          typeOfLabelId,
          bandle,
          garageId,
          shopId,
        },
      });
      return res.status(200).json({ updateLabelStock });
    } else {
      const {
        stockSeq,
        date,
        invNo,
        carNo,
        typeOfLabelId,
        bandle,
        garageId,
        shopId,
      } = req.body;
      const isValid =
        stockSeq &&
        date &&
        invNo != undefined &&
        carNo &&
        typeOfLabelId &&
        bandle != undefined &&
        garageId &&
        shopId;
      if (!isValid) return res.status(405).send("bad request");
      await prisma.label.updateMany({
        where: { stockSeq },
        data: { date, typeOfLabelId, bandle, garageId, shopId },
      });
      await prisma.addStock.updateMany({
        where: { stockSeq },
        data: { date, invNo, carNo, typeOfLabelId, garageId },
      });
      const updateLabelAddStock = await prisma.label.findFirst({
        where: { stockSeq },
      });
      const updateAddStock = await prisma.addStock.findFirst({
        where: { stockSeq },
      });
      return res.status(200).json({ updateLabelAddStock, updateAddStock });
    }
  } else if (method === "DELETE") {
    const stockSeq = req.query.stockSeq as string;
    if (!stockSeq) {
      const id = Number(req.query.id);
      const isValid = id;
      if (!isValid) return res.status(405).send("bad request");
      await prisma.label.update({
        data: { isArchived: true },
        where: { id },
      });
      return res.status(200).send("ok");
    } else {
      const isValid = stockSeq;
      if (!isValid) return res.status(405).send("bad request");
      await prisma.label.updateMany({
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
