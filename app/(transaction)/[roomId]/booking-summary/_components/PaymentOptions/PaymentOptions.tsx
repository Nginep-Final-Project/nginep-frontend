import React from "react";
import { CreditCard, Wallet } from "lucide-react";
import AutomaticPaymentOptions from "./AutomaticPaymentOptions";
import BookingNavigationButton from "../../../_components/Navigation/BookingNavigationButton";
import { PaymentType } from "@/types/bookingPaymentDetails";
import PaymentInformation from "./PaymentInformation";

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
  isCreatingBooking,
}) => {
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

        <BookingNavigationButton
          onClick={onCreateBooking}
          isLoading={isCreatingBooking}
        >
          Create Your Booking and Proceed to Payment
        </BookingNavigationButton>
      </div>
    </div>
  );
};

export default PaymentOptions;
