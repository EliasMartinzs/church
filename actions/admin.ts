"use server";

import prisma from "@/lib/db";
import {
  ChurchFormValidation,
  CreateNewCellValidation,
  CreateNewSecretaryValidation,
  createNewUserValidation,
  UserProfileFormValidation,
} from "@/lib/validations";
import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { getStatus } from "@/lib/utils";

export const getAdmin = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const data = await prisma.admin.findUnique({
    where: {
      id: user?.id,
    },
    include: {
      church: true,
    },
  });

  return data;
};

export const updateProfilePhotoAdmin = async (photoUrl: string) => {
  const user = await getAdmin();

  if (!user) {
    redirect("/sign-in");
  }

  if (!photoUrl) return;

  try {
    await prisma.admin.update({
      where: {
        id: user.id,
      },
      data: {
        photoUrl: photoUrl,
      },
    });
  } catch (error: any) {
    throw new Error("Erro ao atualizar foto", error.message);
  }
};

export const updateProfileAdmin = async ({
  birthDate,
  fullname,
  phone,
  photoUrl,
}: UserProfileFormValidation) => {
  const user = await getAdmin();

  if (!user) {
    redirect("/sign-in");
  }

  try {
    await prisma.admin.update({
      where: {
        id: user.id,
      },
      data: {
        fullName: fullname,
        phone: phone,
        photoUrl: photoUrl,
      },
    });

    revalidatePath("/admin/profile");
  } catch (error: any) {
    throw new Error("Erro ao atualizar perfil", error.message);
  }
};

export const updateChurchPic = async (url: string) => {
  const user = await getAdmin();

  if (!user) {
    redirect("/sign-in");
  }

  if (!url) return;

  try {
    await prisma.church.update({
      where: {
        id: user.church?.id,
      },
      data: {
        photoUrl: url,
      },
    });
  } catch (error: any) {
    throw new Error("Erro ao atualizar foto", error.message);
  }
};

export const updateChurch = async (values: ChurchFormValidation) => {
  const user = await getAdmin();

  if (!user) {
    redirect("/sign-in");
  }

  try {
    await prisma.church.update({
      where: {
        id: user?.church?.id,
      },
      data: {
        ...values,
      },
    });

    revalidatePath("/admin/profile");
  } catch (error: any) {
    throw new Error("Erro ao atualizar perfil", error.message);
  }
};

export const getChurch = async () => {
  const user = await getAdmin();

  if (!user) {
    redirect("/sign-in");
  }

  try {
    const data = await prisma.church.findUnique({
      where: {
        id: user?.church?.id,
      },
      include: {
        cells: {
          include: {
            secretary: true,
            meetings: true,
            members: true,
          },
        },
        churchStatistics: true,
        members: {
          include: {
            cell: true,
          },
        },
        secretaries: {
          include: {
            cell: true,
          },
        },
      },
    });

    return data;
  } catch (error: any) {
    throw new Error("Erro ao buscar dados da igreja", error.message);
  }
};

export const createNewSecretary = async (
  values: CreateNewSecretaryValidation
) => {
  const hashedPassword = await bcrypt.hash(values?.password, 10);

  const newUser = await clerkClient().users.createUser({
    firstName: values?.fullname,
    emailAddress: [values?.email],
    password: hashedPassword,
    publicMetadata: {
      role: values.role,
    },
    privateMetadata: {
      churchId: values.churchId,
    },
  });

  if (!newUser || !newUser?.id) {
    throw new Error("Erro ao criar usuario");
  }

  if (values.role === "SECRETARY") {
    await prisma.secretary.create({
      data: {
        id: newUser.id,
        email: values.email,
        fullName: values.fullname,
        role: "SECRETARY",
        churchId: values.churchId as string,
      },
    });
  }

  const churchStatistics = await prisma.churchStatistics.findFirst({
    where: {
      church: {
        id: values.churchId,
      },
    },
  });

  await prisma.churchStatistics.update({
    where: {
      id: churchStatistics?.id!,
    },
    data: {
      totalMembers: {
        increment: 1,
      },
    },
  });
};

export const createNewUser = async (values: createNewUserValidation) => {
  const hashedPassword = await bcrypt.hash(values?.password, 10);

  const newUser = await clerkClient().users.createUser({
    firstName: values?.fullname,
    emailAddress: [values?.email],
    password: hashedPassword,
    publicMetadata: {
      role: values.role,
    },
    privateMetadata: {
      churchId: values.churchId,
    },
  });

  if (!newUser || !newUser?.id) {
    throw new Error("Erro ao criar usuario");
  }

  if (values.role === "MEMBER") {
    await prisma.member.create({
      data: {
        id: newUser.id,
        email: values.email,
        fullName: values.fullname,
        role: "MEMBER",
        churchId: values.churchId,
        cellId: values.cellId,
        photoUrl: "/noAvatar.png",
      },
    });

    const churchStatistics = await prisma.churchStatistics.findFirst({
      where: {
        church: {
          id: values.churchId,
        },
      },
    });

    await prisma.churchStatistics.update({
      where: {
        id: churchStatistics?.id!,
      },
      data: {
        totalMembers: {
          increment: 1,
        },
      },
    });
  }
};

export const createNewCell = async (values: CreateNewCellValidation) => {
  try {
    await prisma.cell.create({
      data: {
        name: values.name,
        churchId: values.churchId,
        description: values.description,
        createdAt: new Date(),
        secretaryId: values.secretaryId,
        photoUrl: values.photoUrl,
      },
    });

    const churchStatistics = await prisma.churchStatistics.findFirst({
      where: {
        church: {
          id: values.churchId,
        },
      },
    });

    await prisma.churchStatistics.update({
      where: {
        id: churchStatistics?.id!,
      },
      data: {
        totalCells: {
          increment: 1,
        },
      },
    });

    return;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteCell = async (cellId: string) => {
  try {
    if (!cellId) return;

    const data = await prisma.cell.delete({
      where: {
        id: cellId,
      },
    });

    const churchStatistics = await prisma.churchStatistics.findFirst({
      where: {
        church: {
          id: data.churchId,
        },
      },
    });

    await prisma.churchStatistics.update({
      where: {
        id: churchStatistics?.id!,
      },
      data: {
        totalCells: {
          decrement: 1,
        },
      },
    });

    revalidatePath("/admin/cells");
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCellById = async (cellId: string) => {
  try {
    const data = await prisma.cell.findUnique({
      where: {
        id: cellId,
      },
      include: {
        church: true,
        meetings: true,
        members: true,
        secretary: true,
      },
    });

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getMemberById = async (id: string) => {
  try {
    return await prisma.member.findFirst({
      where: {
        id: id,
      },
      include: {
        cell: {},
        church: true,
      },
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteMember = async (memberId: string) => {
  try {
    return await prisma.member.delete({
      where: {
        id: memberId,
      },
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getChurchStatistic = async () => {
  const user = await getAdmin();

  if (!user) {
    redirect("/sign-in");
  }

  try {
    return await prisma.churchStatistics.findFirst({
      where: {
        church: {
          id: user?.church?.id as string,
        },
      },
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function getNewMembersPerMonth() {
  const user = await getAdmin();

  if (!user) {
    redirect("/sign-in");
  }

  const members = await prisma.member.groupBy({
    where: {
      church: {
        id: user?.church?.id as string,
      },
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
}

export const getMeetigsPerday = async () => {
  try {
    const user = await getAdmin();

    if (!user) {
      redirect("sign-in");
    }

    const meetings = await prisma.meeting.groupBy({
      where: {
        cell: {
          churchId: user?.church?.id as string,
        },
      },
      by: ["date"],
      _count: true,
      orderBy: {
        date: "asc",
      },
    });

    const formattedData = meetings.map(({ _count, date }) => {
      const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      });

      return {
        date: formattedDate,
        meetingsCount: _count,
      };
    });

    return formattedData;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getParticipationData = async () => {
  try {
    const user = await getAdmin();

    if (!user) {
      redirect("sign-in");
    }

    const participationData = await prisma.meetingResponse.groupBy({
      by: ["attendance"],
      where: {
        meeting: {
          cell: {
            churchId: user?.church?.id,
          },
        },
      },
      _count: {
        attendance: true,
      },
    });

    const formattedData = participationData.map(({ attendance, _count }) => ({
      attendanceStatus: getStatus(attendance),
      count: _count.attendance,
      fill:
        attendance === "ATTENDING"
          ? "var(--color-attending)"
          : attendance === "NOT_ATTENDING"
          ? "var(--color-not-attending)"
          : "var(--color-maybe)",
    }));

    return formattedData;
  } catch (error: any) {
    throw new Error(error);
  }
};
