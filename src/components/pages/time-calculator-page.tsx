"use client";

import { eachDayOfInterval, format } from "date-fns";
import { Calendar as CalendarIcon, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "~/components/button";
import { Calendar } from "~/components/calendar";
import BlurFade from "~/components/effects/blur-fade";
import BlurFadeText from "~/components/effects/blur-fade-text";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/popover";
import config from "~/config";
import { cn } from "~/lib/utils";

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

export default function TimeCalculatorPage() {
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedDay, setSelectedDay] = useState<(typeof WEEKDAYS)[number]>("Friday");
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const endDateParam = url.searchParams.get("endDate");
    const selectedDayParam = url.searchParams.get("selectedDay");

    if (endDateParam) setEndDate(new Date(endDateParam));
    if (selectedDayParam && WEEKDAYS.includes(selectedDayParam as (typeof WEEKDAYS)[number])) {
      setSelectedDay(selectedDayParam as (typeof WEEKDAYS)[number]);
    }
  }, []);

  function calculate() {
    if (!endDate) return;

    const days = eachDayOfInterval({ start: new Date(), end: endDate });
    const dayCount = days.filter((day) => {
      switch (selectedDay) {
        case "Monday":
          return day.getDay() === 1;
        case "Tuesday":
          return day.getDay() === 2;
        case "Wednesday":
          return day.getDay() === 3;
        case "Thursday":
          return day.getDay() === 4;
        case "Friday":
          return day.getDay() === 5;
        case "Saturday":
          return day.getDay() === 6;
        case "Sunday":
          return day.getDay() === 0;
        default:
          return false;
      }
    }).length;

    setCount(dayCount);
  }

  function reset() {
    setEndDate(undefined);
    setSelectedDay("Friday");
    setCount(null);

    const url = new URL(window.location.href);
    url.searchParams.delete("endDate");
    url.searchParams.delete("selectedDay");
    window.history.replaceState({}, "", url.toString());
  }

  useEffect(() => {
    calculate();
    if (endDate) {
      const url = new URL(window.location.href);
      url.searchParams.set("endDate", endDate.toISOString());
      url.searchParams.set("selectedDay", selectedDay);
      window.history.replaceState({}, "", url.toString());
    }
  }, [selectedDay, endDate]);

  return (
    <div className="mx-auto mt-10 min-h-[65dvh] max-w-md rounded-lg bg-background px-8 pt-8 shadow-md">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <BlurFadeText className="my-4 mt-2.5 text-3xl font-bold text-gray-900 dark:text-gray-100" delay={config.initialAnimationDelay} yOffset={8} text="Date Calculator" />
          <BlurFadeText className="text-sm text-gray-600 dark:text-gray-400" delay={config.initialAnimationDelay * 1.5} text="Count matching weekdays until a future date." />
        </div>
        <Button variant="ghost" size="icon" onClick={reset} aria-label="Reset calculator" className="mt-2">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <BlurFade delay={config.initialAnimationDelay * 2}>
        <div className="relative w-full">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Pick a date</label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={cn(
                  "flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-left text-sm font-normal transition-colors",
                  !endDate && "text-muted-foreground",
                )}
              >
                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="z-[200] mt-2 w-max p-0">
              <div className="rounded-md bg-background-3 px-2 py-1 text-sm text-white">Select a date</div>
              <div className="mt-2">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                  initialFocus
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </BlurFade>

      <BlurFade className="mt-4" delay={config.initialAnimationDelay * 3}>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Select a day</label>
        <select
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value as (typeof WEEKDAYS)[number])}
        >
          {WEEKDAYS.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </BlurFade>

      <BlurFade delay={config.initialAnimationDelay * 4}>
        <Button onClick={calculate} className="mt-4 inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm">
          Calculate
        </Button>
      </BlurFade>

      {count !== null && endDate && (
        <BlurFade delay={config.initialAnimationDelay * 5}>
          <div className="mt-4 rounded-md border border-input bg-background-2/10 p-4">
            <p className="text-lg text-gray-900 dark:text-gray-100">
              There {count === 1 ? "is" : "are"} <span className="font-bold">{count}</span> {selectedDay}
              {count === 1 ? "" : "s"} until <span className="font-bold">{format(endDate, "MMMM do, yyyy")}</span>
            </p>
          </div>
        </BlurFade>
      )}
    </div>
  );
}
