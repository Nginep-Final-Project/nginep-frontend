import React, { useState } from "react";
import Image from "next/image";
import Calendar from "@/public/icons/calendar.svg";
import DateRangePicker from "./DateRangePicker/DateRangePicker";

type DatesProps = {
  checkIn: string;
  checkOut: string;
  onChange: (checkIn: string, checkOut: string) => void;
};

const Dates: React.FC<DatesProps> = ({ checkIn, checkOut, onChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const formatToLocalDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSave = (newCheckIn: Date | null, newCheckOut: Date | null) => {
    setShowCalendar(false);
    if (newCheckIn && newCheckOut) {
      onChange(
        formatToLocalDateString(newCheckIn),
        formatToLocalDateString(newCheckOut)
      );
    }
  };

  const handleClose = () => {
    setShowCalendar(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Select";
    const date = new Date(dateString);
    const formatOptions: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", formatOptions);
  };

  const formatLongDate = (dateString: string) => {
    if (!dateString) return "Select";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="mt-8 py-4 border-b-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Dates</h2>
        <Image src={Calendar} alt="Calendar" width={24} height={24} />
      </div>

      <div className="flex justify-between items-center border rounded-lg p-4 mb-4">
        <div className="flex-1 border-r pr-4">
          <p className="text-sm text-gray-500 mb-1">Check-in</p>
          <p className="text-lg font-semibold lg:hidden">
            {formatDate(checkIn)}
          </p>
          <p className="text-lg font-semibold hidden lg:block">
            {formatLongDate(checkIn)}
          </p>
        </div>
        <div className="flex-1 pl-4">
          <p className="text-sm text-gray-500 mb-1">Check-out</p>
          <p className="text-lg font-semibold lg:hidden">
            {formatDate(checkOut)}
          </p>
          <p className="text-lg font-semibold hidden lg:block">
            {formatLongDate(checkOut)}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="mt-6 w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors"
        onClick={() => setShowCalendar(true)}
      >
        {checkIn && checkOut ? "Edit Dates" : "Select Dates"}
      </button>

      <DateRangePicker
        isOpen={showCalendar}
        onSave={handleSave}
        onClose={handleClose}
        initialCheckIn={checkIn ? new Date(checkIn) : null}
        initialCheckOut={checkOut ? new Date(checkOut) : null}
      />
    </div>
  );
};

export default Dates;
