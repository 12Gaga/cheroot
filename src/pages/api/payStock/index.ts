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
      agentId,
      typeOfCherootId,
      cherootQty,
      typeOfFilterSizeId,
      filterSizeQty,
      filterSizeBag,
      typeOfTabaccoId,
      tabaccoQty,
      tabaccoTin,
      tabaccoPyi,
      tabaccoBag,
      typeOfLabelId,
      labelBandle,
      totalPrice,
      garageId,
    } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid =
      date &&
      agentId &&
      typeOfCherootId &&
      cherootQty != undefined &&
      typeOfFilterSizeId &&
      filterSizeQty != undefined &&
      filterSizeBag != undefined &&
      typeOfTabaccoId &&
      tabaccoQty != undefined &&
      tabaccoTin != undefined &&
      tabaccoPyi != undefined &&
      tabaccoBag != undefined &&
      typeOfLabelId &&
      labelBandle != undefined &&
      totalPrice != undefined &&
      garageId;
    if (!isValid) return res.status(405).send("bad request");
    //create payStocks
    const newPayStock = await prisma.payOtherItem.create({
      data: {
        date,
        agentId,
        typeOfCherootId,
        cherootQty,
        typeOfFilterSizeId,
        filterSizeQty,
        filterSizeBag,
        typeOfTabaccoId,
        tabaccoQty,
        tabaccoTin,
        tabaccoPyi,
        tabaccoBag,
        typeOfLabelId,
        labelBandle,
        totalPrice,
        garageId,
        workShopId,
      },
    });
    //remain filterSize
    const leftFilter = await prisma.agentLeftFilterSize.findFirst({
      where: { agentId, typeOfCherootId, typeOfFilterSizeId },
    });
    if (leftFilter) {
      const reduceQty = leftFilter.quantity + filterSizeQty;
      await prisma.agentLeftFilterSize.updateMany({
        where: { agentId, typeOfCherootId, typeOfFilterSizeId },
        data: { quantity: reduceQty },
      });
    }
    //remian Tabacco
    const leftTabacco = await prisma.agentLeftTabacco.findFirst({
      where: { agentId, typeOfCherootId, typeOfTabaccoId },
    });
    if (leftTabacco) {
      const tolLeftPyi = leftTabacco.tin * 16 + leftTabacco.pyi;
      const tolPyi = tabaccoTin * 16 + tabaccoPyi;
      const reduceTabacco = tolLeftPyi + tolPyi;
      const reduceTin = Math.floor(reduceTabacco / 16);
      const reducePyi = reduceTabacco % 16;
      await prisma.agentLeftTabacco.updateMany({
        where: { agentId, typeOfCherootId, typeOfTabaccoId },
        data: { tin: reduceTin, pyi: reducePyi },
      });
    }

    //remiain Label
    const leftLabel = await prisma.agentLeftLabel.findFirst({
      where: { agentId, typeOfCherootId, typeOfLabelId },
    });
    if (leftLabel) {
      const reduceBandle = leftLabel.bandle + labelBandle;
      await prisma.agentLeftLabel.updateMany({
        where: { agentId, typeOfCherootId, typeOfLabelId },
        data: { bandle: reduceBandle },
      });
    }
    return res.status(200).json({ newPayStock });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(405).send("bad request");
    const find = await prisma.payOtherItem.findFirst({ where: { id } });
    if (find) {
      //remain filterSize
      const leftFilter = await prisma.agentLeftFilterSize.findFirst({
        where: {
          agentId: find.agentId,
          typeOfCherootId: find.typeOfCherootId,
          typeOfFilterSizeId: find.typeOfFilterSizeId,
        },
      });
      if (leftFilter) {
        const reduceQty = leftFilter.quantity - find.filterSizeQty;
        await prisma.agentLeftFilterSize.updateMany({
          where: {
            agentId: find.agentId,
            typeOfCherootId: find.typeOfCherootId,
            typeOfFilterSizeId: find.typeOfFilterSizeId,
          },
          data: { quantity: reduceQty },
        });
      }
      //remian Tabacco
      const leftTabacco = await prisma.agentLeftTabacco.findFirst({
        where: {
          agentId: find.agentId,
          typeOfCherootId: find.typeOfCherootId,
          typeOfTabaccoId: find.typeOfTabaccoId,
        },
      });
      if (leftTabacco) {
        const tolLeftPyi = leftTabacco.tin * 16 + leftTabacco.pyi;
        const tolPyi = find.tabaccoTin * 16 + find.tabaccoPyi;
        const reduceTabacco = tolLeftPyi - tolPyi;
        const reduceTin = Math.floor(reduceTabacco / 16);
        const reducePyi = reduceTabacco % 16;
        await prisma.agentLeftTabacco.updateMany({
          where: {
            agentId: find.agentId,
            typeOfCherootId: find.typeOfCherootId,
            typeOfTabaccoId: find.typeOfTabaccoId,
          },
          data: { tin: reduceTin, pyi: reducePyi },
        });
      }

      //remiain Label
      const leftLabel = await prisma.agentLeftLabel.findFirst({
        where: {
          agentId: find.agentId,
          typeOfCherootId: find.typeOfCherootId,
          typeOfLabelId: find.typeOfLabelId,
        },
      });
      if (leftLabel) {
        const reduceBandle = leftLabel.bandle - find.labelBandle;
        await prisma.agentLeftLabel.updateMany({
          where: {
            agentId: find.agentId,
            typeOfCherootId: find.typeOfCherootId,
            typeOfLabelId: find.typeOfLabelId,
          },
          data: { bandle: reduceBandle },
        });
      }
    }
    //delete payStock
    await prisma.payOtherItem.update({
      where: { id },
      data: { isArchived: true },
    });
    return res.status(200).send("ok");
  }
  res.status(405).json("bad request");
}
