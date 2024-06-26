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
    const { date, dailyClosing, mainClosing } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      dailyClosing != undefined && mainClosing != undefined && date;
    if (!isValid) return res.status(405).send("bad request");

    const dailyClosings = await prisma.closingDailyBalance.create({
      data: { date, amount: dailyClosing, workShopId },
    });

    const mainClosings = await prisma.closingMainBalance.create({
      data: { date, amount: mainClosing, workShopId },
    });

    return res.status(200).json({ dailyClosings, mainClosings });
  }
  res.status(400).json("bad request");
}
