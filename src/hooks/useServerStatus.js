import { useState, useEffect } from "react";

export const useServerStatus = () => {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  const checkServerStatus = async () => {
    if (isChecking) return;

    setIsChecking(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/health`
      );
      if (response.ok) {
        setStatus("succeeded");
        setInitialCheckDone(true);
      } else {
        throw new Error("Server is not responding");
      }
    } catch (error) {
      setStatus("failed");
      setError(error.message);
    } finally {
      setIsChecking(false);
      setInitialCheckDone(true);
    }
  };

  useEffect(() => {
    checkServerStatus();
    const intervalId = setInterval(checkServerStatus, 5000); // Check every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return { status, error, isChecking, initialCheckDone, checkServerStatus };
};
