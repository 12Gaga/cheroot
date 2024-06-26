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
    const invNo = Number(req.query.invNo);
    if (!invNo) {
      const { date, typeOfPlasticId, quantity, bag, garageId, shopId } =
        req.body;
      const isValid =
        date &&
        typeOfPlasticId &&
        quantity != undefined &&
        bag != undefined &&
        garageId &&
        shopId;
      if (!isValid) return res.status(405).send("bad request");
      const stockSeq = nanoid(5);
      const newPlasticStock = await prisma.plastic.create({
        data: {
          date,
          plasticId: typeOfPlasticId,
          quantity,
          bag,
          garageId,
          shopId,
          stockSeq,
        },
      });
      return res.status(200).json({ newPlasticStock });
    } else {
      const {
        date,
        invNo,
        carNo,
        typeOfPlasticId,
        quantity,
        bag,
        garageId,
        shopId,
      } = req.body;
      const isValid =
        date &&
        invNo != undefined &&
        carNo &&
        typeOfPlasticId &&
        quantity != undefined &&
        bag != undefined &&
        garageId &&
        shopId;
      if (!isValid) return res.status(405).send("bad request");
      const stockSeq = nanoid(5);
      const newPlasticAddStock = await prisma.plastic.create({
        data: {
          date,
          plasticId: typeOfPlasticId,
          quantity,
          bag,
          garageId,
          shopId,
          stockSeq,
        },
      });
      const newAddStock = await prisma.addStock.create({
        data: { date, invNo, carNo, typeOfPlasticId, garageId, stockSeq },
      });
      return res.status(200).json({ newPlasticAddStock, newAddStock });
    }
  } else if (method === "PUT") {
    const invNo = Number(req.query.invNo);
    if (!invNo) {
      const { date, typeOfPlasticId, quantity, bag, garageId, shopId, id } =
        req.body;
      const isValid =
        date &&
        typeOfPlasticId &&
        quantity != undefined &&
        bag != undefined &&
        garageId &&
        shopId &&
        id;
      if (!isValid) return res.status(405).send("bad request");
      const updatePlasticStock = await prisma.plastic.update({
        where: { id },
        data: {
          date,
          plasticId: typeOfPlasticId,
          quantity,
          bag,
          garageId,
          shopId,
        },
      });
      return res.status(200).json({ updatePlasticStock });
    } else {
      const {
        stockSeq,
        date,
        invNo,
        carNo,
        typeOfPlasticId,
        quantity,
        bag,
        garageId,
        shopId,
      } = req.body;
      const isValid =
        stockSeq &&
        date &&
        invNo != undefined &&
        carNo &&
        typeOfPlasticId &&
        quantity != undefined &&
        bag != undefined &&
        garageId &&
        shopId;
      if (!isValid) return res.status(405).send("bad request");
      await prisma.plastic.updateMany({
        where: { stockSeq },
        data: {
          date,
          plasticId: typeOfPlasticId,
          quantity,
          bag,
          garageId,
          shopId,
        },
      });
      await prisma.addStock.updateMany({
        where: { stockSeq },
        data: { date, invNo, carNo, typeOfPlasticId, garageId },
      });
      const updatePlasticAddStock = await prisma.plastic.findFirst({
        where: { stockSeq },
      });
      const updateAddStock = await prisma.addStock.findFirst({
        where: { stockSeq },
      });
      return res.status(200).json({ updatePlasticAddStock, updateAddStock });
    }
  } else if (method === "DELETE") {
    const stockSeq = req.query.stockSeq as string;
    if (!stockSeq) {
      const id = Number(req.query.id);
      const isValid = id;
      if (!isValid) return res.status(405).send("bad request");
      await prisma.plastic.update({
        data: { isArchived: true },
        where: { id },
      });
      return res.status(200).send("ok");
    } else {
      const isValid = stockSeq;
      if (!isValid) return res.status(405).send("bad request");
      await prisma.plastic.updateMany({
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
