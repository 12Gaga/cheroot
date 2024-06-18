import { prisma } from "@/utils/db";
import { nanoid } from "@reduxjs/toolkit";
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
        seq,
        workShopId,
      },
    });

    return res.status(200).json({ newReturnCheroot });
  }
  res.status(200).json("bad request");
}
