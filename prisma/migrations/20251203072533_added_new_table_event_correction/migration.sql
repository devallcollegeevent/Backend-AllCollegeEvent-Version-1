-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_created_by_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "userId" INTEGER,
ADD COLUMN     "venue" TEXT;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
