import {
  getAdmin,
  getCellsWithMemberCount,
  getChurch,
  getChurchStatistic,
  getMeetigsPerday,
  getNewMembersPerMonth,
  getParticipationData,
  getPrayersByCells,
  getUpcomingMeetings,
} from "@/actions/admin";
import { NotificationUser } from "@/components/global/notification-user";
import { GridLayoutChart } from "@/components/admin/grid-layout";
import { CustomCalendar } from "@/components/global/custom-calendar";
import { cn } from "@/lib/utils";

export default async function Admin() {
  const [
    admin,
    church,
    statisticChurch,
    membersPerMonth,
    meetingsPerDay,
    attendanceStatus,
    cellsWithMemberCount,
    prayersByCells,
    allUpcomingMeetings,
  ] = await Promise.all([
    getAdmin(),
    getChurch(),
    getChurchStatistic(),
    getNewMembersPerMonth(),
    getMeetigsPerday(),
    getParticipationData(),
    getCellsWithMemberCount(),
    getPrayersByCells(),
    getUpcomingMeetings(),
  ]);

  return (
    <div className="relative h-full w-full rounded-2xl flex flex-col">
      <NotificationUser
        href="/admin/profile"
        isCompleted={!admin?.isCompleted}
        profile="admin"
      />

      <div className="p-5 text-2xl font-black max-lg:hidden">
        {admin?.church?.name}
      </div>

      <div className={cn("space-y-4 p-5")}>
        <CustomCalendar />

        <GridLayoutChart
          attendanceStatus={attendanceStatus}
          statisticChurch={statisticChurch}
          meetingsPerDay={meetingsPerDay}
          membersPerMonth={membersPerMonth}
          cellsWithMemberCount={cellsWithMemberCount}
          prayersByCells={prayersByCells}
          allSecretaries={church?.secretaries!}
          allMembers={church?.members!}
          allUpcommingMeetings={allUpcomingMeetings}
        />
      </div>
    </div>
  );
}
