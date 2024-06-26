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
      storeId,
      banquetId,
      tolBatchNo,
      netWeight,
      netPrice,
      tolNetPrice,
      packingFees,
      tolPackingFees,
      totalPrice,
    } = req.body;
    const cigratteIndustryId = Number(req.query.cigratteIndustryId);
    console.log("cigratteIndustryId", cigratteIndustryId);
    const isValid =
      date &&
      storeId &&
      banquetId &&
      tolBatchNo != undefined &&
      netWeight != undefined &&
      netPrice != undefined &&
      tolNetPrice != undefined &&
      packingFees != undefined &&
      tolPackingFees != undefined &&
      totalPrice != undefined;
    if (!isValid) return res.status(405).send("bad request");

    const newTaungyiEnterStock = await prisma.taungyiEnterStock.create({
      data: {
        date,
        storeId,
        banquetId,
        tolBatchNo,
        netWeight,
        netPrice,
        tolNetPrice,
        packingFees,
        tolPackingFees,
        totalPrice,
        cashBalance: totalPrice,
        cigratteIndustryId,
      },
    });
    return res.status(200).json({ newTaungyiEnterStock });
  } else if (method === "PUT") {
    const {
      date,
      storeId,
      banquetId,
      tolBatchNo,
      netWeight,
      netPrice,
      tolNetPrice,
      packingFees,
      tolPackingFees,
      totalPrice,
      id,
    } = req.body;
    const isValid =
      date &&
      storeId &&
      banquetId &&
      tolBatchNo != undefined &&
      netWeight != undefined &&
      netPrice != undefined &&
      tolNetPrice != undefined &&
      packingFees != undefined &&
      tolPackingFees != undefined &&
      totalPrice != undefined &&
      id;
    if (!isValid) return res.status(405).send("bad request");
    const updateTaungyiEnterStock = await prisma.taungyiEnterStock.update({
      where: { id },
      data: {
        date,
        storeId,
        banquetId,
        tolBatchNo,
        netWeight,
        netPrice,
        tolNetPrice,
        packingFees,
        tolPackingFees,
        totalPrice,
        cashBalance: totalPrice,
      },
    });
    return res.status(200).json({ updateTaungyiEnterStock });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.taungyiEnterStock.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
