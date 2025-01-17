import React from "react";

const LinkCard = ({ link }: { link: any }) => {
  return(
    <div className="w-full h-36 rounded-md bg-secondary-bg border-secondary-border flex flex-col items-center justify-center text-primary-text">
        <p>{link.id}</p>
        <p>{link.title}</p>
        <p>{link.link}</p>
    </div>
  )
};

export default LinkCard;
