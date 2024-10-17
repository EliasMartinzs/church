"use server";
import prisma from "@/lib/db";
import { PrayerRequestValidation } from "@/lib/validations";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const handleIsCompleted = async (
  profile: "admin" | "secretario" | "member"
) => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  try {
    if (profile === "admin") {
      await prisma.admin.update({
        where: { id: user.id },
        data: { isCompleted: true },
      });
    } else if (profile === "secretario") {
      await prisma.secretary.update({
        where: { id: user.id },
        data: { isCompleted: true },
      });
    } else if (profile === "member") {
      await prisma.member.update({
        where: { id: user.id },
        data: { isCompleted: true },
      });
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCellMembersWithAttendanceRate = async (cellId: string) => {
  const members = await prisma.member.findMany({
    where: {
      cellId: cellId,
    },
    include: {
      church: true,
      cell: {
        include: {
          meetings: {
            include: {
              participants: true,
            },
          },
        },
      },
    },
  });

  const membersWithAttendanceRate = members.map((member) => {
    return {
      id: member.id,
      fullName: member.fullName,
      attendanceRate: member.attendanceRate.toFixed(2),
    };
  });

  return membersWithAttendanceRate;
};

export const createNewPrayer = async (data: PrayerRequestValidation) => {
  try {
  } catch (error: any) {}
};
