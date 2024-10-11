import * as z from "zod";

const MeetingStatusEnum = z.enum([
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
]);

export const userProfileFormSchema = z.object({
  fullname: z.string().optional(),
  phone: z.string().optional(),
  birthDate: z.string().optional(),
  photoUrl: z.string().optional(),
});

export type UserProfileFormValidation = z.infer<typeof userProfileFormSchema>;

export const churchFormSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  photoUrl: z.string().optional(),
  description: z.string().optional(),
});

export type ChurchFormValidation = z.infer<typeof churchFormSchema>;

export const createNewMemberForm = z
  .object({
    fullname: z.string().min(1, {
      message: "Nome Completo é obrigatório",
    }),
    email: z.string().email({
      message: "E-mail é obrigatório",
    }),
    password: z.string().min(6, {
      message: "Senha é obrigatório",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirmação de senha é obrigatória",
    }),
    role: z.string().min(1, {
      message: "Selecione o Cargo do membro",
    }),
    cellId: z.string().min(1, {
      message: "Selecione a Celula do membro",
    }),
    churchId: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type CreateNewMemberValidation = z.infer<typeof createNewMemberForm>;

export const createNewCellFormSchema = z.object({
  name: z.string().min(1, {
    message: "Nome da célula é obrigatório",
  }),
  description: z.string().optional(),
  photoUrl: z.string().optional(),
  churchId: z.string(),
  secretaryId: z.string().min(1, {
    message: "Secretario é obrigatório",
  }),
});

export type CreateNewCellValidation = z.infer<typeof createNewCellFormSchema>;

export const createNewSecretaryForm = z.object({
  fullname: z.string().min(1, {
    message: "Nome Completo é obrigatório",
  }),
  email: z.string().email({
    message: "E-mail é obrigatório",
  }),
  password: z.string().min(6, {
    message: "Senha é obrigatório",
  }),
  confirmPassword: z.string().min(6, {
    message: "Confirmação de senha é obrigatória",
  }),
  role: z.string().min(1, {
    message: "Selecione o Cargo do membro",
  }),
  churchId: z.string(),
});

export type CreateNewSecretaryValidation = z.infer<
  typeof createNewSecretaryForm
>;

export const createNewUserForm = z
  .object({
    fullname: z.string().min(1, {
      message: "Nome Completo é obrigatório",
    }),
    email: z.string().email({
      message: "E-mail é obrigatório",
    }),
    password: z.string().min(6, {
      message: "Senha é obrigatório",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirmação de senha é obrigatória",
    }),
    role: z.string().min(1, {
      message: "Selecione o Cargo do membro",
    }),
    churchId: z.string().optional(),
    cellId: z.string().min(1, {
      message: "Por favor selecione a celula",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type createNewUserValidation = z.infer<typeof createNewUserForm>;

export const createNewMeetingSchema = z.object({
  title: z.string().min(6, {
    message: "Insira o título do encontro",
  }),
  description: z.string().optional(),
  date: z.date({
    message: "Insira o dia do encontro",
  }),
  startTime: z.string({
    message: "Insira o horário de ínicio do encontro",
  }),
  endTime: z.string({
    message: "Inisira o horário de termino do encontro",
  }),
  location: z.string().min(6, {
    message: "Insira o local de encontro",
  }),
  host: z.string().min(4, {
    message: "Insira o nome do anfitrião do encontro",
  }),
  status: MeetingStatusEnum.default("PENDING"),
  cellId: z.string().min(1, {
    message: "Por favor selecione a celula",
  }),
});

export type CreateNewMeetingValidation = z.infer<typeof createNewMeetingSchema>;
