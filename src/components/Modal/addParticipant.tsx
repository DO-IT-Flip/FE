import React, { useState } from 'react'
import closeIcon from '../../assets/icons/system/close2.svg?url'
import { TYPOGRAPHY } from '@src/assets/styles/typography'
import { COLORS } from '@src/assets/styles/gray_color'

interface AddParticipantModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (name: string) => void
}

const AddParticipantModal: React.FC<AddParticipantModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState('')

  if (!isOpen) return null

  const handleAdd = () => {
    if (name.trim()) {
      onAdd(name.trim())
      setName('')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#222222]/[0.7] backdrop-filter backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="relative w-[529px] h-[340px] px-8 pt-6 pb-8 rounded-xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div
            className='flex justify-end'
          >
            <button
              onClick={onClose}
              aria-label="닫기"
            >
              <img src={closeIcon} alt="close" className="w-8 h-8" />
            </button>
          </div>

          <p
            style={{
              ...TYPOGRAPHY.Display,
              color: COLORS.gray2
            }}
          >참여자 추가</p>
          <p
            style={{
              ...TYPOGRAPHY.Body1,
              color:COLORS.gray4
            }}
          >일정 참여자를 추가해보세요.
          </p>          
        </div>


        <div className='pt-[30px] pb-[58.5px]'>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="일정 참여자"
            className="w-full border-b-2 outline-none"
            style={{
              ...TYPOGRAPHY.Headline1,
              color: name.trim() ? COLORS.gray2 : COLORS.gray5,
              borderBottomColor: name.trim() ? COLORS.gray3 : COLORS.gray5,
            }}
          />
        </div>
        <button
          onClick={handleAdd}
          disabled={!name.trim()}
          className={"w-full py-3 rounded-full text-sm font-medium transition"}
          style={{
            ...TYPOGRAPHY.Subtitle,
            backgroundColor: name.trim()
              ? COLORS.gray2
              : COLORS.gray4,
            color: name.trim()
              ? COLORS.bg
              : COLORS.bg,
            cursor: name.trim()
              ? 'pointer'
              : 'not-allowed',
          }}
        >
          참여자 추가
        </button>
      </div>
    </div>
  )
}

export default AddParticipantModal
