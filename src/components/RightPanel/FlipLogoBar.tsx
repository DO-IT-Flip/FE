import React from "react";
import flipLogo from "@logo/gray6_logo.svg?url";

const FlipLogoBar = () => {
  return (
    <div className="w-[62px] bg-white flex items-center justify-center pr-[12px]">
      <img src={flipLogo} alt="Flip Logo" className="w-52 h-52" />
    </div>
  );
};

export default FlipLogoBar;
