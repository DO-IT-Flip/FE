import React, { useState } from "react";
import logo from "../../assets/logo/logo.svg?url";
import eye from "../../assets/icons/system/password_eye.svg?url";
import { TYPOGRAPHY } from "@src/assets/styles/typography";
import { COLORS } from "@src/assets/styles/gray_color";
import SignUpModal from "./SignupModal";
import { login } from "@api/auth";
import { fetchUserInfo } from "@api/user";
import { fetchSchedulesByUserId } from "@api/schedule";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (credentials: { id: string; password: string }) => void;
  onSignUp: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onSignUp,
}) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const [errors, setErrors] = useState({ id: "", password: "" });
  const [touched, setTouched] = useState({ id: false, password: false });

  if (!isOpen) return null;

  const validateId = (id: string): string => {
    if (!id.trim()) return "아이디를 입력해주세요.";
    if (id.length < 4) return "아이디는 4자 이상 입력해주세요.";
    if (!/^[a-zA-Z0-9_]+$/.test(id))
      return "아이디는 영문, 숫자, 언더바(_)만 사용할 수 있습니다.";
    return "";
  };

  const validatePassword = (password: string): string => {
    if (!password.trim()) return "비밀번호를 입력해주세요.";
    if (password.length < 8) return "비밀번호는 8자 이상 입력해주세요.";
    if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password))
      return "비밀번호는 영문과 숫자를 모두 포함해야 합니다.";
    return "";
  };

  const handleIdChange = (value: string) => {
    setId(value);
    if (touched.id) {
      const error = validateId(value);
      setErrors((prev) => ({ ...prev, id: error }));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (touched.password) {
      const error = validatePassword(value);
      setErrors((prev) => ({ ...prev, password: error }));
    }
  };

  const handleIdBlur = () => {
    setTouched((prev) => ({ ...prev, id: true }));
    const error = validateId(id);
    setErrors((prev) => ({ ...prev, id: error }));
  };

  const handlePasswordBlur = () => {
    setTouched((prev) => ({ ...prev, password: true }));
    const error = validatePassword(password);
    setErrors((prev) => ({ ...prev, password: error }));
  };

  const handleLogin = async () => {
    setTouched({ id: true, password: true });

    const idError = validateId(id);
    const passwordError = validatePassword(password);

    setErrors({ id: idError, password: passwordError });

    if (!idError && !passwordError) {
      try {
        const formData = new FormData();
        formData.append("username", id.trim());
        formData.append("password", password.trim());

        const response = await login(formData);
        const token = response.headers["authorization"]?.split(" ")[1];
        if (token) {
          localStorage.setItem("access", token);
        }

        // 로그인 성공 후 회원 정보 조회 → 일정 조회
        const user = await fetchUserInfo(); // 사용자 정보
        if (!user) {
          throw new Error(
            "사용자 정보가 유효하지 않거나 user.email가 존재하지 않습니다."
          );
        }

        const schedules = await fetchSchedulesByUserId(); // 일정 목록 불러오기

        console.log("✅ 로그인 완료 / 사용자 정보:", user);
        console.log("📆 일정 목록:", schedules);

        // 필요 시 전역 상태 저장 또는 props 콜백 전달
        onLogin({ id: id.trim(), password: password.trim() });
        onClose();
      } catch (error: any) {
        console.error("로그인 실패:", error);
        alert(error.response?.data?.message || "로그인에 실패했습니다.");
      }
    }
  };

  const handleSignUp = () => {
    setShowSignUpModal(true);
  };

  const handleBackToLogin = () => {
    setShowSignUpModal(false);
  };

  const isFormValid =
    id.trim() && password.trim() && !errors.id && !errors.password;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#222222]/[0.7] backdrop-filter backdrop-blur-[2px]"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-[530px] h-[626px] px-16 pt-12 pb-12 rounded-xl bg-white mx-4 sm:w-[530px] sm:mx-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 로고 및 제목 */}
          <div className="flex flex-col items-center mb-8">
            <div className="mb-6">
              <img src={logo} alt="logo" className="w-[54px] h-[69px]" />
            </div>
            <h1
              style={{ ...TYPOGRAPHY.Display, color: COLORS.gray1 }}
              className="text-center"
            >
              로그인
            </h1>
          </div>

          {/* 입력 폼 */}
          <div className="space-y-6 mb-13 px-4">
            {/* 아이디 입력 */}
            <div>
              <label
                style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray2 }}
                className="block mb-2"
              >
                아이디
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => handleIdChange(e.target.value)}
                onBlur={handleIdBlur}
                placeholder="flip"
                className="w-full pb-1.5 border-b-2 outline-none bg-transparent"
                style={{
                  ...TYPOGRAPHY.Body1,
                  color: id.trim() ? COLORS.gray1 : COLORS.gray3,
                  borderBottomColor: errors.id
                    ? "#ef4444"
                    : id.trim()
                    ? COLORS.gray3
                    : COLORS.gray5,
                }}
              />
              {errors.id && (
                <p
                  style={{ ...TYPOGRAPHY.Caption, color: "#ef4444" }}
                  className="mt-1"
                >
                  {errors.id}
                </p>
              )}
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <label
                style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray2 }}
                className="block mb-2"
              >
                비밀번호
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  onBlur={handlePasswordBlur}
                  placeholder="••••••••••"
                  className="w-full pb-1.5 pr-10 border-b-2 outline-none bg-transparent"
                  style={{
                    ...TYPOGRAPHY.Body1,
                    color: password.trim() ? COLORS.gray1 : COLORS.gray3,
                    borderBottomColor: errors.password
                      ? "#ef4444"
                      : password.trim()
                      ? COLORS.gray3
                      : COLORS.gray5,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 bottom-3 text-gray-400 hover:text-gray-600"
                >
                  <img
                    src={eye}
                    alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                    className="w-6 h-6"
                  />
                </button>
              </div>
              {errors.password && (
                <p
                  style={{ ...TYPOGRAPHY.Caption, color: "#ef4444" }}
                  className="mt-1"
                >
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          {/* 로그인 버튼 */}
          <div className="mb-6">
            <button
              onClick={handleLogin}
              disabled={!isFormValid}
              className="w-full py-3 rounded-full transition"
              style={{
                ...TYPOGRAPHY.Subtitle,
                backgroundColor: isFormValid ? COLORS.gray1 : COLORS.gray4,
                color: COLORS.bg,
                cursor: isFormValid ? "pointer" : "not-allowed",
              }}
              onMouseEnter={(e) => {
                if (isFormValid) {
                  e.currentTarget.style.backgroundColor = COLORS.gray2;
                }
              }}
              onMouseLeave={(e) => {
                if (isFormValid) {
                  e.currentTarget.style.backgroundColor = COLORS.gray1;
                }
              }}
            >
              로그인
            </button>
          </div>

          {/* 회원가입 링크 */}
          <div className="text-center">
            <span style={{ ...TYPOGRAPHY.Body1, color: COLORS.gray4 }}>
              계정이 없으신가요?{" "}
            </span>
            <button
              onClick={handleSignUp}
              style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray2 }}
              className="no-underline hover:underline"
            >
              회원가입
            </button>
          </div>
        </div>
      </div>

      {/* 회원가입 모달 */}
      <SignUpModal
        isOpen={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
        onSignUp={() => {
          setShowSignUpModal(false);
        }}
        onLogin={handleBackToLogin}
      />
    </>
  );
};

export default LoginModal;
