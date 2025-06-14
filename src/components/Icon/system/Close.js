import * as React from "react";
const SvgClose = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 25 24"
    {...props}
  >
    <path
      fill="#D9D9D9"
      d="M24.82 12c0 6.627-5.373 12-12 12-6.628 0-12-5.373-12-12s5.372-12 12-12c6.627 0 12 5.373 12 12"
    />
    <path
      fill="#F9F9F9"
      d="M8.577 7.757a1 1 0 0 1 1.414 0l7.071 7.071a1 1 0 0 1-1.414 1.414l-7.07-7.07a1 1 0 0 1 0-1.415"
    />
    <path
      fill="#F9F9F9"
      d="M17.062 7.757a1 1 0 0 1 0 1.414l-7.07 7.071a1 1 0 1 1-1.415-1.414l7.071-7.071a1 1 0 0 1 1.414 0"
    />
  </svg>
);
export default SvgClose;
