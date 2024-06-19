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
    // create shopTilte
    const newShopTitleName = "ဆိုင်ခေါင်းစဉ်၁";
    const newShopTitle = await prisma.shopTitle.create({
      data: { name: newShopTitleName, workShopId: newWorkShop.id },
    });
    //10. create shop
    const newShopName = "ဆိုင်၁";
    const newShop = await prisma.typeOfShop.create({
      data: {
        name: newShopName,
        workShopId: newWorkShop.id,
        shopTitleId: newShopTitle.id,
      },
    });
    //11. create plastic
    const newPlasticName = "ပလပ်စတစ်၁";
    const newPlastic = await prisma.typeOfPlastic.create({
      data: { name: newPlasticName, workShopId: newWorkShop.id },
    });
    // 12. create store
    const newStoreName = "သိုလှောင်ရုံ၁";
    const newStore = await prisma.store.create({
      data: { name: newStoreName, cigratteIndustryId: newIndustry.id },
    });
    //13. create banquet
    const newBanquetName = "ပွဲရုံ၁";
    const newBanquet = await prisma.banquet.create({
      data: { name: newBanquetName, cigratteIndustryId: newIndustry.id },
    });
    //14. create typeOfPacking
    const newTypeOfPackingName = "ပါကင်၁";
    const newTypeOfPacking = await prisma.typeOfPacking.create({
      data: {
        name: newTypeOfPackingName,
        typeOfCherootId: newCheroot.id,
        workShopId: newWorkShop.id,
      },
    });
    //15. create formOfPacking
    const newFormOfPackingName = "ထုပ်ပိုးမှု၁";
    const newFormOfPacking = await prisma.formOfPacking.create({
      data: {
        name: newFormOfPackingName,
        typeOfCherootId: newCheroot.id,
        typeOfPackingId: newTypeOfPacking.id,
        cherootQty: 0,
        packingPlasticId: newPlastic.id,
        warpingPlasticId: newPlastic.id,
        coverPlasticId: newPlastic.id,
        workShopId: newWorkShop.id,
      },
    });
    //16. create conveyLocation
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
      shop: newShop,
      plastic: newPlastic,
      store: newStore,
      banquet: newBanquet,
      shopTitle: newShopTitle,
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
    //17. find plasticStock
    const plasticStock = await prisma.plastic.findMany({
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
    //20. find payLeaf
    const payLeaf = await prisma.payLeaf.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //21. find payStock
    const payStock = await prisma.payOtherItem.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //22. returnCheroot
    const returnCheroot = await prisma.returnReadyCheroot.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //23. leafDeduction
    const leafDeduction = await prisma.leafDeduction.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //24. otherDeduction
    const otherDeduction = await prisma.otherDeduction.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //25. extraPurchase
    const extraPurchase = await prisma.extraPurchase.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //26. find shop
    const shop = await prisma.typeOfShop.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //27. find plastic
    const plastic = await prisma.typeOfPlastic.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //28. find store
    const store = await prisma.store.findMany({
      where: { cigratteIndustryId, isArchived: false },
    });
    //29. find banquet
    const banquet = await prisma.banquet.findMany({
      where: { cigratteIndustryId, isArchived: false },
    });
    //30. find expensiveLabel
    const expensiveLabel = await prisma.expensiveLabel.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //31. find dailyExpensive
    const dailyExpensive = await prisma.dailyExpensive.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //32. find mainMoney
    const mainMoney = await prisma.mainMoney.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //33. find directPayment
    const directPayment = await prisma.mainDirectPayment.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //34. find replenishment
    const replenishment = await prisma.replenishmentMoney.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //35. find mainClosing
    const mainClosing = await prisma.closingMainBalance.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //36. find dailyClosing
    const dailyClosing = await prisma.closingDailyBalance.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //37. find leafTransfer
    const leafTransfer = await prisma.leafTransferGarage.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //38. find filterSizeTransfer
    const filterSizeTransfer = await prisma.filterSizeTransferGarage.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //39. find tabaccoTransfer
    const tabaccoTransfer = await prisma.tabaccoTransferGarage.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //40. find labelTransfer
    const labelTransfer = await prisma.labelTransferGarage.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //41. find bagoLeaf
    const bagoLeaf = await prisma.bagoLeafPurchase.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //42. find bagoFilterSize
    const bagoFilterSize = await prisma.bagoFilterSizePurchase.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //43. find bagoLabel
    const bagoLabel = await prisma.bagoLabelPurchase.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //44. find bagoPlastic
    const bagoPlastic = await prisma.bagoPlasticPurchase.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //45. find taungyiEnterStock
    const taungyiEnterStock = await prisma.taungyiEnterStock.findMany({
      where: { cigratteIndustryId, isArchived: false },
    });
    //46. find taungyiExitStock
    const taungyiExitStock = await prisma.taungyiQuitStock.findMany({
      where: { cigratteIndustryId, isArchived: false },
    });
    //47. find bagoLeafInstallment
    const bagoLeafInstallment = await prisma.bagoLeafInstallment.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //48. find bagoFilterSizeInstallment
    const bagoFilterSizeInstallment =
      await prisma.bagoFilterSizeInstallment.findMany({
        where: { workShopId: { in: workShopIds }, isArchived: false },
      });
    //49. find bagoLabelInstallment
    const bagoLabelInstallment = await prisma.bagoLabelInstallment.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //50. find bagoPlasticInstallment
    const bagoPlasticInstallment = await prisma.bagoPlasticInstallment.findMany(
      {
        where: { workShopId: { in: workShopIds }, isArchived: false },
      }
    );
    //51. find taungyiInstallment
    const taungyiInstallment = await prisma.taungyiInstallment.findMany({
      where: { cigratteIndustryId, isArchived: false },
    });
    //52. find cherootInstallment
    const cherootInstallment = await prisma.converycherootInstallment.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //53. find cherootTransfer
    const cherootTransfer = await prisma.conveying.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //54. find packingData
    const packingData = await prisma.packing.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //55. find agentRemainLeaf
    const agentReaminLeaf = await prisma.agentRemineLeaf.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //56. find shopTitle
    const shopTitle = await prisma.shopTitle.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //57. find agentRemainCash
    const agentRemainCash = await prisma.agentRemainCash.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //58. find extraPurchaseSummary
    const extraPurchaseSummary = await prisma.extraPurchaseSummery.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //59. find agentRemainFilterSize
    const agentRemainFilterSize = await prisma.agentLeftFilterSize.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //60. find agentRemainTabacco
    const agentRemainTabacco = await prisma.agentLeftTabacco.findMany({
      where: { workShopId: { in: workShopIds }, isArchived: false },
    });
    //61. find agentRemainLabel
    const agentRemainLabel = await prisma.agentLeftLabel.findMany({
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
      plasticStock,
      addStock,
      formula,
      payLeaf,
      payStock,
      returnCheroot,
      leafDeduction,
      otherDeduction,
      extraPurchase,
      shop,
      plastic,
      store,
      banquet,
      expensiveLabel,
      dailyExpensive,
      mainMoney,
      directPayment,
      replenishment,
      mainClosing,
      dailyClosing,
      leafTransfer,
      filterSizeTransfer,
      tabaccoTransfer,
      labelTransfer,
      bagoLeaf,
      bagoFilterSize,
      bagoLabel,
      bagoPlastic,
      taungyiEnterStock,
      taungyiExitStock,
      bagoLeafInstallment,
      bagoFilterSizeInstallment,
      bagoLabelInstallment,
      bagoPlasticInstallment,
      taungyiInstallment,
      cherootInstallment,
      cherootTransfer,
      packingData,
      agentReaminLeaf,
      agentRemainCash,
      shopTitle,
      extraPurchaseSummary,
      agentRemainFilterSize,
      agentRemainTabacco,
      agentRemainLabel,
    });
  }
}
