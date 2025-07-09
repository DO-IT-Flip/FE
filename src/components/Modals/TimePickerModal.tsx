import React, { useState } from 'react'
import closeIcon from '../../assets/icons/system/close2.svg?url'
import { TYPOGRAPHY } from '@src/assets/styles/typography'
import { COLORS } from '@src/assets/styles/gray_color'

interface TimeSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (time: { hours: number; minutes: number; meridiem: 'AM' | 'PM' }) => void
}

const TimeSelectionModal: React.FC<TimeSelectionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [hours, setHours] = useState(12)
  const [minutes, setMinutes] = useState(0)
  const [meridiem, setMeridiem] = useState<'AM' | 'PM'>('AM')

  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm({ hours, minutes, meridiem })
    onClose()
  }

  const adjustHours = (increment: boolean) => {
    if (increment) {
      setHours(prev => prev === 12 ? 1 : prev + 1)
    } else {
      setHours(prev => prev === 1 ? 12 : prev - 1)
    }
  }

  const adjustMinutes = (increment: boolean) => {
    if (increment) {
      setMinutes(prev => prev === 59 ? 0 : prev + 1)
    } else {
      setMinutes(prev => prev === 0 ? 59 : prev - 1)
    }
  }

  const toggleMeridiem = () => {
    setMeridiem(prev => prev === 'AM' ? 'PM' : 'AM')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#222222]/[0.7] backdrop-filter backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[293px] h-[496px] px-5 pt-6 pb-8 rounded-xl bg-white mx-4 sm:w-[293px] sm:mx-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2
              style={{
                ...TYPOGRAPHY.Headline1,
                color: COLORS.gray2
              }}
              className="mb-0.5 pl-1"
            >
              시간선택
            </h2>
            <p
              style={{
                ...TYPOGRAPHY.Body2,
                color: COLORS.gray4
              }}
              className="pl-1"
            >
              일정 시간을 선택해주세요.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="mt-3"
          >
            <img src={closeIcon} alt="close2" />
          </button>
        </div>

        {/* 시간 선택 영역 */}
        <div className="flex flex-col items-center flex-1 justify-center space-y-3.5">
          {/* AM/PM 선택 */}
          <div className="flex flex-col items-center ">
            {/* AM과 버튼들 - justify-between으로 양 끝 배치 */}
            <div className="flex items-center space-x-8 ">  {/* justify-between 추가, 적당한 너비 설정 */}
              <button
                onClick={toggleMeridiem}
                className="w-[42px] h-[42px] rounded-full flex items-center justify-center justify-between transition-colors group"
                style={{
                  backgroundColor: COLORS.gray6,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.gray2;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.gray6;
                }}
              >
                <span className="text-xl font-light text-gray-400 group-hover:text-white">−</span>
              </button>

              <div
                style={{
                  ...TYPOGRAPHY.point_text3,
                  color: COLORS.gray2,
                  fontSize: "52px"
                }}
                className="text-center w-[50px]"
              >
                {meridiem}
              </div>

              <button
                onClick={toggleMeridiem}
                className="w-[42px] h-[42px] rounded-full flex items-center justify-center transition-colors group"
                style={{
                  backgroundColor: COLORS.gray6,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.gray2;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.gray6;
                }}
              >
                <span className="text-xl font-light text-gray-400 group-hover:text-white">+</span>
              </button>
            </div>

            {/* 라벨은 따로 아래쪽에 */}
            <div
              style={{
                ...TYPOGRAPHY.Caption,
                color: COLORS.gray5
              }}
            >
              Meridiem Indicators
            </div>
          </div>

          <div className="flex flex-col items-center ">
            <div className="flex items-center space-x-8 ">
              <button
                onClick={() => adjustHours(false)}
                className="w-[42px] h-[42px] rounded-full flex items-center justify-between justify-center transition-colors group"
                style={{
                  backgroundColor: COLORS.gray6,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.gray2;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.gray6;
                }}
              >
                <span className="text-xl font-light text-gray-400 group-hover:text-white">−</span>
              </button>

              <div
                style={{
                  ...TYPOGRAPHY.point_text3,
                  color: COLORS.gray2,
                  fontSize: "52px"
                }}
                className="text-center w-[50px]"
              >
                {hours.toString().padStart(2, '0')}
              </div>

              <button
                onClick={() => adjustHours(true)}
                className="w-[42px] h-[42px] rounded-full flex items-center justify-center transition-colors group"
                style={{
                  backgroundColor: COLORS.gray6,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.gray2;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.gray6;
                }}
              >
                <span className="text-xl font-light text-gray-400 group-hover:text-white">+</span>
              </button>
            </div>

            {/* 라벨은 따로 아래쪽에 */}
            <div
              style={{
                ...TYPOGRAPHY.Caption,
                color: COLORS.gray5
              }}
            >
              Time
            </div>
          </div>

          <div className="flex flex-col items-center ">
            <div className="flex items-center space-x-8 ">
              <button
                onClick={() => adjustMinutes(false)}
                className="w-[42px] h-[42px] rounded-full flex items-center justify-between justify-center transition-colors group"
                style={{
                  backgroundColor: COLORS.gray6,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.gray2;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.gray6;
                }}
              >
                <span className="text-xl font-light text-gray-400 group-hover:text-white">−</span>
              </button>

              <div
                style={{
                  ...TYPOGRAPHY.point_text3,
                  color: COLORS.gray2,
                  fontSize: "52px"
                }}
                className="text-center w-[50px]"
              >
                {minutes.toString().padStart(2, '0')}
              </div>

              <button
                onClick={() => adjustMinutes(true)}
                className="w-[42px] h-[42px] rounded-full flex items-center justify-center transition-colors group"
                style={{
                  backgroundColor: COLORS.gray6,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.gray2;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.gray6;
                }}
              >
                <span className="text-xl font-light text-gray-400 group-hover:text-white">+</span>
              </button>
            </div>

            {/* 라벨은 따로 아래쪽에 */}
            <div
              style={{
                ...TYPOGRAPHY.Caption,
                color: COLORS.gray5
              }}
            >
              Minutes
            </div>
          </div>
        </div>

        {/* 확인 버튼 */}
        <div className="mt-6">
          <button
            onClick={handleConfirm}
            className="w-[168px] px-10 py-3 rounded-full transition mx-auto block"
            style={{
              ...TYPOGRAPHY.Subtitle,
              backgroundColor: COLORS.gray5,
              color: COLORS.bg,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.gray2;  
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.gray5;  
            }}
          >
            일정 추가하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default TimeSelectionModal