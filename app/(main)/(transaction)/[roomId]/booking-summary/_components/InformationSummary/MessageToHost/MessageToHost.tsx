import React from "react";
import { MessageCircle } from "lucide-react";

type MessageToHostProps = {
  value: string;
  onChange: (message: string) => void;
  onClear: () => void;
  maxLength: number;
};

export const MessageToHost: React.FC<MessageToHostProps> = ({
  value,
  onChange,
  onClear,
  maxLength
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  return (
    <div className="mt-8 py-4 border-b-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Say hello to your host
        </h2>
        <MessageCircle size={18} className="inline-block mr-2" />
      </div>
      <textarea
        id="message"
        value={value}
        onChange={handleChange}
        placeholder="Let your host know a little about yourself and why you're coming"
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-primary resize-none"
        rows={5}
      />
      <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
        <span>
          {value.length}/{maxLength} characters
        </span>
        {value.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-primary hover:text-pink-700 focus:outline-none"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageToHost;