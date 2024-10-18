import React from "react";
import { Loader2 } from "lucide-react";

const BookingSummaryLoadingScreen: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="mt-4 text-center text-lg">
          Preparing your booking summary...
        </p>
      </div>
    </div>
  );
};

export default BookingSummaryLoadingScreen;
