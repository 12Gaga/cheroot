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
    console.log("cigratteIndustryId", cigratteIndustryId);
    const isValid = name;
    if (!isValid) return res.status(405).send("bad request");

    const newBanquet = await prisma.banquet.create({
      data: { name, cigratteIndustryId },
    });
    return res.status(200).json({ newBanquet });
  }
  res.status(200).json("bad request");
}
