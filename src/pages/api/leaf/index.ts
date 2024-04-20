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

    const newLeaf = await prisma.typeOfLeaf.create({
      data: { name, price, workShopId },
    });
    return res.status(200).json({ newLeaf });
  }
  res.status(200).json("bad request");
}
