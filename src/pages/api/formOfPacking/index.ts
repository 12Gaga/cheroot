import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { name, typeOfCherootId, typeOfPackingId, quantity } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      name && typeOfCherootId && typeOfPackingId && quantity != undefined;
    if (!isValid) return res.status(405).send("bad requestsss");

    const newFormOfPacking = await prisma.formOfPacking.create({
      data: { name, typeOfCherootId, typeOfPackingId, workShopId, quantity },
    });
    return res.status(200).json({ newFormOfPacking });
  }
  res.status(200).json("bad request");
}
