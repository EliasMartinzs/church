"use client";

import {
  createNewMeetingSchema,
  CreateNewMeetingValidation,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ptBR } from "date-fns/locale";
import { InputMask } from "@react-input/mask";
import { cn, validateTimeInput } from "@/lib/utils";
import { ReusableSelect } from "../global/reusable-select";
import { useTransition } from "react";
import { createNewMeeting } from "../../actions/meetings";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  cellId: string;
  href: string;
};

export const NewMeetingForm = ({ cellId, href }: Props) => {
  const form = useForm<CreateNewMeetingValidation>({
    resolver: zodResolver(createNewMeetingSchema),
    defaultValues: {
      title: "",
      description: "",
      date: undefined,
      endTime: "",
      startTime: "",
      host: "",
      location: "",
      status: "CONFIRMED",
      cellId: cellId,
    },
  });

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const isLoading = form.formState.isLoading || isPending;

  function onSubmit(data: CreateNewMeetingValidation) {
    startTransition(async () => {
      await createNewMeeting(data);
      router.push(href);
      toast("Encontro criado com sucesso!");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Encontro na irmã ruti" />
              </FormControl>
              <small>{form.formState.errors.title?.message}</small>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-3">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2">
                <FormLabel>Dia do encontro</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal lg:bg-accent p-6",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="size-4 mr-2" />
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy", { locale: ptBR })
                        ) : (
                          <span>Data</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col space-y-2 p-2 w-auto">
                    <Select
                      onValueChange={(value) =>
                        field.onChange(addDays(new Date(), parseInt(value)))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="0">Hoje</SelectItem>
                        <SelectItem value="1">Amanhã</SelectItem>
                        <SelectItem value="3">Em 3 dias</SelectItem>
                        <SelectItem value="7">Em uma semana</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="rounded-md border">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        locale={ptBR}
                        fromDate={new Date()}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                <small>{form.formState.errors.date?.message}</small>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2">
                <FormLabel>Início</FormLabel>
                <FormControl>
                  <InputMask
                    mask="__:__"
                    replacement="_"
                    className="flex h-9 w-full bg-transparent border border-input rounded-2xl p-6 text-sm transition-colors file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="12:00"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);

                      const validationResult = validateTimeInput(
                        e.target.value
                      );

                      if (validationResult.includes("Use HH:MM")) {
                        form.setError("startTime", {
                          message: validationResult,
                        });
                      } else {
                        form.setError("startTime", {
                          message: "",
                        });
                      }
                    }}
                  />
                </FormControl>
                <small>{form.formState.errors.startTime?.message}</small>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2">
                <FormLabel>Fim</FormLabel>
                <FormControl>
                  <InputMask
                    mask="__:__"
                    replacement="_"
                    className="flex h-9 w-full bg-transparent border border-input rounded-2xl p-6 text-sm transition-colors file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="14:00"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);

                      const validationResult = validateTimeInput(
                        e.target.value
                      );

                      if (validationResult.includes("Use HH:MM")) {
                        form.setError("endTime", {
                          message: validationResult,
                        });
                      } else {
                        form.setError("endTime", {
                          message: "",
                        });
                      }
                    }}
                  />
                </FormControl>
                <small>{form.formState.errors.endTime?.message}</small>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="host"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Anfitrião</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Sarah meyer" />
              </FormControl>
              <small>{form.formState.errors.host?.message}</small>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Av. Brasilia 888" />
              </FormControl>
              <small>{form.formState.errors.host?.message}</small>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea rows={5} {...field} placeholder="Levar algo..." />
              </FormControl>
              <small>{form.formState.errors.description?.message}</small>
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
