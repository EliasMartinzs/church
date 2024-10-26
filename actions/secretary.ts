"use server";

import { FormSchemaValidation } from "@/components/secretary/edit-profile-secretary-form";
import prisma from "@/lib/db";
import { parseDate } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getSecretary = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  try {
    return await prisma.secretary.findFirst({
      where: {
        id: user.id,
      },
      include: {
        cell: {
          include: {
            meetings: true,
            members: true,
            church: true,
            prayerRequests: true,
          },
        },
        church: {
          include: {
            admin: true,
          },
        },
      },
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateSecretaryProfile = async (data: FormSchemaValidation) => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  try {
    return await prisma.secretary.update({
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

export const updateProfilePic = async (photoUrl: string) => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  try {
    await prisma.secretary.update({
      where: {
        id: user.id,
      },
      data: {
        photoUrl: photoUrl,
      },
    });

    revalidatePath("/secretario/profile");

    return;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllPrayerRequestsByCell = async () => {
  const user = await getSecretary();

  if (!user) {
    redirect("sign-in");
  }

  try {
    const data = await prisma.prayerRequest.findMany({
      where: {
        cellId: user?.cell?.id,
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
    }, {});

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

export const getNewMembersPerMonthByCell = async () => {
  const user = await getSecretary();

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
