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

    const newConveyLocation = await prisma.conveyLocation.create({
      data: { name, workShopId },
    });
    return res.status(200).json({ newConveyLocation });
  } else if (method === "PUT") {
    const { name, id } = req.body;
    const isValid = name && id;
    if (!isValid) return res.status(405).send("bad request");
    const updateLocation = await prisma.conveyLocation.update({
      where: { id },
      data: { name },
    });
    return res.status(200).json({ updateLocation });
  }
  res.status(200).json("bad request");
}
