import React from "react";
import { AlertCircle } from "lucide-react";
import { BookingPaymentDetails } from "@/types/bookingPaymentDetails";

interface AutomaticPaymentProps {
  bookingDetails: BookingPaymentDetails;
}

const AutomaticPayment: React.FC<AutomaticPaymentProps> = ({
  bookingDetails,
}) => {
  return (
    <div className="w-full lg:w-2/3 p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Automatic Payment</h2>

      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="font-semibold">Total Amount to Pay:</p>
        <p className="text-2xl text-pink-600">
          Rp {bookingDetails.finalPrice.toLocaleString()}
        </p>
      </div>

      <div>
        <p className="font-semibold">Payment Details:</p>
        <p>Payment Type: {bookingDetails.specificPaymentType}</p>
        {bookingDetails.vaNumber && (
          <p>Virtual Account Number: {bookingDetails.vaNumber}</p>
        )}
        {bookingDetails.billKey && <p>Bill Key: {bookingDetails.billKey}</p>}
        {bookingDetails.billerCode && (
          <p>Biller Code: {bookingDetails.billerCode}</p>
        )}
      </div>

      <div
        className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
        role="alert"
      >
        <div className="flex">
          <AlertCircle className="h-6 w-6 mr-2" />
          <div>
            <p className="font-bold">Time Remaining</p>
            <p>You have 1 hour to complete the payment.</p>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        <p>Please note:</p>
        <ul className="list-disc list-inside">
          <li>Ensure you have sufficient funds in your account</li>
          <li>Do not close this page until the payment is complete</li>
          <li>If you encounter any issues, please contact our support team</li>
        </ul>
      </div>
    </div>
  );
};

export default AutomaticPayment;
