import React from "react";
import { TYPOGRAPHY } from "@styles/typography";
import { COLORS } from "@styles/gray_color";

type Props = {
  mainText: string;
  subText: string;
};

const PhraseCard = ({ mainText, subText }: Props) => {
  return (
    <div
      className="w-[1172px] px-[39px] py-[28px] rounded-[18px] flex flex-col items-center justify-center gap-[10px] text-center"
      style={{ backgroundColor: COLORS.gray1, minHeight: "272px" }}
    >
      {/* 메인 문구 (한글) */}
      <span style={{ ...TYPOGRAPHY.Display, color: COLORS.bg }}>
        {mainText}
      </span>

      {/* 서브 문구 (영어) */}
      <span style={{ ...TYPOGRAPHY.point_text4, color: COLORS.gray4 }}>
        {subText}
      </span>
    </div>
  );
};

export default PhraseCard;
