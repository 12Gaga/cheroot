import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { name, typeOfCherootId } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid = name && typeOfCherootId;
    if (!isValid) return res.status(405).send("bad request");

    const newTypeOfPacking = await prisma.typeOfPacking.create({
      data: { name, typeOfCherootId, workShopId },
    });
    return res.status(200).json({ newTypeOfPacking });
  } else if (method === "PUT") {
    const { id, name, typeOfCherootId } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid = name && typeOfCherootId && id;
    if (!isValid) return res.status(405).send("bad request");

    const updateTypeOfPacking = await prisma.typeOfPacking.update({
      where: { id },
      data: { name, typeOfCherootId },
    });
    return res.status(200).json({ updateTypeOfPacking });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.typeOfPacking.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
