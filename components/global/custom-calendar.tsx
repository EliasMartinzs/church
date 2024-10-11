"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { cn, isBirthdayToday } from "@/lib/utils";

interface DayInfo {
  date: Date;
  day: string;
}

export const CustomCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [daysInMonth, setDaysInMonth] = useState<DayInfo[]>([]);
  const [todayIndex, setTodayIndex] = useState<number>(0);
  const swiperRef = useRef<any>(null);

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
    const days = getDaysInMonth(year, month);
    setDaysInMonth(days);

    const today = new Date();
    const todayIndex = days.findIndex(
      (dayInfo) =>
        dayInfo.date.getFullYear() === today.getFullYear() &&
        dayInfo.date.getMonth() === today.getMonth() &&
        dayInfo.date.getDate() === today.getDate()
    );

    setTodayIndex(todayIndex >= 0 ? todayIndex : 0);
  }, [currentDate]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(todayIndex);
    }
  }, [todayIndex]);

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

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold capitalize">
        {currentDate.toLocaleDateString("pt-BR", {
          month: "long",
          year: "numeric",
        })}
      </h4>

      <Swiper
        ref={swiperRef}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        slidesPerView={7}
        spaceBetween={5}
        breakpoints={{
          640: {
            slidesPerView: 5,
          },
          768: {
            slidesPerView: 8,
          },
          1024: {
            slidesPerView: 10,
          },
          1280: {
            slidesPerView: 14,
          },
        }}
      >
        {daysInMonth.map((dayInfo) => (
          <SwiperSlide
            key={dayInfo.date.toISOString()}
            className={cn(
              "bg-accent rounded-2xl p-2",
              isBirthdayToday(dayInfo.date) &&
                "bg-primary text-primary-foreground"
            )}
          >
            <div className="p-1 flex flex-col gap-y-1 items-center justify-center">
              <span className="text-xl font-black">
                {dayInfo.date.getDate()}
              </span>
              <span className="capitalize">{dayInfo.day.slice(0, 3)}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex items-center justify-end gap-x-2 w-full">
        <Button className="swiper-button-prev" onClick={prevMonth}>
          <ChevronLeft className="size-6" />
        </Button>
        <Button className="swiper-button-next" onClick={nextMonth}>
          <ChevronRight className="size-6" />
        </Button>
      </div>
    </div>
  );
};
