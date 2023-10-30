import React from "react";

/**
 * The `JustifyContent` function is a React component that renders an article element with flexbox
 * properties to center its content horizontally and vertically, and allows for customizing the width
 * and background color.
 */
export default function JustifyContent({ width = 1200, children }) {
  return (
    <article className={`flex justify-center items-center w-full`}>
      <div style={{ maxWidth: width }} className="flex flex-col w-full h-min">
        {children}
      </div>
    </article>
  );
}
