/*
  Warnings:

  - A unique constraint covering the columns `[churchId]` on the table `PrayerStatistics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PrayerStatistics_churchId_key" ON "PrayerStatistics"("churchId");
