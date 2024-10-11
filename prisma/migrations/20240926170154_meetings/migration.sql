-- CreateEnum
CREATE TYPE "MeetingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- AlterTable
ALTER TABLE "Meeting" ADD COLUMN     "reminder" INTEGER,
ADD COLUMN     "status" "MeetingStatus" NOT NULL DEFAULT 'PENDING';
