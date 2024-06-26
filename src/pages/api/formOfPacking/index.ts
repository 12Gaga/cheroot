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
      name,
      typeOfCherootId,
      typeOfPackingId,
      packingPlasticId,
      packingQty,
      warppingPlasticId,
      warppingQty,
      coverPlasticId,
      coverQty,
      amount,
      quantity,
    } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      name &&
      typeOfCherootId &&
      typeOfPackingId &&
      packingPlasticId &&
      packingQty != undefined &&
      warppingPlasticId &&
      warppingQty != undefined &&
      coverPlasticId &&
      coverQty != undefined &&
      amount != undefined &&
      quantity != undefined;
    if (!isValid) return res.status(405).send("bad requestsss");

    const newFormOfPacking = await prisma.formOfPacking.create({
      data: {
        name,
        typeOfCherootId,
        typeOfPackingId,
        packingPlasticId,
        packingPlasticQty: packingQty,
        warpingPlasticId: warppingPlasticId,
        warpingPlasticQty: warppingQty,
        coverPlasticId,
        coverPlasticQty: coverQty,
        cherootQty: quantity,
        amount,
        workShopId,
      },
    });
    return res.status(200).json({ newFormOfPacking });
  } else if (method === "PUT") {
    const {
      id,
      name,
      typeOfCherootId,
      typeOfPackingId,
      packingPlasticId,
      packingQty,
      warppingPlasticId,
      warppingQty,
      coverPlasticId,
      coverQty,
      amount,
      quantity,
    } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      id &&
      name &&
      typeOfCherootId &&
      typeOfPackingId &&
      packingPlasticId &&
      packingQty != undefined &&
      warppingPlasticId &&
      warppingQty != undefined &&
      coverPlasticId &&
      coverQty != undefined &&
      amount != undefined &&
      quantity != undefined;
    if (!isValid) return res.status(405).send("bad requestsss");

    const updateFormOfPacking = await prisma.formOfPacking.update({
      where: { id },
      data: {
        name,
        typeOfCherootId,
        typeOfPackingId,
        packingPlasticId,
        packingPlasticQty: packingQty,
        warpingPlasticId: warppingPlasticId,
        warpingPlasticQty: warppingQty,
        coverPlasticId,
        coverPlasticQty: coverQty,
        cherootQty: quantity,
        amount,
        workShopId,
      },
    });
    return res.status(200).json({ updateFormOfPacking });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.formOfPacking.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
