import React from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { automaticPaymentOptions } from "@/data/paymentOptions";

interface AutomaticPaymentOptionsProps {
  selectedPayment: string | undefined;
  onPaymentSelect: (paymentId: string) => void;
}

const AutomaticPaymentOptions: React.FC<AutomaticPaymentOptionsProps> = ({
  selectedPayment,
  onPaymentSelect,
}) => {
  const [expandedCategories, setExpandedCategories] = React.useState<string[]>([
    "E-Wallet",
  ]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="mt-4 space-y-4">
      <h3 className="text-lg font-semibold">Choose Automatic Payment Option</h3>
      {automaticPaymentOptions.map((category) => (
        <div
          key={category.category}
          className="border rounded-lg overflow-hidden"
        >
          <button
            className="w-full px-4 py-2 flex justify-between items-center bg-pink-100"
            onClick={() => toggleCategory(category.category)}
          >
            <span className="font-medium">{category.category}</span>
            {expandedCategories.includes(category.category) ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {expandedCategories.includes(category.category) && (
            <div className="p-2 space-y-2">
              {category.methods.map((method) => (
                <button
                  key={method.id}
                  className={`w-full text-left flex items-center justify-between py-2 px-3 rounded transition-colors ${
                    selectedPayment === method.id
                      ? "bg-pink-200"
                      : "hover:bg-pink-100"
                  }`}
                  onClick={() => onPaymentSelect(method.id)}
                >
                  <span>{method.name}</span>
                  <Image
                    src={method.icon}
                    alt={method.name}
                    width={60}
                    height={30}
                    style={{ objectFit: "contain" }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AutomaticPaymentOptions;
