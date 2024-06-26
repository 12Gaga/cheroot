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
    const { date, banquetId, cashBalance, payBalance } = req.body;
    const cigratteIndustryId = Number(req.query.cigratteIndustryId);
    const isValid =
      date && banquetId && cashBalance != undefined && payBalance != undefined;
    if (!isValid) return res.status(405).send("bad request");

    const addTaungyiInstallment = await prisma.taungyiInstallment.create({
      data: { date, banquetId, cashBalance, payBalance, cigratteIndustryId },
    });
    return res.status(200).json({ addTaungyiInstallment });
  } else if (method === "PUT") {
    const { date, banquetId, cashBalance, payBalance, id } = req.body;
    const isValid =
      date &&
      banquetId &&
      cashBalance != undefined &&
      payBalance != undefined &&
      id;
    if (!isValid) return res.status(405).send("bad request");
    const updateTaungyiInstallment = await prisma.taungyiInstallment.update({
      where: { id },
      data: { date, banquetId, cashBalance, payBalance },
    });
    return res.status(200).json({ updateTaungyiInstallment });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.taungyiInstallment.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
