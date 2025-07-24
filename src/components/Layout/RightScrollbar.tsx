import React, { useEffect, useState } from "react";
import ScrollActive from "@icons/system/scroll_active.svg?url";
import ScrollEnabled from "@icons/system/scroll_enabled.svg?url";

interface Props {
  containerId?: string; // optional
}

const ICON_COUNT = 5;
const SCROLL_TARGET_CANDIDATES = ["search-scroll-target", "default-scroll-target", "scroll-area"];

export default function RightScrollbar({ containerId }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [targetId, setTargetId] = useState("");

  // containerId가 없으면 자동으로 유효한 대상 찾아서 사용
  useEffect(() => {
    if (!containerId) {
      for (const id of SCROLL_TARGET_CANDIDATES) {
        if (document.getElementById(id)) {
          setTargetId(id);
          return;
        }
      }
    } else {
      setTargetId(containerId);
    }
  }, [containerId]);

  // 스크롤 감지
  useEffect(() => {
    if (!targetId) return;
    const container = document.getElementById(targetId);
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const ratio = scrollTop / (scrollHeight - clientHeight);
      const index = Math.min(ICON_COUNT - 1, Math.floor(ratio * ICON_COUNT));
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [targetId]);

  // 클릭 시 해당 section으로 스크롤 이동
  const handleClick = (idx: number) => {
    const section = document.getElementById(`section-${idx}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
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
