import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Image, Placeholder } from 'cloudinary-react'

import { Loader } from './Loader'
import { X } from './svg/X'
import { Photograph } from './svg/Photograph'

interface ImageUploadProps {
  uploadedImages: { public_id: string }[]
  setUploadedImages: Dispatch<SetStateAction<{ public_id: string }[]>>
  isAvatar?: boolean
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  uploadedImages,
  setUploadedImages,
  isAvatar,
}) => {
  const [active, setActive] = useState(false)
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`

    acceptedFiles.forEach(async (acceptedFile) => {
      const formData = new FormData()

      formData.append('file', acceptedFile)
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      )

      setLoading(true)

      const response = await fetch(url, {
        method: 'post',
        body: formData,
      })

      const data = await response.json()


      setUploadedImages((existing) => [...existing, data])
      setLoading(false)
    })
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
    maxSize: 5242880,
  })

  if (isAvatar && uploadedImages.length > 1) {
    uploadedImages.pop()
  }

  return (
    <>
      {active ? (
        <motion.div
          initial={{
            opacity: 0.5,
            height: '0px',
            scale: 0.1,
          }}
          animate={{ opacity: 1, height: '100%', scale: 1, x: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <button
              type='button'
              onClick={() => setActive(false)}
              className='focus:outline-none'
            >
              <X tailwind='absolute h-5 ml-2 mt-4 text-gray-500 transform hover:scale-125' />
            </button>
            {/* Drop Zone div */}
            {fileRejections[0] && (
              <div className='p-4 m-6 mt-10 flex self-center rounded-md bg-red-200 shadow-xl'>
                Image size must not surpass 5 MB
              </div>
            )}
            <div
              className={
                isDragActive
                  ? 'h-80 w-10/12 mx-auto flex items-center rounded-xl border-4 border-dashed border-pink-500 focus:outline-none cursor-pointer'
                  : 'h-80 w-11/12  flex items-center align-middle rounded-xl border-2 border-dashed focus:outline-none cursor-pointer'
              }
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {loading ? (
                <Loader />
              ) : (
                <>
                  <Photograph
                    tailwind='absolute h-24 left-1/2 transform -translate-x-1/2 self-center text-gray-300'
                    strokeWidth={1.2}
                  />
                  <ul className='px-6 z-10 flex'>
                    {uploadedImages.map((file) => (
                      <li
                        key={file.public_id}
                        className='self-center h-3/4 px-2'
                      >
                        <button
                          className='absolute focus:outline-none'
                          type='button'
                          onClick={(e) => {
                            e.stopPropagation()
                            setUploadedImages(
                              uploadedImages.filter(
                                (image) => image.public_id !== file.public_id
                              )
                            )
                          }}
                        >
                          <X tailwind='p-1 m-2 h-7 rounded-full text-white bg-gray-400 bg-opacity-75' />
                        </button>
                        <Image
                          cloudName={
                            process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
                          }
                          publicId={file.public_id}
                          loading='lazy'
                          height='250'
                          crop='scale'
                          radius='10'
                        >
                          <Placeholder type='vectorize'></Placeholder>
                        </Image>
                      </li>
                    ))}
                  </ul>
                </>
              )}
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
          <Photograph
            tailwind='h-8 text-pink-600 ml-2 transform hover:scale-110'
            strokeWidth={1.5}
          />
        </motion.button>
      )}
    </>
  )
}
