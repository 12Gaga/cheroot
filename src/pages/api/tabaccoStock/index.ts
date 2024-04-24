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
      const { typeOfTabaccoId, tin, pyi, bag, garageId, shop } = req.body;
      const isValid =
        typeOfTabaccoId &&
        tin != undefined &&
        pyi != undefined &&
        bag != undefined &&
        garageId &&
        shop;
      if (!isValid) return res.status(405).send("bad request");

      const newTabaccoStock = await prisma.tabacco.create({
        data: { typeOfTabaccoId, tin, pyi, bag, garageId, shop },
      });
      return res.status(200).json({ newTabaccoStock });
    } else {
      const { invNo, carNo, typeOfTabaccoId, tin, pyi, bag, garageId, shop } =
        req.body;
      const isValid =
        invNo != undefined &&
        carNo &&
        typeOfTabaccoId &&
        tin != undefined &&
        pyi != undefined &&
        bag != undefined &&
        garageId &&
        shop;
      if (!isValid) return res.status(405).send("bad request");

      const newTabaccoAddStock = await prisma.tabacco.create({
        data: { typeOfTabaccoId, tin, pyi, bag, garageId, shop },
      });
      const newAddStock = await prisma.addStock.create({
        data: { invNo, carNo, typeOfTabaccoId, garageId },
      });
      return res.status(200).json({ newTabaccoAddStock, newAddStock });
    }
  }
  res.status(200).json("bad request");
}
