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
    const { date, shopId, plasticId, quantity, bag, totalPrice } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      date &&
      shopId &&
      plasticId &&
      quantity != undefined &&
      bag != undefined &&
      totalPrice != undefined;
    if (!isValid) return res.status(405).send("bad request");

    const newBagoPlastic = await prisma.bagoPlasticPurchase.create({
      data: {
        date,
        shopId,
        plasticId,
        quantity,
        bag,
        totalPrice,
        cashBalance: totalPrice,
        workShopId,
      },
    });
    return res.status(200).json({ newBagoPlastic });
  } else if (method === "PUT") {
    const { date, shopId, plasticId, quantity, bag, totalPrice, id } = req.body;
    const isValid =
      date &&
      shopId &&
      plasticId &&
      quantity != undefined &&
      bag != undefined &&
      totalPrice != undefined &&
      id;
    if (!isValid) return res.status(405).send("bad request");
    const updateBagoPlastic = await prisma.bagoPlasticPurchase.update({
      where: { id },
      data: {
        date,
        shopId,
        plasticId,
        quantity,
        bag,
        totalPrice,
        cashBalance: totalPrice,
      },
    });
    return res.status(200).json({ updateBagoPlastic });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.bagoPlasticPurchase.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
