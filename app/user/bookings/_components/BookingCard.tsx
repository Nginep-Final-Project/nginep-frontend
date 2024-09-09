import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { UserBookingList as BookingCardProps } from "@/types/userBookingList";

const BookingCard: React.FC<BookingCardProps> = ({
  propertyName,
  checkInDate,
  checkOutDate,
  hostName,
  location,
  country,
  imageUrl,
  status,
}) => {
  const formatDate = (date: Date) => format(date, "MMM d");
  const formatYear = (date: Date) => format(date, "yyyy");

  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow-xl border">
      <div className="w-full sm:w-1/2 p-4">
        <h3 className="text-xl font-semibold mb-1">{propertyName}</h3>
        <p className="text-gray-600 mb-2">
          {formatDate(checkInDate)} – {formatDate(checkOutDate)},{" "}
          {formatYear(checkOutDate)}
        </p>
        <p className="text-sm text-gray-500 mb-2">{location}</p>
        <p className="text-sm text-gray-500 mb-2">{country}</p>
        <p className="text-sm text-gray-500 mb-1">Hosted by {hostName}</p>
      </div>
      <div className="relative w-full sm:w-1/2 h-48 sm:h-auto">
        <Image
          src={imageUrl}
          alt={propertyName}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded-full bg-white bg-opacity-80">
          {status}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
