import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { date, amount, tilte } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid = date && amount != undefined && tilte;
    if (!isValid) return res.status(405).send("bad request");

    const addDirectPayment = await prisma.mainDirectPayment.create({
      data: { date, amount, tilte, workShopId },
    });
    return res.status(200).json({ addDirectPayment });
  } else if (method === "PUT") {
    const { date, amount, tilte, id } = req.body;
    const isValid = date && amount != undefined && tilte && id;
    if (!isValid) return res.status(405).send("bad request");
    const updateDirectPayment = await prisma.mainDirectPayment.update({
      where: { id },
      data: { date, amount, tilte },
    });
    return res.status(200).json({ updateDirectPayment });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.mainDirectPayment.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
