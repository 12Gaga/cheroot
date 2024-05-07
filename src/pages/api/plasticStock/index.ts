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

      const newPlasticStock = await prisma.plastic.create({
        data: {
          date,
          plasticId: typeOfPlasticId,
          quantity,
          bag,
          garageId,
          shopId,
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

      const newPlasticAddStock = await prisma.plastic.create({
        data: {
          date,
          plasticId: typeOfPlasticId,
          quantity,
          bag,
          garageId,
          shopId,
        },
      });
      const newAddStock = await prisma.addStock.create({
        data: { date, invNo, carNo, typeOfPlasticId, garageId },
      });
      return res.status(200).json({ newPlasticAddStock, newAddStock });
    }
  }
  res.status(400).json("bad request");
}
