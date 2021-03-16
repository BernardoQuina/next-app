import { useState } from 'react'
import { Formik, Form } from 'formik'
import { DateTime } from 'luxon'

import {
  CommentFragment,
  useDeleteCommentMutation,
  useEditCommentMutation,
  useMeQuery,
} from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { InputField } from './InputField'
import { Avatar } from './Avatar'
import { Edit } from './svg/Edit'
import { Delete } from './svg/Delete'
import { X } from './svg/X'

interface CommentItemProps {
  comment: CommentFragment
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const [commenting, setCommenting] = useState(false)

  const { data } = useMeQuery({ skip: isServer() })

  const [editComment] = useEditCommentMutation()
  const [deleteComment] = useDeleteCommentMutation()

  return (
    <div className='flex py-2'>
      <div className='w-10/12 flex'>
        <div className='pr-3'>
          <Avatar user={comment.author!} height={50} />
        </div>
        <div>
          <div className='md:flex align-bottom'>
            <p className='mr-2 font-semibold'>{comment.author?.name}</p>
            <p className='hidden md:inline-block text-gray-400'>|</p>
            <p className='md:ml-2 text-gray-400'>
              {DateTime.fromISO(comment.createdAt).setLocale('en').toRelative()}
            </p>
          </div>
          {commenting ? (
            <Formik
              initialValues={{
                text: comment.text!,
              }}
              onSubmit={async ({ text }, { setErrors }) => {
                const response = await editComment({
                  variables: { commentId: comment.id!, text },
                })

                if (response.errors) {
                  setErrors({ text: response.errors[0].message })
                }

                setCommenting(false)
              }}
            >
              {({ isSubmitting, resetForm }) => (
                <Form className='md:flex max-w-lg'>
                  <InputField
                    name='text'
                    placeholder='comment...'
                    type='text'
                  />

                  {isSubmitting ? (
                    <button className='self-center mx-28 mb-4 md:mx-auto md:mb-0 py-2 px-4 focus:bg-pink-600 focus:text-white focus:outline-none rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900'>
                      loading
                    </button>
                  ) : (
                    <div>
                      <div>
                        <button type='submit'>
                          <Edit tailwind='w-6 p-1 rounded-md bg-green-200 fill-current text-green-600 transform hover:scale-110' />
                        </button>
                      </div>
                      <div>
                        <button
                          type='button'
                          onClick={() => {
                            setCommenting(false)
                            resetForm({})
                          }}
                        >
                          <X tailwind='w-6 p-1 rounded-md bg-red-200 fill-current text-red-600 transform hover:scale-110' />
                        </button>
                      </div>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          ) : (
            <div className=' mt-2'>{comment.text}</div>
          )}
        </div>
      </div>
      {data?.me?.id === comment.author?.id && !commenting ? (
        <div className='ml-auto'>
          <div className='mb-4'>
            <button type='button' onClick={() => setCommenting(true)}>
              <Edit tailwind='w-6 p-1 rounded-md bg-pink-200 fill-current text-pink-600 transform hover:scale-110' />
            </button>
          </div>
          <div>
            <button
              type='button'
              onClick={async () => {
                await deleteComment({
                  variables: { commentId: comment.id! },
                  update: (cache) => {
                    cache.evict({ id: 'Comment:' + comment.id! })
                  },
                })
              }}
            >
              <Delete
                tailwind='justify-self-end w-6 p-1 rounded-lg bg-red-100 stroke-current text-red-600 transform hover:scale-110'
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
