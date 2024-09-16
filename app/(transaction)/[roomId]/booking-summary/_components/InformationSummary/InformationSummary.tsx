import { GuestQuantity } from "./GuestQuantity/GuestQuantity";
import { MessageToHost } from "./MessageToHost/MessageToHost";
import Dates from "./Dates/Dates";
import WarningModal from "../../../_components/Modal/WarningModal";
import ValidatedNavigation from "../../../_components/Navigation/ValidatedNavigation";
import Button from "../../../_components/Button/Button";
import useBookingData from "@/hooks/booking/useBookingData";
import useWarningModal from "@/hooks/common/useWarningModal";

const InformationSummary = ({ roomId }: { roomId: string }) => {
  const { bookingData, updateBookingData } = useBookingData(roomId);
  const { showWarning, closeWarning } = useWarningModal();

  const handleGuestChange = (newCount: number) => {
    updateBookingData("guestCount", newCount);
  };

  const handleDatesChange = (newCheckIn: string, newCheckOut: string) => {
    updateBookingData("checkIn", newCheckIn);
    updateBookingData("checkOut", newCheckOut);
  };

  const handleMessageChange = (newMessage: string) => {
    updateBookingData("message", newMessage);
  };

  const handleClearMessage = () => {
    updateBookingData("message", "");
  };

  return (
    <div className="w-full lg:w-2/3">
      <div className="p-6">
        <div className="space-y-8">
          <GuestQuantity
            value={bookingData.guestCount || 1}
            onChange={handleGuestChange}
            maxGuests={8}
          />
          <Dates
            checkIn={bookingData.checkIn}
            checkOut={bookingData.checkOut}
            onChange={handleDatesChange}
          />
          <MessageToHost
            value={bookingData.message}
            onChange={handleMessageChange}
            onClear={handleClearMessage}
            maxLength={500}
          />
          <ValidatedNavigation
            to="/payment-method"
            requiredFields={["checkIn", "checkOut"]}
            useRoomId={true}
          >
            <Button>Choose Payment Method</Button>
          </ValidatedNavigation>
        </div>
      </div>

      <WarningModal
        isOpen={showWarning}
        onClose={closeWarning}
        title="Check Inputs"
        message="Please ensure to fill-out the number of guests, check-in and check-out dates before proceeding"
      />
    </div>
  );
};

export default InformationSummary;
