import React, { useState } from 'react'
import logo from '../../assets/logo/logo.svg?url'
import eye from '../../assets/icons/system/password_eye.svg?url'
import { TYPOGRAPHY } from '@src/assets/styles/typography'
import { COLORS } from '@src/assets/styles/gray_color'
import SignUpModal from './SignupModal'

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
    onLogin: (credentials: { id: string; password: string }) => void
    onSignUp: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({
    isOpen,
    onClose,
    onLogin,
    onSignUp,
}) => {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)

    if (!isOpen) return null

    const handleLogin = () => {
        if (id.trim() && password.trim()) {
            onLogin({ id: id.trim(), password: password.trim() })
        }
    }

    const handleSignUp = () => {
        setShowSignUpModal(true)
    }

    const handleSignUpModalClose = () => {
        setShowSignUpModal(false)
    }

    const handleSignUpSubmit = (credentials: { id: string; password: string; confirmPassword: string }) => {
        onSignUp()
        setShowSignUpModal(false)
        onClose()
    }

    const handleBackToLogin = () => {
        setShowSignUpModal(false)
    }

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
                            로그인
                        </h1>
                    </div>

                    {/* 입력 폼 */}
                    <div className="space-y-6 mb-13 px-4">
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
                                placeholder="flip"
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
                    </div>

                    {/* 로그인 버튼 */}
                    <div className="mb-6">
                        <button
                            onClick={handleLogin}
                            disabled={!id.trim() || !password.trim()}
                            className="w-full py-3 rounded-full transition"
                            style={{
                                ...TYPOGRAPHY.Subtitle,
                                backgroundColor: (id.trim() && password.trim()) ? COLORS.gray1 : COLORS.gray4,
                                color: COLORS.bg,
                                cursor: (id.trim() && password.trim()) ? 'pointer' : 'not-allowed',
                            }}
                            onMouseEnter={(e) => {
                                if (id.trim() && password.trim()) {
                                    e.currentTarget.style.backgroundColor = COLORS.gray2;
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (id.trim() && password.trim()) {
                                    e.currentTarget.style.backgroundColor = COLORS.gray1;
                                }
                            }}
                        >
                            로그인
                        </button>
                    </div>

                    {/* 회원가입 링크 */}
                    <div className="text-center">
                        <span
                            style={{
                                ...TYPOGRAPHY.Body1,
                                color: COLORS.gray4
                            }}
                        >
                            계정이 없으신가요?{' '}
                        </span>
                        <button
                            onClick={handleSignUp}
                            style={{
                                ...TYPOGRAPHY.Subtitle,
                                color: COLORS.gray2
                            }}
                            className="no-underline hover:underline"
                        >
                            회원가입
                        </button>
                    </div>
                </div>
            </div>

            {/* SignUpModal */}
            <SignUpModal
                isOpen={showSignUpModal}
                onClose={handleSignUpModalClose}
                onSignUp={handleSignUpSubmit}
                onLogin={handleBackToLogin}
            />
        </>
    )
}

export default LoginModal