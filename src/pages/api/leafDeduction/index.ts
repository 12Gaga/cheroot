import { prisma } from "@/utils/db";
import { AgentLeafViss } from "@prisma/client";
import { nanoid } from "@reduxjs/toolkit";
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
    const { date, agentId, deductViss, typeOfLeafId, price, deductionAmount } =
      req.body;

    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      date &&
      agentId &&
      typeOfLeafId &&
      deductViss != undefined &&
      price != undefined &&
      deductionAmount != undefined;

    if (!isValid) return res.status(405).send("bad requesttttt");
    const seq = nanoid(5);
    const newLeafDeduction = await prisma.leafDeduction.create({
      data: {
        date,
        agentId,
        typeOfLeafId,
        deductViss,
        deductionAmount,
        price,
        seq,
        workShopId,
      },
    });
    let newRemainLeaf;
    const leftViss = await prisma.agentLeafViss.findFirst({
      where: { typeOfLeafId, agentId },
    });
    if (leftViss) {
      const reduceViss = leftViss.viss - deductViss;

      await prisma.agentLeafViss.updateMany({
        data: { viss: reduceViss },
        where: { typeOfLeafId, agentId },
      });

      newRemainLeaf = await prisma.agentRemineLeaf.create({
        data: {
          agentId,
          leafId: typeOfLeafId,
          workShopId,
          Viss: reduceViss,
          seq,
          date,
        },
      });
    }

    return res.status(200).json({ newLeafDeduction, newRemainLeaf });
  }
  res.status(200).json("bad request");
}
