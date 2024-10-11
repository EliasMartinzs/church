"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";

// Definindo a interface para armazenar informações do dia
interface DayInfo {
  date: Date;
  day: string;
}

export const CustomCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [daysInMonth, setDaysInMonth] = useState<DayInfo[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getDaysInMonth = (year: number, month: number): DayInfo[] => {
      const days = new Date(year, month + 1, 0).getDate();
      return Array.from({ length: days }, (_, index) => {
        const date = new Date(year, month, index + 1);
        return {
          date: date,
          day: date.toLocaleDateString("pt-BR", { weekday: "long" }),
        };
      });
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setDaysInMonth(getDaysInMonth(year, month));
  }, [currentDate]);

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleScroll = (event: React.WheelEvent) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += event.deltaY; // Desloca horizontalmente conforme a rolagem do mouse
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold capitalize">
        {currentDate.toLocaleDateString("pt-BR", {
          month: "long",
          year: "numeric",
        })}
      </h4>

      <div
        className="flex items-center gap-x-2 overflow-x-auto scroll-smooth"
        onWheel={handleScroll} // Adiciona o evento de rolagem
        ref={scrollRef} // Referência para o contêiner que será rolado
      >
        {daysInMonth.map((dayInfo) => (
          <div
            key={dayInfo.date.toISOString()}
            className="bg-accent lg:bg-background p-4 flex flex-col items-center justify-center rounded-xl min-w-[100px] flex-shrink-0" // Adicione flex-shrink-0 para evitar que os cartões encolham
          >
            <span className="text-xl font-black">{dayInfo.date.getDate()}</span>
            <span className="capitalize">{dayInfo.day.slice(0, 3)}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-x-2 w-full">
        <Button onClick={prevMonth}>
          <ChevronLeft className="size-6" />
        </Button>
        <Button onClick={nextMonth}>
          <ChevronRight className="size-6" />
        </Button>
      </div>
    </div>
  );
};
