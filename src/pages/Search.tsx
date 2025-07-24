import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { COLORS } from "@styles/gray_color";
import { TYPOGRAPHY } from "@styles/typography";
import ScheduleSearchSection from "@components/Search/ScheduleSearchSection";
import SearchResultItem from "@components/Search/SearchResultItem";
import SearchDate from "@components/Search/SearchDate";
import AddScheduleModal from "@components/Modal/addSchedule";
import { searchSchedules } from "@api/schedule";
import { getTags } from "@src/api/tag";
import { Tag } from "@src/types/tag";

interface ScheduleItem {
  scheduleId: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  title: string;
  location: string;
  participants: string;
  color: string;
  iconId: number;
  tagId: number;
  createdAt: string;
  updatedAt: string;
  isExistTag: boolean;
  isRepeat: boolean;
}

export default function SearchPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("query") || "";

  const [currentDate, setCurrentDate] = useState(new Date());
  const [query, setQuery] = useState(initialQuery);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [results, setResults] = useState<ScheduleItem[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetch = async () => {
      if (!query.trim()) return;
      try {
        const data = await searchSchedules(query);
        setResults(data);
        const tagData = await getTags();
        setTags(tagData);
      } catch (err) {
        console.error("검색 오류", err);
      }
    };
    fetch();
  }, [query]);

  const handlePrevMonth = () => {
    const prev = new Date(currentDate);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentDate(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() + 1);
    setCurrentDate(next);
  };

  const sortedEvents = useMemo(() => {
    return [...results].sort((a, b) => {
      const dateA = new Date(a.startTime).getTime();
      const dateB = new Date(b.startTime).getTime();
      return dateA - dateB;
    });
  }, [results]);

  const highlightedDates = useMemo(
    () => sortedEvents.map((event) => new Date(event.startDate)),
    [sortedEvents]
  );

  const getTagIconPath = (iconId: number) => {
    return `../assets/icons/tag/tagIcon${iconId}.svg`;
  };

  return (
    <div className="ml-[154px] mr-[98px] mt-[54px] flex flex-col flex-1 min-h-0 h-full">
      {/* 상단 검색바 영역 */}
      <ScheduleSearchSection
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onAddClick={() => setIsAddModalOpen(true)}
        searchValue={query}
        onSearchChange={(e) => setQuery(e.target.value)}
      />

      {/* 회색 바 포함된 상단 정보 */}
      <div className="mt-12 mb-6 flex flex-col">
        <span style={{ color: COLORS.gray5, ...TYPOGRAPHY.Headline2 }}>
          검색결과 {results.length}건
        </span>
        <span style={{ color: COLORS.gray2, ...TYPOGRAPHY.Display }}>
          {query || "검색어 없음"}
        </span>
        <div
          className="mt-2 w-full"
          style={{ height: "2px", backgroundColor: COLORS.gray6 }}
        />
      </div>

      {/* 아래 영역: 리스트 + 달력 */}
      <div className="flex flex-1 gap-[60px] min-h-0 h-full">
        {/* 왼쪽: 스크롤 가능한 결과 목록 */}
        <div
          id="search-scroll-target"
          className="flex-1 flex flex-col gap-[21px] overflow-y-auto scrollbar-hide min-h-0 h-full"
          style={{
            paddingBottom: "96px",
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none",
          }}
        >
          {sortedEvents.map((event) => (
            <SearchResultItem
              key={event.scheduleId}
              date={event.startDate}
              category={
                event.tagId
                  ? `${tags.find((tag) => tag.tagId === event.tagId)?.name}`
                  : ""
              }
              title={event.title}
              time={`${event.startTime} ~ ${event.endTime}`}
              location={event.location}
              with={event.participants}
              iconId={event.iconId}
              tagId={event.tagId}
              color={event.color}
              keyword={query}
              scheduleId={event.scheduleId}
            />
          ))}
        </div>

        {/* 오른쪽: 고정 달력 */}
        <div className="w-[356px] flex-none sticky top-[180px]">
          <SearchDate highlightedDates={highlightedDates} />
        </div>
      </div>

      <AddScheduleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(data) => {
          console.log("추가된 일정:", data);
          setIsAddModalOpen(false);
        }}
      />
    </div>
  );
}
