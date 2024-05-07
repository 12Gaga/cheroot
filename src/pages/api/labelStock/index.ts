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
      const { date, typeOfLabelId, bandle, garageId, shopId } = req.body;
      const isValid =
        date && typeOfLabelId && bandle != undefined && garageId && shopId;
      if (!isValid) return res.status(405).send("bad request");

      const newLabelStock = await prisma.label.create({
        data: { date, typeOfLabelId, bandle, garageId, shopId },
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

      const newLabelAddStock = await prisma.label.create({
        data: { date, typeOfLabelId, bandle, garageId, shopId },
      });
      const newAddStock = await prisma.addStock.create({
        data: { date, invNo, carNo, typeOfLabelId, garageId },
      });
      return res.status(200).json({ newLabelAddStock, newAddStock });
    }
  }
  res.status(200).json("bad request");
}
