import React, { useState } from 'react'
import logo from '../../assets/logo/logo.svg?url'
import eye from '../../assets/icons/system/password_eye.svg?url'
import { TYPOGRAPHY } from '@src/assets/styles/typography'
import { COLORS } from '@src/assets/styles/gray_color'

interface SignUpModalProps {
    isOpen: boolean
    onClose: () => void
    onSignUp: (credentials: { id: string; password: string; confirmPassword: string }) => void
    onLogin: () => void
}

const SignUpModal: React.FC<SignUpModalProps> = ({
    isOpen,
    onClose,
    onSignUp,
    onLogin,
}) => {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    if (!isOpen) return null

    const isFormValid = id.trim() && password.trim() && confirmPassword.trim() && password === confirmPassword

    const handleSignUp = () => {
        if (isFormValid) {
            onSignUp({ id: id.trim(), password: password.trim(), confirmPassword: confirmPassword.trim() })
        }
    }

    const handleLogin = () => {
        onLogin()
        onClose()
    }

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
                    {/* 로고 */}
                    <div className="mb-6">
                        <img src={logo} alt="logo" className='w-[54px] h-[69px]' />
                    </div>

                    {/* 제목 */}
                    <h1
                        style={{
                            ...TYPOGRAPHY.Display,
                            color: COLORS.gray1
                        }}
                        className="text-center"
                    >
                        회원가입
                    </h1>
                </div>

                {/* 입력 폼 */}
                <div className="space-y-6 mb-13 px-4">
                     <div>
                        <label
                            style={{
                                ...TYPOGRAPHY.Subtitle,
                                color: COLORS.gray2
                            }}
                            className="block mb-2"
                        >
                            이름
                        </label>
                        <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            placeholder="예) 김플립"
                            className="w-full pb-1.5 border-b-2 outline-none bg-transparent"
                            style={{
                                ...TYPOGRAPHY.Body1,
                                color: id.trim() ? COLORS.gray1 : COLORS.gray3,
                                borderBottomColor: id.trim() ? COLORS.gray3 : COLORS.gray5,
                            }}
                        />
                    </div>
                    {/* 아이디 입력 */}
                    <div>
                        <label
                            style={{
                                ...TYPOGRAPHY.Subtitle,
                                color: COLORS.gray2
                            }}
                            className="block mb-2"
                        >
                            아이디
                        </label>
                        <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            placeholder="예) flip_calendar@gmail.com"
                            className="w-full pb-1.5 border-b-2 outline-none bg-transparent"
                            style={{
                                ...TYPOGRAPHY.Body1,
                                color: id.trim() ? COLORS.gray1 : COLORS.gray3,
                                borderBottomColor: id.trim() ? COLORS.gray3 : COLORS.gray5,
                            }}
                        />
                    </div>

                    {/* 비밀번호 입력 */}
                    <div>
                        <label
                            style={{
                                ...TYPOGRAPHY.Subtitle,
                                color: COLORS.gray2
                            }}
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
                                    borderBottomColor: password.trim() ? COLORS.gray3 : COLORS.gray5,
                                }}
                            />
                            {/* 비밀번호 표시/숨김 버튼 */}
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
                    </div>

                    {/* 비밀번호 확인 입력 */}
                    <div>
                        <label
                            style={{
                                ...TYPOGRAPHY.Subtitle,
                                color: COLORS.gray2
                            }}
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
                                    borderBottomColor: confirmPassword.trim() ? 
                                        (password === confirmPassword ? COLORS.gray3 : '#ef4444') : 
                                        COLORS.gray5,
                                }}
                            />
                        </div>
                        {/* 비밀번호 불일치 경고 */}
                        {confirmPassword.trim() && password !== confirmPassword && (
                            <p
                                style={{
                                    ...TYPOGRAPHY.Caption,
                                    color: '#ef4444'
                                }}
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
                        onClick={handleSignUp}
                        disabled={!isFormValid}
                        className="w-full py-3 rounded-full transition"
                        style={{
                            ...TYPOGRAPHY.Subtitle,
                            backgroundColor: isFormValid ? COLORS.gray1 : COLORS.gray4,
                            color: COLORS.bg,
                            cursor: isFormValid ? 'pointer' : 'not-allowed',
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
                    <span
                        style={{
                            ...TYPOGRAPHY.Body1,
                            color: COLORS.gray4
                        }}
                    >
                        이미 계정이 있으신가요?{' '}
                    </span>
                    <button
                        onClick={handleLogin}
                        style={{
                            ...TYPOGRAPHY.Subtitle,
                            color: COLORS.gray2
                        }}
                        className="no-underline hover:underline"
                    >
                        로그인
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignUpModal