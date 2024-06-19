import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { agentId, typeOfCherootId, typeOfTabaccoId, tin, pyi } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      agentId &&
      typeOfCherootId &&
      typeOfTabaccoId &&
      tin != undefined &&
      pyi != undefined;
    if (!isValid) return res.status(405).send("bad request");

    const newRemainTabacco = await prisma.agentLeftTabacco.create({
      data: {
        agentId,
        typeOfCherootId,
        typeOfTabaccoId,
        tin,
        pyi,
        workShopId,
      },
    });
    return res.status(200).json({ newRemainTabacco });
  }
  res.status(400).json("bad request");
}
