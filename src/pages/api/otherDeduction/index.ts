import { prisma } from "@/utils/db";
import { Agent, AgentLeafViss } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const {
      date,
      agentId,
      cashAdvanceBigDeduction,
      cashAdvanceSmallDeduction,
      otherDeduction,
      cashAdvanceBig,
      cashAdvanceSmall,
      netAgentPayment,
      bonusPayment,
      totalNetAgentPayment,
    } = req.body;

    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      date &&
      agentId &&
      cashAdvanceBigDeduction != undefined &&
      cashAdvanceSmallDeduction != undefined &&
      otherDeduction != undefined &&
      cashAdvanceBig != undefined &&
      cashAdvanceSmall != undefined &&
      netAgentPayment != undefined &&
      bonusPayment != undefined &&
      totalNetAgentPayment != undefined;

    if (!isValid) return res.status(405).send("bad request");

    const newOtherDeduction = await prisma.otherDeduction.create({
      data: {
        date,
        agentId,
        cashAdvanceBigDeduction,
        cashAdvanceSmallDeduction,
        otherDeduction,
        cashAdvanceBig,
        cashAdvanceSmall,
        netAgentPayment,
        bonusPayment,
        totalNetAgentPayment,
        workShopId,
      },
    });

    const agent = (await prisma.agent.findFirst({
      where: { id: agentId },
    })) as Agent;
    const bigCash =
      cashAdvanceBig + (agent.cashBalcanceBig - cashAdvanceBigDeduction);
    const smallCash =
      cashAdvanceSmall + (agent.cashBalcanceSmall - cashAdvanceSmallDeduction);

    await prisma.agent.updateMany({
      data: { cashBalcanceBig: bigCash, cashBalcanceSmall: smallCash },
      where: { id: agentId },
    });
    return res.status(200).json({ newOtherDeduction });
  }
  res.status(200).json("bad request");
}