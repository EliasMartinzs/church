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
    const prayer = await prisma.prayerRequest.create({
      data: {
        description: data.description!,
        title: data.title,
        category: data.category,
        createdAt: new Date(),
        memberId: data.memberId,
        status: data.status,
        churchId: data.churchId,
      },
    });

    await prisma.prayerStatistics.upsert({
      where: {
        churchId: data.churchId,
      },
      update: {
        totalRequests: {
          increment: 1,
        },
      },
      create: {
        churchId: data.churchId,
        totalRequests: 1,
        answered: 0,
        notAnswered: 0,
        createdAt: new Date(),
      },
    });

    return prayer;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllPrayerRequests = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("sign-in");
  }

  const churchId = user?.privateMetadata.churchId as string;
  try {
    const prayer = await prisma.prayerRequest.findFirst({
      where: {
        churchId: churchId,
      },
      include: {
        cell: true,
        member: true,
      },
      orderBy: {
        title: "asc",
      },
    });

    return prayer;
  } catch (error: any) {
    throw new Error(error);
  }
};
