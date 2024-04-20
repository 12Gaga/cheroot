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
  }
  res.status(200).json("bad request");
}
