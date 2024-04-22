import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { name, typeOfCherootId } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid = name && typeOfCherootId != undefined;
    if (!isValid) return res.status(405).send("bad request");

    const newTypeOfPacking = await prisma.typeOfPacking.create({
      data: { name, typeOfCherootId, workShopId },
    });
    return res.status(200).json({ newTypeOfPacking });
  }
  res.status(200).json("bad request");
}
