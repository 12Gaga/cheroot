import { prisma } from "@/utils/db";
import { AgentLeafViss } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { date, agentId, deductViss, typeOfLeafId, price, deductionAmount } =
      req.body;

    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      date && agentId && typeOfLeafId && deductViss && price && deductionAmount;

    if (!isValid) return res.status(405).send("bad requesttttt");

    const newLeafDeduction = await prisma.leafDeduction.create({
      data: {
        date,
        agentId,
        typeOfLeafId,
        deductViss,
        deductionAmount,
        price,
        workShopId,
      },
    });

    const leftViss = (await prisma.agentLeafViss.findFirst({
      where: { typeOfLeafId, agentId },
    })) as AgentLeafViss;
    const reduceViss = leftViss.viss - deductViss;

    await prisma.agentLeafViss.updateMany({
      data: { viss: reduceViss },
      where: { typeOfLeafId, agentId },
    });

    return res.status(200).json({ newLeafDeduction });
  }
  res.status(200).json("bad request");
}
