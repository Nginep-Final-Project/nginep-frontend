import React from "react";
import { CreditCard, Wallet } from "lucide-react";
import WarningModal from "../../../_components/Modal/WarningModal";
import useWarningModal from "@/hooks/useWarningModal";
import ValidatedNavigation from "../../../_components/Navigation/ValidatedNavigation";
import Button from "../../../_components/Button/Button";
import AutomaticPaymentOptions from "../AutomaticPaymentOptions/AutomaticPaymentOptions";
import { BookingData } from "@/types/bookingData";
import PaymentInformation from "../PaymentInformation.tsx/PaymentInformation";

const paymentMethods = [
  { id: "manual_payment", name: "Manual Transfer", icon: Wallet },
  { id: "automatic_payment", name: "Automatic Payment", icon: CreditCard },
];

interface PaymentOptionsProps {
  selectedMethod: string | undefined;
  selectedSpecificMethod: string | undefined;
  onMethodSelect: (methodId: string, specificPaymentMethod?: string) => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  selectedMethod,
  selectedSpecificMethod,
  onMethodSelect,
}) => {
  const { showWarning, closeWarning } = useWarningModal();

  const handleMethodSelect = (methodId: string) => {
    if (methodId === "automatic_payment") {
      onMethodSelect(methodId, selectedSpecificMethod);
    } else {
      onMethodSelect(methodId);
    }
  };

  const handleAutomaticMethodSelect = (specificMethod: string) => {
    onMethodSelect("automatic_payment", specificMethod);
  };

  const requiredFields: (keyof BookingData)[] = [
    "guestCount",
    "checkIn",
    "checkOut",
    "paymentMethod",
  ];

  if (selectedMethod === "automatic_payment") {
    requiredFields.push("specificPaymentMethod" as keyof BookingData);
  }

  return (
    <div className="w-full lg:w-2/3">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Options</h2>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedMethod === method.id
                  ? "border-pink-500 bg-pink-50"
                  : "border-gray-200 hover:border-pink-300"
              }`}
              onClick={() => handleMethodSelect(method.id)}
            >
              <method.icon className="w-6 h-6 mr-4" />
              <span className="text-lg">{method.name}</span>
            </div>
          ))}
        </div>

        <PaymentInformation selectedMethod={selectedMethod} />

        {selectedMethod === "automatic_payment" && (
          <AutomaticPaymentOptions
            selectedPayment={selectedSpecificMethod}
            onPaymentSelect={handleAutomaticMethodSelect}
          />
        )}

        <ValidatedNavigation
          to="/payment-process"
          requiredFields={requiredFields}
          useRoomId={true}
        >
          <Button>Proceed to Payment</Button>
        </ValidatedNavigation>
      </div>
      <WarningModal
        isOpen={showWarning}
        onClose={closeWarning}
        title="Check Inputs"
        message="Please ensure to fill-out the number of guests, check-in and check-out dates, and the payment method before proceeding"
      />
    </div>
  );
};

export default PaymentOptions;
