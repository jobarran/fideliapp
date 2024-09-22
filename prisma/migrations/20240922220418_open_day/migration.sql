/*
  Warnings:

  - You are about to drop the column `openDays` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `openHours` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "openDays",
DROP COLUMN "openHours";

-- CreateTable
CREATE TABLE "OpenDay" (
    "id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "OpenDay_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OpenDay" ADD CONSTRAINT "OpenDay_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
