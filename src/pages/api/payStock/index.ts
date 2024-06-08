import { prisma } from "@/utils/db";
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
      cherootQty,
      typeOfFilterSizeId,
      filterSizeQty,
      filterSizeBag,
      typeOfTabaccoId,
      tabaccoQty,
      tabaccoTin,
      tabaccoPyi,
      tabaccoBag,
      typeOfLabelId,
      labelBandle,
      totalPrice,
      garageId,
    } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      date &&
      agentId &&
      typeOfCherootId &&
      cherootQty != undefined &&
      typeOfFilterSizeId &&
      filterSizeQty != undefined &&
      filterSizeBag != undefined &&
      typeOfTabaccoId &&
      tabaccoQty != undefined &&
      tabaccoTin != undefined &&
      tabaccoPyi != undefined &&
      tabaccoBag != undefined &&
      typeOfLabelId &&
      labelBandle != undefined &&
      totalPrice != undefined &&
      garageId;
    if (!isValid) return res.status(405).send("bad request");

    const newPayStock = await prisma.payOtherItem.create({
      data: {
        date,
        agentId,
        typeOfCherootId,
        cherootQty,
        typeOfFilterSizeId,
        filterSizeQty,
        filterSizeBag,
        typeOfTabaccoId,
        tabaccoQty,
        tabaccoTin,
        tabaccoPyi,
        tabaccoBag,
        typeOfLabelId,
        labelBandle,
        totalPrice,
        garageId,
        workShopId,
      },
    });

    return res.status(200).json({ newPayStock });
  }
  res.status(405).json("bad request");
}
