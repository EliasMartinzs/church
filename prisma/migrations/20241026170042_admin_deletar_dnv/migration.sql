-- DropForeignKey
ALTER TABLE "PrayerRequest" DROP CONSTRAINT "PrayerRequest_cellId_fkey";

-- AddForeignKey
ALTER TABLE "PrayerRequest" ADD CONSTRAINT "PrayerRequest_cellId_fkey" FOREIGN KEY ("cellId") REFERENCES "Cell"("id") ON DELETE CASCADE ON UPDATE CASCADE;
