/*
  Warnings:

  - You are about to drop the column `batchNo` on the `FilterSizeTransferGarage` table. All the data in the column will be lost.
  - You are about to drop the column `batchNo` on the `LabelTransferGarage` table. All the data in the column will be lost.
  - You are about to drop the column `batchNo` on the `TabaccoTransferGarage` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `FilterSizeTransferGarage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bandle` to the `LabelTransferGarage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bag` to the `TabaccoTransferGarage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pyi` to the `TabaccoTransferGarage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tin` to the `TabaccoTransferGarage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FilterSizeTransferGarage" DROP COLUMN "batchNo",
ADD COLUMN     "bag" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LabelTransferGarage" DROP COLUMN "batchNo",
ADD COLUMN     "bandle" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LeafTransferGarage" ADD COLUMN     "totalViss" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "TabaccoTransferGarage" DROP COLUMN "batchNo",
ADD COLUMN     "bag" INTEGER NOT NULL,
ADD COLUMN     "pyi" INTEGER NOT NULL,
ADD COLUMN     "tin" INTEGER NOT NULL;
