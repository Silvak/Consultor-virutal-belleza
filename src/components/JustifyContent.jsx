import React from "react";

export default function JustifyContent({ width = 1200, children }) {
  return (
    <div className="flex justify-center w-full">
      <div className={`w-[1200px] py-16`}>{children}</div>
    </div>
  );
}
