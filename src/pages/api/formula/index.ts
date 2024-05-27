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
  } else if (method === "PUT") {
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
      id,
    } = req.body;
    const isValid =
      typeOfCherootId &&
      cherootQty != undefined &&
      typeOfFilterSizeId &&
      filterSizeQty != undefined &&
      filterSizeBag != undefined &&
      typeOfTabaccoId &&
      tabaccoQty != undefined &&
      tin != undefined &&
      pyi != undefined &&
      id;
    if (!isValid) return res.status(405).send("bad request");
    const updateFormula = await prisma.formula.update({
      where: { id },
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
      },
    });
    return res.status(200).json({ updateFormula });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.formula.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
