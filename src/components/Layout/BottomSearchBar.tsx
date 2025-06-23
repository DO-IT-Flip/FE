import React from "react";
import UploadIcon from "@icons/system/upload.svg?url";
import S_Btn from "@components/Button/s_btn";
import { COLORS } from "@assets/styles/gray_color/gray_color";

export default function BottomSearchBar() {
  return (
    <div
      style={{
        position: "absolute",
        left: 114,
        top: 960,
        width: 1744,
        height: 120,
      }}
    >
      {/* placeholder 박스 */}
      <div
        style={{
          position: "absolute",
          left: 490,
          top: 34,
          width: 744,
          height: 52,
          backgroundColor: COLORS.gray6,
          borderRadius: 9999,
          paddingLeft: 16,
          paddingRight: 16,
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: COLORS.gray4,
            fontSize: "16px",
            fontWeight: 600,
            marginLeft: 12,
          }}
        >
          EX) 05월/01일/15시50분/커피챗
        </span>
        <img
          src={UploadIcon}
          alt="upload"
          style={{
            width: 32,
            height: 32,
            marginLeft: "auto",
            marginRight: 8,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 1628,
          top: 42,
        }}
      >
        <S_Btn
          text="태그"
          style={{
            backgroundColor: "transparent",
          }}
          textStyle={{
            color: COLORS.gray3,
            fontSize: "12px",
            fontWeight: 500,
          }}
        />
      </div>
    </div>
  );
}
