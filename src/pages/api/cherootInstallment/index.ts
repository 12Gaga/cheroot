import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { date, conveyLocationId, cashBalance, payBalance } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      date &&
      conveyLocationId &&
      cashBalance != undefined &&
      payBalance != undefined;
    if (!isValid) return res.status(405).send("bad request");

    const addCherootInstallment = await prisma.converycherootInstallment.create(
      {
        data: { date, conveyLocationId, cashBalance, payBalance, workShopId },
      }
    );
    return res.status(200).json({ addCherootInstallment });
  } else if (method === "PUT") {
    const { date, conveyLocationId, cashBalance, payBalance, id } = req.body;
    const isValid =
      date &&
      conveyLocationId &&
      cashBalance != undefined &&
      payBalance != undefined &&
      id;
    if (!isValid) return res.status(405).send("bad request");
    const updateCherootInstallment =
      await prisma.converycherootInstallment.update({
        where: { id },
        data: { date, conveyLocationId, cashBalance, payBalance },
      });
    return res.status(200).json({ updateCherootInstallment });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.converycherootInstallment.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
