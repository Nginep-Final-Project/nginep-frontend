// components/CancelConfirmationModal.tsx
import React from "react";
import { X } from "lucide-react";

interface CancelConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
}

const CancelConfirmationModal: React.FC<CancelConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isPending,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Cancel Booking</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <p className="mb-6">Are you sure you want to cancel this booking?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 w-20 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            disabled={isPending}
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 w-20 bg-primary text-white rounded-lg hover:bg-red-600 transition-colors"
            disabled={isPending}
          >
            {isPending ? "Cancelling..." : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelConfirmationModal;
