/*
  Warnings:

  - A unique constraint covering the columns `[pointTransactionId]` on the table `CompanyReview` will be added. If there are existing duplicate values, this will fail.
  - Made the column `companyId` on table `CompanyReview` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CompanyReview" DROP CONSTRAINT "CompanyReview_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyReview" DROP CONSTRAINT "CompanyReview_pointTransactionId_fkey";

-- AlterTable
ALTER TABLE "CompanyReview" ALTER COLUMN "companyId" SET NOT NULL;

-- AlterTable
ALTER TABLE "PointTransaction" ADD COLUMN     "companyReviewId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "CompanyReview_pointTransactionId_key" ON "CompanyReview"("pointTransactionId");

-- AddForeignKey
ALTER TABLE "CompanyReview" ADD CONSTRAINT "CompanyReview_pointTransactionId_fkey" FOREIGN KEY ("pointTransactionId") REFERENCES "PointTransaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyReview" ADD CONSTRAINT "CompanyReview_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
