import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, currentUser, WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const userId = evt.data.id;

    try {
      const user = await clerkClient().users.updateUserMetadata(userId, {
        publicMetadata: {
          role: evt.data.public_metadata.role || "ADMIN",
        },
      });

      const role = user?.publicMetadata.role as string;

      if (role === "ADMIN") {
        await prisma.$transaction(async (prisma) => {
          const admin = await prisma.admin.create({
            data: {
              id: evt.data.id,
              email: evt.data.email_addresses[0].email_address,
              fullName: evt.data.first_name,
              role: "ADMIN",
              photoUrl: evt.data.image_url,
            },
          });

          const churchStatistics = await prisma.churchStatistics.create({
            data: {
              totalMembers: 0,
              totalCells: 0,
              totalMeetings: 0,
            },
          });

          const church = await prisma.church.create({
            data: {
              adminId: admin.id,
              name: "Igreja",
              churchStatiticsId: churchStatistics.id,
              photoUrl: "/church.png",
            },
          });

          await clerkClient().users.updateUserMetadata(userId, {
            privateMetadata: {
              churchId: church.id,
            },
          });
        });
      }
    } catch (error) {
      return new Response("Error creating user or profile", { status: 500 });
    }
  }

  return new Response("", { status: 200 });
}
