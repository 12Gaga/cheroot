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
      typeOfCherootId,
      typeOfPackingId,
      formOfPackingId,
      packingPlasticId,
      packingPlasticQty,
      warpingPlasticId,
      warpingPlasticQty,
      coverPlasticId,
      coverPlasticQty,
      quantity,
      garageId,
    } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      date &&
      typeOfCherootId &&
      typeOfPackingId &&
      packingPlasticId &&
      garageId &&
      packingPlasticQty != undefined &&
      warpingPlasticId &&
      warpingPlasticQty != undefined &&
      coverPlasticId &&
      coverPlasticQty != undefined &&
      formOfPackingId &&
      quantity != undefined;
    if (!isValid) return res.status(405).send("bad requestsss");

    const addPackingData = await prisma.packing.create({
      data: {
        date,
        typeOfCherootId,
        typeOfPackingId,
        formOfPackingId,
        garageId,
        packingPlasticId,
        packingPlasticQty,
        warpingPlasticId,
        warpingPlasticQty,
        coverPlasticId,
        coverPlasticQty,
        quantity,
        workShopId,
      },
    });
    return res.status(200).json({ addPackingData });
  } else if (method === "PUT") {
    const {
      id,
      date,
      typeOfCherootId,
      typeOfPackingId,
      formOfPackingId,
      packingPlasticId,
      packingPlasticQty,
      warpingPlasticId,
      warpingPlasticQty,
      coverPlasticId,
      coverPlasticQty,
      quantity,
      garageId,
    } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      id &&
      date &&
      typeOfCherootId &&
      typeOfPackingId &&
      packingPlasticId &&
      garageId &&
      packingPlasticQty != undefined &&
      warpingPlasticId &&
      warpingPlasticQty != undefined &&
      coverPlasticId &&
      coverPlasticQty != undefined &&
      formOfPackingId &&
      quantity != undefined;
    if (!isValid) return res.status(405).send("bad requestsss");

    const updatePackingData = await prisma.packing.update({
      where: { id },
      data: {
        date,
        garageId,
        typeOfCherootId,
        typeOfPackingId,
        formOfPackingId,
        packingPlasticId,
        packingPlasticQty,
        warpingPlasticId,
        warpingPlasticQty,
        coverPlasticId,
        coverPlasticQty,
        quantity,
      },
    });
    return res.status(200).json({ updatePackingData });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    await prisma.packing.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send("ok");
  }
  res.status(400).json("bad request");
}
