import { prisma } from "@/utils/db";
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
    const {
      date,
      agentId,
      typeOfCherootId,
      goodQty,
      damage,
      totalCherootQty,
      goodPrice,
      amount,
    } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      date &&
      agentId &&
      typeOfCherootId &&
      goodQty != undefined &&
      damage != undefined &&
      totalCherootQty != undefined &&
      goodPrice != undefined &&
      amount != undefined;
    if (!isValid) return res.status(405).send("bad request");
    const seq = nanoid(5);
    const newReturnCheroot = await prisma.returnReadyCheroot.create({
      data: {
        date,
        agentId,
        typeOfCherootId,
        goodQty,
        damage,
        totalCherootQty,
        goodPrice,
        amount,
        reduceBandle: 1,
        seq,
        workShopId,
      },
    });

    return res.status(200).json({ newReturnCheroot });
  }
  res.status(200).json("bad request");
}
