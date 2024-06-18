import { prisma } from "@/utils/db";
import { nanoid } from "@reduxjs/toolkit";
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
    const seq = nanoid(5);
    const newRemainLeaf = await prisma.agentRemineLeaf.create({
      data: { agentId, leafId: typeOfLeafId, workShopId, Viss: viss, seq },
    });
    return res.status(200).json({ newAgentLeafViss, newRemainLeaf });
  } else if (method === "PUT") {
    const { agentId, typeOfLeafId, viss, id } = req.body;
    const isValid = agentId && typeOfLeafId && viss != undefined && id;
    if (!isValid) return res.status(405).send("bad request");
    const updateAgentLeafViss = await prisma.agentLeafViss.update({
      where: { id },
      data: {
        agentId,
        typeOfLeafId,
        viss,
      },
    });
    return res.status(200).json({ updateAgentLeafViss });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.agentLeafViss.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
