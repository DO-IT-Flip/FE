import React, { useState } from "react";
import logo from "../../assets/logo/logo.svg?url";
import eye from "../../assets/icons/system/password_eye.svg?url";
import { TYPOGRAPHY } from "@src/assets/styles/typography";
import { COLORS } from "@src/assets/styles/gray_color";
import { signup } from "@api/auth";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUp: (payload: {
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) => void;
  onLogin: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({
  isOpen,
  onClose,
  onSignUp,
  onLogin,
}) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    username: false,
    password: false,
    confirmPassword: false,
  });

  if (!isOpen) return null;

  const validateName = (name: string): string => {
    if (!name.trim()) return "이름을 입력해주세요.";
    if (name.trim().length < 2) return "이름은 2자 이상 입력해주세요.";
    if (name.trim().length > 10) return "이름은 10자 이하로 입력해주세요.";
    if (!/^[가-힣a-zA-Z\s]+$/.test(name.trim()))
      return "이름은 한글, 영문만 입력할 수 있습니다.";
    return "";
  };

  const validateId = (username: string): string => {
    if (!username.trim()) return "아이디를 입력해주세요.";
    if (username.length < 4) return "아이디는 4자 이상 입력해주세요.";
    if (!/^[a-zA-Z0-9_]+$/.test(username))
      return "아이디는 영문, 숫자, 언더바(_)만 사용할 수 있습니다.";
    return "";
  };

  const validatePassword = (password: string): string => {
    if (!password.trim()) return "비밀번호를 입력해주세요.";
    if (password.length < 8) return "비밀번호는 8자 이상 입력해주세요.";
    if (password.length > 20) return "비밀번호는 20자 이하로 입력해주세요.";
    if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password))
      return "비밀번호는 영문과 숫자를 모두 포함해야 합니다.";
    //[!@#$%^&*(),.?":{}|<>] 정규식이 일부 환경에서 @을 이스케이프 처리하지 않음 -> [^\w\s]
    if (!/(?=.*[^\w\s])/.test(password))
      return "비밀번호는 특수문자를 포함해야 합니다.";
    return "";
  };

  const validateConfirmPassword = (
    confirmPassword: string,
    password: string
  ): string => {
    if (!confirmPassword.trim()) return "비밀번호 확인을 입력해주세요.";
    if (confirmPassword !== password) return "비밀번호가 일치하지 않습니다.";
    return "";
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (touched.name) {
      const error = validateName(value);
      setErrors((prev) => ({ ...prev, name: error }));
    }
  };

  const handleIdChange = (value: string) => {
    setUsername(value);
    if (touched.username) {
      const error = validateId(value);
      setErrors((prev) => ({ ...prev, username: error }));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (touched.password) {
      const error = validatePassword(value);
      setErrors((prev) => ({ ...prev, password: error }));
    }
    if (touched.confirmPassword && confirmPassword) {
      const confirmError = validateConfirmPassword(confirmPassword, value);
      setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (touched.confirmPassword) {
      const error = validateConfirmPassword(value, password);
      setErrors((prev) => ({ ...prev, confirmPassword: error }));
    }
  };

  const handleNameBlur = () => {
    setTouched((prev) => ({ ...prev, name: true }));
    const error = validateName(name);
    setErrors((prev) => ({ ...prev, name: error }));
  };

  const handleIdBlur = () => {
    setTouched((prev) => ({ ...prev, username: true }));
    const error = validateId(username);
    setErrors((prev) => ({ ...prev, username: error }));
  };

  const handlePasswordBlur = () => {
    setTouched((prev) => ({ ...prev, password: true }));
    const error = validatePassword(password);
    setErrors((prev) => ({ ...prev, password: error }));
  };

  const handleConfirmPasswordBlur = () => {
    setTouched((prev) => ({ ...prev, confirmPassword: true }));
    const error = validateConfirmPassword(confirmPassword, password);
    setErrors((prev) => ({ ...prev, confirmPassword: error }));
  };

  const handleSignUp = async () => {
    setTouched({
      name: true,
      username: true,
      password: true,
      confirmPassword: true,
    });

    const nameError = validateName(name);
    const idError = validateId(username);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(
      confirmPassword,
      password
    );

    setErrors({
      name: nameError,
      username: idError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    if (!nameError && !idError && !passwordError && !confirmPasswordError) {
      try {
        await signup({
          name: name.trim(),
          username: username.trim(),
          password: password.trim(),
        });

        alert("회원가입이 완료되었습니다.");
        onSignUp({
          name: name.trim(),
          username: username.trim(),
          password: password.trim(),
          confirmPassword: confirmPassword.trim(),
        });
        onClose(); // 모달 닫기
      } catch (error: any) {
        console.error("회원가입 실패:", error);
        console.error("🔥 전체 응답:", error.response);
        console.error("🔥 상태 코드:", error.response?.status);
        console.error("🔥 서버 메시지:", error.response?.data?.message);
        alert(error.response?.data?.message || "회원가입에 실패했습니다.");
      }
    }
  };

  const handleLogin = () => {
    onLogin();
    onClose();
  };

  const handleClose = () => {
    setName("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setErrors({ name: "", username: "", password: "", confirmPassword: "" });
    setTouched({
      name: false,
      username: false,
      password: false,
      confirmPassword: false,
    });
    onClose();
  };

  const isFormValid =
    name.trim() &&
    username.trim() &&
    password.trim() &&
    confirmPassword.trim() &&
    !errors.name &&
    !errors.username &&
    !errors.password &&
    !errors.confirmPassword;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#222222]/[0.7] backdrop-filter backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[530px] h-[810px] px-16 pt-16 rounded-xl bg-white mx-4 sm:w-[530px] sm:mx-0"
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
            회원가입
          </h1>
        </div>

        {/* 입력 폼 */}
        <div className="space-y-6 mb-13 px-4">
          {/* 이름 */}
          <div>
            <label
              style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray2 }}
              className="block mb-2"
            >
              이름
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              onBlur={handleNameBlur}
              placeholder="예) 김플립"
              className="w-full pb-1.5 border-b-2 outline-none bg-transparent"
              style={{
                ...TYPOGRAPHY.Body1,
                color: name.trim() ? COLORS.gray1 : COLORS.gray3,
                borderBottomColor: errors.name
                  ? "#ef4444"
                  : name.trim()
                  ? COLORS.gray3
                  : COLORS.gray5,
              }}
            />
            {errors.name && (
              <p
                style={{
                  ...TYPOGRAPHY.Caption,
                  color: "#ef4444",
                }}
                className="mt-1"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* 아이디 */}
          <div>
            <label
              style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray2 }}
              className="block mb-2"
            >
              아이디
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="예) flip123"
              className="w-full pb-1.5 border-b-2 outline-none bg-transparent"
              style={{
                ...TYPOGRAPHY.Body1,
                color: username.trim() ? COLORS.gray1 : COLORS.gray3,
                borderBottomColor: errors.username
                  ? "#ef4444"
                  : username.trim()
                  ? COLORS.gray3
                  : COLORS.gray5,
              }}
            />
            {errors.username && (
              <p
                style={{
                  ...TYPOGRAPHY.Caption,
                  color: "#ef4444",
                }}
                className="mt-1"
              >
                {errors.username}
              </p>
            )}
          </div>

          {/* 비밀번호 */}
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
                onChange={(e) => setPassword(e.target.value)}
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
                className="absolute right-0 bottom-3"
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
                style={{
                  ...TYPOGRAPHY.Caption,
                  color: "#ef4444",
                }}
                className="mt-1"
              >
                {errors.password}
              </p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label
              style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray2 }}
              className="block mb-2"
            >
              비밀번호 확인
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full pb-1.5 pr-10 border-b-2 outline-none bg-transparent"
                style={{
                  ...TYPOGRAPHY.Body1,
                  color: confirmPassword.trim() ? COLORS.gray1 : COLORS.gray3,
                  borderBottomColor: errors.confirmPassword
                    ? "#ef4444"
                    : confirmPassword.trim()
                    ? COLORS.gray3
                    : COLORS.gray5,
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-0 bottom-3 text-gray-400 hover:text-gray-600"
              >
                <img
                  src={eye}
                  alt={
                    showConfirmPassword ? "비밀번호 숨기기" : "비밀번호 보기"
                  }
                  className="w-6 h-6"
                />
              </button>
            </div>
            {confirmPassword.trim() && password !== confirmPassword && (
              <p
                style={{ ...TYPOGRAPHY.Caption, color: "#ef4444" }}
                className="mt-1"
              >
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>
        </div>

        {/* 회원가입 버튼 */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleSignUp}
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
            회원가입
          </button>
        </div>

        {/* 로그인 링크 */}
        <div className="text-center">
          <span style={{ ...TYPOGRAPHY.Body1, color: COLORS.gray4 }}>
            이미 계정이 있으신가요?{" "}
          </span>
          <button
            onClick={handleLogin}
            style={{ ...TYPOGRAPHY.Subtitle, color: COLORS.gray2 }}
            className="no-underline hover:underline"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
