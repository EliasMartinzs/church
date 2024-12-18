"use client";

import {
  createNewSecretaryForm,
  CreateNewSecretaryValidation,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createNewSecretary } from "@/actions/admin";
import { sendEmail } from "@/hooks/use-email";

type Props = {
  churchId: string;
  userId: string;
};

export const NewSecretaryForm = ({ churchId, userId }: Props) => {
  const [showPassword, setShowPassword] = useState<"text" | "password">(
    "password"
  );

  const form = useForm<CreateNewSecretaryValidation>({
    resolver: zodResolver(createNewSecretaryForm),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: "SECRETARY",
      fullname: "",
      churchId: churchId,
    },
  });

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const isLoading = isPending || form.formState.isLoading;
  const [error, setError] = useState<string>("");

  const onSubmit = async (values: CreateNewSecretaryValidation) => {
    startTransition(async () => {
      const res = await createNewSecretary(values);

      if (res?.success === false) {
        setError(res.message);
        return;
      }
      toast("Novo secretario cadastrado com sucesso!");
      router.push("/admin/cell/create");
      revalidatePath("/admin/cells");
    });

    sendEmail({
      email: values.email as string,
      password: values.password as string,
      from_name: values.fullname as string,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Jonh doe" />
              </FormControl>
              <small>{form.formState.errors.fullname?.message}</small>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-Mail</FormLabel>
              <FormControl>
                <Input {...field} placeholder="aaaa@gmail.com" type="email" />
              </FormControl>
              <small>{form.formState.errors.email?.message || error}</small>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    onChange={field.onChange}
                    placeholder="*********"
                    type={showPassword}
                  />
                </div>
              </FormControl>
              <small>{form.formState.errors.password?.message}</small>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repita a Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    onChange={field.onChange}
                    placeholder="*********"
                    type={showPassword}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        showPassword === "password" ? "text" : "password"
                      )
                    }
                    className="absolute top-4 right-4"
                  >
                    {showPassword === "text" ? (
                      <FaRegEye className="size-5" />
                    ) : (
                      <FaRegEyeSlash className="size-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              <small>{form.formState.errors.confirmPassword?.message}</small>
            </FormItem>
          )}
        />

        <Button className="w-full" size="lg" type="submit">
          {isLoading ? (
            <div className="flex items-center gap-x-2">
              <Loader2 className="size-6 animate-spin" />
              Criando...
            </div>
          ) : (
            "Criar"
          )}
        </Button>
      </form>
    </Form>
  );
};
