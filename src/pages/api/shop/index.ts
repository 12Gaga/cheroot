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
    const { name, shopTitleId } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid = name && shopTitleId;
    if (!isValid) return res.status(405).send("bad request");

    const newShop = await prisma.typeOfShop.create({
      data: { name, workShopId, shopTitleId },
    });
    return res.status(200).json({ newShop });
  } else if (method === "PUT") {
    const { name, id, shopTitleId } = req.body;
    const isValid = name && id && shopTitleId;
    if (!isValid) return res.status(405).send("bad request");
    const updateShop = await prisma.typeOfShop.update({
      where: { id },
      data: { name, shopTitleId },
    });
    return res.status(200).json({ updateShop });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.typeOfShop.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
