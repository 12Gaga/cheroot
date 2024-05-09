import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { name, price } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid = name && price != undefined;
    if (!isValid) return res.status(405).send("bad request");

    const newFilterSize = await prisma.typeOfFilterSize.create({
      data: { name, price, workShopId },
    });
    return res.status(200).json({ newFilterSize });
  } else if (method === "PUT") {
    const { name, price, id } = req.body;
    const isValid = name && price != undefined && id;
    if (!isValid) return res.status(405).send("bad request");
    const updateFilterSize = await prisma.typeOfFilterSize.update({
      where: { id },
      data: { name, price },
    });
    return res.status(200).json({ updateFilterSize });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.typeOfFilterSize.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
