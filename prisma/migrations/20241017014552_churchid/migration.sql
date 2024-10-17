/*
  Warnings:

  - Added the required column `churchId` to the `PrayerStatistics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PrayerStatistics" ADD COLUMN     "churchId" TEXT NOT NULL;
