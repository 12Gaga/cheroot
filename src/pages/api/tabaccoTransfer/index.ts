import { prisma } from "@/utils/db";
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
      exitGarageId,
      enterenceGarageId,
      typeOfTabaccoId,
      tin,
      pyi,
      bag,
    } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      date &&
      exitGarageId &&
      enterenceGarageId &&
      typeOfTabaccoId &&
      tin != undefined &&
      pyi != undefined &&
      bag != undefined;
    if (!isValid) return res.status(405).send("bad request");

    const newTabaccoTransfer = await prisma.tabaccoTransferGarage.create({
      data: {
        date,
        exitGarageId,
        enterenceGarageId,
        typeOfTabaccoId,
        tin,
        pyi,
        bag,
        workShopId,
      },
    });
    return res.status(200).json({ newTabaccoTransfer });
  } else if (method === "PUT") {
    const {
      date,
      exitGarageId,
      enterenceGarageId,
      typeOfTabaccoId,
      tin,
      pyi,
      bag,
      id,
    } = req.body;
    const isValid =
      date &&
      exitGarageId &&
      enterenceGarageId &&
      typeOfTabaccoId &&
      tin != undefined &&
      pyi != undefined &&
      bag != undefined &&
      id;
    if (!isValid) return res.status(405).send("bad request");
    const updateTabaccoTransfer = await prisma.tabaccoTransferGarage.update({
      where: { id },
      data: {
        date,
        exitGarageId,
        enterenceGarageId,
        typeOfTabaccoId,
        tin,
        pyi,
        bag,
      },
    });
    return res.status(200).json({ updateTabaccoTransfer });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.tabaccoTransferGarage.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
