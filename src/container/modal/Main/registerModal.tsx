import React, { useState } from "react";
import { COLORS } from "../../../../assets/styles/gray_color/gray_color";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface SignUpModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSubmit: (data: { name: string; email: string; password: string }) => void;
}

export default function SignUpModal({
  onClose,
  onSwitchToLogin,
  onSubmit,
}: SignUpModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);

  const isEmailValid = email.includes("@") && email.includes(".");
  const isPasswordMatch = pw && pw === pwConfirm;
  const isFormValid = name && isEmailValid && isPasswordMatch;

  const handleSubmit = () => {
    if (!isFormValid) return;
    onSubmit({ name, email, password: pw });
  };

  const inputClass =
    "w-full border-b border-gray-300 placeholder-gray-400 bg-transparent text-[14px] py-2 outline-none";

  return (
    <div
      className="fixed z-50"
      style={{
        width: 530,
        height: 810,
        backgroundColor: COLORS.bg,
        borderRadius: 12,
        padding: "40px 36px",
      }}
    >
      {/* 로고 + 타이틀 */}
      <div className="flex flex-col items-center">
        <img src="/logo.png" alt="logo" className="w-10 h-10 mb-2" />
        <h2 className="text-[20px] font-bold" style={{ color: COLORS.gray2 }}>
          회원가입
        </h2>
      </div>

      {/* 입력 영역 */}
      <div className="mt-10 flex flex-col gap-6">
        {/* 이름 */}
        <div>
          <label className="text-[14px] font-medium text-black">이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예) 김플립"
            className={inputClass}
            style={{ color: COLORS.gray2 }}
          />
        </div>

        {/* 이메일 */}
        <div>
          <label className="text-[14px] font-medium text-black">아이디</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="예) flip_calendar@gmail.com"
            className={inputClass}
            style={{ color: COLORS.gray2 }}
          />
        </div>

        {/* 비밀번호 */}
        <div>
          <label className="text-[14px] font-medium text-black">비밀번호</label>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="비밀번호 입력"
              className={`${inputClass} pr-8`}
              style={{ color: COLORS.gray2 }}
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

        {/* 비밀번호 확인 */}
        <div>
          <label className="text-[14px] font-medium text-black">
            비밀번호 확인
          </label>
          <input
            type={showPw ? "text" : "password"}
            value={pwConfirm}
            onChange={(e) => setPwConfirm(e.target.value)}
            placeholder="비밀번호 재입력"
            className={inputClass}
            style={{ color: COLORS.gray2 }}
          />
        </div>
      </div>

      {/* 회원가입 버튼 */}
      <button
        onClick={handleSubmit}
        disabled={!isFormValid}
        className={`w-full mt-10 py-3 rounded-full text-[14px] font-medium text-white ${
          isFormValid ? "bg-gray-800" : "bg-gray-300"
        }`}
      >
        회원가입
      </button>

      {/* 로그인 전환 */}
      <div
        className="mt-6 text-center text-[14px]"
        style={{ color: COLORS.gray4 }}
      >
        이미 계정이 있으신가요?
        <button
          onClick={onSwitchToLogin}
          className="ml-2 font-bold"
          style={{
            color: COLORS.gray2,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          로그인
        </button>
      </div>
    </div>
  );
}
