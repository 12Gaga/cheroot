// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(402).send("Unauthorized");
  const user = session.user;
  const name = user?.name as string;
  const email = user?.email as string;
  const dbUser = await prisma.user.findUnique({ where: { email } });
  if (!dbUser) {
    //1.create industry
    const newIndustryName = "ဆေးလိပ်ခုံ၁";
    const newIndustryAddress = "တောင်ငူ";
    const newIndustry = await prisma.cigratteIndustry.create({
      data: { name: newIndustryName, address: newIndustryAddress },
    });
    //2.create user
    const newUser = await prisma.user.create({
      data: { name, email, cigratteIndustryId: newIndustry.id },
    });
    //3.create workShop
    const newWorkShopName = "အလုပ်ရုံ၁";
    const newWorkShop = await prisma.workShop.create({
      data: { name: newWorkShopName, cigratteIndustryId: newIndustry.id },
    });
    //4.create garage
    const newGarageNameOne = "ဂိုထောင်၁";
    const newGarageNameTwo = "ဂိုထောင်၂";
    const newGarageNames = [
      { name: newGarageNameOne, workShopId: newWorkShop.id },
      { name: newGarageNameTwo, workShopId: newWorkShop.id },
    ];
    const newGarage = await prisma.$transaction(
      newGarageNames.map((item) => prisma.garage.create({ data: item }))
    );
    //5.create leaf
    const newLeafName = "ဖက်၁";
    const newLeaf = await prisma.typeOfLeaf.create({
      data: { name: newLeafName, workShopId: newWorkShop.id },
    });
    //6.create filterSize
    const newFilterSizeName = "အစီခံ၁";
    const newFilterSize = await prisma.typeOfFilterSize.create({
      data: { name: newFilterSizeName, workShopId: newWorkShop.id },
    });
    //7.create tabacco
    const newTabaccoName = "ဆေးစပ်၁";
    const newTabacco = await prisma.typeOfTabacco.create({
      data: { name: newTabaccoName, workShopId: newWorkShop.id },
    });
    //8.create label
    const newLabelName = "တံဆိပ်၁";
    const newLabel = await prisma.typeOfLabel.create({
      data: { name: newLabelName, workShopId: newWorkShop.id },
    });
    //9.create cheroot
    const newCherootName = "ဆေးလိပ်၁";
    const newCheroot = await prisma.typeOfCheroot.create({
      data: { name: newCherootName, workShopId: newWorkShop.id },
    });
    //10. crate typeOfPacking
    const newTypeOfPackingName = "ပါကင်၁";
    const newTypeOfPacking = await prisma.typeOfPacking.create({
      data: {
        name: newTypeOfPackingName,
        typeOfCherootId: newCheroot.id,
        workShopId: newWorkShop.id,
      },
    });
    //11. create formOfPacking
    const newFormOfPackingName = "ထုပ်ပိုးမှု၁";
    const newFormOfPacking = await prisma.formOfPacking.create({
      data: {
        name: newFormOfPackingName,
        typeOfCherootId: newCheroot.id,
        typeOfPackingId: newTypeOfPacking.id,
        quantity: 0,
        workShopId: newWorkShop.id,
      },
    });
    //12. create conveyLocation
    const newConveyLocationName = "နေရာ၁";
    const newConveyLocation = await prisma.conveyLocation.create({
      data: { name: newConveyLocationName, workShopId: newWorkShop.id },
    });
    return res.json({
      industry: newIndustry,
      workShop: newWorkShop,
      garage: newGarage,
      leaf: newLeaf,
      filterSize: newFilterSize,
      tabacco: newTabacco,
      label: newLabel,
      cheroot: newCheroot,
      typeOfPacking: newTypeOfPacking,
      formOfPacking: newFormOfPacking,
      conveyLocation: newConveyLocation,
    });
  } else {
    //get cigratteIndustry Id from dbuser
    const cigratteIndustryId = dbUser.cigratteIndustryId;
    //1.find industry
    const industry = await prisma.cigratteIndustry.findFirst({
      where: { id: cigratteIndustryId },
    });
    //2.find workShop
    const workShop = await prisma.workShop.findMany({
      where: { cigratteIndustryId, isArchived: false },
    });
    //find workShopIds
    const workShopIds = workShop.map((item) => item.id);
    //3.Garage
    const garage = await prisma.garage.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //find garageIds
    const garageIds = garage.map((item) => item.id);
    //4.find leaf
    const leaf = await prisma.typeOfLeaf.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //5.find filterSize
    const filterSize = await prisma.typeOfFilterSize.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //6.find tabacco
    const tabacco = await prisma.typeOfTabacco.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //7.find label
    const label = await prisma.typeOfLabel.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //8. find cheroot
    const cheroot = await prisma.typeOfCheroot.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //9. find typeOfPacking
    const typeOfPacking = await prisma.typeOfPacking.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //10. find formOfPacking
    const formOfPacking = await prisma.formOfPacking.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //11. find converyLocation
    const conveyLocation = await prisma.conveyLocation.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //12. find agent
    const agent = await prisma.agent.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //13. find agentLeafViss
    const agentLeafViss = await prisma.agentLeafViss.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //14. find leafStock
    const leafStock = await prisma.leaf.findMany({
      where: { garageId: { in: garageIds }, isArchived: false },
    });
    //15. find filterSizeStock
    const filterSizeStock = await prisma.filterSize.findMany({
      where: { garageId: { in: garageIds }, isArchived: false },
    });
    //16. find tabaccoStock
    const tabaccoStock = await prisma.tabacco.findMany({
      where: { garageId: { in: garageIds }, isArchived: false },
    });
    //17. find labelStock
    const labelStock = await prisma.label.findMany({
      where: { garageId: { in: garageIds }, isArchived: false },
    });
    //18. find addStock
    const addStock = await prisma.addStock.findMany({
      where: { garageId: { in: garageIds }, isArchived: false },
    });
    //19. find formula
    const formula = await prisma.formula.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    return res.json({
      industry,
      workShop,
      garage,
      leaf,
      filterSize,
      tabacco,
      label,
      cheroot,
      typeOfPacking,
      formOfPacking,
      conveyLocation,
      agent,
      agentLeafViss,
      leafStock,
      filterSizeStock,
      tabaccoStock,
      labelStock,
      addStock,
      formula,
    });
  }
}
