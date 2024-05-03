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
      const { date, typeOfLeafId, batchNo, viss, garageId, shop } = req.body;
      const isValid =
        date &&
        typeOfLeafId &&
        batchNo != undefined &&
        viss != undefined &&
        garageId &&
        shop;
      if (!isValid) return res.status(405).send("bad request");

      const newleafStock = await prisma.leaf.create({
        data: { date, typeOfLeafId, batchNo, viss, garageId, shop },
      });
      return res.status(200).json({ newleafStock });
    } else {
      const { invNo, carNo, typeOfLeafId, batchNo, viss, garageId, shop } =
        req.body;
      const isValid =
        invNo != undefined &&
        carNo &&
        typeOfLeafId &&
        batchNo != undefined &&
        viss != undefined &&
        garageId &&
        shop;
      if (!isValid) return res.status(405).send("bad request");

      const newleafAddStock = await prisma.leaf.create({
        data: { typeOfLeafId, batchNo, viss, garageId, shop },
      });
      const newAddStock = await prisma.addStock.create({
        data: { invNo, carNo, typeOfLeafId, garageId },
      });
      return res.status(200).json({ newleafAddStock, newAddStock });
    }
  }
  res.status(400).json("bad request");
}
