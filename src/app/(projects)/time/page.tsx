"use client";

import { differenceInDays, eachDayOfInterval, format } from "date-fns";
import { LuCalendar } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/select";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/popover";
import BlurFadeText from "~/components/effects/blur-fade-text";
import BlurFade from "~/components/effects/blur-fade";
import { Calendar } from "~/components/calendar";
import { Button } from "~/components/button";
import { cn } from "~/lib/utils";
import config from "~/config";

export default function Render() {
    const router = useRouter();

    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [selectedDay, setSelectedDay] = useState<string>("Friday");
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        const url = new URL(window.location.href);
        const endDateParam = url.searchParams.get("endDate");
        const selectedDayParam = url.searchParams.get("selectedDay");

        if (endDateParam) setEndDate(new Date(endDateParam));
        if (selectedDayParam) setSelectedDay(selectedDayParam);
    }, []);

    function calculate() {
        if (!endDate) return;

        const days = eachDayOfInterval({ start: new Date(), end: endDate });
        const dayCount = days.filter(day => {
            switch (selectedDay) {
                case "Monday": return day.getDay() === 1;
                case "Tuesday": return day.getDay() === 2;
                case "Wednesday": return day.getDay() === 3;
                case "Thursday": return day.getDay() === 4;
                case "Friday": return day.getDay() === 5;
                case "Saturday": return day.getDay() === 6;
                case "Sunday": return day.getDay() === 0;
                default: return false;
            }
        }).length;

        setCount(dayCount);
    };

    useEffect(() => {
        calculate();
        if (endDate) {
            const url = new URL(window.location.href);
            url.searchParams.set("endDate", endDate.toISOString());
            url.searchParams.set("selectedDay", selectedDay);
            router.push(url.toString());
        }
    }, [selectedDay, endDate]);

    return (
        <div className="max-w-md min-h-[65dvh] mx-auto px-8 pt-8 mt-10 bg-background rounded-lg shadow-md items-center">
            <BlurFadeText className={"text-3xl font-bold my-4 mt-2.5 text-gray-900 dark:text-gray-100"} delay={config.initialAnimationDelay} yOffset={8} animateByCharacter text={"Date Calculator"} />
            <BlurFade delay={config.initialAnimationDelay * 2}>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !endDate && "text-muted-foreground")}>
                            {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                            <LuCalendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 mt-2" align="start">
                        <Calendar mode="single" selected={endDate} onSelect={setEndDate} disabled={(date) => date < new Date() || date < new Date("1900-01-01")} initialFocus />
                    </PopoverContent>
                </Popover>
            </BlurFade>
            <BlurFade className={"mt-4"} delay={config.initialAnimationDelay * 3}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select a day</label>
                <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                </select>
            </BlurFade>
            <BlurFade delay={config.initialAnimationDelay * 4}>
                <Button onClick={calculate} className="mt-4 w-full inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-md">
                    Calculate
                </Button>
            </BlurFade>
            {count !== null && (
                <p className="mt-4 text-lg text-gray-900 dark:text-gray-100">
                    There are <span className="font-bold">{count}</span> {selectedDay}s until <span className="font-bold">{format(endDate!, "MMMM do, yyyy")}</span>
                </p>
            )}
        </div>
    );
}