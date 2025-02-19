"use client";
import React from "react";

const StatusSelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: any;
}) => {
  return (
    <select
      className="select border text-lightprimary-text dark:text-primary-text border-lightsecondary-strongerborder bg-lightprimary-bg dark:border-secondary-strongerborder dark:bg-primary-bg w-full p-1 lg:p-1.5 mt-1 lg:mt-2 rounded-md mr-2 text-xs lg:text-sm"
      value={value}
      onChange={onChange}
    >
      <option value="" disabled>
        Pick Status
      </option>
      <option value="building">🏗️ Building</option>
      <option value="active">🟢 Active</option>
      <option value="break">☕️ On Hold</option>
      <option value="for-sale">🤝 For Sale</option>
      <option value="acquired">💰 Acquired</option>
      <option value="discontinued">❌ Discontinued</option>
    </select>
  );
};

export default StatusSelect;
