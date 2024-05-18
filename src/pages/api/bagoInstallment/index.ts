import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { date, shopId, cashBalance, payBalance } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      date && shopId && cashBalance != undefined && payBalance != undefined;
    if (!isValid) return res.status(405).send("bad request");

    const addBagoInstallment = await prisma.bagoInstallment.create({
      data: { date, shopId, cashBalance, payBalance, workShopId },
    });
    return res.status(200).json({ addBagoInstallment });
  } else if (method === "PUT") {
    const { date, shopId, cashBalance, payBalance, id } = req.body;
    const isValid =
      date &&
      shopId &&
      cashBalance != undefined &&
      payBalance != undefined &&
      id;
    if (!isValid) return res.status(405).send("bad request");
    const updateBagoInstallment = await prisma.bagoInstallment.update({
      where: { id },
      data: { date, shopId, cashBalance, payBalance },
    });
    return res.status(200).json({ updateBagoInstallment });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.bagoInstallment.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
