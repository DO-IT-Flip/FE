import React, { useEffect, useState } from "react";
import ScrollActive from "@icons/system/scroll_active.svg?url";
import ScrollEnabled from "@icons/system/scroll_enabled.svg?url";

const ICON_COUNT = 5;

export default function RightScrollbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeContainerId, setActiveContainerId] = useState<string | null>(null);

  useEffect(() => {
    const containerIds = ["calendar-scroll-container", "sidebar-scroll-container"];

    // 마우스 진입 시 activeContainerId 설정
    containerIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const handleEnter = () => setActiveContainerId(id);
      el.addEventListener("mouseenter", handleEnter);
    });

    // 스크롤 추적 핸들러
    const handleScroll = () => {
      if (!activeContainerId) return;

      const container = document.getElementById(activeContainerId);
      if (!container) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const ratio = scrollTop / (scrollHeight - clientHeight);
      const index = Math.min(ICON_COUNT - 1, Math.floor(ratio * ICON_COUNT));
      setActiveIndex(index);
    };

    // 모든 컨테이너에 scroll 이벤트 연결
    containerIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("scroll", handleScroll);
    });

    return () => {
      containerIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          el.removeEventListener("scroll", handleScroll);
          el.removeEventListener("mouseenter", () => {});
        }
      });
    };
  }, [activeContainerId]);

  const handleClick = (idx: number) => {
    if (!activeContainerId) return;
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
