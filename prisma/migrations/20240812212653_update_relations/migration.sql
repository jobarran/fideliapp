/*
  Warnings:

  - You are about to drop the column `activityTypeId` on the `SubCategory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_activityTypeId_fkey";

-- AlterTable
ALTER TABLE "ActivityType" ADD COLUMN     "subCategoryId" TEXT;

-- AlterTable
ALTER TABLE "SubCategory" DROP COLUMN "activityTypeId";

-- AddForeignKey
ALTER TABLE "ActivityType" ADD CONSTRAINT "ActivityType_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
