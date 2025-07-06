import React, { useState } from 'react'
import closeIcon from '../../assets/icons/system/close2.svg?url'
import dropDown from '../../assets/icons/system/dropdown.svg?url'
import trashCan from '../../assets/icons/system/trashcan.svg?url'
import { TYPOGRAPHY } from '@src/assets/styles/typography'
import { COLORS } from '@src/assets/styles/gray_color'

interface AddTagModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (tagName: string) => void
}

const AddTagModal: React.FC<AddTagModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [tagName, setTagName] = useState('')

  if (!isOpen) return null

  const handleAdd = () => {
    if (tagName.trim()) {
      onAdd(tagName.trim())
      setTagName('')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#222222]/[0.7] backdrop-filter backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="relative w-[529px] h-[392px] px-8 pt-6 pb-8 rounded-xl bg-white"
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
          >태그 추가</p>
          <p
            style={{
              ...TYPOGRAPHY.Body1,
              color:COLORS.gray4
            }}
          >일정,할일,메모를 그룹핑하여  관리할 수 있는 기능입니다.
          </p>          
        </div>


        <div className='pt-[30px] pb-[70px]'>
          <input
            type="text"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            placeholder="태그 이름"
            className="w-full border-b-2 outline-none"
            style={{
              ...TYPOGRAPHY.Headline1,
              color: tagName.trim() ? COLORS.gray2 : COLORS.gray5,
              borderBottomColor: tagName.trim() ? COLORS.gray3 : COLORS.gray5,
            }}
          />
          <div className='flex items-center justify-between pt-[12.5px]'>
            <div className='w-[133px] flex items-center justify-between'>
              <button
                className='w-[55px] h-[28px] px-2.5 py-1 rounded-2xl flex items-center justify-between'
                style={{
                  ...TYPOGRAPHY.Body3,
                  backgroundColor: COLORS.gray5,
                  color: COLORS.bg,
                }}
              >
                컬러
                <img src={dropDown} className="" />
              </button>
              <button
                className='w-[66px] h-[28px] px-2.5 py-1 rounded-2xl flex items-center justify-between'
                style={{
                  ...TYPOGRAPHY.Body3,
                  backgroundColor: COLORS.gray5,
                  color: COLORS.bg,
                }}
              >
                아이콘
                <img src={dropDown} className="" />
              </button>
            </div>
            <button className='flex items-center justify-center'>
              <img src={trashCan} className="px-1" />
              <p
                style={{
                  ...TYPOGRAPHY.Body2,
                  color: COLORS.gray5,
                }}
              >태그 삭제하기</p>
            </button>
          </div>
        </div>
        <button
          onClick={handleAdd}
          disabled={!tagName.trim()}
          className={"w-full py-3 rounded-full text-sm font-medium transition"}
          style={{
            ...TYPOGRAPHY.Subtitle,
            backgroundColor: tagName.trim()
              ? COLORS.gray2
              : COLORS.gray4,
            color: tagName.trim()
              ? COLORS.bg
              : COLORS.bg,
            cursor: tagName.trim()
              ? 'pointer'
              : 'not-allowed',
          }}
        >
          태그 추가
        </button>
      </div>
    </div>
  )
}

export default AddTagModal
