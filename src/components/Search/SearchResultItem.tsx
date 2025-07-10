import React from "react";
import LocationIcon from "@icons/system/location.svg?react";
import GroupIcon from "@icons/system/group.svg?react";
import DotIcon from "@icons/system/dot_horizontal.svg?url";
import schoolIcon from "@icons/tag/school.svg?url";
import CircleAvatar from "@components/Avatar/CircleAvatar";
import { TYPOGRAPHY } from "@styles/typography";
import { COLORS } from "@styles/gray_color";

interface SearchResultItemProps {
  date: string;
  tag: string;
  title: string;
  time: string;
  location: string;
  with: string;
}

export default function SearchResultItem({
  date,
  tag,
  title,
  time,
  location,
  with: withText,
}: SearchResultItemProps) {
  return (
    <div className="flex justify-between mt-12 ml-4 border-b border-gray-100">
      <div className="flex">
        <div className="mr-4">
          <CircleAvatar
            size={92}
            selectedIcon={
              <img
                src={schoolIcon}
                alt="학교 아이콘"
                className="w-10 h-10 block translate-y-[-7px]"
              />
            }
          />
        </div>

        <div className="flex flex-col">
          <div
            className="flex gap-x-2"
            style={{ ...TYPOGRAPHY.Headline2, color: COLORS.gray2 }}
          >
            <span>{date}</span>
            <span>{tag}</span>
          </div>

          <p className="mb-1 text-[24px] font-semibold text-[#999999]">
            <span className="text-gray-900">{title}</span>자원관리
          </p>

          <span className="text-[20px] font-medium text-[#D8D8D8]">{time}</span>
        </div>
      </div>

      <div className="flex flex-col items-end justify-end gap-y-10">
        <button
          type="button"
          aria-label="메뉴 열기"
          className="flex items-center justify-center w-8 h-8"
        >
          <img
            src={DotIcon}
            alt="메뉴 아이콘"
            className="w-5 h-5 pointer-events-none"
          />
        </button>

        <div className="flex gap-x-2">
          <div className="flex items-center gap-x-1">
            <LocationIcon
              width={20}
              height={20}
              fill={COLORS.gray5}
              className="pointer-events-none"
            />
            <span style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray5 }}>
              {location}
            </span>
          </div>

          <div className="flex items-center gap-x-1">
            <GroupIcon
              width={20}
              height={20}
              fill={COLORS.gray5}
              className="pointer-events-none"
            />
            <span  style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray5 }}>
              {withText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
