import React, { useState } from 'react'
import closeIcon from '../../assets/icons/system/close2.svg?url'
import { TYPOGRAPHY } from '@src/assets/styles/typography'
import { COLORS } from '@src/assets/styles/gray_color'

interface SetColorModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (color: string) => void
}

const TAG_COLORS = [
  '#FF6B6B', '#FF884B', '#FFD93D', '#80B918', '#3FC1C9', '#4D96FF',
  '#5F6CAF', '#A076F9', '#C084FC', '#F472B6', '#A0E7E5', '#1F1F1F'
]

const SetColorModal: React.FC<SetColorModalProps> = ({
  isOpen, onClose, onSelect,
}) => {
  if (!isOpen) return null

  return (
    <div
      className="absolute z-50"
      onClick={onClose}
    >
      <div
        className="relative w-[345px] h-[220px] p-6 rounded-xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div
            className='flex justify-between pb-0.5'
          >
            <p
              style={{
                ...TYPOGRAPHY.Headline1,
                color: COLORS.gray2
              }}
            >컬러</p>
            <button
              onClick={onClose}
              aria-label="닫기"
            >
              <img src={closeIcon} alt="close" className="w-8 h-8" />
            </button>
          </div>


          <p
            style={{
              ...TYPOGRAPHY.Body1,
              color:COLORS.gray4
            }}
          >플립의 컬러를 설정해보세요.
          </p>          
        </div>


        <div className='grid grid-cols-6 gap-2 px-0.5 py-2'>
          {TAG_COLORS.map(color => (
            <button
              key={color}
              onClick={() => onSelect(color)}
              className="w-[42px] h-[42px] rounded-md"
              style={{ backgroundColor: color }}
              aria-label={`색상 선택 ${color}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SetColorModal
