import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { name } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid = name;
    if (!isValid) return res.status(405).send("bad request");

    const newShopTitle = await prisma.shopTitle.create({
      data: { name, workShopId },
    });
    return res.status(200).json({ newShopTitle });
  } else if (method === "PUT") {
    const { name, id } = req.body;
    const isValid = name && id;
    if (!isValid) return res.status(405).send("bad request");
    const updateShopTitle = await prisma.shopTitle.update({
      where: { id },
      data: { name },
    });
    return res.status(200).json({ updateShopTitle });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.shopTitle.update({
      data: { isArchived: true },
      where: { id },
    });
    await prisma.typeOfShop.updateMany({
      data: { isArchived: true },
      where: { shopTitleId: id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
