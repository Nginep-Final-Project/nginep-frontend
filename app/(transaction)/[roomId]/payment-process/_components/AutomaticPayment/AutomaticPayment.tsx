import React from "react";
import { AlertCircle, CreditCard } from "lucide-react";
import Button from "../../../_components/Button/Button";

interface AutomaticPaymentProps {
  roomId: string;
  basePrice: number;
}

const AutomaticPayment: React.FC<AutomaticPaymentProps> = ({
  roomId,
  basePrice,
}) => {
  const handlePayment = () => {
    // TODO: Implement payment gateway integration
  };

  return (
    <div className="w-full lg:w-2/3 p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Automatic Payment</h2>

      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="font-semibold">Total Amount to Pay:</p>
        <p className="text-2xl text-pink-600">Rp {basePrice}</p>
      </div>

      <div
        className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
        role="alert"
      >
        <div className="flex">
          <AlertCircle className="h-6 w-6 mr-2" />
          <div>
            <p className="font-bold">Time Remaining</p>
            <p>
              You have xxx time remaining left to upload your proof of payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomaticPayment;
