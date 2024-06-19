import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { agentId, typeOfCherootId, typeOfLabelId, bandle } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      agentId && typeOfCherootId && typeOfLabelId && bandle != undefined;
    if (!isValid) return res.status(405).send("bad request");

    const newRemainLabel = await prisma.agentLeftLabel.create({
      data: {
        agentId,
        typeOfCherootId,
        typeOfLabelId,
        bandle,
        workShopId,
      },
    });
    return res.status(200).json({ newRemainLabel });
  }
  res.status(400).json("bad request");
}
