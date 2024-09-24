"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import useBookingData from "@/hooks/booking/useBookingData";

interface PriceSummaryProps {
  roomId: string;
  propertyName: string;
  roomName: string;
  city: string;
  province: string;
  basePrice: number;
  coverImage: string;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({
  roomId,
  propertyName,
  roomName,
  city,
  province,
  basePrice,
  coverImage,
}) => {
  const { bookingData } = useBookingData(roomId);
  const { checkIn, checkOut } = bookingData;

  const { totalNights, totalPrice } = useMemo(() => {
    const calculateNights = (start: string, end: string): number => {
      if (!start || !end) return 0;
      const checkInDate = new Date(start);
      const checkOutDate = new Date(end);
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    };

    const nights = calculateNights(checkIn, checkOut);
    return {
      totalNights: nights,
      totalPrice: basePrice * nights,
    };
  }, [checkIn, checkOut, basePrice]);

  return (
    <div className="w-full lg:w-1/3">
      <div className="max-w-[400px] mb-8 lg:mb-0 w-full mx-auto bg-white rounded-lg border-2 overflow-hidden">
        <div className="relative h-60">
          <Image
            src={coverImage}
            alt={propertyName}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{propertyName}</h2>
          <h3 className="text-xl mb-2">{roomName}</h3>
          <p className="text-gray-600 mb-4">{`${city}, ${province}`}</p>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">
                Rp {basePrice.toLocaleString()} x {totalNights} nights
              </span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg mt-4">
              <span>Total</span>
              <span>Rp {totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceSummary;
