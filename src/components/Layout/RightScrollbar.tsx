import React, { useEffect, useState } from "react";
import ScrollActive from "@icons/system/scroll_active.svg?url";
import ScrollEnabled from "@icons/system/scroll_enabled.svg?url";

interface Props {
  containerId?: string; // default: "scroll-area"
}

const ICON_COUNT = 5;

export default function RightScrollbar({ containerId = "scroll-area" }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const ratio = scrollTop / (scrollHeight - clientHeight);
      const index = Math.min(ICON_COUNT - 1, Math.floor(ratio * ICON_COUNT));
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerId]);

  const handleClick = (idx: number) => {
    const target = document.getElementById(`section-${idx}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="absolute right-0 top-0 flex flex-col items-center"
      style={{
        width: 62,
        height: 108,
        paddingTop: 494,
        paddingBottom: 494,
        zIndex: 999,
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
              onClick={() => handleClick(idx)}
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
