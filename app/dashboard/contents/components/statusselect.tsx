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
      className="select border border-secondary-strongerborder bg-[#1a1a1a] w-full p-1.5 mt-2 rounded-md mr-2 text-sm"
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
