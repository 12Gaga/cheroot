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
      exitGarageId,
      enterenceGarageId,
      typeOfFilterSizeId,
      quantity,
      bag,
    } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      date &&
      exitGarageId &&
      enterenceGarageId &&
      typeOfFilterSizeId &&
      quantity != undefined &&
      bag != undefined;
    if (!isValid) return res.status(405).send("bad request");

    const newFilterSizeTransfer = await prisma.filterSizeTransferGarage.create({
      data: {
        date,
        exitGarageId,
        enterenceGarageId,
        typeOfFilterSizeId,
        quantity,
        bag,
        workShopId,
      },
    });
    return res.status(200).json({ newFilterSizeTransfer });
  } else if (method === "PUT") {
    const {
      date,
      exitGarageId,
      enterenceGarageId,
      typeOfFilterSizeId,
      quantity,
      bag,
      id,
    } = req.body;
    const isValid =
      date &&
      exitGarageId &&
      enterenceGarageId &&
      typeOfFilterSizeId &&
      quantity != undefined &&
      bag != undefined &&
      id;
    if (!isValid) return res.status(405).send("bad request");
    const updateFilterSizeTransfer =
      await prisma.filterSizeTransferGarage.update({
        where: { id },
        data: {
          date,
          exitGarageId,
          enterenceGarageId,
          typeOfFilterSizeId,
          quantity,
          bag,
        },
      });
    return res.status(200).json({ updateFilterSizeTransfer });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.filterSizeTransferGarage.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
