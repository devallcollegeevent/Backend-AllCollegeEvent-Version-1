/*
  Warnings:

  - Added the required column `org_cat` to the `Org` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org_name` to the `Org` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Org" ADD COLUMN     "org_cat" TEXT NOT NULL,
ADD COLUMN     "org_name" TEXT NOT NULL;
