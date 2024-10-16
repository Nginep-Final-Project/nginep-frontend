import React from "react";
import { CreditCard, Wallet, Loader2 } from "lucide-react";
import AutomaticPaymentOptions from "./AutomaticPaymentOptions";
import { PaymentType } from "@/types/payment";
import PaymentInformation from "./PaymentInformation";
import Button from "../../../_components/Button/Button";

const paymentMethods = [
  { id: PaymentType.MANUAL_PAYMENT, name: "Manual Transfer", icon: Wallet },
  {
    id: PaymentType.AUTOMATIC_PAYMENT,
    name: "Automatic Payment",
    icon: CreditCard,
  },
];

interface PaymentOptionsProps {
  selectedMethod: PaymentType;
  selectedSpecificMethod: string;
  onMethodSelect: (
    methodId: PaymentType,
    specificPaymentMethod?: string
  ) => void;
  onCreateBooking: () => void;
  isCreatingBooking: boolean;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  selectedMethod,
  selectedSpecificMethod,
  onMethodSelect,
  onCreateBooking,
  isCreatingBooking = false,
}) => {
  return (
    <div className="w-full">
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
              onClick={() => onMethodSelect(method.id)}
            >
              <method.icon className="w-6 h-6 mr-4" />
              <span className="text-lg">{method.name}</span>
            </div>
          ))}
        </div>

        <PaymentInformation selectedMethod={selectedMethod} />

        {selectedMethod === PaymentType.AUTOMATIC_PAYMENT && (
          <AutomaticPaymentOptions
            selectedPayment={selectedSpecificMethod}
            onPaymentSelect={(specificMethod) =>
              onMethodSelect(PaymentType.AUTOMATIC_PAYMENT, specificMethod)
            }
          />
        )}

        <Button
          onClick={onCreateBooking}
          disabled={isCreatingBooking}
          className="w-full mt-6"
        >
          {isCreatingBooking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
              Processing...
            </>
          ) : (
            "Create Your Booking and Proceed to Payment"
          )}
        </Button>
      </div>
    </div>
  );
};

export default PaymentOptions;
