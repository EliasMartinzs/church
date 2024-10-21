import {
  getAdmin,
  getCellsWithMemberCount,
  getChurchStatistic,
  getMeetigsPerday,
  getNewMembersPerMonth,
  getParticipationData,
  getPrayersByCells,
} from "@/actions/admin";
import { NotificationUser } from "@/components/global/notification-user";
import { GridLayoutChart } from "@/components/admin/grid-layout";
import { CustomCalendar } from "@/components/global/custom-calendar";
import Link from "next/link";

export default async function Admin() {
  const [
    admin,
    members,
    membersPerMonth,
    meetingsPerDay,
    attendanceStatus,
    cellsWithMemberCount,
    prayersByCells,
  ] = await Promise.all([
    getAdmin(),
    getChurchStatistic(),
    getNewMembersPerMonth(),
    getMeetigsPerday(),
    getParticipationData(),
    getCellsWithMemberCount(),
    getPrayersByCells(),
  ]);

  return (
    <div className="flex flex-1 h-full flex-col rounded-2xl gap-y-8">
      <NotificationUser
        href="/admin/profile"
        isCompleted={!admin?.isCompleted}
        profile="admin"
      />

      <h4 className="text-xl mb-4">
        <span className="font-medium">Bem vindo(a),</span>{" "}
        {admin?.fullName === null ? (
          <Link href="/admin/profile" className="underline underline-offset-4">
            Complete seu perfil para ver seu nome!
          </Link>
        ) : (
          admin?.fullName
        )}
      </h4>

      <CustomCalendar />

      <GridLayoutChart
        attendanceStatus={attendanceStatus}
        members={members}
        meetingsPerDay={meetingsPerDay}
        membersPerMonth={membersPerMonth}
        cellsWithMemberCount={cellsWithMemberCount}
        prayersByCells={prayersByCells}
      />
    </div>
  );
}
