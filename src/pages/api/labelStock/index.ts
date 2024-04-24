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
      const { typeOfLabelId, bandle, garageId, shop } = req.body;
      const isValid = typeOfLabelId && bandle != undefined && garageId && shop;
      if (!isValid) return res.status(405).send("bad request");

      const newLabelStock = await prisma.label.create({
        data: { typeOfLabelId, bandle, garageId, shop },
      });
      return res.status(200).json({ newLabelStock });
    } else {
      const { invNo, carNo, typeOfLabelId, bandle, garageId, shop } = req.body;
      const isValid =
        invNo != undefined &&
        carNo &&
        typeOfLabelId &&
        bandle != undefined &&
        garageId &&
        shop;
      if (!isValid) return res.status(405).send("bad request");

      const newLabelAddStock = await prisma.label.create({
        data: { typeOfLabelId, bandle, garageId, shop },
      });
      const newAddStock = await prisma.addStock.create({
        data: { invNo, carNo, typeOfLabelId, garageId },
      });
      return res.status(200).json({ newLabelAddStock, newAddStock });
    }
  }
  res.status(200).json("bad request");
}
