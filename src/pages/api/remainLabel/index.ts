import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(400).send("Unsythorized");
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
