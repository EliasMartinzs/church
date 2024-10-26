"use server";

import { FormSchemaValidation } from "@/components/members/edit-profile-member-form";
import prisma from "@/lib/db";
import { parseDate } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export const getMember = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  try {
    return await prisma.member.findFirst({
      where: {
        id: user?.id,
      },
      include: {
        cell: {
          include: {
            secretary: true,
            members: true,
            meetings: true,
            prayerRequests: true,
          },
        },
        church: {
          include: {
            admin: true,
          },
        },
        prayerRequest: true,
      },
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const confirmPresence = async (formData: FormData) => {
  const user = await currentUser();
  const meetingId = formData.get("meetingId") as string;

  if (!user) {
    redirect("/sign-in");
  }

  try {
    await prisma.meetingResponse.create({
      data: {
        meetingId: meetingId,
        memberId: user?.id,
        attendance: "ATTENDING",
        createdAt: new Date(),
      },
    });

    revalidatePath("/member/meetings");

    return;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getNewMembersPerMonthByCell = async () => {
  const user = await getMember();

  if (!user) {
    redirect("/sign-in");
  }

  const members = await prisma.member.groupBy({
    where: {
      cellId: user?.cell?.id,
    },
    by: ["createdAt"],
    _count: {
      id: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  type FormattedData = { month: string; newMembers: number };

  const formattedData = members.reduce<FormattedData[]>(
    (acc, { createdAt, _count }) => {
      const month = new Date(createdAt).toLocaleString("pt-BR", {
        month: "long",
      });

      const existingMonth = acc.find((entry) => entry.month === month);
      if (existingMonth) {
        existingMonth.newMembers += _count.id;
      } else {
        acc.push({ month, newMembers: _count.id });
      }

      return acc;
    },
    []
  );

  return formattedData;
};

export const getPrayerRequestByMember = async () => {
  const user = await getMember();

  if (!user) {
    redirect("sign-in");
  }

  try {
    return await prisma.prayerRequest.findMany({
      where: {
        memberId: user?.id,
      },
      include: {
        cell: true,
        member: true,
      },
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateMemberProfile = async (data: FormSchemaValidation) => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  try {
    return await prisma.member.update({
      where: {
        id: user.id,
      },
      data: {
        ...data,
        birthDate: parseDate(data.birthDate as string),
      },
    });
  } catch (error: any) {
    throw new Error(error);
  }
};
