import React from "react";

const StartupCard = ({ startup }: { startup: any }) => {
  return(
    <div className="w-full h-36 rounded-md bg-secondary-bg border-secondary-border flex flex-col items-center justify-center text-primary-text">
        <p>{startup.id}</p>
        <p>{startup.name}</p>
        <p>{startup.description}</p>
    </div>
  )
};

export default StartupCard;
