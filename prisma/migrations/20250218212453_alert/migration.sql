/*
  Warnings:

  - The `type` column on the `Alert` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AlertType" AS ENUM ('COMMENT_NEW', 'COMMENT_PENDING', 'VAR');

-- AlterTable
ALTER TABLE "Alert" DROP COLUMN "type",
ADD COLUMN     "type" "AlertType" NOT NULL DEFAULT 'VAR';
