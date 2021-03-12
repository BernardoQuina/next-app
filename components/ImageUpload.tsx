import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Image } from 'cloudinary-react'

interface ImageUploadProps {
  uploadedImages: { public_id: string }[]
  setUploadedImages: Dispatch<SetStateAction<{ public_id: string }[]>>
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  uploadedImages,
  setUploadedImages,
}) => {
  const [active, setActive] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`

    acceptedFiles.forEach(async (acceptedFile) => {
      const formData = new FormData()

      formData.append('file', acceptedFile)
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      )

      const response = await fetch(url, {
        method: 'post',
        body: formData,
      })

      const data = await response.json()

      setUploadedImages((existing) => [...existing, data])
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  })

  return (
    <>
      {active ? (
        <motion.div
          initial={{
            opacity: 0.5,
            height: '0px',
            scaleX: 0.1,
            x: -100,
            y: -100,
          }}
          animate={{ opacity: 1, height: '100%', scaleX: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <button
              type='button'
              onClick={() => setActive(false)}
              className='focus:outline-none'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='absolute h-5 sm:ml-14 ml-10 mt-4 text-gray-500 transform hover:scale-125'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
            {/* Drop Zone div */}
            <div
              className={
                isDragActive
                  ? 'h-80 w-10/12 mx-auto flex items-center rounded-xl border-4 border-dashed border-pink-500 focus:outline-none cursor-pointer'
                  : 'h-80 w-10/12 mx-auto flex items-center align-middle rounded-xl border-2 border-dashed focus:outline-none cursor-pointer'
              }
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='absolute h-24 left-1/2 transform -translate-x-1/2 self-center text-gray-300'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.2}
                  d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
              <ul className='px-6 z-10 flex'>
                {uploadedImages.map((file) => (
                  <li key={file.public_id} className='self-center h-3/4 px-2'>
                    <Image
                      cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                      publicId={file.public_id}
                      height='250'
                      crop='scale'
                      radius='10'
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          type='button'
          className='focus:outline-none'
          onClick={() => setActive(true)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='h-8 text-pink-600 ml-12 sm:ml-32 transform hover:scale-110'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
            />
          </svg>
        </motion.button>
      )}
    </>
  )
}
