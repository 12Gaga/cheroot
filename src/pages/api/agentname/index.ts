import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { name, phoneNo, address, cashBig, cashSmall } = req.body;
    const workShopId = Number(req.query.workShopId);
    console.log("workShopId", workShopId);
    const isValid = name && phoneNo && address && cashBig && cashSmall;
    if (!isValid) return res.status(405).send("bad request");

    const newAgent = await prisma.agent.create({
      data: {
        name,
        phoneNo,
        adderess: address,
        cashBalcanceBig: cashBig,
        cashBalcanceSmall: cashSmall,
        workShopId,
      },
    });
    return res.status(200).json({ newAgent });
  }
  res.status(200).json("bad request");
}
