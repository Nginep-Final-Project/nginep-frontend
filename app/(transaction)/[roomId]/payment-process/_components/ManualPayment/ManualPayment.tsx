import React, { useState, useEffect } from "react";
import { Upload, AlertCircle } from "lucide-react";
import useBookingData from "@/hooks/useBookingData";

const ManualTransferPayment: React.FC<{
  roomId: string;
  basePrice: number;
}> = ({ roomId, basePrice }) => {
  const { bookingData } = useBookingData(roomId);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 1024 * 1024) {
        setError("File size must be less than 1MB");
        setFile(null);
      } else if (!["image/jpeg", "image/png"].includes(selectedFile.type)) {
        setError("File must be a JPG or PNG image");
        setFile(null);
      } else {
        setError(null);
        setFile(selectedFile);
      }
    }
  };

  const handleUpload = () => {
    if (file) {
      console.log("Uploading file:", file);
    }
  };

  return (
    <div className="w-full lg:w-2/3 p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Manual Transfer Payment</h2>

      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="font-semibold">Total Amount to Pay:</p>
        <p className="text-2xl text-pink-600">
          Rp {basePrice.toLocaleString()}
        </p>
      </div>

      <div>
        <p className="font-semibold">Bank Account Details:</p>
        <p>Bank Name: Nginep Punya Bank</p>
        <p>Account Number: 12313123</p>
        <p>Account Holder: Nginep Sekejap</p>
      </div>

      <div
        className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
        role="alert"
      >
        <div className="flex">
          <AlertCircle className="h-6 w-6 mr-2" />
          <div>
            <p className="font-bold">Time Remaining</p>
            <p>
              You have {formatTime(timeRemaining)} left to upload your proof of
              payment.
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="font-semibold mb-2">Upload Proof of Payment:</p>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-pink-50 file:text-pink-700
            hover:file:bg-pink-100"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || timeRemaining <= 0}
        className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        <Upload className="inline-block mr-2 h-4 w-4" /> Upload Proof of Payment
      </button>

      <div className="text-sm text-gray-600">
        <p>Please ensure:</p>
        <ul className="list-disc list-inside">
          <li>The transfer amount matches the total amount to pay</li>
          <li>The transfer is made to the correct bank account</li>
          <li>The proof of payment image is clear and readable</li>
          <li>Keep the original proof of payment for your records</li>
        </ul>
      </div>
    </div>
  );
};

export default ManualTransferPayment;
