/*
  Warnings:

  - You are about to drop the column `name` on the `Org` table. All the data in the column will be lost.
  - Made the column `city` on table `Org` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `Org` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `Org` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Org" DROP COLUMN "name",
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL;
