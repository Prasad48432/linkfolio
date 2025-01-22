"use client";
import React from "react";

const CategorySelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: any;
}) => {
  return (
    <select
      className="select border border-secondary-strongerborder bg-[#1a1a1a] w-full p-1 lg:p-1.5 mt-1 lg:mt-2 rounded-md text-xs lg:text-sm"
      value={value}
      onChange={onChange}
    >
      <option value="" disabled>
        Pick category
      </option>
      <option value="artificial-intelligence">🤖Artificial Intelligence</option>
      <option value="productivity">✍️ Productivity</option>
      <option value="education">📚 Education</option>
      <option value="no-code">🐲 No Code</option>
      <option value="social-media">💬 Social Media</option>
      <option value="e-commerce">🛍️ E-Commerce</option>
      <option value="analytics">📈 Analytics</option>
      <option value="web3">🦇 Web 3</option>
      <option value="design-tools">👓 Design Tools</option>
      <option value="developer-tools">🧑‍💻 Developer Tools</option>
      <option value="marketing">📊 Marketing</option>
      <option value="finance">💰 Finance</option>
      <option value="other">🔮 Others</option>
    </select>
  );
};

export default CategorySelect;
