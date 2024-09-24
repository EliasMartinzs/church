"use client";

import { createNewUserForm, createNewUserValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { createUser } from "@/actions/users";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

type Props = {
  churchId: string;
};

export const NewSecretaryForm = ({ churchId }: Props) => {
  const [showPassword, setShowPassword] = useState<"text" | "password">(
    "password"
  );

  const form = useForm<createNewUserValidation>({
    resolver: zodResolver(createNewUserForm),
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

  const onSubmit = async (values: createNewUserValidation) => {
    startTransition(async () => {
      createUser(values);
      toast("Novo secretário cadastrado com sucesso!");
      router.push("/admin/cell/create");
      revalidatePath("/admin/members");
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 lg:max-w-4xl mr-auto"
      >
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
              <small>{form.formState.errors.email?.message}</small>
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
