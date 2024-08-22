import React from "react";
import { CreditCard, Wallet } from "lucide-react";
import WarningModal from "../../../_components/Modal/WarningModal";
import useWarningModal from "@/hooks/useWarningModal";
import ValidatedNavigation from "../../../_components/Navigation/ValidatedNavigation";
import PaymentInformation from "./PaymentInformation";

const paymentMethods = [
  { id: "manual_payment", name: "Manual Transfer", icon: Wallet },
  { id: "automatic_payment", name: "Automatic Payment", icon: CreditCard },
];

interface PaymentMethodsProps {
  selectedMethod: string | undefined;
  onMethodSelect: (methodId: string) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  selectedMethod,
  onMethodSelect,
}) => {
  const { showWarning, closeWarning } = useWarningModal();

  const handleMethodSelect = (methodId: string) => {
    onMethodSelect(methodId);
  };

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

        <ValidatedNavigation
          to="/payment-process"
          requiredFields={[
            "guestCount",
            "checkIn",
            "checkOut",
            "paymentMethod",
          ]}
          useRoomId={true}
        >
          <button className="mt-6 w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors">
            Proceed to Payment
          </button>
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

export default PaymentMethods;
