import React from "react";
import { useState } from "react";
import { COLORS } from "../../../../assets/styles/gray_color/gray_color";
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
      {/* 로고 + 타이틀 */}
      <div className="flex flex-col items-center">
        <img
          src="/logo.png"
          alt="logo"
          style={{ width: 40, height: 40, marginBottom: 8 }}
        />
        <h2 style={{ color: COLORS.gray2, fontSize: 20, fontWeight: 700 }}>
          로그인
        </h2>
      </div>

      {/* 입력 영역 */}
      <div className="mt-10 flex flex-col gap-6">
        {/* 아이디 */}
        <div>
          <label className="text-[14px] font-medium text-black">아이디</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="아이디 입력"
            className="placeholder-gray-400 w-full mt-1 border-b border-gray-300 py-2 text-[14px] outline-none bg-transparent"
            style={commonInputStyle}
          />
        </div>

        {/* 비밀번호 */}
        <div>
          <label className="text-[14px] font-medium text-black">비밀번호</label>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              className="placeholder-gray-400 w-full mt-1 border-b border-gray-300 py-2 pr-8 text-[14px] outline-none bg-transparent"
              style={commonInputStyle}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2"
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
        className={`w-full mt-10 py-3 rounded-full text-[14px] font-medium text-white ${
          isFormValid ? "bg-gray-800" : "bg-gray-300"
        }`}
      >
        로그인
      </button>

      {/* 회원가입 전환 */}
      <div className="mt-6 text-center text-[14px] text-gray-400">
        계정이 없으신가요?
        <button
          onClick={onSwitchToRegister}
          className="ml-2 font-bold text-gray-800 bg-none border-none cursor-pointer"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
