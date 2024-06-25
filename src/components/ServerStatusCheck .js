import React from "react";
import { useServerStatus } from "../hooks/useServerStatus";

const ServerStatusCheck = ({ children }) => {
  const { status, error, isChecking, initialCheckDone, checkServerStatus } =
    useServerStatus();

  if (
    (status === "loading" || status === "idle") &&
    initialCheckDone === false
  ) {
    return (
      <div className="bg-slate-900 text-slate-100 min-h-screen flex flex-col items-center justify-center">
        <h1>Please wait, the server is waking up...</h1>
        <p>This may take up to 30 seconds for the first request.</p>
        {isChecking && <p>Checking server status...</p>}
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div>
        <h1>Error: {error}</h1>
        <button onClick={checkServerStatus} disabled={isChecking}>
          {isChecking ? "Retrying..." : "Retry"}
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default ServerStatusCheck;
