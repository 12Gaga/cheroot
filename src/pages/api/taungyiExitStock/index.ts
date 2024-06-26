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
    const { date, storeId, tolBatchNo, netWeight } = req.body;
    const cigratteIndustryId = Number(req.query.cigratteIndustryId);
    console.log("cigratteIndustryId", cigratteIndustryId);
    const isValid =
      date && storeId && tolBatchNo != undefined && netWeight != undefined;
    if (!isValid) return res.status(405).send("bad request");

    const newTaungyiExitStock = await prisma.taungyiQuitStock.create({
      data: { date, storeId, tolBatchNo, netWeight, cigratteIndustryId },
    });
    return res.status(200).json({ newTaungyiExitStock });
  } else if (method === "PUT") {
    const { date, storeId, tolBatchNo, netWeight, id } = req.body;
    const isValid =
      date &&
      storeId &&
      tolBatchNo != undefined &&
      netWeight != undefined &&
      id;
    if (!isValid) return res.status(405).send("bad request");
    const updateTaungyiExitStock = await prisma.taungyiQuitStock.update({
      where: { id },
      data: { date, storeId, tolBatchNo, netWeight },
    });
    return res.status(200).json({ updateTaungyiExitStock });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.taungyiQuitStock.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
