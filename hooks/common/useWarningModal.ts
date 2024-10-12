import { useState, useEffect, useCallback } from "react";
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

  const openWarning = useCallback(() => {
    setShowWarning(true);
  }, []);

  const closeWarning = useCallback(() => {
    setShowWarning(false);
  }, []);

  return { showWarning, openWarning, closeWarning };
};

export default useWarningModal;
