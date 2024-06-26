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
    const { date, shopId, typeOfLabelId, bandle, totalPrice } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      date &&
      shopId &&
      typeOfLabelId &&
      bandle != undefined &&
      totalPrice != undefined;
    if (!isValid) return res.status(405).send("bad request");

    const newBagoLabel = await prisma.bagoLabelPurchase.create({
      data: {
        date,
        shopId,
        typeOfLabelId,
        bandle,
        totalPrice,
        cashBalance: totalPrice,
        workShopId,
      },
    });
    return res.status(200).json({ newBagoLabel });
  } else if (method === "PUT") {
    const { date, shopId, typeOfLabelId, bandle, totalPrice, id } = req.body;
    const isValid =
      date &&
      shopId &&
      typeOfLabelId &&
      bandle != undefined &&
      totalPrice != undefined &&
      id;
    if (!isValid) return res.status(405).send("bad request");
    const updateBagoLabel = await prisma.bagoLabelPurchase.update({
      where: { id },
      data: {
        date,
        shopId,
        typeOfLabelId,
        bandle,
        totalPrice,
        cashBalance: totalPrice,
      },
    });
    return res.status(200).json({ updateBagoLabel });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.bagoLabelPurchase.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
