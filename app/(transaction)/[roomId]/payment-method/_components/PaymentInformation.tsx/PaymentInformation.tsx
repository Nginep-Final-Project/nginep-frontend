import React from "react";
import { automaticPaymentOptions } from "@/data/paymentOptions";

interface PaymentInformationProps {
  selectedMethod: string | undefined;
}

const PaymentInformation: React.FC<PaymentInformationProps> = ({
  selectedMethod,
}) => {
  if (!selectedMethod) return null;

  if (selectedMethod === "MANUAL_PAYMENT") {
    return (
      <div className="mt-4 p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">
          Manual Transfer Information
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            You will be requested to manually transfer to a bank account on the
            next page
          </li>
          <li>
            You will be requested to upload the proof of payment on the next
            page
          </li>
          <li>
            You will have 1 hour to complete the payment and upload the proof of
            payment
          </li>
          <li>
            Please ensure the transfer amount matches the total on your booking
          </li>
        </ul>
      </div>
    );
  } else if (selectedMethod === "AUTOMATIC_PAYMENT") {
    const paymentOptions = automaticPaymentOptions.flatMap((category) =>
      category.methods.map((method) => method.name)
    );

    return (
      <div className="mt-4 p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">
          Automatic Payment Information
        </h3>
        <p className="mb-2">
          Choose your automatic payment option, and on the next page you will be requested to perform the payment accordingly.
        </p>
      </div>
    );
  }
  return null;
};

export default PaymentInformation;
