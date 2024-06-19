import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { agentId, typeOfCherootId, typeOfFilterSizeId, quantity } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      agentId && typeOfCherootId && typeOfFilterSizeId && quantity != undefined;
    if (!isValid) return res.status(405).send("bad request");

    const newRemainFilterSize = await prisma.agentLeftFilterSize.create({
      data: {
        agentId,
        typeOfCherootId,
        typeOfFilterSizeId,
        quantity,
        workShopId,
      },
    });
    return res.status(200).json({ newRemainFilterSize });
  }
  res.status(400).json("bad request");
}
