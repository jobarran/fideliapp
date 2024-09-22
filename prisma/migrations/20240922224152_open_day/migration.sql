/*
  Warnings:

  - You are about to drop the `OpenDay` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `openHours` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OpenDay" DROP CONSTRAINT "OpenDay_companyId_fkey";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "openHours" JSONB NOT NULL;

-- DropTable
DROP TABLE "OpenDay";
