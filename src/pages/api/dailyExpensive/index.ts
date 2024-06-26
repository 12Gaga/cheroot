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
    const { date, amount, content, expensiveLabelId } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid = date && amount != undefined && content && expensiveLabelId;
    if (!isValid) return res.status(405).send("bad request");

    const addDailyExpensive = await prisma.dailyExpensive.create({
      data: { date, expensiveLabelId, content, amount, workShopId },
    });
    return res.status(200).json({ addDailyExpensive });
  } else if (method === "PUT") {
    const { date, amount, content, expensiveLabelId, id } = req.body;
    const isValid =
      date && amount != undefined && content && expensiveLabelId && id;
    if (!isValid) return res.status(405).send("bad request");
    const updateDailyExpensive = await prisma.dailyExpensive.update({
      where: { id },
      data: { date, amount, expensiveLabelId, content },
    });
    return res.status(200).json({ updateDailyExpensive });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.dailyExpensive.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
