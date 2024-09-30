import React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex items-center justify-between px-3 py-2 border rounded-md cursor-pointer bg-white",
            "text-sm text-gray-500 hover:bg-gray-100 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
            !date && "text-muted-foreground"
          )}
        >
          <span>{date ? format(date, "MMM dd, yyyy") : "Pick a date"}</span>
          <CalendarIcon className="h-4 w-4 ml-2" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Calendar
          className="bg-white"
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
