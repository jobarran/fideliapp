/*
  Warnings:

  - You are about to drop the column `userId` on the `CompanyReview` table. All the data in the column will be lost.
  - Added the required column `pointTransactionId` to the `CompanyReview` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CompanyReview" DROP CONSTRAINT "CompanyReview_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyReview" DROP CONSTRAINT "CompanyReview_userId_fkey";

-- DropIndex
DROP INDEX "CompanyReview_userId_companyId_idx";

-- AlterTable
ALTER TABLE "CompanyReview" DROP COLUMN "userId",
ADD COLUMN     "pointTransactionId" TEXT NOT NULL,
ALTER COLUMN "companyId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "CompanyReview_pointTransactionId_idx" ON "CompanyReview"("pointTransactionId");

-- AddForeignKey
ALTER TABLE "CompanyReview" ADD CONSTRAINT "CompanyReview_pointTransactionId_fkey" FOREIGN KEY ("pointTransactionId") REFERENCES "PointTransaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyReview" ADD CONSTRAINT "CompanyReview_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
