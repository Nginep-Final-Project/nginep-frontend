import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { PropertyAvailabilityDto } from "@/types/analytics";
import "./calendar.css";

interface CalendarProps {
  propertyAvailability: PropertyAvailabilityDto;
}

const Calendar: React.FC<CalendarProps> = ({ propertyAvailability }) => {
  const events = propertyAvailability.rooms.flatMap((room) =>
    room.unavailableDates.map((dateRange) => ({
      title: `${room.roomName} - Unavailable`,
      start: dateRange.startDate,
      end: dateRange.endDate,
      color: "#FF385C",
    }))
  );

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, multiMonthPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          left: "title",
          center: "",
          right: "prev,next today dayGridMonth,multiMonthYear",
        }}
        multiMonthMaxColumns={3}
        height="auto"
        titleFormat={{ year: "numeric", month: "long" }}
        titleRangeSeparator=" – "
        buttonText={{
          today: "Today",
          month: "Month",
          year: "Year",
        }}
      />
    </div>
  );
};

export default Calendar;
