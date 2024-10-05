"use client";

import React from "react";
import Image from "next/image";
import { format } from "date-fns";

interface PriceSummaryProps {
  propertyName: string;
  roomName: string;
  city: string;
  province: string;
  pricePerNight: number;
  totalNights: number;
  coverImage: string;
  numberOfGuest: number;
  checkInDate: string;
  checkOutDate: string;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({
  propertyName,
  roomName,
  city,
  province,
  pricePerNight,
  totalNights,
  coverImage,
  numberOfGuest,
  checkInDate,
  checkOutDate,
}) => {
  const totalPrice = pricePerNight * totalNights;
  const formattedDateddMMMyyy = (date: string) => {
    return format(new Date(date), "dd MMM yyyy");
  };
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
          <h2 className="text-xl font-semibold mb-2">{propertyName}</h2>
          <h3 className="text-lg text-gray-700 mb-1">Room: {roomName}</h3>
          <p className="text-sm text-gray-500 mb-4">{`${city}, ${province}`}</p>

          <div className="border-t border-gray-200 pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Number of guest:</span>
              <span className="font-medium text-right">{numberOfGuest}</span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="text-gray-600">Check-in date:</span>
              <span className="font-medium text-right">
                {formattedDateddMMMyyy(checkInDate)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Check-out date:</span>
              <span className="font-medium text-right">
                {formattedDateddMMMyyy(checkOutDate)}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="text-gray-600">Price per night</span>
              <span className="font-medium text-right">
                Rp {pricePerNight.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Nights</span>
              <span className="text-right">{totalNights}</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg pt-2 border-t border-gray-200">
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
