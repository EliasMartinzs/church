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
          },
        },
        church: true,
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
