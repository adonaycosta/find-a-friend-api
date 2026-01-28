/*
  Warnings:

  - You are about to drop the column `addressId` on the `orgs` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "orgs_addressId_key";

-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "addressId";
