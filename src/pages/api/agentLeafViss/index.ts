import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { agentId, typeOfLeafId, viss } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid = agentId && typeOfLeafId && viss != undefined;
    if (!isValid) return res.status(405).send("bad request");

    const newAgentLeafViss = await prisma.agentLeafViss.create({
      data: {
        agentId,
        typeOfLeafId,
        workShopId,
        viss,
      },
    });
    return res.status(200).json({ newAgentLeafViss });
  }
  res.status(200).json("bad request");
}
