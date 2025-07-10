import React, { useState } from 'react'
import closeIcon from '../../assets/icons/system/close2.svg?url'
import edit from '../../assets/icons/system/edit.svg?url'
import plus from '../../assets/icons/system/plus.svg?url'
import tagIcon2       from '../../assets/icons/tag/tagIcon2.svg?url'
import tagIcon11       from '../../assets/icons/tag/tagIcon11.svg?url'
import { TYPOGRAPHY } from '@src/assets/styles/typography'
import { COLORS } from '@src/assets/styles/gray_color'

interface SetTagModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (iconId: string) => void
}

const SetTagModal: React.FC<SetTagModalProps> = ({
  isOpen, onClose, onSelect,
}) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#222222]/[0.7] backdrop-filter backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="relative w-[345px] h-[270px] p-6 rounded-xl bg-white"
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
            >태그</p>
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
          >태그를 사용해 일정을 정리하세요.
          </p>          
        </div>


        <div className=''>
            <button className='flex items-center justify-between w-[297px] pt-6 pb-5'>
              <p style={{...TYPOGRAPHY.Subtitle, color: COLORS.gray5}}>태그추가</p>
              <img src={plus}/>
            </button>
            <div className='flex items-center justify-between w-[297px]'>
              <button className='flex items-center justify-between'>
                <div className='w-8 h-8 bg-[#3FA9F5] rounded-3xl'>
                  <img src={tagIcon2}/>
                </div>
                <p
                  className='pl-1.5'
                  style={{...TYPOGRAPHY.Subtitle, color: '#3FA9F5'}}
                >식사</p>
              </button>
              <button>
                <img src={edit}/>
              </button>
            </div>
            <div className='flex items-center justify-between w-[297px] pt-4.5 pb-2'>
              <button className='flex items-center justify-between'>
                <div className='w-8 h-8 bg-[#FDBE60] rounded-3xl'>
                  <img src={tagIcon11}/>
                </div>
                <p
                  className='pl-1.5' 
                  style={{...TYPOGRAPHY.Subtitle, color: '#FDBE60'}}
                  >운동</p>
              </button>
              <button>
                <img src={edit}/>
              </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default SetTagModal
