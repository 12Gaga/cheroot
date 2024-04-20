import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { name } = req.body;
    const cigratteIndustryId = Number(req.query.cigratteIndustryId);

    const isValid = name;
    if (!isValid) return res.status(405).send("bad request");

    const newWorkShop = await prisma.workShop.create({
      data: { name, cigratteIndustryId },
    });
    return res.status(200).json({ newWorkShop });
  }
  res.status(200).json("bad request");
}
