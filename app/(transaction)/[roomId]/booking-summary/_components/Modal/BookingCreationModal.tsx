import React from "react";
import { Loader2, CheckCircle, CreditCard, XCircle } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface BookingCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  isCreating: boolean;
  isSuccess: boolean;
  error: string | null;
}

const BookingCreationModal: React.FC<BookingCreationModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  isCreating,
  isSuccess,
  error,
}) => {
  React.useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, onComplete]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <div className="flex flex-col items-center justify-center p-4">
          {isCreating && (
            <>
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
              <p className="mt-4 text-center">
                Your booking is currently being made...
              </p>
            </>
          )}
          {isSuccess && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500" />
              <p className="mt-4 text-center">Booking created successfully!</p>
              <CreditCard className="h-16 w-16 text-primary mt-4" />
              <p className="mt-4 text-center">
                Preparing your payment details...
              </p>
            </>
          )}
          {error && (
            <>
              <XCircle className="h-16 w-16 text-red-500" />
              <p className="mt-4 text-center">Error creating booking</p>
              <p className="mt-2 text-center text-red-600">{error}</p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingCreationModal;
