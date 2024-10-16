-- CreateEnum
CREATE TYPE "PrayerCategory" AS ENUM ('HEALING', 'GUIDANCE', 'PROVISION', 'RELATIONSHIPS', 'SPIRITUAL_GROWTH', 'COMMUNITY', 'WORLD_PEACE', 'PERSONAL', 'THANKSGIVING');

-- CreateEnum
CREATE TYPE "PrayerStatus" AS ENUM ('PENDING', 'ANSWERED', 'IGNORED', 'IN_PROGRESS');

-- CreateTable
CREATE TABLE "PrayerRequest" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "PrayerStatus" NOT NULL DEFAULT 'PENDING',
    "isAnswered" BOOLEAN NOT NULL DEFAULT false,
    "answeredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "memberId" TEXT NOT NULL,
    "category" "PrayerCategory" NOT NULL,

    CONSTRAINT "PrayerRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrayerRequestHistory" (
    "id" TEXT NOT NULL,
    "prayerRequestId" TEXT NOT NULL,
    "status" "PrayerStatus" NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PrayerRequestHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrayerStatistics" (
    "id" TEXT NOT NULL,
    "totalRequests" INTEGER NOT NULL DEFAULT 0,
    "answered" INTEGER NOT NULL DEFAULT 0,
    "notAnswered" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrayerStatistics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PrayerRequest" ADD CONSTRAINT "PrayerRequest_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrayerRequestHistory" ADD CONSTRAINT "PrayerRequestHistory_prayerRequestId_fkey" FOREIGN KEY ("prayerRequestId") REFERENCES "PrayerRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
