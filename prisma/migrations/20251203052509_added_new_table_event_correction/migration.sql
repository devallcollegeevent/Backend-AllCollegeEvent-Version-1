-- DropIndex
DROP INDEX "Event_slug_key";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "slug" DROP NOT NULL;
