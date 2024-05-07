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
      const { date, typeOfTabaccoId, tin, pyi, bag, garageId, shopId } =
        req.body;
      const isValid =
        date &&
        typeOfTabaccoId &&
        tin != undefined &&
        pyi != undefined &&
        bag != undefined &&
        garageId &&
        shopId;
      if (!isValid) return res.status(405).send("bad request");

      const newTabaccoStock = await prisma.tabacco.create({
        data: { date, typeOfTabaccoId, tin, pyi, bag, garageId, shopId },
      });
      return res.status(200).json({ newTabaccoStock });
    } else {
      const {
        date,
        invNo,
        carNo,
        typeOfTabaccoId,
        tin,
        pyi,
        bag,
        garageId,
        shopId,
      } = req.body;
      const isValid =
        date &&
        invNo != undefined &&
        carNo &&
        typeOfTabaccoId &&
        tin != undefined &&
        pyi != undefined &&
        bag != undefined &&
        garageId &&
        shopId;
      if (!isValid) return res.status(405).send("bad request");

      const newTabaccoAddStock = await prisma.tabacco.create({
        data: { date, typeOfTabaccoId, tin, pyi, bag, garageId, shopId },
      });
      const newAddStock = await prisma.addStock.create({
        data: { date, invNo, carNo, typeOfTabaccoId, garageId },
      });
      return res.status(200).json({ newTabaccoAddStock, newAddStock });
    }
  }
  res.status(200).json("bad request");
}
