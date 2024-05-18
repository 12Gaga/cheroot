/*
  Warnings:

  - You are about to drop the column `typeOfCherootId` on the `ConverycherootInstallment` table. All the data in the column will be lost.
  - Added the required column `stockSeq` to the `AddStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockSeq` to the `FilterSize` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockSeq` to the `Label` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockSeq` to the `Leaf` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transferSeq` to the `LeafTransferGarage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockSeq` to the `Plastic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockSeq` to the `Tabacco` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ConverycherootInstallment" DROP CONSTRAINT "ConverycherootInstallment_typeOfCherootId_fkey";

-- AlterTable
ALTER TABLE "AddStock" ADD COLUMN     "stockSeq" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ConverycherootInstallment" DROP COLUMN "typeOfCherootId";

-- AlterTable
ALTER TABLE "FilterSize" ADD COLUMN     "stockSeq" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Label" ADD COLUMN     "stockSeq" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Leaf" ADD COLUMN     "stockSeq" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LeafTransferGarage" ADD COLUMN     "transferSeq" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Plastic" ADD COLUMN     "stockSeq" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tabacco" ADD COLUMN     "stockSeq" TEXT NOT NULL;
