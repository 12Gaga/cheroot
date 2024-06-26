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
    const { name } = req.body;
    const cigratteIndustryId = Number(req.query.cigratteIndustryId);

    const isValid = name;
    if (!isValid) return res.status(405).send("bad request");

    const newWorkShop = await prisma.workShop.create({
      data: { name, cigratteIndustryId },
    });
    return res.status(200).json({ newWorkShop });
  } else if (method === "PUT") {
    const { name, id } = req.body;
    const isValid = name && id;
    if (!isValid) return res.status(405).send("bad request");
    const updateWorkShop = await prisma.workShop.update({
      where: { id },
      data: { name },
    });
    return res.status(200).json({ updateWorkShop });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.workShop.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
