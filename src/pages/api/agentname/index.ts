import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "@reduxjs/toolkit";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { name, phoneNo, address, cashBig, cashSmall } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      name &&
      phoneNo &&
      address &&
      cashBig != undefined &&
      cashSmall != undefined;
    if (!isValid) return res.status(405).send("bad request");

    const newAgent = await prisma.agent.create({
      data: {
        name,
        phoneNo,
        adderess: address,
        cashBalcanceBig: cashBig,
        cashBalcanceSmall: cashSmall,
        workShopId,
      },
    });
    const seq = nanoid(5);
    const newRemainCash = await prisma.agentRemainCash.create({
      data: {
        agentId: newAgent.id,
        remainCashBig: cashBig,
        remainCashSmall: cashSmall,
        seq,
        workShopId,
      },
    });
    return res.status(200).json({ newAgent, newRemainCash });
  } else if (method === "PUT") {
    const { name, phoneNo, address, cashBig, cashSmall, id } = req.body;
    const isValid =
      name &&
      phoneNo &&
      address &&
      cashBig != undefined &&
      cashSmall != undefined &&
      id;
    if (!isValid) return res.status(405).send("bad request");
    const updateAgent = await prisma.agent.update({
      where: { id },
      data: {
        name,
        phoneNo,
        adderess: address,
        cashBalcanceBig: cashBig,
        cashBalcanceSmall: cashSmall,
      },
    });
    return res.status(200).json({ updateAgent });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.agent.update({
      data: { isArchived: true },
      where: { id },
    });
    await prisma.agentLeafViss.updateMany({
      where: { agentId: id },
      data: { isArchived: true },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
