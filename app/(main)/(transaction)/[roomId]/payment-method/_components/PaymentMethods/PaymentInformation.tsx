import React from "react";

interface PaymentInformationProps {
  selectedMethod: string | undefined;
}

const PaymentInformation: React.FC<PaymentInformationProps> = ({
  selectedMethod,
}) => {
  if (!selectedMethod) return null;

  if (selectedMethod === "manual_payment") {
    return (
      <div className="mt-4 p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">
          Manual Transfer Information
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Transfer to the following bank account: XXXX-XXXX-XXXX-XXXX</li>
          <li>You will have 1 hour to complete the payment</li>
          <li>
            You will be requested to upload the proof of payment on the next
            page
          </li>
          <li>
            Please ensure the transfer amount matches the total on your booking
          </li>
        </ul>
      </div>
    );
  } else if (selectedMethod === "automatic_payment") {
    const paymentOptions = [
      "Virtual Account",
      "Credit/Debit Card",
      "QRIS",
      "GoPay",
      "ShopeePay",
      "Indomaret",
      "Alfa Group",
      "Akulaku PayLater",
      "Kredivo",
    ];

    return (
      <div className="mt-4 p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">
          Automatic Payment Information
        </h3>
        <p className="mb-2">
          You will be redirected to our secure payment gateway to complete your
          payment.
        </p>
        <p className="mb-2">The following payment options are available:</p>
        <ul className="grid grid-cols-2 gap-2">
          {paymentOptions.map((option, index) => (
            <li key={index} className="flex items-center">
              <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
              {option}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
};

export default PaymentInformation;
