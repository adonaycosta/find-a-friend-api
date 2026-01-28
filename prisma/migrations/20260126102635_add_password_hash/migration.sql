/*
  Warnings:

  - Added the required column `password_hash` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `orgs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "password_hash" TEXT NOT NULL,
ALTER COLUMN "email" SET NOT NULL;
