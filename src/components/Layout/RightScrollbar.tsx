import React, { useEffect, useState } from "react";
import ScrollActive from "@icons/system/scroll_active.svg?url";
import ScrollEnabled from "@icons/system/scroll_enabled.svg?url";

const ICON_COUNT = 5;

export default function RightScrollbar() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      setActiveIndex((prev) => (prev + 1) % ICON_COUNT);
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  return (
    <div
      className="absolute right-0 top-0 flex flex-col items-center"
      style={{
        width: 62,
        height: 108,
        paddingTop: 494,
        paddingBottom: 494,
      }}
    >
      <div className="flex flex-col items-center gap-[18px]">
        {Array.from({ length: ICON_COUNT }).map((_, idx) => {
          const iconSrc = idx === activeIndex ? ScrollActive : ScrollEnabled;
          return (
            <img
              key={idx}
              src={iconSrc}
              width={30}
              height={4}
              alt={`scroll-indicator-${idx}`}
              style={{
                cursor: "pointer",
                marginLeft: 16,
                marginRight: 16,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
