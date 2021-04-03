import { Dispatch, SetStateAction, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { Edit } from '../components/svg/Edit'

interface ProfileImageUploadProps {
  uploadedImages: { public_id: string }[]
  setUploadedImages: Dispatch<SetStateAction<{ public_id: string }[]>>
}

export const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  uploadedImages,
  setUploadedImages,
}) => {
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

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
    maxSize: 5242880,
  })

  if (uploadedImages.length > 1) {
    uploadedImages.shift()
  }

  return (
    <div>
      {/* Drop Zone div */}
      {fileRejections[0] && (
        <div className='p-4 m-6 mt-10 flex self-center rounded-md bg-red-200 shadow-xl'>
          Image size must not surpass 5 MB
        </div>
      )}
      <button
        {...getRootProps()}
        type='button'
        className='absolute p-1 ml-48 md:ml-24 -mt-6 rounded-full transform bg-pink-200 hover:scale-105 active:scale-95 focus:outline-none'
      >
        <Edit tailwind='h-6 text-pink-500' />
        <input {...getInputProps()} />
      </button>
    </div>
  )
}
