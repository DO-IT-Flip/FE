import React from "react";
import { useState } from "react";
import { COLORS } from "@assets/styles/gray_color/gray_colors";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface LoginModalProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
  onSubmit: (data: { userId: string; password: string }) => void;
}

export default function LoginModal({
  onClose,
  onSwitchToRegister,
  onSubmit,
}: LoginModalProps) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const isEmailValid = userId.includes("@") && userId.includes(".");
  const isFormValid = isEmailValid && password.length > 0;

  const handleSubmit = () => {
    if (!isFormValid) return;
    onSubmit({ userId, password });
  };

  const commonInputStyle = {
    borderColor: COLORS.gray5,
    backgroundColor: "transparent",
    color: COLORS.gray2,
  };

  return (
    <div
      className="fixed z-50"
      style={{
        width: "530px",
        height: "626px",
        backgroundColor: COLORS.bg,
        borderRadius: "12px",
        padding: "40px 36px",
      }}
    >
      {/* 로고 + 타이틀 */}{" "}
      <div className="flex flex-col items-center">
        <img src="/logo.png" alt="logo" className="w-10 h-10 mb-2" />
        <h2 className="text-xl font-bold" style={{ color: COLORS.gray2 }}>
          로그인
        </h2>
      </div>
      {/* 입력 영역 */}
      <div className="mt-10 flex flex-col gap-6">
        {/* 아이디 */}
        <div>
          <label className="text-sm font-medium text-black">아이디</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder={userId ? "" : "아이디 입력"}
            className="w-full mt-1 border-b py-2 text-sm outline-none placeholder-gray-400"
            style={commonInputStyle}
          />
        </div>

        {/* 비밀번호 */}
        <div>
          <label className="text-sm font-medium text-black">비밀번호</label>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={password ? "" : "비밀번호 입력"}
              className="w-full mt-1 border-b py-2 text-sm pr-8 outline-none placeholder-gray-400"
              style={commonInputStyle}
            />
            <button
              type="button"
              className="absolute right-0 top-1/2 -translate-y-1/2"
              onClick={() => setShowPw(!showPw)}
            >
              {showPw ? (
                <FiEyeOff color={COLORS.gray4} />
              ) : (
                <FiEye color={COLORS.gray4} />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* 로그인 버튼 */}
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: isFormValid ? COLORS.gray2 : COLORS.gray5,
        }}
        className="w-full text-white text-sm font-medium py-3 mt-10 rounded-full"
      >
        로그인
      </button>
      {/* 회원가입 전환 */}
      <div className="mt-6 text-center text-sm" style={{ color: COLORS.gray4 }}>
        계정이 없으신가요?
        <button
          className="font-bold"
          onClick={onSwitchToRegister}
          style={{ color: COLORS.gray2 }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
