import React, { useState, useEffect } from "react";
import { RESERVE_BOOKING_DATA } from "@/utils/constanta";
import MessageToHost from "./MessageToHost";

const InformationSummary: React.FC = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem(RESERVE_BOOKING_DATA);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setMessage(parsedData.userMessage || "");
    }
  }, []);

  const handleMessageChange = (newMessage: string) => {
    setMessage(newMessage);
    updateLocalStorage(newMessage);
  };

  const handleClearMessage = () => {
    setMessage("");
    updateLocalStorage("");
  };

  const updateLocalStorage = (newMessage: string) => {
    const storedData = localStorage.getItem(RESERVE_BOOKING_DATA);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const updatedData = { ...parsedData, userMessage: newMessage };
      localStorage.setItem(RESERVE_BOOKING_DATA, JSON.stringify(updatedData));
    }
  };

  return (
    <div className="w-full">
      <div className="p-6">
        <div className="space-y-8">
          <MessageToHost
            value={message}
            onChange={handleMessageChange}
            onClear={handleClearMessage}
            maxLength={500}
          />
        </div>
      </div>
    </div>
  );
};

export default InformationSummary;
