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
    const {
      date,
      conveyLocationId,
      typeOfCherootId,
      typeOfPackingId,
      formOfPackingId,
      quantity,
      amount,
      totalPrice,
    } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      date &&
      conveyLocationId &&
      typeOfCherootId &&
      typeOfPackingId &&
      formOfPackingId &&
      quantity != undefined &&
      amount != undefined &&
      totalPrice != undefined;
    if (!isValid) return res.status(405).send("bad request");

    const addCherootTransfer = await prisma.conveying.create({
      data: {
        date,
        conveyLocationId,
        typeOfCherootId,
        typeOfPackingId,
        formOfPackingId,
        quantity,
        amount,
        totalPrice,
        workShopId,
      },
    });
    return res.status(200).json({ addCherootTransfer });
  } else if (method === "PUT") {
    const {
      date,
      conveyLocationId,
      typeOfCherootId,
      typeOfPackingId,
      formOfPackingId,
      quantity,
      amount,
      totalPrice,
      id,
    } = req.body;
    const isValid =
      date &&
      conveyLocationId &&
      typeOfCherootId &&
      typeOfPackingId &&
      formOfPackingId &&
      quantity != undefined &&
      amount != undefined &&
      totalPrice != undefined &&
      id;
    if (!isValid) return res.status(405).send("bad request");
    const updateCherootTransfer = await prisma.conveying.update({
      where: { id },
      data: {
        date,
        conveyLocationId,
        typeOfCherootId,
        typeOfPackingId,
        formOfPackingId,
        quantity,
        amount,
        totalPrice,
      },
    });
    return res.status(200).json({ updateCherootTransfer });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.conveying.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
