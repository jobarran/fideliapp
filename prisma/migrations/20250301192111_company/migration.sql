/*
  Warnings:

  - You are about to drop the column `acceptReferral` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "acceptReferral",
ADD COLUMN     "description" TEXT;
