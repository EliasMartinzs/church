import { AttendanceStatus, MeetingStatus } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToBr(dateIso: Date) {
  const date = new Date(dateIso);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function parseDate(dateString: string): Date | null {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(dateString)) {
    return null;
  }

  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

export function formatMeetingTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

export function getMonthName(monthNumber: number): string {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  return months[monthNumber - 1];
}

export function getStatus(status: AttendanceStatus | MeetingStatus) {
  switch (status) {
    case AttendanceStatus.ATTENDING:
      return "Participando";
    case AttendanceStatus.NOT_ATTENDING:
      return "Não Participando";
    case AttendanceStatus.MAYBE:
      return "Talvez";
    case MeetingStatus.PENDING:
      return "Pendente";
    case MeetingStatus.CONFIRMED:
      return "Confirmado";
    case MeetingStatus.CANCELLED:
      return "Cancelado";
    case MeetingStatus.COMPLETED:
      return "Concluído";
    default:
      return "Desconhecido";
  }
}

export function validateTimeInput(timeString: string): string {
  const timeRegex = /^(2[0-3]|[01]?[0-9]):[0-5][0-9]$/;

  if (timeRegex.test(timeString)) {
    return timeString;
  } else {
    return "Use HH:MM entre 00:00 e 23:59.";
  }
}

export function isBirthdayToday(birthDate: Date) {
  const today = new Date();

  const isSameDay = birthDate.getDate() === today.getDate();
  const isSameMonth = birthDate.getMonth() === today.getMonth();

  return isSameDay && isSameMonth;
}
