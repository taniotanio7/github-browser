import React, { useEffect } from "react";

const UnhandledError = ({ error }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      handleRefresh();
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  function handleRefresh() {
    window.location.reload();
  }

  return (
    <div>
      <p>An unknown error happened.</p>
      <p>Error name: {error.toString()}</p>
      <p>Refreshing the page in 10 seconds...</p>
      <button onClick={handleRefresh}>Refresh now</button>
    </div>
  );
};

export default UnhandledError;
