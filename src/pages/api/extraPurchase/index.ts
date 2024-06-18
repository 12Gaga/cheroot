import { prisma } from "@/utils/db";
import { AgentLeafViss } from "@prisma/client";
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
      typeOfFilterSizeId,
      filterSizeQty,
      filterSizeBag,
      filterSizePrice,
      filterSizeAmount,
      typeOfTabaccoId,
      tabaccoQty,
      tabaccoTin,
      tabaccoPyi,
      tabaccoBag,
      tabaccoPrice,
      tabaccoAmount,
      typeOfLabelId,
      labelBandle,
      labelPrice,
      labelAmount,
      totalAmount,
      garageId,
    } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      date &&
      agentId &&
      typeOfFilterSizeId &&
      filterSizeQty != undefined &&
      filterSizeBag != undefined &&
      filterSizePrice != undefined &&
      filterSizeAmount != undefined &&
      typeOfTabaccoId &&
      tabaccoQty != undefined &&
      tabaccoTin != undefined &&
      tabaccoPyi != undefined &&
      tabaccoBag != undefined &&
      tabaccoPrice != undefined &&
      tabaccoAmount != undefined &&
      typeOfLabelId &&
      labelBandle != undefined &&
      labelPrice != undefined &&
      labelAmount != undefined &&
      totalAmount != undefined &&
      garageId;
    if (!isValid) return res.status(405).send("bad request");
    const seq = nanoid(5);
    const newExtraPurchase = await prisma.extraPurchase.create({
      data: {
        date,
        agentId,
        typeOfFilterSizeId,
        filterSizeQty,
        filterSizeBag,
        filterSizePrice,
        filterSizeAmount,
        typeOfTabaccoId,
        tabaccoQty,
        tabaccoTin,
        tabaccoPyi,
        tabaccoBag,
        tabaccoPrice,
        tabaccoAmount,
        typeOfLabelId,
        labelBandle,
        labelPrice,
        labelAmount,
        totalAmount,
        garageId,
        workShopId,
      },
    });
    const newExtraPurchaseSummary = await prisma.extraPurchaseSummery.create({
      data: {
        date,
        agentId,
        tolPrice: totalAmount,
        purchaseSeq: seq,
        workShopId,
      },
    });
    return res.status(200).json({ newExtraPurchase, newExtraPurchaseSummary });
  }
  res.status(200).json("bad request");
}
