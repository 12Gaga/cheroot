import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { name, workShopId } = req.body;

    const isValid = name;
    if (!isValid) return res.status(405).send("bad request");

    const newGarage = await prisma.garage.create({
      data: { name, workShopId },
    });
    return res.status(200).json({ newGarage });
  } else if (method === "PUT") {
    const { name, id } = req.body;
    const isValid = name && id;
    if (!isValid) return res.status(405).send("bad request");
    const updateGarage = await prisma.garage.update({
      where: { id },
      data: { name },
    });
    return res.status(200).json({ updateGarage });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.garage.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
