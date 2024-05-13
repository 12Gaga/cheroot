import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { date, exitGarageId, enterenceGarageId, typeOfLabelId, bandle } =
      req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      date &&
      enterenceGarageId &&
      exitGarageId &&
      typeOfLabelId &&
      bandle != undefined;
    if (!isValid) return res.status(405).send("bad request");

    const newLabelTransfer = await prisma.labelTransferGarage.create({
      data: {
        date,
        enterenceGarageId,
        exitGarageId,
        typeOfLabelId,
        bandle,
        workShopId,
      },
    });
    return res.status(200).json({ newLabelTransfer });
  } else if (method === "PUT") {
    const { date, exitGarageId, enterenceGarageId, typeOfLabelId, bandle, id } =
      req.body;
    const isValid =
      date &&
      enterenceGarageId &&
      exitGarageId &&
      typeOfLabelId &&
      bandle != undefined &&
      id;
    if (!isValid) return res.status(405).send("bad request");
    const updateLabelTransfer = await prisma.labelTransferGarage.update({
      where: { id },
      data: { date, enterenceGarageId, exitGarageId, typeOfLabelId, bandle },
    });
    return res.status(200).json({ updateLabelTransfer });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.labelTransferGarage.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
