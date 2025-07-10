import React, { useState } from "react";
import SignUpModal from "@src/components/Modals/SignupModal"; // 회원가입 모달 import

const Waiting = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleSignUp = (credentials: { id: string; password: string; confirmPassword: string }) => {
    console.log('회원가입:', credentials);
    alert(`회원가입: ${credentials.id}`);
  };

  const handleLogin = () => {
    console.log('로그인 페이지로 이동');
    alert('로그인 페이지로 이동');
  };

  return (
    <div className="flex flex-col items-center pt-[198px] pb-[198px] gap-[34px] relative">
      {/* FlipCard 상단+하단 */}
      <div className="flex flex-col gap-[8px] relative">
        <div className="flex flex-row gap-[34px]">
          {/* 요일 */}
          <div className="flex flex-col gap-[8px] relative items-center justify-center">
            <FlipCard />
            <FlipCard />
            <span
              style={{
                ...TYPOGRAPHY.point_text2,
                color: COLORS.gray1,
                position: "absolute",
              }}
            >
              WED
            </span>
            <div className="absolute w-full bg-white z-10 h-[8px]" />
            <span
              style={{
                ...TYPOGRAPHY.point_text4,
                color: COLORS.gray4,
                position: "absolute",
                top: "calc(50% + 133px)",
              }}
            >
              2025
            </span>
          </div>
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* 회원가입 모달 테스트 버튼 */}
      <button
        onClick={() => setIsSignupModalOpen(true)}
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        회원가입 모달 열기
      </button>

      {/* 회원가입 모달 */}
      <SignUpModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSignUp={handleSignUp}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Waiting;