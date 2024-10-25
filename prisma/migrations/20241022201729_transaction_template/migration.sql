/*
  Warnings:

  - You are about to drop the column `companyId` on the `PointTransactionTemplate` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PointTransactionTemplate" DROP CONSTRAINT "PointTransactionTemplate_companyId_fkey";

-- AlterTable
ALTER TABLE "PointTransactionTemplate" DROP COLUMN "companyId";
