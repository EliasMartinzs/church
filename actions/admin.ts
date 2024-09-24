"use server";

import prisma from "@/lib/db";
import {
  ChurchFormValidation,
  UserProfileFormValidation,
} from "@/lib/validations";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export const handleIsCompleted = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  await prisma.admin.update({
    where: {
      id: user?.id,
    },
    data: {
      isCompleted: true,
    },
  });
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
