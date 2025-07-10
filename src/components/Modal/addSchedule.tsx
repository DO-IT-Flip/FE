import React, { useState } from 'react'
import closeIcon from '../../assets/icons/system/close2.svg?url'
import dropDown from '../../assets/icons/system/dropdown.svg?url'
import groupIcon from '../../assets/icons/system/group.svg?url'
import locationIcon from '../../assets/icons/system/location.svg?url'
import { TYPOGRAPHY } from '@src/assets/styles/typography'
import { COLORS } from '@src/assets/styles/gray_color'

import SetDateModal from "../Modal/setDate";
// 수정필요
// import SetTimeModal from "../Modal/setTime";

interface AddScheduleModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (tagName: string) => void
}

const AddScheduleModal: React.FC<AddScheduleModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [tagName, setTagName] = useState('')
  const [showDatePicker, setShowDatePicker]   = useState(false)
  const [showTimePicker, setShowTimePicker]   = useState(false)
  
  // 현재 날짜로 기본값 설정
  const [selectedDate, setSelectedDate]       = useState<Date | null>(new Date())
  // 시간을 오후 12:00으로 기본값 설정
  const [selectedTime, setSelectedTime]       = useState<{ start: string; end: string } | null>({
    start: '오후 12:00',
    end: '오후 12:00'
  })
  
  // 사용자가 실제로 선택했는지 추적하는 상태
  const [isDateUserSelected, setIsDateUserSelected] = useState(false)
  const [isTimeUserSelected, setIsTimeUserSelected] = useState(false)

  if (!isOpen) return null

  const handleAdd = () => {
    if (tagName.trim()) {
      onAdd(tagName.trim())
      setTagName('')
    }
  }

  // 날짜 형식을 "7월 09일 (수)" 형식으로 변환하는 함수
  const formatDate = (date: Date): string => {
    const month = date.getMonth() + 1;
    const day = date.getDate().toString().padStart(2, '0');
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()];
    
    return `${month}월 ${day}일 (${weekday})`;
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#222222]/[0.7] backdrop-filter backdrop-blur-[2px]"
        onClick={onClose}
      >
        <div
          className="relative w-[529px] h-[565px] px-8 pt-6 pb-8 rounded-xl bg-white"
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
            >일정 추가</p>
            <p
              style={{
                ...TYPOGRAPHY.Body1,
                color:COLORS.gray4
              }}
            >일정을 추가하기 위해 아래 내용을 작성해주세요.
            </p>          
          </div>


          <div className='pt-6.5 pb-6'>
            <div>
              <p
                style={{...TYPOGRAPHY.Body1, color: COLORS.gray5}}
              >날짜 선택</p>
              <button
                className='flex flex-col items-start'
                onClick={() => setShowDatePicker(true)}
                style={{
                  ...TYPOGRAPHY.Headline1,
                  color: isDateUserSelected ? COLORS.gray2 : COLORS.gray5,
                }}
              >
                {/* 모달에서 선택한 날짜 표시 (현재 날짜가 기본값) */}
                {selectedDate
                  ? formatDate(selectedDate)
                  : '—월 —일 (—)'}
              </button>
            </div>
            <div className='py-4'>
              <p
                style={{...TYPOGRAPHY.Body1, color: COLORS.gray5}}
              >시간 선택</p>
              <div className='flex items-start'>
                <button
                  onClick={() => setShowTimePicker(true)}
                  className=''
                >
                  <p
                    style={{...TYPOGRAPHY.Subtitle, color: isTimeUserSelected ? COLORS.gray2 : COLORS.gray5}}
                    className='text-left'
                  >
                    {selectedTime?.start || '—:—'}
                  </p>
                </button>
                <span
                  className='px-1'
                  style={{...TYPOGRAPHY.Subtitle, color: COLORS.gray5}}
                >
                  ~
                </span>
                <button
                  onClick={() => setShowTimePicker(true)}
                  className=''
                >
                  <p
                    style={{...TYPOGRAPHY.Subtitle, color: isTimeUserSelected ? COLORS.gray2 : COLORS.gray5}}
                    className='text-left'
                  >
                    {selectedTime?.end || '—:—'}
                  </p>
                </button>
              </div>
            </div>
            <input
              type="text"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="일정 제목"
              className="w-full border-b-2 outline-none"
              style={{
                ...TYPOGRAPHY.Headline1,
                color: tagName.trim() ? COLORS.gray2 : COLORS.gray5,
                borderBottomColor: tagName.trim() ? COLORS.gray3 : COLORS.gray5,
              }}
            />
            <div className='flex items-center justify-between w-[190px] pt-[12.5px]'>
              <button
                className='w-[55px] h-[28px] px-2.5 py-1 rounded-2xl flex items-center justify-between'
                style={{
                  ...TYPOGRAPHY.Body3,
                  backgroundColor: COLORS.gray5,
                  color: COLORS.bg,
                }}
              >
                태그
                <img src={dropDown} className="" />
              </button>
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
            <button className='flex items-center justify-center pt-6 pb-4.5'>
              <img src={locationIcon} className="fill-amber-300"/>
              <p
                className='pl-1'
                style={{
                  ...TYPOGRAPHY.Body3,
                  color: COLORS.gray5,
                }}
              >위치</p>
            </button>
            <button className='flex items-center justify-center'>
              <img src={groupIcon} className="" />
              <p
                className='pl-1'
                style={{
                  ...TYPOGRAPHY.Body3,
                  color: COLORS.gray5,
                }}
              >참여자</p>
            </button>
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
            일정 추가
          </button>
        </div>
      </div>
      <SetDateModal
        isOpen={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onDateSelect={(date) => {
          setSelectedDate(date)
          setIsDateUserSelected(true) // 사용자가 날짜를 선택했음을 표시
          setShowDatePicker(false)
        }}
        selectedDate={selectedDate} 
      />
      {/* 수정필요 */}
      {/* <SetTimeModal
        isOpen={showTimePicker}
        onClose={() => setShowTimePicker(false)}
        onSelect={(start, end) => {
          setSelectedTime({ start, end })
          setIsTimeUserSelected(true) // 사용자가 시간을 선택했음을 표시
          setShowTimePicker(false)
        }}
      /> */}
    </>
  )
}

export default AddScheduleModal