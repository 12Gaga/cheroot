import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { date, amount } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid = date && amount != undefined;
    if (!isValid) return res.status(405).send("bad request");

    const addDailyClosing = await prisma.closingDailyBalance.create({
      data: { date, amount, workShopId },
    });
    return res.status(200).json({ addDailyClosing });
  }
  // else if (method === "PUT") {
  //   const { date, amount, id } = req.body;
  //   const isValid = date && amount != undefined && id;
  //   if (!isValid) return res.status(405).send("bad request");
  //   const updateDailyClosing = await prisma.closingDailyBalance.update({
  //     where: { id },
  //     data: { date, amount },
  //   });
  //   return res.status(200).json({ updateDailyClosing });
  // } else if (method === "DELETE") {
  //   const id = Number(req.query.id);
  //   const isValid = id;
  //   if (!isValid) return res.status(405).send("bad request");
  //   await prisma.closingDailyBalance.update({
  //     data: { isArchived: true },
  //     where: { id },
  //   });
  //   return res.status(200).send("ok");
  // }
  res.status(400).json("bad request");
}
