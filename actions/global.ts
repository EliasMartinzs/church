"use server";

import prisma from "@/lib/db";
import { PrayerRequestValidation } from "@/lib/validations";
import { currentUser } from "@clerk/nextjs/server";
import { Cell, Member, PrayerRequest } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSecretary } from "./secretary";

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
        cellId: data.cellId,
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

interface Prayer extends PrayerRequest {
  cell?: Cell | null;
  member: Member;
}

export const getAllPrayerRequestsByStatus = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("sign-in");
  }

  const churchId = user?.privateMetadata.churchId as string;

  try {
    const data = await prisma.prayerRequest.findMany({
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

    const groupedData = data.reduce((acc, prayerRequest) => {
      const status = prayerRequest.status;

      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(prayerRequest);
      return acc;
    }, {} as Record<string, Prayer[]>);

    return {
      all: data,
      inProgress: groupedData["IN_PROGRESS"] || [],
      pending: groupedData["PENDING"] || [],
      answered: groupedData["ANSWERED"] || [],
    };
  } catch (error: any) {
    throw new Error(`Failed to fetch prayer requests: ${error.message}`);
  }
};

export const changeStatusPrayerRequest = async (
  id: string,
  status: "IN_PROGRESS" | "ANSWERED",
  href: string
) => {
  try {
    await prisma.prayerRequest.update({
      where: {
        id: id,
      },
      data: {
        status: status,
        isAnswered: true,
      },
    });

    revalidatePath(href);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deletePrayerRequest = async (id: string, href: string) => {
  try {
    await prisma.prayerRequest.delete({
      where: {
        id: id,
      },
    });

    revalidatePath(href);

    return;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getPrayerRequestStatusByCell = async (cellId: string) => {
  try {
    const prayer = await prisma.prayerRequest.findMany({
      where: {
        cellId: cellId,
      },
      select: {
        status: true,
      },
    });

    const statusCounts = {
      PENDING: 0,
      ANSWERED: 0,
      IGNORED: 0,
      IN_PROGRESS: 0,
    };

    prayer.forEach((p) => {
      statusCounts[p.status]++;
    });

    return statusCounts;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getPrayerRequestIncreasePercentage = async (cellId: string) => {
  try {
    const currentDate = new Date();
    const firstDayCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const firstDayLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const lastDayLastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );

    const currentMonthRequests = await prisma.prayerRequest.count({
      where: {
        cellId: cellId,
        createdAt: {
          gte: firstDayCurrentMonth,
        },
      },
    });

    const lastMonthRequests = await prisma.prayerRequest.count({
      where: {
        cellId: cellId,
        createdAt: {
          gte: firstDayLastMonth,
          lte: lastDayLastMonth,
        },
      },
    });

    const percentageIncrease =
      lastMonthRequests > 0
        ? ((currentMonthRequests - lastMonthRequests) / lastMonthRequests) * 100
        : currentMonthRequests > 0
        ? 100
        : 0;

    return percentageIncrease.toFixed(2);
  } catch (error: any) {
    throw new Error(
      `Erro ao calcular a porcentagem de aumento: ${error.message}`
    );
  }
};
