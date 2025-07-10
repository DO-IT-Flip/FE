import React, { useState } from 'react'
import closeIcon from '../../assets/icons/system/close2.svg?url'
import { TYPOGRAPHY } from '@src/assets/styles/typography'
import { COLORS } from '@src/assets/styles/gray_color'

// import alcoholIcon    from '../../assets/icons/tag/alcohol.svg?url'
// import bookIcon       from '../../assets/icons/tag/book.svg?url'
// import cameraIcon     from '../../assets/icons/tag/camera.svg?url'
// import clockIcon      from '../../assets/icons/tag/clock.svg?url'
// import coffeeIcon     from '../../assets/icons/tag/coffee.svg?url'
// import documentIcon   from '../../assets/icons/tag/document.svg?url'
// import friendsIcon    from '../../assets/icons/tag/friends.svg?url'
// import hairsalonIcon  from '../../assets/icons/tag/hairsalon.svg?url'
// import hospitalIcon   from '../../assets/icons/tag/hospital.svg?url'
// import mealIcon       from '../../assets/icons/tag/meal.svg?url'
// import schoolIcon     from '../../assets/icons/tag/school.svg?url'
// import shoppingIcon   from '../../assets/icons/tag/shopping.svg?url'
import tagIcon1       from '../../assets/icons/tag/tagIcon1.svg?url'
import tagIcon2       from '../../assets/icons/tag/tagIcon2.svg?url'
import tagIcon3       from '../../assets/icons/tag/tagIcon3.svg?url'
import tagIcon4       from '../../assets/icons/tag/tagIcon4.svg?url'
import tagIcon5       from '../../assets/icons/tag/tagIcon5.svg?url'
import tagIcon6       from '../../assets/icons/tag/tagIcon6.svg?url'
import tagIcon7       from '../../assets/icons/tag/tagIcon7.svg?url'
import tagIcon8       from '../../assets/icons/tag/tagIcon8.svg?url'
import tagIcon9       from '../../assets/icons/tag/tagIcon9.svg?url'
import tagIcon10      from '../../assets/icons/tag/tagIcon10.svg?url'
import tagIcon11      from '../../assets/icons/tag/tagIcon11.svg?url'
import tagIcon12      from '../../assets/icons/tag/tagIcon12.svg?url'

interface SetIconModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (iconId: string) => void
}

// const ICONS = [
//   { id: 'alcohol',   src: alcoholIcon   },
//   { id: 'book',      src: bookIcon      },
//   { id: 'camera',    src: cameraIcon    },
//   { id: 'clock',     src: clockIcon     },
//   { id: 'coffee',    src: coffeeIcon    },
//   { id: 'document',  src: documentIcon  },
//   { id: 'friends',   src: friendsIcon   },
//   { id: 'hairsalon', src: hairsalonIcon },
//   { id: 'hospital',  src: hospitalIcon  },
//   { id: 'meal',      src: mealIcon      },
//   { id: 'school',    src: schoolIcon    },
//   { id: 'shopping',  src: shoppingIcon  },
// ]

const ICONS = [
  { id: 'tagIcon1',   src: tagIcon1  },
  { id: 'tagIcon2',   src: tagIcon2  },
  { id: 'tagIcon3',   src: tagIcon3  },
  { id: 'tagIcon4',   src: tagIcon4  },
  { id: 'tagIcon5',   src: tagIcon5  },
  { id: 'tagIcon6',   src: tagIcon6  },
  { id: 'tagIcon7',   src: tagIcon7  },
  { id: 'tagIcon8',   src: tagIcon8  },
  { id: 'tagIcon9',   src: tagIcon9  },
  { id: 'tagIcon10',  src: tagIcon10 },
  { id: 'tagIcon11',  src: tagIcon11 },
  { id: 'tagIcon12',  src: tagIcon12 },
]

const SetIconModal: React.FC<SetIconModalProps> = ({
  isOpen, onClose, onSelect,
}) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#222222]/[0.7] backdrop-filter backdrop-blur-[2px]"
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
            >아이콘</p>
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
          >태그의 아이콘를 설정해보세요.
          </p>          
        </div>


        <div className='grid grid-cols-6 gap-2 px-0.5 py-2'>
          {ICONS.map(({ id, src }) => (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className="w-[42px] h-[42px] rounded-md"
              style={{
                backgroundColor:COLORS.gray5
              }}
              aria-label={`아이콘 선택 ${id}`}
            >
              <img src={src} alt={id} className="w-[42px] h-[42px]" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SetIconModal
