/*
  Warnings:

  - You are about to drop the column `companyId` on the `Pin` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pin" DROP CONSTRAINT "Pin_companyId_fkey";

-- DropIndex
DROP INDEX "Pin_userId_companyId_idx";

-- AlterTable
ALTER TABLE "Pin" DROP COLUMN "companyId";

-- CreateIndex
CREATE INDEX "Pin_userId_idx" ON "Pin"("userId");
