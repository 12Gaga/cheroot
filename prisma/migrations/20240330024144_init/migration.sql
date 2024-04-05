-- CreateTable
CREATE TABLE "AgentName" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNo" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "cashBalanceBig" DOUBLE PRECISION NOT NULL,
    "cashBalanceSmall" DOUBLE PRECISION NOT NULL,
    "fiveTaMat" DOUBLE PRECISION NOT NULL,
    "fourWar" DOUBLE PRECISION NOT NULL,
    "twoLateWar" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AgentName_pkey" PRIMARY KEY ("id")
);
