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
    const { name, price } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid = name && price != undefined;
    if (!isValid) return res.status(405).send("bad request");

    const newLabel = await prisma.typeOfLabel.create({
      data: { name, price, workShopId },
    });
    return res.status(200).json({ newLabel });
  } else if (method === "PUT") {
    const { name, price, id } = req.body;
    const isValid = name && price != undefined && id;
    if (!isValid) return res.status(405).send("bad request");
    const updateLabel = await prisma.typeOfLabel.update({
      where: { id },
      data: { name, price },
    });
    return res.status(200).json({ updateLabel });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.typeOfLabel.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
