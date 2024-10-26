"use server";

import prisma from "@/lib/db";
import { CreateNewMeetingValidation } from "@/lib/validations";
import { currentUser } from "@clerk/nextjs/server";
import { $Enums, Meeting, MeetingResponse } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type MeetingWithParticipants = Meeting & {
  participants: MeetingResponse[];
};

type GroupedMeetings = {
  month: string;
  meetings: MeetingWithParticipants[];
}[];

export const getAllMeetingsOrderedByDate = async (cellId: string) => {
  return await prisma.meeting.findMany({
    where: {
      cell: {
        id: cellId,
      },
    },
    include: {
      participants: true,
    },
    orderBy: {
      date: "asc",
    },
  });
};

export const getAvailableMeetings = async (cellId: string) => {
  const today = new Date();

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  try {
    const meetings = await prisma.meeting.findMany({
      where: {
        cellId: cellId,
        date: {
          gte: tomorrow,
        },
        status: {
          not: "COMPLETED",
        },
      },
      include: {
        participants: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    return meetings;
  } catch (error) {
    console.error("Erro ao buscar os encontros disponíveis:", error);
    throw error;
  }
};

export const getMeetingsGroupedByMonth = async (cellId: string) => {
  const meetings = await getAvailableMeetings(cellId);

  const groupedMeetings: { [key: string]: MeetingWithParticipants[] } = {};

  meetings?.forEach((meeting) => {
    const localDate = new Date(meeting.date);
    const monthYear = format(localDate, "MMM yyy", { locale: ptBR });

    if (!groupedMeetings[monthYear]) {
      groupedMeetings[monthYear] = [];
    }

    groupedMeetings[monthYear].push(meeting);
  });

  const result: GroupedMeetings = Object.keys(groupedMeetings).map((month) => ({
    month,
    meetings: groupedMeetings[month],
  }));

  return result;
};

export const getMeetingById = async (meetingId: string) => {
  try {
    if (!meetingId) return;

    return await prisma.meeting.findUnique({
      where: {
        id: meetingId,
      },
      include: {
        cell: {
          include: {
            secretary: true,
          },
        },
        participants: true,
      },
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getTodayMeetings = async (cellId: string) => {
  const today = new Date();

  const startOfToday = new Date(today);
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date(today);
  endOfToday.setHours(23, 59, 59, 999);

  try {
    const meetings = await prisma.meeting.findMany({
      where: {
        cellId: cellId,
        date: {
          gte: startOfToday,
          lte: endOfToday,
        },
        status: {
          not: "COMPLETED",
        },
      },
      include: {
        participants: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    return meetings;
  } catch (error) {
    console.error("Erro ao buscar os encontros de hoje:", error);
    throw error;
  }
};

export const getAllParticipantsConfirmedMeetingByIds = async (
  participants: MeetingResponse[]
) => {
  const confirmedParticipants = participants.filter(
    (member) => member.attendance === $Enums.AttendanceStatus.ATTENDING
  );

  const membersIds = confirmedParticipants.map((member) => member.memberId);

  const data = await prisma.member.findMany({
    where: {
      id: {
        in: membersIds,
      },
    },
  });

  return data;
};

export const getHistoricMeetings = async (cellId: string) => {
  const now = new Date();
  now.setDate(now.getDate() - 1);

  const meetings = await prisma.meeting.findMany({
    where: {
      cell: {
        id: cellId,
      },
      OR: [
        {
          date: {
            lt: now,
          },
        },
        {
          status: "COMPLETED",
        },
      ],
    },
    include: {
      participants: true,
      cell: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  const result = meetings?.map((meeting) => ({
    id: meeting.id,
    date: meeting.date,
    endTime: meeting.endTime,
    host: meeting.host,
    location: meeting.location,
    participantsCount: meeting.participants.length,
    startTime: meeting.startTime,
    status: meeting.status,
    title: meeting.title,
    cellName: meeting.cell?.name ?? "",
    description: meeting.description ?? "",
  }));

  return result;
};

export const createNewMeeting = async (data: CreateNewMeetingValidation) => {
  try {
    const user = await currentUser();

    const churchId = user?.privateMetadata?.churchId as string;

    await prisma.meeting.create({
      data: {
        ...data,
        createdAt: new Date(),
      },
    });

    const churchStatistics = await prisma.churchStatistics.findFirst({
      where: {
        church: {
          id: churchId,
        },
      },
    });

    await prisma.churchStatistics.update({
      where: {
        id: churchStatistics?.id!,
      },
      data: {
        totalMeetings: {
          increment: 1,
        },
      },
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteMeeting = async (meetingId: string) => {
  try {
    const user = await currentUser();

    const churchId = user?.privateMetadata?.churchId as string;

    if (!meetingId) return;

    await prisma.meetingResponse.deleteMany({
      where: {
        meetingId: meetingId,
      },
    });

    await prisma.meeting.delete({
      where: {
        id: meetingId,
      },
    });

    const churchStatistics = await prisma.churchStatistics.findFirst({
      where: {
        church: {
          id: churchId,
        },
      },
    });

    await prisma.churchStatistics.update({
      where: {
        id: churchStatistics?.id!,
      },
      data: {
        totalMeetings: {
          decrement: 1,
        },
      },
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateAttendanceRateForMember = async (memberId: string) => {
  const member = await prisma.member.findUnique({
    where: { id: memberId },
    include: { cell: true },
  });

  const totalMeetings = await prisma.meeting.count({
    where: {
      cellId: member?.cellId,
    },
  });

  const meetingsAttended = await prisma.meetingResponse.count({
    where: {
      memberId,
      attendance: "ATTENDING",
    },
  });

  const attendanceRate =
    totalMeetings > 0 ? (meetingsAttended / totalMeetings) * 100 : 0;

  await prisma.member.update({
    where: {
      id: memberId,
    },
    data: {
      attendanceRate,
    },
  });

  return attendanceRate;
};

export const finalizeMeeting = async (formData: FormData) => {
  const meetingId = formData.get("meetingId") as string;

  await prisma.meeting.update({
    where: { id: meetingId },
    data: { status: "COMPLETED" },
  });

  const meetingResponses = await prisma.meetingResponse.findMany({
    where: { meetingId },
  });

  for (const response of meetingResponses) {
    await updateAttendanceRateForMember(response.memberId);
  }

  revalidatePath("/secretario/meetings");
};
