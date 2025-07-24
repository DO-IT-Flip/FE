import React, { useState } from 'react'
import closeIcon from '../../assets/icons/system/close2.svg?url'
import { TYPOGRAPHY } from '@src/assets/styles/typography'
import { COLORS } from '@src/assets/styles/gray_color'
import ModalWrapper from './ModalWrapper '

interface AddLocationModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (url: string) => void
}

const AddLocationModal: React.FC<AddLocationModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [address, setAddress] = useState('')

  if (!isOpen) return null

  const handleAdd = () => {
    if (address.trim()) {
      onAdd(address.trim())
      setAddress('')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#222222]/[0.7] backdrop-filter backdrop-blur-[2px]"
      onClick={onClose}
    >
      <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[529px] h-[340px] px-8 pt-6 pb-8 rounded-xl bg-white"
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
          >위치 추가</p>
          <p
            style={{
              ...TYPOGRAPHY.Body1,
              color:COLORS.gray4
            }}
          >일정 위치를 추가해보세요.
          </p>          
        </div>


        <div className='pt-[30px] pb-[58.5px]'>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="연세대학교 미래캠퍼스"
            className="w-full border-b-2 outline-none"
            style={{
              ...TYPOGRAPHY.Headline1,
              color: address.trim() ? COLORS.gray2 : COLORS.gray5,
              borderBottomColor: address.trim() ? COLORS.gray3 : COLORS.gray5,
            }}
          />
        </div>
        <button
          onClick={handleAdd}
          disabled={!address.trim()}
          className={"w-full py-3 rounded-full text-sm font-medium transition"}
          style={{
            ...TYPOGRAPHY.Subtitle,
            backgroundColor: address.trim()
              ? COLORS.gray2
              : COLORS.gray4,
            color: address.trim()
              ? COLORS.bg
              : COLORS.bg,
            cursor: address.trim()
              ? 'pointer'
              : 'not-allowed',
          }}
        >
          위치 추가
        </button>
      </div>
      </ModalWrapper>
    </div>
  )
}

export default AddLocationModal
