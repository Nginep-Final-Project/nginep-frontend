import React, { useState, useEffect } from "react";
import { AlertCircle, CreditCard, Wallet } from "lucide-react";
import { BookingPaymentDetails } from "@/types/bookingPaymentDetails";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AutomaticPaymentProps {
  bookingDetails: BookingPaymentDetails;
}

const AutomaticPayment: React.FC<AutomaticPaymentProps> = ({
  bookingDetails,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const expiryTime = new Date(bookingDetails.expiryTime).getTime();
      const remaining = Math.max(0, expiryTime - now);
      setTimeRemaining(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [bookingDetails.expiryTime]);

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const renderPaymentDetails = () => {
    switch (bookingDetails.specificPaymentType?.toLowerCase()) {
      case "bca":
      case "bni":
      case "bri":
      case "permata":
        return (
          <div className="space-y-2">
            <p>
              <strong>Bank:</strong>{" "}
              {bookingDetails.specificPaymentType.toUpperCase()}
            </p>
            <p>
              <strong>Virtual Account Number:</strong> {bookingDetails.vaNumber}
            </p>
          </div>
        );
      case "mandiri":
        return (
          <div className="space-y-2">
            <p>
              <strong>Bank:</strong> Mandiri
            </p>
            <p>
              <strong>Bill Key:</strong> {bookingDetails.billKey}
            </p>
            <p>
              <strong>Biller Code:</strong> {bookingDetails.billerCode}
            </p>
          </div>
        );
      case "e-wallet/qris":
        return (
          <div className="space-y-2">
            <p>
              <strong>Payment Method:</strong> E-Wallet / QRIS
            </p>
            {bookingDetails.qrisUrl && (
              <div className="mt-4">
                <Image
                  src={bookingDetails.qrisUrl}
                  alt="QRIS Code"
                  width={200}
                  height={200}
                />
              </div>
            )}
          </div>
        );
      default:
        return <p>Payment details not available</p>;
    }
  };

  return (
    <div className="w-full lg:w-2/3 p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Automatic Payment</h2>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2" />
            Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Amount to Pay
              </p>
              <p className="text-2xl font-bold text-pink-600">
                Rp {bookingDetails.finalPrice.toLocaleString()}
              </p>
            </div>
            {renderPaymentDetails()}
          </div>
        </CardContent>
      </Card>

      <div
        className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
        role="alert"
      >
        <div className="flex">
          <AlertCircle className="h-6 w-6 mr-2" />
          <div>
            <p className="font-bold">Time Remaining</p>
            <p>
              You have {formatTime(timeRemaining)} left to complete the payment.
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wallet className="mr-2" />
            Payment Instructions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Ensure you have sufficient funds in your account</li>
            <li>
              If you encounter any issues, please contact our support team
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomaticPayment;
