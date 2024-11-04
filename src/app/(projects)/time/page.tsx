"use client";

import { differenceInDays, eachDayOfInterval, format } from "date-fns";
import { LuCalendar } from "react-icons/lu";
import { useEffect, useState } from "react";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/select";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/popover"
import { Calendar } from "~/components/calendar";
import { Button } from "~/components/button";
import { cn } from "~/lib/utils";

export default function Render() {
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [selectedDay, setSelectedDay] = useState<string>("Friday");
    const [count, setCount] = useState<number | null>(null);

    function calculate() {
            if (endDate) {
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
            }
    };

    useEffect(() => { calculate(); }, [selectedDay, endDate]);

    return (
        <div className="max-w-md mx-auto mt-10 mb-36 p-6 bg-background rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Date Calculator</h1>
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
            <div className="mt-4">
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
            </div>
            <Button variant={"default"} onClick={calculate} className="mt-4 w-full inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-md">
                Calculate
            </Button>
            {count !== null && (
                <p className="mt-4 text-lg text-gray-900 dark:text-gray-100">
                    There are <span className="font-bold">{count}</span> {selectedDay}s until <span className="font-bold">{format(endDate!, "MMMM do, yyyy")}</span>
                </p>
            )}
        </div>
    );
}