import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

interface UploadProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  isUploading: boolean;
  isSuccess: boolean;
  error: string | null;
}

const UploadProofModal: React.FC<UploadProofModalProps> = ({
  isOpen,
  onClose,
  isUploading,
  isSuccess,
  error,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <div className="flex flex-col items-center justify-center p-4">
          {isUploading && (
            <>
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
              <p className="mt-4 text-center text-lg">
                Uploading proof of payment...
              </p>
            </>
          )}
          {isSuccess && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500" />
              <p className="mt-4 text-center text-lg">
                Proof of payment uploaded successfully!
              </p>
              <p className="mt-2 text-center text-gray-600">
                Redirecting to bookings page...
              </p>
            </>
          )}
          {error && (
            <>
              <XCircle className="h-16 w-16 text-red-500" />
              <p className="mt-4 text-center text-lg">
                Error uploading proof of payment
              </p>
              <p className="mt-2 text-center text-red-600">{error}</p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadProofModal;
