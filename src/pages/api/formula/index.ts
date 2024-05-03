import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const {
      typeOfCherootId,
      cherootQty,
      typeOfFilterSizeId,
      filterSizeQty,
      filterSizeBag,
      typeOfTabaccoId,
      tabaccoQty,
      tin,
      pyi,
    } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      typeOfCherootId &&
      cherootQty != undefined &&
      typeOfFilterSizeId &&
      filterSizeQty != undefined &&
      filterSizeBag != undefined &&
      typeOfTabaccoId &&
      tabaccoQty != undefined &&
      tin != undefined &&
      pyi != undefined;
    if (!isValid) return res.status(405).send("bad request");

    const newFormula = await prisma.formula.create({
      data: {
        typeOfCherootId,
        cherootQty,
        typeOfFilterSizeId,
        filterSizeQty,
        filterSizeBag,
        typeOfTabaccoId,
        tabaccoQty,
        tabaccoTin: tin,
        tabaccoPyi: pyi,
        workShopId,
      },
    });
    return res.status(200).json({ newFormula });
  }
  res.status(200).json("bad request");
}
