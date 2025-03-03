/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserPermission" AS ENUM ('NONE', 'TOTAL');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permission" "UserPermission" NOT NULL DEFAULT 'NONE';

-- DropTable
DROP TABLE "Admin";

-- DropEnum
DROP TYPE "AdminPermission";
