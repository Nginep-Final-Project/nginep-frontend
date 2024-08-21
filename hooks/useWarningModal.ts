import { useState, useEffect } from "react";
import globalEventEmitter from "@/utils/events";

const useWarningModal = () => {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const handleShowWarning = () => {
      setShowWarning(true);
    };

    globalEventEmitter.on("showNavigationWarning", handleShowWarning);

    return () => {
      globalEventEmitter.off("showNavigationWarning", handleShowWarning);
    };
  }, []);

  const closeWarning = () => setShowWarning(false);

  return { showWarning, closeWarning };
};

export default useWarningModal;
