import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const invNo = Number(req.query.invNo);
    if (!invNo) {
      const { date, typeOfFilterSizeId, quantity, bag, garageId, shopId } =
        req.body;
      const isValid =
        date &&
        typeOfFilterSizeId &&
        quantity != undefined &&
        bag != undefined &&
        garageId &&
        shopId;
      if (!isValid) return res.status(405).send("bad request");

      const newFilterSizeStock = await prisma.filterSize.create({
        data: { date, typeOfFilterSizeId, quantity, bag, garageId, shopId },
      });
      return res.status(200).json({ newFilterSizeStock });
    } else {
      const {
        date,
        invNo,
        carNo,
        typeOfFilterSizeId,
        quantity,
        bag,
        garageId,
        shopId,
      } = req.body;
      const isValid =
        date &&
        invNo != undefined &&
        carNo &&
        typeOfFilterSizeId &&
        quantity != undefined &&
        bag != undefined &&
        garageId &&
        shopId;
      if (!isValid) return res.status(405).send("bad request");

      const newFilterSizeAddStock = await prisma.filterSize.create({
        data: { date, typeOfFilterSizeId, quantity, bag, garageId, shopId },
      });
      const newAddStock = await prisma.addStock.create({
        data: { date, invNo, carNo, typeOfFilterSizeId, garageId },
      });
      return res.status(200).json({ newFilterSizeAddStock, newAddStock });
    }
  }
  res.status(200).json("bad request");
}
