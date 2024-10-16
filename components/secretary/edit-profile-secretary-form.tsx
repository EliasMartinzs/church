"use client";

import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { updateSecretaryProfile } from "@/actions/secretary";
import { useTransition } from "react";
import { toast } from "sonner";
import { InputMask } from "@react-input/mask";

type Props = {
  fullname: string;
  birthDate: string;
  phone: string;
};

const formSchema = z.object({
  fullName: z.string().optional(),
  phone: z.string().optional(),
  birthDate: z.string().optional(),
});

export type FormSchemaValidation = z.infer<typeof formSchema>;

export const EditProfileSecretaryForm = ({
  fullname,
  birthDate,
  phone,
}: Props) => {
  const form = useForm<FormSchemaValidation>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: fullname,
      birthDate: birthDate,
      phone: phone,
    },
  });

  const [isPending, startTransition] = useTransition();
  const isFormDirty = Object.keys(form.formState.dirtyFields).length > 0;

  function onSubmit(data: FormSchemaValidation) {
    startTransition(async () => {
      await updateSecretaryProfile(data);
      toast("Alterações concluidas com sucesso!");
    });
  }

  return (
    <div className="flex flex-col lg:flex-row lg:gap-x-20 w-full gap-5">
      <div>
        <p className="font-medium">Perfil público</p>
        <small className="text-muted-foreground">
          Isso será mostrado no seu perfíl.
        </small>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <Input className="bg-background lg:w-[400px]" {...field} />
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-end">
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <InputMask
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder={field?.value?.toString() || "(00) 00000-0000"}
                    mask="(__) _____-____"
                    replacement="_"
                    className="flex h-9 w-full bg-transparent border border-input rounded-2xl p-6 text-sm transition-colors file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-end">
                <FormLabel>Data de nascimento</FormLabel>
                <FormControl>
                  <InputMask
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    placeholder={field?.value?.toString() || "15/06/2000"}
                    mask="__/__/____"
                    replacement="_"
                    className="flex h-9 w-full bg-transparent border border-input rounded-2xl p-6 text-sm transition-colors file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {!isFormDirty ? (
            <></>
          ) : (
            <Button size="full">
              {!isPending ? (
                "Salvar"
              ) : (
                <Loader2 className="size-5 animate-spin" />
              )}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};
