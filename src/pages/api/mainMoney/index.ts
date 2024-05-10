import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { date, amount, locationId } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid = date && amount != undefined && locationId;
    if (!isValid) return res.status(405).send("bad request");

    const addMainMoney = await prisma.mainMoney.create({
      data: { date, amount, locationId, workShopId },
    });
    return res.status(200).json({ addMainMoney });
  } else if (method === "PUT") {
    const { date, amount, locationId, id } = req.body;
    const isValid = date && amount != undefined && locationId && id;
    if (!isValid) return res.status(405).send("bad request");
    const updateMainMoney = await prisma.mainMoney.update({
      where: { id },
      data: { date, amount, locationId },
    });
    return res.status(200).json({ updateMainMoney });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.mainMoney.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
