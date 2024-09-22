import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "lucide-react";

interface DateRangePickerProps {
  isOpen: boolean;
  onSave: (checkIn: Date | null, checkOut: Date | null) => void;
  onClose: () => void;
  initialCheckIn: Date | null;
  initialCheckOut: Date | null;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  isOpen,
  onSave,
  onClose,
  initialCheckIn,
  initialCheckOut,
}) => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(initialCheckIn);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(
    initialCheckOut
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCheckInDate(initialCheckIn);
    setCheckOutDate(initialCheckOut);
  }, [initialCheckIn, initialCheckOut]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const preventDefault = (e: Event) => e.preventDefault();

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
      document.addEventListener("wheel", preventDefault, { passive: false });
      document.addEventListener("touchmove", preventDefault, {
        passive: false,
      });
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
      document.removeEventListener("wheel", preventDefault);
      document.removeEventListener("touchmove", preventDefault);
    };
  }, [isOpen, onClose]);

  const daysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const handleDateClick = (date: Date) => {
    setErrorMessage(null);

    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(date);
      setCheckOutDate(null);
      setErrorMessage("Please select a check-out date.");
    } else {
      if (date > checkInDate) {
        setCheckOutDate(date);
      } else if (date.getTime() === checkInDate.getTime()) {
        setErrorMessage(
          "Check-out date must be at least one day after check-in."
        );
        const nextDay = new Date(checkInDate);
        nextDay.setDate(nextDay.getDate() + 1);
        setCheckOutDate(nextDay);
      } else {
        setCheckOutDate(checkInDate);
        setCheckInDate(date);
      }
    }
  };

  const isDateInRange = (date: Date) => {
    return (
      checkInDate && checkOutDate && date > checkInDate && date < checkOutDate
    );
  };

  const isDateSelected = (date: Date) => {
    return (
      (checkInDate && formatDate(date) === formatDate(checkInDate)) ||
      (checkOutDate && formatDate(date) === formatDate(checkOutDate))
    );
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDisplayDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const formatMonthYear = (date: Date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-hidden">
      <div
        ref={calendarRef}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <button
            type="button"
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() - 1,
                  1
                )
              )
            }
            className="p-2 rounded-full hover:bg-gray-100"
          >
            &lt;
          </button>
          <h2 className="text-lg font-semibold">
            {formatMonthYear(currentMonth)}
          </h2>
          <button
            type="button"
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() + 1,
                  1
                )
              )
            }
            className="p-2 rounded-full hover:bg-gray-100"
          >
            &gt;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-medium text-gray-500">
              {day}
            </div>
          ))}
          {daysInMonth(currentMonth).map((date, index) => (
            <div
              key={index}
              className={`p-2 text-center cursor-pointer rounded-full ${
                date
                  ? isDateSelected(date)
                    ? "bg-pink-500 text-white"
                    : isDateInRange(date)
                    ? "bg-pink-100"
                    : "hover:bg-gray-100"
                  : ""
              }`}
              onClick={() => date && handleDateClick(date)}
            >
              {date ? date.getDate() : ""}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-sm text-gray-500">Check-in</p>
            <p className="font-medium">
              {checkInDate ? formatDisplayDate(checkInDate) : "Select date"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Check-out</p>
            <p className="font-medium">
              {checkOutDate ? formatDisplayDate(checkOutDate) : "Select date"}
            </p>
          </div>
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(checkInDate, checkOutDate)}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
