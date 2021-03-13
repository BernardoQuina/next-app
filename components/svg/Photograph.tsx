

interface PhotographProps {
  tailwind?: string
  strokeWidth?: number
}

export const Photograph: React.FC<PhotographProps> = ({ tailwind, strokeWidth }) => {
  return (
    <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className={tailwind}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={strokeWidth}
              d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
            />
          </svg>
  )
}
