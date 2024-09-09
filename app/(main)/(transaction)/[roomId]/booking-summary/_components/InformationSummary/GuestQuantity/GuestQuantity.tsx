import React from "react";
import { Plus, Minus, Users } from "lucide-react";

type GuestQuantityProps = {
  value: number;
  onChange: (value: number) => void;
  maxGuests: number;
};

export const GuestQuantity: React.FC<GuestQuantityProps> = ({
  value,
  onChange,
  maxGuests,
}) => {
  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (value < maxGuests) {
      onChange(value + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (value > 1) {
      onChange(value - 1);
    }
  };

  return (
    <div className="py-4 border-b-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Number of Guests</h2>
        <Users size={18} className="inline-block mr-2" />
      </div>
      <div className="flex items-center border rounded-md overflow-hidden">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= 1}
          className="p-4 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus size={18} />
        </button>
        <div className="flex-1 px-4 py-2 text-center">
          <Users size={18} className="inline-block mr-2" />
          <span>
            {value} guest{value !== 1 ? "s" : ""}
          </span>
        </div>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= maxGuests}
          className="p-4 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={18} />
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Maximum {maxGuests} guest{maxGuests !== 1 ? "s" : ""}
      </p>
    </div>
  );
};

export default GuestQuantity;