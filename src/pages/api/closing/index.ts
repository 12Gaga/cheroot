import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
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
