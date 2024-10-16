"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { CiCamera } from "react-icons/ci";
import { updateProfilePic } from "@/actions/secretary";

type Props = {
  photoUrl: string;
};

const formSchema = z.object({
  photoUrl: z.string().optional(),
});

type FormSchemaValidation = z.infer<typeof formSchema>;

export const EditProfilePic = ({ photoUrl }: Props) => {
  const form = useForm<FormSchemaValidation>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photoUrl: photoUrl,
    },
  });

  function onSubmit(data: FormSchemaValidation) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="photoUrl"
          render={({ field }) => (
            <FormItem className="flex items-center justify-center lg:justify-start">
              <FormControl>
                <div className="relative w-52 h-52 rounded-lg">
                  <CldUploadWidget
                    uploadPreset="crambpreset"
                    onSuccess={(e) => {
                      if (typeof e.info === "object" && e.info !== undefined) {
                        if (e.info.secure_url) {
                          updateProfilePic(e.info?.secure_url);
                          field.onChange(e.info.secure_url);
                        }
                      }
                    }}
                  >
                    {({ open }) => {
                      return (
                        <button
                          onClick={() => open?.()}
                          type="button"
                          className="absolute inset-0 w-full h-full opacity-0 z-10"
                        ></button>
                      );
                    }}
                  </CldUploadWidget>

                  {form.getValues("photoUrl") && (
                    <>
                      <Image
                        src={form.getValues("photoUrl") as string}
                        alt="Profile Image"
                        fill
                        className="object-cover rounded-lg relative h-52 w-52"
                      />
                      <div className="size-10 bg-background rounded-3xl text-foreground grid place-items-center absolute bottom-0 right-0">
                        <CiCamera className="size-9" />
                      </div>
                    </>
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
