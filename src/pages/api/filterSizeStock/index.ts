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
      const { typeOfFilterSizeId, quantity, bag, garageId, shop } = req.body;
      const isValid =
        typeOfFilterSizeId &&
        quantity != undefined &&
        bag != undefined &&
        garageId &&
        shop;
      if (!isValid) return res.status(405).send("bad request");

      const newFilterSizeStock = await prisma.filterSize.create({
        data: { typeOfFilterSizeId, quantity, bag, garageId, shop },
      });
      return res.status(200).json({ newFilterSizeStock });
    } else {
      const {
        invNo,
        carNo,
        typeOfFilterSizeId,
        quantity,
        bag,
        garageId,
        shop,
      } = req.body;
      const isValid =
        invNo != undefined &&
        carNo &&
        typeOfFilterSizeId &&
        quantity != undefined &&
        bag != undefined &&
        garageId &&
        shop;
      if (!isValid) return res.status(405).send("bad request");

      const newFilterSizeAddStock = await prisma.filterSize.create({
        data: { typeOfFilterSizeId, quantity, bag, garageId, shop },
      });
      const newAddStock = await prisma.addStock.create({
        data: { invNo, carNo, typeOfFilterSizeId, garageId },
      });
      return res.status(200).json({ newFilterSizeAddStock, newAddStock });
    }
  }
  res.status(200).json("bad request");
}
