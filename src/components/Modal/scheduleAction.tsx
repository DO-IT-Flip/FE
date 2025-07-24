import React from 'react';
import editIcon from '../../assets/icons/system/edit_modal.svg?url';
import deleteIcon from '../../assets/icons/system/trashcan.svg?url';
import { TYPOGRAPHY } from '@src/assets/styles/typography';
import { COLORS } from '@src/assets/styles/gray_color';
import { deleteSchedule } from "@api/schedule";
import ModalWrapper from './ModalWrapper ';

interface ScheduleActionModalProps {
  isOpen: boolean
  onClose: () => void
  onEdit: () => void
  onDeleted?: () => void; 
  scheduleId: number; 
  position?: { x: number; y: number } // 모달 위치 (점3개 버튼 근처에 표시)
}

const ScheduleActionModal: React.FC<ScheduleActionModalProps> = ({
  isOpen,
  onClose,
  onEdit,
  onDeleted,
  scheduleId,
  position
}) => {
  if (!isOpen) return null

  // 모달 위치 계산 (기본값 설정)
  const modalStyle = position ? {
    position: 'absolute' as const,
    top: position.y + 10,
    left: position.x - 271 + 16,
  } : {}

  return (
      <ModalWrapper isOpen={isOpen} onClose={onClose} >
      
      {/* 모달 컨텐츠 */}
      <div
        className="fixed w-[271px] h-[126px] bg-white rounded-xl shadow-lg overflow-hidden"
        style={{
          ...modalStyle,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Edit schedule 버튼 */}
        <button
          onClick={() => {
            onEdit()
            onClose()
          }}
          className="w-full flex items-center px-6 pt-6 pb-3.5 hover:bg-gray-50 transition-colors"
        >
          <img 
            src={editIcon} 
            alt="edit" 
            className="w-6 h-6 mr-1.5"
          />
          <span
            style={{
              ...TYPOGRAPHY.Body1,
              color: COLORS.gray4
            }}
          >
            Edit schedule
          </span>
        </button>
        <div className='w-full h-0.5'
          style={{backgroundColor: COLORS.gray6}}
        >
        </div>
        {/* Delete 버튼 */}
        <button
          onClick={async () => {
            try {
              await deleteSchedule(scheduleId);
              console.log("삭제 성공");
              onDeleted?.(); // 부모에 삭제 알림
            } catch (error) {
              console.error("삭제 실패", error);
            } finally {
              onClose();
            }
          }}
          className="w-full flex items-center px-6 pt-3.5 pb-6 hover:bg-gray-50 transition-colors"
        >
          <img src={deleteIcon} alt="delete" className="w-6 h-6 mr-1.5" />
          <span
            style={{
              ...TYPOGRAPHY.Body1,
              color: COLORS.gray4
            }}
          >
            Delete
          </span>
        </button>
      </div>
      </ModalWrapper>
  )
}

export default ScheduleActionModal